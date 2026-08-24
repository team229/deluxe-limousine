import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { load: cheerioLoad } = await import('cheerio');

const BASE_URL = 'https://deluxelimousineservice.com';
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(WORKSPACE_DIR, 'public');
const SNAPSHOT_DIR = path.join(WORKSPACE_DIR, '.site-snapshot');

const PAGES_DIR = path.join(SNAPSHOT_DIR, 'pages');
const MANIFEST_PATH = path.join(SNAPSHOT_DIR, 'manifest.json');

if (!fs.existsSync(PAGES_DIR)) fs.mkdirSync(PAGES_DIR, { recursive: true });

// ---- Load URL list from sitemaps ----
async function getSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl);
  const xml = await res.text();
  const $ = cheerioLoad(xml, { xmlMode: true });
  const urls = [];
  $('loc').each((_, el) => {
    const u = $(el).text().trim();
    if (!u) return;
    urls.push(u);
  });
  return urls;
}

async function buildUrlList() {
  const indexUrls = await getSitemapUrls(`${BASE_URL}/sitemap_index.xml`);
  const all = new Set();
  for (const sm of indexUrls) {
    if (!sm.endsWith('.xml') || sm.includes('elementor-hf')) continue; // only child sitemaps, skip header/footer templates
    try {
      const urls = await getSitemapUrls(sm);
      urls.forEach(u => { if (!u.endsWith('.xml')) all.add(u); });
      console.log(`[Sitemap] ${sm}: ${urls.length} urls`);
    } catch (e) {
      console.error(`[Sitemap Error] ${sm}: ${e.message}`);
    }
  }
  return Array.from(all);
}

// ---- Media collection & download ----
const mediaUrls = new Set();

function addMedia(url) {
  if (!url) return;
  let full = url;
  if (full.startsWith('//')) full = 'https:' + full;
  else if (full.startsWith('/')) full = BASE_URL + full;
  else if (!/^https?:\/\//.test(full)) return;
  if (!full.includes('deluxelimousineservice.com') && !full.includes('cbm-assets.b-cdn.net/deluxe-limousine')) return;
  // skip svg sprites etc? keep them too
  mediaUrls.add(full);
}

function extractMediaFromHtml(html) {
  const $ = cheerioLoad(html);
  $('img').each((_, el) => {
    addMedia($(el).attr('src'));
    addMedia($(el).attr('data-src'));
    addMedia($(el).attr('data-lazy-src'));
    const ss = $(el).attr('srcset') || $(el).attr('data-srcset') || $(el).attr('data-lazy-srcset');
    if (ss) ss.split(',').forEach(p => addMedia(p.trim().split(/\s+/)[0]));
  });
  $('[style]').each((_, el) => {
    const style = $(el).attr('style') || '';
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    let m;
    while ((m = re.exec(style))) addMedia(m[2]);
  });
  $('video, source, track').each((_, el) => addMedia($(el).attr('src')));
  $('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').each((_, el) => addMedia($(el).attr('href')));
  // og:image
  const og = $('meta[property="og:image"]').attr('content');
  if (og) addMedia(og);
  // JSON blobs inside elementor settings often contain image urls
  const htmlStr = html;
  const re = /https:\\?\/\\?\/[^"'\s\\]+\.(?:png|jpe?g|webp|gif|svg|mp4|webm|avif)/gi;
  let m2;
  while ((m2 = re.exec(htmlStr))) {
    addMedia(m2[0].replace(/\\\//g, '/'));
  }
}

async function downloadFile(fileUrl) {
  try {
    const parsed = new URL(fileUrl);
    let destPath;
    if (parsed.hostname === 'cbm-assets.b-cdn.net') {
      // keep under /cbm-assets/<rest>
      destPath = path.join(PUBLIC_DIR, 'cbm-assets', parsed.pathname.replace(/^\/+/, ''));
    } else {
      destPath = path.join(PUBLIC_DIR, parsed.pathname);
    }
    if (path.extname(destPath) === '') return false;
    if (fs.existsSync(destPath)) return true;
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const res = await fetch(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteMigrator/1.0)' } });
    if (!res.ok) {
      console.error(`[404] ${res.status} ${fileUrl}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buf);
    console.log(`[DL] ${fileUrl}`);
    return true;
  } catch (err) {
    console.error(`[Err] ${fileUrl}: ${err.message}`);
    return false;
  }
}

function slugToFilename(urlPath) {
  // '/' -> '_index.html'; '/anaheim/' -> 'anaheim.html'
  const clean = urlPath.replace(BASE_URL, '').split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return '_index.html';
  return clean.replace(/^\/+|\/+$/g, '').replace(/\//g, '__') + '.html';
}

// ---- Page crawl ----
async function crawlPage(pageUrl) {
  const urlPath = pageUrl.replace(BASE_URL, '') || '/';
  try {
    const res = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteMigrator/1.0)' } });
    if (!res.ok) {
      console.error(`[Page ${res.status}] ${pageUrl}`);
      return null;
    }
    const html = await res.text();
    fs.writeFileSync(path.join(PAGES_DIR, slugToFilename(urlPath)), html);

    const $ = cheerioLoad(html);
    const entry = {
      url: pageUrl,
      path: urlPath,
      title: $('title').text().trim() || '',
      metaDescription: $('meta[name="description"]').attr('content') || '',
      canonical: $('link[rel="canonical"]').attr('content') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      h1: [],
      lastmod: null,
    };
    $('h1').each((_, el) => entry.h1.push($(el).text().trim()));

    extractMediaFromHtml(html);
    return entry;
  } catch (err) {
    console.error(`[Crawl Err] ${pageUrl}: ${err.message}`);
    return null;
  }
}

async function runPool(tasks, size) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]();
    }
  }
  await Promise.all(Array.from({ length: size }, worker));
  return results;
}

async function main() {
  console.log('Building URL list from sitemaps...');
  const urls = await buildUrlList();
  console.log(`Total URLs: ${urls.length}`);

  const manifest = [];
  // Crawl pages with concurrency 5
  const tasks = urls.map(u => async () => {
    const entry = await crawlPage(u);
    if (entry) manifest.push(entry);
  });
  await runPool(tasks, 5);

  // Also grab images referenced in sitemaps themselves (already crawled pages include most)
  console.log(`\nCollected ${mediaUrls.size} unique media assets. Downloading...`);
  const list = Array.from(mediaUrls);
  const dlTasks = list.map(u => async () => downloadFile(u));
  await runPool(dlTasks, 8);

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest saved (${manifest.length} pages): ${MANIFEST_PATH}`);
  console.log('Done.');
}

main().catch(console.error);
