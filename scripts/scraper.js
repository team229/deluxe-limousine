import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://deluxelimousineservice.com';
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(WORKSPACE_DIR, 'public');

const visitedUrls = new Set();
const crawlQueue = ['/'];
const mediaUrls = new Set();

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Download function
async function downloadFile(fileUrl, relativeDest) {
  try {
    // Standardize URL
    let fullUrl = fileUrl;
    if (fileUrl.startsWith('//')) {
      fullUrl = 'https:' + fileUrl;
    } else if (fileUrl.startsWith('/')) {
      fullUrl = BASE_URL + fileUrl;
    } else if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
      return; // Skip inline or data URLs
    }

    // Ignore external URLs not belonging to the reference domain
    if (!fullUrl.startsWith(BASE_URL) && !fullUrl.startsWith('https://secureservercdn.net') && !fullUrl.includes('deluxelimousine')) {
      return;
    }

    const parsed = new URL(fullUrl);
    // Keep the pathname to preserve directory structure
    let destPath = path.join(PUBLIC_DIR, parsed.pathname);

    // If it's a directory or has no extension, skip or handle
    if (path.extname(destPath) === '') {
      return;
    }

    // Ensure directory exists
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Check if file already exists to avoid redundant downloads
    if (fs.existsSync(destPath)) {
      console.log(`[Skip] Already downloaded: ${parsed.pathname}`);
      return;
    }

    console.log(`[Downloading] ${fullUrl} -> ${destPath}`);
    const res = await fetch(fullUrl);
    if (!res.ok) {
      console.error(`[Error] Failed to fetch ${fullUrl}: ${res.statusText}`);
      return;
    }

    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`[Success] Saved: ${parsed.pathname}`);
  } catch (err) {
    console.error(`[Download Error] ${fileUrl}: ${err.message}`);
  }
}

// Crawl page function
async function crawlPage(urlPath) {
  const pageUrl = urlPath.startsWith('/') ? BASE_URL + urlPath : urlPath;
  console.log(`\n=== Crawling Page: ${pageUrl} ===`);

  try {
    const res = await fetch(pageUrl);
    if (!res.ok) {
      console.error(`[Crawl Error] Failed to fetch page ${pageUrl}: ${res.statusText}`);
      return;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // 1. Find all links to crawl
    $('a').each((_, elem) => {
      const href = $(elem).attr('href');
      if (href) {
        // Normalize and check if internal
        if (href.startsWith('/') || href.startsWith(BASE_URL)) {
          const cleanPath = href.replace(BASE_URL, '').split('#')[0].split('?')[0];
          // Filter out typical non-pages
          if (
            cleanPath &&
            !cleanPath.includes('/wp-content/') &&
            !cleanPath.includes('/wp-includes/') &&
            !cleanPath.endsWith('.pdf') &&
            !cleanPath.endsWith('.jpg') &&
            !cleanPath.endsWith('.png') &&
            !visitedUrls.has(cleanPath) &&
            !crawlQueue.includes(cleanPath)
          ) {
            crawlQueue.push(cleanPath);
          }
        }
      }
    });

    // 2. Find images from <img> tag
    $('img').each((_, elem) => {
      const src = $(elem).attr('src');
      if (src) mediaUrls.add(src);
      
      const dataSrc = $(elem).attr('data-src') || $(elem).attr('data-lazy-src');
      if (dataSrc) mediaUrls.add(dataSrc);

      const srcset = $(elem).attr('srcset') || $(elem).attr('data-srcset');
      if (srcset) {
        srcset.split(',').forEach(part => {
          const u = part.trim().split(' ')[0];
          if (u) mediaUrls.add(u);
        });
      }
    });

    // 3. Find background images from style attributes
    $('[style]').each((_, elem) => {
      const style = $(elem).attr('style');
      const bgMatch = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (bgMatch && bgMatch[1]) {
        mediaUrls.add(bgMatch[1]);
      }
    });

    // 4. Find videos/sources
    $('video, source, track').each((_, elem) => {
      const src = $(elem).attr('src');
      if (src) mediaUrls.add(src);
    });

    // 5. Find background videos or video links in parameters
    $('iframe').each((_, elem) => {
      const src = $(elem).attr('src');
      if (src && (src.includes('.mp4') || src.includes('.webm'))) {
        mediaUrls.add(src);
      }
    });

  } catch (err) {
    console.error(`[Crawl Page Error] ${pageUrl}: ${err.message}`);
  }
}

// Main execution block
async function main() {
  while (crawlQueue.length > 0) {
    const nextPath = crawlQueue.shift();
    if (!visitedUrls.has(nextPath)) {
      visitedUrls.add(nextPath);
      await crawlPage(nextPath);
    }
  }

  console.log(`\nDiscovered ${mediaUrls.size} media assets. Downloading...`);
  const urls = Array.from(mediaUrls);
  
  // Download with simple concurrency limit
  const batchSize = 10;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`\n--- Downloading Batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(urls.length / batchSize)} ---`);
    await Promise.all(batch.map(url => downloadFile(url)));
  }

  console.log('\n=== Media Crawl and Download Complete! ===');
}

main().catch(console.error);
