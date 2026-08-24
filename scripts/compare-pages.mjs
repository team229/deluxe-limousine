import fs from 'fs';
import path from 'path';

const distPages = new Set();
const walk = (d) =>
  fs.readdirSync(d).forEach((f) => {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') {
      let u = '/' + path.relative('dist', p).replaceAll('\\', '/').replace(/\/index\.html$/, '');
      if (u === '/index') u = '/';
      distPages.add(u);
    }
  });
walk('dist');

const ref = [
  '/', '/404-page/', '/about-us/', '/airport-transportation-service/', '/aliso-viejo/', '/anaheim/',
  '/anaheim/bachelor-party-limo-rental/', '/anaheim/bridal-limousine-rental/', '/anaheim/hummer-limo-service/',
  '/anaheim/limo-service/', '/anaheim/limousine-service/', '/anaheim/party-bus-rental/',
  '/anaheim/quinceanera-party-bus/', '/anaheim/shuttle-van-service/', '/anaheim/sprinter-limo-service/',
  '/anaheim/wedding-limo-service/', '/bachelor/', '/black-car-service/', '/blog/',
  '/blog/beyond-the-rideshare-whats-driving-orange-countys-shift-toward-limousine-travel/',
  '/blog/black-car-service-to-lax-from-anaheim/', '/blog/category/blog/', '/blog/category/uncategorized/',
  '/blog/elementor-2756/', '/blog/elementor-2767/', '/blog/hello-world/', '/blog/hummer-limo/',
  '/blog/the-honest-guide-to-finding-a-reliable-limousine-service-in-anaheim/',
  '/blog/why-more-anaheim-locals-are-skipping-rideshares-for-a-proper-limousine-ride/', '/brea/',
  '/buena-park/', '/cities/', '/concerts/', '/contact-us/', '/corporates-event-limo-service/', '/corporates/',
  '/costa-mesa/', '/cypress/', '/dana-point/', '/fullerton/', '/gallery/', '/garden-grove/',
  '/hummer-limo-service/', '/huntington-beach/', '/irvine/', '/la-habra/', '/la-palma/', '/laguna-beach/',
  '/laguna-niguel/', '/laguna-woods/', '/lake-forest/', '/limo-service-orange-county/', '/long-beach/',
  '/los-alamitos/', '/los-angeles/', '/luxury-car-service/', '/newport-beach/', '/orange/',
  '/orange/bachelorette-party-bus/', '/orange/corporate-limo-service/', '/orange/hummer-limo-rental/',
  '/orange/limousine-service/', '/orange/quinceanera-limo-rental/', '/orange/sprinter-limo-rental/',
  '/orange/wedding-limo-service/', '/orange/wedding-party-shuttle/', '/palos-verdes/', '/party-bus-rental/',
  '/placentia/', '/prom/', '/quinceanera/', '/rancho-santa-margarita/', '/san-clemente/',
  '/san-juan-capistrano/', '/santa-ana/', '/santa-ana/limo-service/', '/santa-monica/', '/seal-beach/',
  '/shuttle-van-service/', '/special-events-limo-service/', '/sprinter-limo-service/', '/sprinter-limo/',
  '/stanton/', '/temecula/', '/thank-you/', '/thousand-oaks/', '/tustin/', '/villa-park/', '/wedding/',
  '/westminster/', '/yorba-linda/',
];

const strip = (u) => u.replace(/\/+$/, '') || '/';
const built = new Set([...distPages].map(strip));
const missing = ref.filter((r) => !built.has(strip(r)));
const extra = [...built].filter((b) => !ref.some((r) => strip(r) === b));

console.log('Reference pages:', ref.length);
console.log('Built pages:', built.size);
console.log('\n=== MISSING PAGES (' + missing.length + ') ===');
missing.forEach((m) => console.log('  ' + m));
console.log('\n=== EXTRA pages in build (not in ref) ===');
extra.forEach((m) => console.log('  ' + m));
