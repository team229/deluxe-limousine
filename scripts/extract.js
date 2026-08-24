import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { load } = await import('cheerio');

const WORKSPACE_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(WORKSPACE_DIR, '.site-snapshot', 'pages');
const OUT_DIR = path.join(WORKSPACE_DIR, 'src', 'data', 'extracted');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function localUrl(u) {
  if (!u) return null;
  let full = u;
  if (full.startsWith('//')) full = 'https:' + full;
  if (full.includes('cbm-assets.b-cdn.net')) {
    try {
      const p = new URL(full);
      return '/cbm-assets' + p.pathname;
    } catch { return null; }
  }
  if (full.includes('deluxelimousineservice.com/wp-content')) {
    try {
      const p = new URL(full);
      return p.pathname;
    } catch { return null; }
  }
  if (full.startsWith('/wp-content')) return full;
  return null; // external asset -> drop
}

function txt($, el) {
  return $(el).text().replace(/\s+/g, ' ').trim();
}

// Extract an Elementor widget-ish block
function extractSection($, sec) {
  const $sec = $(sec);
  const out = {
    bgImage: null,
    bgVideo: null,
    headings: [],
    paragraphs: [],
    lists: [],
    images: [],
    buttons: [],
    faqs: [],
  };

  // backgrounds from inline style
  const styleAttr = $sec.attr('style') || '';
  const bgMatch = styleAttr.match(/background-image:\s*url\((['"]?)([^'")]+)\1\)/);
  if (bgMatch) out.bgImage = localUrl(bgMatch[2]);
  const videoMatch = $sec.find('video source').first().attr('src') || $sec.find('video').attr('src');
  if (videoMatch) out.bgVideo = localUrl(videoMatch) || videoMatch;

  // FAQ accordions
  const faqItems = $sec.find('.elementor-accordion-item, .elementor-toggle-item');
  if (faqItems.length > 0 && $sec.find('.elementor-tab-title').length === faqItems.length * 1) {
    faqItems.each((_, item) => {
      const q = txt($, $(item).find('.elementor-tab-title').first());
      const a = txt($, $(item).find('.elementor-tab-content').first());
      if (q) out.faqs.push({ q, a });
    });
  }

  $sec.find('h1, h2, h3, h4').each((_, el) => {
    const t = txt($, el);
    if (t) out.headings.push({ level: el.tagName.toUpperCase(), text: t });
  });

  $sec.find('p').each((_, el) => {
    // skip paragraphs inside accordions already captured
    if ($(el).closest('.elementor-tab-content').length) return;
    const t = txt($, el);
    if (t) out.paragraphs.push(t);
  });

  $sec.find('ul, ol').each((_, list) => {
    if ($(list).closest('.elementor-tab-content').length) return;
    const items = [];
    $(list).find('li').each((__, li) => {
      if ($(li).find('ul,ol').length) return; // nested handled by parent walk
      const t = txt($, li);
      if (t) items.push(t);
    });
    if (items.length) out.lists.push({ ordered: list.tagName === 'ol', items });
  });

  $sec.find('img').each((_, img) => {
    const src = $(img).attr('src') || $(img).attr('data-src');
    const lu = localUrl(src);
    if (!lu) return;
    // strip size suffixes like -1024x682 when original exists? keep as-is
    out.images.push({ src: lu, alt: $(img).attr('alt') || '', w: $(img).attr('width') || null, h: $(img).attr('height') || null });
  });

  $sec.find('a').each((_, a) => {
    const $a = $(a);
    const t = txt($, $a);
    const href = $a.attr('href') || '';
    const cls = $a.attr('class') || '';
    if (!t || href.startsWith('#') || cls.includes('elementor-accordion')) return;
    const isBtn = cls.includes('elementor-button') || cls.includes('btn');
    if (isBtn || $a.find('span.elementor-button-text').length) {
      const label = ($a.find('.elementor-button-text').first().text() || t).trim();
      out.buttons.push({ label, href });
    }
  });

  // phone links commonly standalone
  const telLinks = [];
  $sec.find('a[href^="tel:"]').each((_, a) => telLinks.push($(a).attr('href')));
  if (telLinks.length) out.tel = telLinks[0];

  const hasContent =
    out.headings.length || out.paragraphs.length || out.images.length ||
    out.lists.length || out.buttons.length || out.faqs.length || out.bgVideo;

  return hasContent ? out : null;
}

function processPage(file, urlPath) {
  const html = fs.readFileSync(path.join(PAGES_DIR, file), 'utf8');
  const $ = load(html);

  // Remove only SITE-level header/footer/nav, not semantic <header>/<footer> inside content
  $('script, style, noscript').remove();
  const $site = $('body');
  $site.find('header, footer, nav').filter((_, el) => !$(el).parents('section, article, .elementor-section').length).remove();

  const manifest = JSON.parse(fs.readFileSync(path.join(WORKSPACE_DIR, '.site-snapshot', 'manifest.json'), 'utf8'));
  const metaEntry = manifest.find(m => m.path === urlPath) || {};

  // main content: prefer elementor wrappers by type, then best-content container
  let root = $('[data-elementor-type="wp-page"]').first();
  if (!root.length) {
    // pick the container holding the most content
    let best = null, bestScore = -1;
    $('.elementor, #content, .site-content, main').each((_, el) => {
      const score = $(el).find('h1,h2,p,img').length;
      if (score > bestScore) { bestScore = score; best = el; }
    });
    if (best) root = $(best);
  }
  if (!root.length) root = $('main').first();
  if (!root.length) root = $('body');

  // Extract from EVERY elementor section level: clone each, strip nested sections
  // from the clone so each level contributes exactly its own content, in DOM order.
  const sections = [];
  root.find('.elementor-section').each((_, el) => {
    const clone = $(el).clone();
    clone.find('.elementor-section').remove();
    const s = extractSection($, clone.get(0));
    if (s) sections.push(s);
  });

  // Template #2: generic "section.section" builder (e.g. black-car-service, about-us)
  // These sections can sit directly under <body>, so search globally
  if (sections.length === 0) {
    $('section.section').each((_, el) => {
      const s = extractSection($, el);
      if (s) sections.push(s);
    });
  }

  // Fallback for pages without any recognized sections
  if (sections.length === 0) {
    const artRoot = root.find('.entry-content').first().length ? root.find('.entry-content').first() : root;
    const s = extractSection($, artRoot);
    if (s) sections.push(s);
  }

  // Blog post metadata (title/date/author)
  const postTitle = $('.entry-title').first().text().replace(/\s+/g, ' ').trim();
  const postDate = $('time.entry-date').attr('datetime') || null;
  const author = $('.author').first().text().replace(/\s+/g, ' ').trim() || null;

  const result = {
    path: urlPath,
    title: (metaEntry.ogTitle || metaEntry.title || '').replace(/\s*Header Preview.*$/, '').trim(),
    description: metaEntry.metaDescription || '',
    ogImage: localUrl(metaEntry.ogImage) || metaEntry.ogImage,
    postTitle: postTitle || undefined,
    postDate: postDate || undefined,
    author: author || undefined,
    sections,
  };
  return result;
}

const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.html'));
let count = 0;
for (const file of files) {
  const base = file.replace(/\.html$/, '');
  const urlPath = base === '_index' ? '/' : '/' + base.replace(/__/g, '/') + '/';
  try {
    const data = processPage(file, urlPath);
    fs.writeFileSync(path.join(OUT_DIR, base + '.json'), JSON.stringify(data, null, 1));
    count++;
  } catch (e) {
    console.error(`[Extract Err] ${file}: ${e.stack.split('\n').slice(0, 4).join(' | ')}`);
  }
}
console.log(`Extracted ${count}/${files.length} pages to ${OUT_DIR}`);
