import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(WORKSPACE_DIR, '.site-snapshot', 'pages');
const OUT_DIR = path.join(WORKSPACE_DIR, 'src', 'data', 'extracted');

const { load } = await import('cheerio');

function localUrl(u) {
  if (!u) return null;
  if (u.startsWith('//')) u = 'https:' + u;
  if (u.includes('cbm-assets.b-cdn.net')) {
    try { return '/cbm-assets' + new URL(u).pathname; } catch { return null; }
  }
  if (u.includes('deluxelimousineservice.com/wp-content')) {
    try { return new URL(u).pathname; } catch { return null; }
  }
  // relative paths like images/foo.png or uploads/foo.png -> resolve to local asset path
  if (u.startsWith('/wp-content')) return u;
  if (u.startsWith('/')) {
    try { return new URL(u, 'https://deluxelimousineservice.com').pathname; } catch { return null; }
  }
  if (!/^https?:\/\//.test(u) && !u.startsWith('data:') && !u.startsWith('#')) {
    // likely relative to wp-content/uploads
    return '/wp-content/uploads/' + u.replace(/^\.?\//, '');
  }
  return null;
}

function txt($, el) {
  return $(el).text().replace(/\s+/g, ' ').trim();
}

// Detect whether a page uses the "hero + section.section" fleet/service template
function isFleetTemplate($) {
  return ($('div.hero').length > 0 && $('section.section').length > 0) || $('section.section').length > 1;
}

// Detect the city-page template: div.city-page + section.city-*
function isCityTemplate($) {
  return $('div.city-page').length > 0 && $('.city-hero, .city-section').length > 0;
}

// Detect classic Elementor template (wp-page wrapper with .elementor-section content)
function isElementorTemplate($) {
  const root = $('[data-elementor-type="wp-page"]').first();
  if (!root.length) return false;
  const sections = root.find('> .elementor, .elementor-section').length > 0 ? root.find('.elementor-section') : [];
  return sections.length > 0;
}

function extractElementor($, inlineCss = '') {
  const sections = [];
  const root = $('[data-elementor-type="wp-page"]').first();
  if (!root.length) return sections;

  root.find('.elementor-section').each((_, el) => {
    const clone = $(el).clone();
    clone.find('.elementor-section').remove();
    const s = { type: 'prose', headings: [], paragraphs: [], lists: [], buttons: [], images: [], faqs: [], bgImage: null, bgVideo: null };

    // background image/video from data-settings
    const ds = $(el).attr('data-settings') || '';
    const bgImg = (ds.match(/"background_image":\{"url":"([^"]+)/) || [])[1];
    if (bgImg) s.bgImage = localUrl(bgImg);
    const bgVideo = (ds.match(/"background_video_link":"([^"]+)/) || [])[1];
    if (bgVideo) s.bgVideo = localUrl(bgVideo) || bgVideo;
    // also check elementor-background-overlay / inline styles
    const backendStyle = $(el).attr('style') || '';
    const m = backendStyle.match(/url\(['"]?([^'")]+)['"]?\)/);
    if (m && !s.bgImage) s.bgImage = localUrl(m[1]);

    // FAQ
    const faqItems = clone.find('.elementor-accordion-item, .elementor-toggle-item');
    if (faqItems.length) {
      faqItems.each((_, item) => {
        const q = txt($, $(item).find('.elementor-tab-title').first());
        const a = txt($, $(item).find('.elementor-tab-content').first());
        if (q) s.faqs.push({ q, a });
      });
    }

    clone.find('h1,h2,h3,h4').each((_, h) => {
      const t = txt($, h);
      if (t) s.headings.push({ level: h.tagName.toUpperCase(), text: t });
    });
    clone.find('p').each((_, p) => {
      const t = txt($, p);
      if (t && !$(p).closest('.elementor-accordion, .elementor-toggle').length) s.paragraphs.push(t);
    });
    clone.find('ul, ol').each((_, list) => {
      if ($(list).closest('.elementor-accordion, .elementor-toggle').length) return;
      const items = [];
      $(list).find('> li').each((__, li) => { const t = txt($, $(li)); if (t) items.push(t); });
      if (items.length) s.lists.push({ ordered: list.tagName === 'ol', items });
    });
    clone.find('img').each((_, img) => {
      const lu = localUrl($(img).attr('src') || $(img).attr('data-src'));
      if (lu) s.images.push({ src: lu, alt: $(img).attr('alt') || '' });
    });
    clone.find('a').each((_, a) => {
      const label = txt($, $(a));
      const cls = $(a).attr('class') || '';
      const href = $(a).attr('href') || '';
      const isBtn = cls.includes('elementor-button') || cls.includes('btn');
      if ((isBtn || $(a).find('span.elementor-button-text').length) && label && href && !href.startsWith('#')) {
        s.buttons.push({ label, href });
      }
    });

    // determine type: hero if bg and has h1; faq if faqs; gallery if >=2 imgs; else prose
    const headerTxt = (s.headings[0]?.text || '').toLowerCase();
    const cardLike = s.lists.length === 0 && s.paragraphs.length <= 1 && s.headings.length >= 3 && !s.images.length;
    // Fleet grid: multiple vehicle images each paired with a Learn More button heading
    const learnMore = clone.find('a').filter((_, a) => /learn more/i.test(txt($, $(a)))).length;
    const colLike = clone.find('.elementor-column').length;
    if (s.bgVideo || (s.bgImage && s.headings.length)) s.type = 'hero';
    else if (s.faqs.length) s.type = 'faq';
    else if (headerTxt.includes('for any special occasion') || headerTxt.includes('occasion')) {
      s.type = 'occasions';
    }
    else if (learnMore >= 3 && s.images.length >= 3) s.type = 'fleet';
    else if (cardLike) s.type = 'occasions';
    else if (s.images.length >= 2) s.type = 'gallery';
    else if (s.images.length === 1 && s.paragraphs.length) s.type = 'split';
    else s.type = 'prose';

    const hasContent =
      s.headings.length || s.paragraphs.length || s.images.length || s.lists.length || s.buttons.length || s.faqs.length || s.bgImage;
    if (hasContent) sections.push(s);
  });

  // Post-process: merge consecutive same-type sections & dedupe repeated headings/images
  const merged = [];
  for (const s of sections) {
    const prev = merged[merged.length - 1];
    if (prev && prev.headings.length && s.headings.length) {
      // Collapse consecutive prose that share the same first heading (Elementor duplicates)
      const ph = prev.headings[0].text.toLowerCase();
      const sh = s.headings[0].text.toLowerCase();
      if (prev.type === s.type && prev.type === 'prose' && (ph === sh || sh.startsWith(ph))) {
        // keep heading once, absorb paragraphs if prev had none
        if (!prev.paragraphs.length) prev.headings = s.headings;
        prev.paragraphs.push(...s.paragraphs);
        prev.lists.push(...s.lists);
        prev.images.push(...s.images);
        continue;
      }
    }
    if (prev && prev.type === s.type && s.type === 'fleet') {
      prev.images.push(...s.images);
      prev.paragraphs.push(...s.paragraphs);
      prev.buttons.push(...s.buttons);
      continue;
    }
    if (prev && prev.type === s.type && s.type === 'occasions' && prev.headings[0]?.text === s.headings[0]?.text) {
      prev.headings.push(...s.headings.slice(1));
      continue;
    }
    merged.push(s);
  }

  return merged;
}

function extractCityTemplate($, inlineCss = '') {
  const sections = [];
  const page = $('div.city-page').first();
  if (!page.length) return sections;

  page.find('section').each((_, sec) => {
    const $sec = $(sec);
    const cls = ($sec.attr('class') || '').split(/\s+/)[0];
    const s = { type: 'prose', headings: [], paragraphs: [], lists: [], buttons: [], images: [], cards: [], faqs: [] };

    const header = $sec.find('> .city-section-header, .city-section-header').first();
    if (header.length) {
      header.find('h1,h2,h3').each((_, h) => s.headings.push({ level: h.tagName.toUpperCase(), text: txt($, h) }));
      header.find('p').each((_, p) => { const t = txt($, p); if (t) s.paragraphs.push(t); });
    }

    if (cls === 'city-hero') {
      s.type = 'hero';
      s.headings = [];
      $sec.find('h1,h2').each((_, h) => s.headings.push({ level: h.tagName.toUpperCase(), text: txt($, h) }));
      $sec.find('p').each((_, p) => { const t = txt($, p); if (t) s.paragraphs.push(t); });
      $sec.find('a').each((_, a) => {
        const label = txt($, $(a)); const href = $(a).attr('href') || '';
        if (label && href && !href.startsWith('#')) s.buttons.push({ label, href });
      });
      sections.push(s);
      return;
    }

    if (cls === 'city-services-section') {
      s.type = 'services';
      $sec.find('.city-service-pill').each((_, pill) => {
        const t = txt($, $(pill));
        if (t) s.cards.push({ title: t });
      });
      sections.push(s);
      return;
    }

    if (cls === 'city-attractions-section') {
      s.type = 'columns';
      $sec.find('.city-info-card').each((_, card) => {
        const h = txt($, $(card).find('h3,h4').first());
        const items = [];
        $(card).find('li').each((__, li) => { const t = txt($, $(li)); if (t) items.push(t); });
        s.cards.push({ title: h, items });
      });
      $sec.find('.city-airports-card').each((_, card) => {
        const h = txt($, $(card).find('h3,h4').first()) || 'Airports We Serve';
        const items = [];
        $(card).find('strong, span, li').each((__, el) => { const t = txt($, $(el)); if (t) items.push(t); });
        s.cards.push({ title: h, items });
      });
      sections.push(s);
      return;
    }

    if (cls === 'city-faq-section') {
      s.type = 'faq';
      $sec.find('.city-faq-item').each((_, item) => {
        const full = txt($, $(item));
        const q = full.split('+')[0].trim();
        const a = full.split('+').slice(1).join('+').trim();
        if (q) s.faqs.push({ q, a });
      });
      sections.push(s);
      return;
    }

    if (cls === 'city-highlight-banner') {
      s.type = 'banner';
      $sec.find('p').each((_, p) => { const t = txt($, p); if (t) s.paragraphs.push(t); });
      $sec.find('img').each((_, img) => { const lu = localUrl($(img).attr('src')); if (lu) s.images.push({ src: lu, alt: $(img).attr('alt') || '' }); });
      const bg = $sec.find('[style*=background-image]').first();
      if (bg.length) { const m = (bg.attr('style') || '').match(/url\(['"]?([^'")]+)['"]?\)/); if (m) s.bgImage = localUrl(m[1]); }
      sections.push(s);
      return;
    }

    if (cls === 'city-cta-section') {
      s.type = 'cta';
      $sec.find('h1,h2,h3').each((_, h) => s.headings.push({ level: h.tagName.toUpperCase(), text: txt($, h) }));
      $sec.find('p').each((_, p) => { const t = txt($, p); if (t) s.paragraphs.push(t); });
      $sec.find('a').each((_, a) => {
        const label = txt($, $(a)); const href = $(a).attr('href') || '';
        if (label && href && !href.startsWith('#')) s.buttons.push({ label, href });
      });
      sections.push(s);
      return;
    }

    // default prose
    $sec.find('h1,h2,h3').each((_, h) => { if (!s.headings.some((x) => x.text === txt($, h))) s.headings.push({ level: h.tagName.toUpperCase(), text: txt($, h) }); });
    $sec.find('p').each((_, p) => { const t = txt($, p); if (t && !s.paragraphs.includes(t)) s.paragraphs.push(t); });
    $sec.find('img').each((_, img) => { const lu = localUrl($(img).attr('src')); if (lu) s.images.push({ src: lu, alt: $(img).attr('alt') || '' }); });
    const has = s.headings.length || s.paragraphs.length || s.images.length;
    if (has) sections.push(s);
  });

  // trust-bar facts
  const trust = $('.city-trust-bar').first();
  if (trust.length) {
    const s = { type: 'stats', headings: [], paragraphs: [], lists: [], buttons: [], images: [], cards: [] };
    trust.find('div').each((_, d) => {
      const t = txt($, $(d));
      if (t && t.length < 40 && /\d/.test(t)) s.cards.push({ title: t });
    });
    if (s.cards.length) sections.splice(1, 0, s);
  }

  return sections;
}

function extractFleetTemplate($, inlineCss = '') {
  const sections = [];

  // 1. HERO
  const hero = $('div.hero').first();
  if (hero.length) {
    const s = { type: 'hero', headings: [], paragraphs: [], buttons: [], images: [], bgImage: null, bgVideo: null };
    hero.find('h1,h2').each((_, h) => s.headings.push({ level: h.tagName.toUpperCase(), text: txt($, h) }));
    hero.find('p').each((_, p) => { const t = txt($, p); if (t) s.paragraphs.push(t); });
    hero.find('img').each((_, img) => { const lu = localUrl($(img).attr('src')); if (lu) s.images.push({ src: lu, alt: $(img).attr('alt') || '' }); });
    // background image lives in <style> (inline CSS on the page)
    const bg = hero.find('.hero-bg').first();
    if (bg.length) {
      const style = bg.attr('style') || '';
      const m = style.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (m) s.bgImage = localUrl(m[1]);
    }
    if (!s.bgImage) {
      // .hero-bg may be styled via a <style> block referencing the class
      const m = inlineCss.match(/\.hero-bg\s*\{[^}]*url\(['"]?([^'")]+)['"]?\)/);
      if (m) s.bgImage = localUrl(m[1]);
    }
    hero.find('a').each((_, a) => {
      const label = txt($, $(a));
      const href = $(a).attr('href') || '';
      if (label && href && !href.startsWith('#') && !href.includes('index.html')) s.buttons.push({ label, href });
    });
    if (s.headings.length) sections.push(s);
  }

  // 2. section.section blocks
  $('section.section').each((_, sec) => {
    const $sec = $(sec);
    const s = { type: 'prose', headings: [], paragraphs: [], lists: [], buttons: [], images: [], cards: [], faqs: [] };
    const header = $sec.find('> .section-header, .section-header').first();
    if (header.length) {
      header.find('h1,h2,h3').each((_, h) => s.headings.push({ level: h.tagName.toUpperCase(), text: txt($, h) }));
      header.find('p').each((_, p) => { const t = txt($, p); if (t) s.paragraphs.push(t); });
    }

    const headerTitle = (s.headings[0]?.text || '').toLowerCase();

    // Fleet grid
    const fleetGrid = $sec.find('> .fleet-grid, .fleet-grid').first();
    if (fleetGrid.length) {
      s.type = 'fleet';
      const fc = $sec.find('> .fleet-grid > *, .fleet-grid > *');
      fc.each((_, card) => {
        const c = txt($, $(card));
        const img = localUrl($(card).find('img').first().attr('src'));
        if (c) s.cards.push({ title: c.replace(/Up to \d+.*$/i, '').trim(), meta: (c.match(/Up to \d+.*$/i) || [''])[0], image: img });
      });
      sections.push(s);
      return;
    }

    // FAQ
    const faqContainer = $sec.find('> .faq-container, .faq-container').first();
    if (faqContainer.length || headerTitle.includes('frequently asked')) {
      s.type = 'faq';
      $sec.find('.faq-item').each((_, item) => {
        const q = txt($, $(item).find('.faq-question').first()).replace(/\s*\+\s*$/, '').trim();
        // answer is remaining text after question
        const full = txt($, $(item));
        const a = full.replace(q, '').trim();
        if (q) s.faqs.push({ q, a });
      });
      if (!s.faqs.length) sections.push(s);
      else sections.push(s);
      return;
    }

    // Services pill grid
    const servicesGrid = $sec.find('> .services-grid, .services-grid').first();
    if (servicesGrid.length) {
      s.type = 'services';
      $sec.find('> .services-grid > *, .services-grid > *').each((_, pill) => {
        const t = txt($, $(pill));
        if (t) s.cards.push({ title: t });
      });
      sections.push(s);
      return;
    }

    // Occasion / event list (Weddings, Quinceanera, Prom, ... paired with occasions
    // or event words, no images, only short labels)
    if (s.headings.length >= 3 && s.images.length === 0 && s.paragraphs.length <= 1) {
      s.type = 'occasions';
      sections.push(s);
      return;
    }

    // Dual-column info cards (Features / Ideal For)
    const dualGrid = $sec.find('> .dual-grid, .dual-grid').first();
    if (dualGrid.length) {
      s.type = 'columns';
      dualGrid.find('> *, .info-card').each((_, col) => {
        const h = col.tagName.startsWith('h') ? txt($, $(col)) : txt($, $(col).find('h3, h4').first());
        const items = [];
        $(col).find('li, p, strong').each((__, li) => {
          const t = txt($, $(li));
          if (t && t !== h) items.push(t);
        });
        s.cards.push({ title: h, items });
      });
      sections.push(s);
      return;
    }

    // Airports card
    const airportsCard = $sec.find('> .airports-card, .airports-card').first();
    if (airportsCard.length) {
      s.type = 'airports';
      airportsCard.find('a, strong, span').each((__, el) => {
        const t = txt($, $(el));
        if (t) s.cards.push({ title: t });
      });
      sections.push(s);
      return;
    }

    // Booking form
    if ($sec.find('form, .booking, input, select').length) {
      s.type = 'booking';
      sections.push(s);
      return;
    }

    // General prose (didn't match any specific pattern)
    $sec.find('p').each((_, p) => {
      if ($(p).closest('.section-header').length) return;
      const t = txt($, p);
      if (t) s.paragraphs.push(t);
    });
    $sec.find('ul, ol').each((_, list) => {
      if ($(list).closest('section.section .section-header').length || $(list).closest('.dual-grid, .faq-container, .fleet-grid').length) return;
      const items = [];
      $(list).find('> li').each((__, li) => { const t = txt($, $(li)); if (t) items.push(t); });
      if (items.length) s.lists.push({ ordered: list.tagName === 'ol', items });
    });
    $sec.find('img').each((_, img) => {
      const lu = localUrl($(img).attr('src'));
      if (lu) s.images.push({ src: lu, alt: $(img).attr('alt') || '' });
    });
    $sec.find('a').each((_, a) => {
      const label = txt($, $(a));
      const cls = $(a).attr('class') || '';
      const href = $(a).attr('href') || '';
      if (label && (cls.includes('btn') || cls.includes('button')) && href && !href.startsWith('#')) s.buttons.push({ label, href });
    });

    const hasContent = s.headings.length || s.paragraphs.length || s.lists.length || s.buttons.length || s.images.length;
    if (hasContent) sections.push(s);
  });

  return sections;
}

// Fallback generic extractor used by the original script (unchanged)
function extractNoise($) {
  const txt0 = (el) => $(el).text().replace(/\s+/g, ' ').trim();
  const root = $('div.hfeed.site, .site-content').first();
  const s = { type: 'prose', headings: [], paragraphs: [], lists: [], buttons: [], images: [] };
  root.find('h1,h2,h3').each((_, h) => s.headings.push({ level: h.tagName.toUpperCase(), text: txt0($, h) }));
  root.find('p').each((_, p) => { const t = txt0($, p); if (t) s.paragraphs.push(t); });
  root.find('img').each((_, img) => { const lu = localUrl($(img).attr('src')); if (lu) s.images.push({ src: lu, alt: $(img).attr('alt') || '' }); });
  return s;
}

// Sequential DOM-order extractor: walks actual content nodes and emits ordered sections.
// Works for Astra/Elementor, Tailwind-build pages, occasion/combo pages, etc.
function extractSequential($, urlPath) {
  let root = $('div.hfeed.site .site-content').first();
  if (!root.length) root = $('main').first();
  if (!root.length) root = $('body');

  const cands = [
    root.find('div.content-area').first(),
    root.find('div.ast-container').first(),
    root.find('div.max-w-6xl').first(),
    root.find('[data-elementor-type="wp-page"]').first(),
    root.find('[data-elementor-type]').first(),
    root,
  ];
  let content = null;
  for (const c of cands) {
    if (c.length && c.find('h1,h2,p').length >= 2) { content = c; break; }
  }
  if (!content) content = root;

  const sections = [];
  let current = null;
  let firstHeadingSeen = false;
  const entryTitle = txt($, $('.entry-title').first()).toLowerCase();
  const slugLabel = (urlPath || '').split('/').filter(Boolean).pop() || '';
  const isTitleDup = (text) => text.toLowerCase() === entryTitle || text.toLowerCase() === slugLabel || text.toLowerCase().replace(/-/g, ' ') === slugLabel.replace(/-/g, ' ');
  const flush = () => {
    if (current && (current.headings.length || current.paragraphs.length || current.images.length)) sections.push(current);
  };

  content.find('h1,h2,h3,h4,p,img').each((_, el) => {
    const $el = $(el);
    const tag = el.tagName;

    if (/^h[12]$/.test(tag)) {
      const text = txt($, $el);
      // Skip the generic page-title duplicate (appears first, equals entry-title/slug)
      if (!firstHeadingSeen && isTitleDup(text)) return;
      firstHeadingSeen = true;
      flush();
      current = { type: 'prose', headings: [], paragraphs: [], lists: [], buttons: [], images: [], faqs: [] };
      current.headings.push({ level: tag.toUpperCase(), text });
      return;
    }
    firstHeadingSeen = true;

    if (!current && !/^h[34]$/.test(tag)) {
      current = { type: 'prose', headings: [], paragraphs: [], lists: [], buttons: [], images: [], faqs: [] };
    }

    if (/^h[34]$/.test(tag)) {
      if (current) current.headings.push({ level: tag.toUpperCase(), text: txt($, $el) });
    } else if (tag === 'p') {
      const t = txt($, $el);
      if (t && t.length > 3) current.paragraphs.push(t);
    } else if (tag === 'img') {
      const lu = localUrl($el.attr('src') || $el.attr('data-src'));
      if (lu) current.images.push({ src: lu, alt: $el.attr('alt') || '' });
    }
  });
  flush();

  return sections;
}

// Process one snapshot file
async function processFile(file, urlPath, metaEntry) {
  const html = fs.readFileSync(path.join(PAGES_DIR, file), 'utf8');
  const $ = load(html);

  // Capture inline <style> CSS BEFORE removing style elements (hero bg images live here)
  const inlineCss = $('style').map((_, st) => $(st).html() || '').get().join('\n');

  $('script, style, noscript').remove();

  const manifest = JSON.parse(fs.readFileSync(path.join(WORKSPACE_DIR, '.site-snapshot', 'manifest.json'), 'utf8'));
  const metaEntryRef = manifest.find((m) => m.path === urlPath) || {};

  let sections = [];
  if (isCityTemplate($)) {
    sections = extractCityTemplate($, inlineCss);
  } else if (isFleetTemplate($)) {
    sections = extractFleetTemplate($, inlineCss);
  } else if (isElementorTemplate($)) {
    sections = extractElementor($, inlineCss);
  } else {
    sections = extractSequential($, urlPath);
  }

  if (!sections.length) {
    sections = extractSequential($, urlPath);
  }

  const result = {
    path: urlPath,
    title: (metaEntryRef.ogTitle || metaEntryRef.title || '').replace(/\s*Header Preview.*$/, '').trim(),
    description: metaEntryRef.metaDescription || '',
    ogImage: localUrl(metaEntryRef.ogImage) || metaEntryRef.ogImage,
    sections,
  };
  return result;
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(path.join(WORKSPACE_DIR, '.site-snapshot', 'manifest.json'), 'utf8'));
  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.html'));
  let done = 0, fleet = 0;
  for (const file of files) {
    const base = file.replace(/\.html$/, '');
    const urlPath = base === '_index' ? '/' : '/' + base.replace(/__/g, '/') + '/';
    const metaEntry = manifest.find((m) => m.path === urlPath) || {};
    const data = await processFile(file, urlPath, metaEntry);
    if (data.sections.length) {
      fs.writeFileSync(path.join(OUT_DIR, base + '.json'), JSON.stringify(data, null, 1));
      if (data.sections[0]?.type === 'hero') fleet++;
      done++;
    }
  }
  console.log(`Extracted ${done}/${files.length} pages, ${fleet} with fleet template (hero + sections).`);
}

main().catch(console.error);
