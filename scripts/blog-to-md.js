import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const EXTRACTED_DIR = path.join(WORKSPACE_DIR, 'src', 'data', 'extracted');
const OUT_DIR = path.join(WORKSPACE_DIR, 'src', 'content', 'blog');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Publish dates from the reference site's post-sitemap.xml
const DATES = {
  'beyond-the-rideshare-whats-driving-orange-countys-shift-toward-limousine-travel': '2026-07-15',
  'why-more-anaheim-locals-are-skipping-rideshares-for-a-proper-limousine-ride': '2026-07-15',
  'the-honest-guide-to-finding-a-reliable-limousine-service-in-anaheim': '2026-06-14',
  'black-car-service-to-lax-from-anaheim': '2026-06-12',
  'elementor-2756': '2022-09-19',
  'elementor-2767': '2022-09-19',
  'hummer-limo': '2022-09-19',
  'hello-world': '2022-06-03',
};

function mdEscape(s) {
  return s.replace(/\n{2,}/g, '\n\n').trim();
}

function sectionsToMarkdown(sections) {
  let out = '';
  for (const sec of sections) {
    // background video/image hero -> note as image if present
    if (sec.bgImage && sec.images.length === 0) {
      out += `![Hero image](${sec.bgImage})\n\n`;
    }
    for (const h of sec.headings) {
      const level = h.level === 'H1' ? '##' : h.level === 'H2' ? '##' : h.level === 'H3' ? '###' : '####';
      out += `${level} ${h.text}\n\n`;
    }
    for (const img of sec.images) {
      out += `![${img.alt || 'Deluxe Limousine Service'}](${img.src})\n\n`;
    }
    for (const p of sec.paragraphs) {
      out += `${mdEscape(p)}\n\n`;
    }
    for (const list of sec.lists) {
      for (const item of list.items) {
        out += `${list.ordered ? '1.' : '-'} ${item}\n`;
      }
      out += '\n';
    }
    for (const f of sec.faqs) {
      out += `### ${f.q}\n\n${f.a}\n\n`;
    }
    // CTA buttons -> styled links paragraph
    if (sec.buttons.length > 0) {
      const links = sec.buttons
        .map((b) => {
          const href = b.href.startsWith('tel:') ? 'tel:7143139173' : b.href.replace('https://deluxelimousineservice.com', '');
          return `[${b.label}](${href})`;
        })
        .join(' | ');
      out += `${links}\n\n`;
    }
  }
  return out.trim() + '\n';
}

const files = fs.readdirSync(EXTRACTED_DIR).filter((f) => f.startsWith('blog__') && f.endsWith('.json'));
let count = 0;
for (const file of files) {
  const slug = file.replace(/^blog__/, '').replace(/\.json$/, '');
  const data = JSON.parse(fs.readFileSync(path.join(EXTRACTED_DIR, file), 'utf8'));

  const blockCount = data.sections.reduce(
    (n, s) => n + s.headings.length + s.paragraphs.length + s.images.length,
    0
  );
  if (blockCount === 0) {
    console.log(`[Skip] ${slug}: no content`);
    continue;
  }

  const title = (data.postTitle || data.title || slug).replace(/\s*\|\s*Deluxe Limousine Service.*$/, '').replace(/Header Preview.*$/, '').trim();
  const description = (data.description || '').trim() || title;
  const date = data.postDate?.slice(0, 10) || DATES[slug] || '2022-01-01';
  const featuredImage = data.sections.flatMap((s) => s.images).find((i) => i)?.src || undefined;

  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: ${date}`,
    `description: ${JSON.stringify(description)}`,
  ];
  if (featuredImage) fm.push(`featuredImage: ${JSON.stringify(featuredImage)}`);
  if (data.author) fm.push(`author: ${JSON.stringify(data.author)}`);
  fm.push('---');

  const md = fm.join('\n') + '\n\n' + sectionsToMarkdown(data.sections);

  fs.writeFileSync(path.join(OUT_DIR, slug + '.md'), md);
  console.log(`[OK] ${slug}.md (${md.length} bytes)`);
  count++;
}
console.log(`\nGenerated ${count} blog posts in ${OUT_DIR}`);
