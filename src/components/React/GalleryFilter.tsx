import React, { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'fleet' | 'weddings' | 'airport' | 'events';
  image: string;
}

const items: GalleryItem[] = [
  { id: 1, title: 'SUV Stretch Hummer Limousine', category: 'fleet', image: '/cbm-assets/deluxe-limousine/hummer-limo.jpeg' },
  { id: 2, title: 'Lincoln MKT Stretch Limo', category: 'fleet', image: '/images/2022/09/Deluxe-Limousine-Service-adds-1-6-1-1.png' },
  { id: 3, title: 'Executive Mercedes Sprinter', category: 'fleet', image: '/images/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4-2.png' },
  { id: 4, title: 'Lincoln MKT Town Car Detail', category: 'fleet', image: '/images/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4.png' },
  { id: 5, title: 'Classic Wedding Rollout', category: 'weddings', image: '/images/2022/09/Deluxe-Limousine-Service-adds-1-6.png' },
  { id: 6, title: 'Coastal Tour Shuttle', category: 'events', image: '/images/2026/07/Whats-Driving-Orange-Countys-Shift-Toward-Limousine-Travel.webp' },
  { id: 7, title: 'LAX Terminal Shuttle Ride', category: 'airport', image: '/images/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4.png' },
  { id: 8, title: 'Wedding Reception Transfer', category: 'weddings', image: '/images/2022/09/Deluxe-Limousine-Service-adds-1-6-1-1.png' },
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
