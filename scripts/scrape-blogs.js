import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(WORKSPACE_DIR, 'src', 'content', 'blog');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const { load } = await import('cheerio');

const BASE = 'https://deluxelimousineservice.com';

// Publish dates from post-sitemap.xml (entry-date not rendered on all templates)
const SITEMAP_DATES = {
  'beyond-the-rideshare-whats-driving-orange-countys-shift-toward-limousine-travel': '2026-07-15',
  'why-more-anaheim-locals-are-skipping-rideshares-for-a-proper-limousine-ride': '2026-07-15',
  'the-honest-guide-to-finding-a-reliable-limousine-service-in-anaheim': '2026-06-14',
  'black-car-service-to-lax-from-anaheim': '2026-06-12',
  'elementor-2756': '2022-09-19',
  'elementor-2767': '2022-09-19',
  'hummer-limo': '2022-09-19',
  'hello-world': '2022-06-03',
};

// Step 1: scrape blog list page for post URLs
async function getPostUrls() {
  const res = await fetch(`${BASE}/blog/`);
  const html = await res.text();
  const $ = load(html);
  const posts = new Map();
  $('article').each((_, art) => {
    const $a = $(art).find('a[href*="/blog/"]').first();
    const href = $a.attr('href');
    if (!href) return;
    const url = href.startsWith('http') ? href : BASE + href;
    const slug = url.replace(BASE, '').replace(/^\/blog\//, '').replace(/\/$/, '');
    if (!slug || slug.startsWith('category')) return;
    const title = $(art).find('.entry-title, h2, h3').first().text().replace(/\s+/g, ' ').trim();
    const date = $(art).find('time.entry-date').attr('datetime')?.slice(0, 10) || null;
    const img = $(art).find('img').first().attr('src') || $(art).find('img').first().attr('data-src') || null;
    posts.set(slug, { url, listTitle: title, listDate: date, listImage: img });
  });
  return posts;
}

function localUrl(u) {
  if (!u) return null;
  if (u.startsWith('//')) u = 'https:' + u;
  if (u.includes('cbm-assets.b-cdn.net')) {
    try { return '/cbm-assets' + new URL(u).pathname; } catch { return null; }
  }
  if (u.includes('deluxelimousineservice.com/wp-content')) {
    try { return new URL(u).pathname; } catch { return null; }
  }
  if (u.startsWith('/wp-content')) return u;
  return null;
}

// Step 2: scrape each post page and build markdown body
async function scrapePost(slug, info) {
  const res = await fetch(info.url);
  if (!res.ok) {
    console.error(`[HTTP ${res.status}] ${slug}`);
    return null;
  }
  const html = await res.text();
  const $ = load(html);

  const meta = {
    title: $('meta[property="og:title"]').attr('content') || $('title').text().trim(),
    description: $('meta[name="description"]').attr('content') || '',
    date: $('time.entry-date').attr('datetime')?.slice(0, 10) || info.listDate || SITEMAP_DATES[slug] || null,
    author: $('.entry-author .author, .author a').first().text().replace(/\s+/g, ' ').trim() || null,
  };

  // post title (clean)
  const postTitle = $('.entry-title').first().text().replace(/\s+/g, ' ').trim() || info.listTitle || slug;

  // body: entry-content
  let $body = $('.entry-content').first();
  if (!$body.length) $body = $('article').first();
  if (!$body.length) $body = $('main').first();

  // remove junk
  $body.find('script, style, nav, form, .post-navigation, .navigation, .comments-area, .sharedaddy, .jp-relatedposts').remove();

  const parts = [];
  const featuredCandidates = [];

  $body.children().each((_, el) => {
    const $el = $(el);
    const tag = el.tagName;

    if (/^h[2-4]$/.test(tag)) {
      const text = $el.text().replace(/\s+/g, ' ').trim();
      if (text) parts.push(`${'#'.repeat(Number(tag[1]))} ${text}\n`);
    } else if (tag === 'p') {
      // paragraph with image inside?
      const $img = $el.find('img').first();
      if ($img.length && $el.text().trim().length < 20) {
        const src = localUrl($img.attr('src') || $img.attr('data-src'));
        if (src) {
          featuredCandidates.push(src);
          parts.push(`![${$img.attr('alt') || postTitle}](${src})\n`);
        }
      } else {
        // keep inline links/images
        const hrefs = [];
        $el.find('a').each((__, a) => hrefs.push($(a).attr('href')));
        let text = $el.text().replace(/\s+/g, ' ').trim();
        if (text) parts.push(text + '\n');
      }
    } else if (tag === 'figure' || tag === 'div') {
      const $img = $el.is('img') ? $el : $el.find('img').first();
      if ($img.length) {
        const src = localUrl($img.attr('src') || $img.attr('data-src'));
        if (src && !$body.find(`p img[src='${$img.attr('src')}']`).length) {
          featuredCandidates.push(src);
          parts.push(`![${$img.attr('alt') || postTitle}](${src})\n`);
        }
      }
      // divs may contain headings/text (elementor)
      $el.find('h2,h3,h4,p,li').each((__, sub) => {
        const st = $(sub).text().replace(/\s+/g, ' ').trim();
        if (!st) return;
        const t = sub.tagName;
        if (/^h[2-4]$/.test(t)) parts.push(`${'#'.repeat(Number(t[1]))} ${st}\n`);
        else if (t === 'li') parts.push(`- ${st}`);
        else parts.push(st + '\n');
      });
    } else if (tag === 'ul' || tag === 'ol') {
      $el.find('li').each((__, li) => {
        const t = $(li).text().replace(/\s+/g, ' ').trim();
        if (t) parts.push(`${tag === 'ol' ? '1.' : '-'} ${t}`);
      });
    } else if (tag === 'blockquote') {
      const t = $el.text().replace(/\s+/g, ' ').trim();
      if (t) parts.push(`> ${t}\n`);
    }
  });

  // dedupe consecutive duplicate lines
  let body = parts
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Stub/image-only posts: ensure at least the entry-content images are present
  if (body.length < 40) {
    const imgs = [];
    $body.find('img').each((__, im) => {
      const src = localUrl($(im).attr('src') || $(im).attr('data-src'));
      if (src) imgs.push(`![${$(im).attr('alt') || postTitle}](${src})`);
    });
    if (imgs.length) body = imgs.join('\n\n');
  }

  const featured = localUrl(info.listImage) || featuredCandidates[0] || null;

  return { meta, postTitle, body, featured };
}

async function main() {
  const posts = await getPostUrls();
  console.log(`Found ${posts.size} posts on listing page\n`);

  for (const [slug, info] of posts) {
    const result = await scrapePost(slug, info);
    if (!result) continue;
    const { meta, postTitle, body, featured } = result;

    const fm = [
      '---',
      `title: ${JSON.stringify(postTitle)}`,
      meta.date ? `date: ${meta.date}` : null,
      `description: ${JSON.stringify(meta.description || postTitle)}`,
      featured ? `featuredImage: ${JSON.stringify(featured)}` : null,
      meta.author ? `author: ${JSON.stringify(meta.author)}` : null,
      '---',
    ].filter(Boolean);

    const md = fm.join('\n') + '\n\n' + body + '\n';
    fs.writeFileSync(path.join(OUT_DIR, slug + '.md'), md);
    console.log(`[OK] ${slug}.md  (${body.length} chars, ${meta.date || 'no date'})`);
  }
}

main().catch(console.error);
