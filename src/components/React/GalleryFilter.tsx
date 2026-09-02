import React, { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'fleet' | 'weddings' | 'airport' | 'events';
  image: string;
}

const base = '/cbm-assets/deluxe-limousine/gallery';

const items: GalleryItem[] = [
  // Fleet
  { id: 1, title: 'Black Chrysler 300', category: 'fleet', image: `${base}/black-chrysler-300-new-background.png` },
  { id: 2, title: 'Black Chrysler Limousine', category: 'fleet', image: `${base}/black-chrysler-limousine.jpg` },
  { id: 3, title: 'Black Party Bus', category: 'fleet', image: `${base}/black-party-bus.webp` },
  { id: 4, title: 'White Chrysler 300 Stretch', category: 'fleet', image: `${base}/white-chrysler-300-stretch-limo.png` },
  { id: 5, title: 'White Chrysler Stretch', category: 'fleet', image: `${base}/white-chrysler-300-stretch.png` },
  { id: 6, title: 'White Party Bus', category: 'fleet', image: `${base}/white-party-bus.webp` },
  { id: 7, title: 'Deluxe Lincoln MKT', category: 'fleet', image: `${base}/deluxe-lincoln-mkt.png` },
  { id: 8, title: 'MKT Stretch Limousine', category: 'fleet', image: `${base}/mkt-stretch-limousine.png` },
  { id: 9, title: 'Mercedes Sprinter', category: 'fleet', image: `${base}/mercedes-spritner.jpg` },
  { id: 10, title: 'Full Fleet Lineup', category: 'fleet', image: `${base}/limo-fleet.png` },
  { id: 11, title: 'Limousine Interior', category: 'fleet', image: `${base}/limousine-interior.jpg` },
  { id: 12, title: 'Party Bus Interior', category: 'fleet', image: `${base}/party-bus-interior.webp` },
  { id: 13, title: 'White Chrysler Interior', category: 'fleet', image: `${base}/white-chrysler-300-interior.jpg` },
  { id: 14, title: 'Storefront', category: 'fleet', image: `${base}/storefront-photo.jpg` },
  // Weddings
  { id: 15, title: 'Wedding Arrival', category: 'weddings', image: `${base}/wedding-arrival-deluxe-yelp.jpg` },
  { id: 16, title: 'Golden Hour Wedding', category: 'weddings', image: `${base}/golden-hour.png` },
  { id: 17, title: 'Red Carpet Welcome', category: 'weddings', image: `${base}/red-carpet-walk-deluxe.jpg` },
  { id: 18, title: 'Red Carpet Invitation', category: 'weddings', image: `${base}/red-carpet-invitation-deluxe-yelp.jpg` },
  { id: 19, title: 'Rose Interior', category: 'weddings', image: `${base}/rose-interior-deluxe-yelp.jpg` },
  { id: 20, title: 'Pristine Interior', category: 'weddings', image: `${base}/pristine-interior-deluxeyelp.jpg` },
  { id: 21, title: 'Quinceanera Arrival', category: 'weddings', image: `${base}/quinceanera-arrival-deluxe-yelp.jpg` },
  { id: 22, title: 'Quinceanera Family', category: 'weddings', image: `${base}/quinceanera-family-deluxeyelp.jpg` },
  // Airport
  { id: 23, title: 'Airport SUV Service', category: 'airport', image: `${base}/blackcar-suv-airport-service.jpg` },
  // Events
  { id: 24, title: 'Birthday Queen', category: 'events', image: `${base}/birthday-queen-deluxe-yelp.jpg` },
  { id: 25, title: 'Concert Pregame', category: 'events', image: `${base}/concert-pregame-deluxe.jpg` },
  { id: 26, title: 'Girls Night Out', category: 'events', image: `${base}/girls-night-deluxe.jpg` },
  { id: 27, title: 'Limo Selfie', category: 'events', image: `${base}/limo-selfie-deluxe.jpg` },
  { id: 28, title: 'Night Pickup', category: 'events', image: `${base}/night-pickup-deluxe-yelp.jpg` },
  { id: 29, title: 'Prom Night', category: 'events', image: `${base}/prom-night-deluxe.jpg` },
  { id: 30, title: 'Homecoming', category: 'events', image: `${base}/homecoming.png` },
  { id: 31, title: 'Homecoming 2', category: 'events', image: `${base}/homecoming-2.png` },
  { id: 32, title: 'Homecoming 3', category: 'events', image: `${base}/homecoming-3.png` },
];

const categories = [
  { value: 'all', label: 'All Images' },
  { value: 'fleet', label: 'Our Fleet' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'airport', label: 'Airports' },
  { value: 'events', label: 'Special Events' },
] as const;

const categoryLabels: Record<string, string> = {
  fleet: 'Our Fleet',
  weddings: 'Weddings',
  airport: 'Airports',
  events: 'Special Events',
};

export default function GalleryFilter() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer border ${
              activeCategory === cat.value
                ? 'bg-gold text-black border-gold shadow-[0_8px_25px_rgba(212,175,55,0.25)]'
                : 'bg-transparent text-white/70 border-line hover:border-gold hover:text-gold'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden border border-line bg-ink-raised">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-block px-3 py-1 rounded-full bg-gold text-black text-[0.65rem] font-bold uppercase tracking-[0.08em] mb-2">
                  {categoryLabels[item.category] ?? item.category}
                </span>
                <h4 className="text-white text-base font-semibold m-0">{item.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
