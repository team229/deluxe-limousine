interface Faq { q: string; a: string }
interface Column { title: string; items: string[] }
interface Stats { num: string; label: string }
export interface ServicePage {
  slug: string;
  heroTitle: string;
  heroWord: string;            // middle word highlighted in gold, e.g. "Limo"
  heroBreadcrumb: string;      // breadcrumb trail e.g. "HOME / SPRINTER LIMO"
  heroSubtitle?: string;
  heroBg: string;
  heroIntro: string[];
  stats?: Stats[];
  heading: string;              // "Our Full Fleet"
  intro?: string;
  proseTitle?: string;          // content-section title e.g. "Mercedes Sprinter Limo Service Anaheim"
  proseSubheading?: string;
  proseIntro?: string[];        // body paragraphs of content-section
  servicesHeading?: string;
  services?: string[];
  highlight?: { title: string; text: string; image: string };
  columns: Column[];
  airports?: string[];
  faqs: Faq[];
  ctaTitle?: string;
  ctaText?: string;
}

const defaultStats: Stats[] = [
  { num: '15+', label: 'Years Experience' },
  { num: '7', label: 'Vehicle Types' },
  { num: '24/7', label: 'Availability' },
  { num: '5★', label: 'Customer Rating' },
];

const defaultColumns: Column[] = [
  { title: 'Sprinter Limo Features', items: ['Spacious seating for up to 14 passengers', 'Premium leather interior', 'Air conditioning throughout', 'Flat screen TV', 'Premium sound system', 'Ample luggage space', 'Professional chauffeur', 'Privacy tinted windows', 'Climate control zones', 'Complimentary bottled water'] },
  { title: 'Ideal For', items: ['Airport transfers', 'Corporate travel', 'Wedding parties', 'Winery tours', 'Group outings', 'Family reunions', 'Sporting events', 'Concert transportation', 'Conference shuttles', 'Night on the town'] },
];

const defaultAirports = ['SNA', 'LGB', 'LAX', 'ONT'];

const sprinterFaqs: Faq[] = [
  { q: 'How many passengers can the Sprinter Limo accommodate?', a: 'Our Mercedes Sprinter Limo comfortably seats up to 14 passengers, making it the perfect choice for medium-sized groups.' },
  { q: 'What features are included in the Sprinter Limo?', a: 'The Sprinter Limo comes with premium leather seating, climate control, flat-screen TV, premium sound system, and ample luggage space.' },
  { q: 'Do you offer airport transportation with the Sprinter Limo?', a: 'Yes, we provide reliable airport transportation to and from all major airports including LAX, John Wayne (SNA), Long Beach (LGB), and Ontario (ONT).' },
  { q: 'Is the Sprinter Limo a good choice for weddings?', a: 'Absolutely. The Sprinter Limo is ideal for wedding parties and shuttles, offering spacious seating and elegant presentation for the bridal party.' },
  { q: 'How much does a Sprinter Limo rental cost?', a: 'Pricing depends on the number of hours and the day of the week. Call us at (714) 313-9173 for a transparent, all-inclusive quote.' },
  { q: 'Can I use the Sprinter Limo for corporate events?', a: 'Yes, the Sprinter Limo is a favorite for corporate travel, conference shuttles, and executive roadshows with its professional, comfortable interior.' },
  { q: 'How far in advance should I book the Sprinter Limo?', a: 'We recommend booking at least 48 hours in advance, though same-day availability may be possible for off-peak dates. Call us to check.' },
];

export const servicePages: Record<string, ServicePage> = {
  'sprinter-limo': {
    slug: 'sprinter-limo',
    heroTitle: 'Sprinter Limo Service Anaheim',
    heroWord: 'Limo',
    heroBreadcrumb: 'HOME / SPRINTER LIMO',
    heroSubtitle: 'Mercedes Sprinter Limousine',
    heroBg: '/images/2026/07/cities-2.png',
    heroIntro: [
      'Trust Deluxe Limousine Service, your top Anaheim limo company, for a magical ride to and from Disneyland Hotel. Our professional drivers ensure comfort and satisfaction. For larger groups, choose our 10 Passenger Sprinter Limo. Experience luxury and style with timely arrivals.',
      'Book our Mercedes Sprinter Limo for an unforgettable travel experience. We cover weddings, funerals, parties, corporate events, and Quinceañeras. Count on us for reliable and memorable rides.',
    ],
    stats: defaultStats,
    heading: 'Our Full Fleet',
    intro: 'From the Black Chrysler 300 to the Party Bus, find the perfect vehicle for your event.',
    proseTitle: 'Mercedes Sprinter Limo Service Anaheim',
    proseSubheading: 'Sprinter Limousine Service',
    proseIntro: [
      'Are you looking for a Sprinter Van Limo, well we got the perfect vehicle for your airport and corporate travel. Our Mercedes Sprinter is very comfortable and spacious. Deluxe Limousine Service offers Sprinter Limo Rental in Anaheim and Orange County with the added comfort and luxury.',
      'Whether you need a Limousine for a special event, a night out, or to visit one of your favorite attractions, we have the best vehicle for you. Our spacious and luxurious Sprinter is perfect for Weddings, Airport Transportation, Corporate Events, Wine Tasting, Party Bus, Birthday, Prom, Quinceañera, and more — offering the flexibility and style you expect from a premium luxury vehicle.',
      'Deluxe Limousine Service offers outstanding service while offering affordable prices. In addition, our fleet of luxury vehicles are clean, comfortable and are suitable for any special occasion.',
    ],
    servicesHeading: 'Sprinter Limo Services',
    services: ['Complete Luxury Transportation for any event', 'Airport Transportation', 'Corporate Transportation', 'Executive Transportation', 'Prom Transportation', 'Homecoming Transportation', 'Concert Transportation', 'Sporting Event Transportation', 'Birthday Transportation', 'Bachelor Party Transportation', 'Bachelorette Party Transportation', 'Graduation Transportation', 'Anniversary Transportation', 'Quinceañera Transportation', 'Sweet 16 Transportation', 'Group Transportation', 'Night Out Transportation', 'Luxury Resort Transportation', 'Special Event Transportation', 'Winery & Brewery Tours'],
    highlight: { title: 'Spacious Luxury for Your Group', text: 'Our Mercedes Sprinter Limo combines premium comfort with generous space. Perfectly designed for groups who want to travel together in style, with leather seating, climate control, and premium entertainment throughout.', image: '/images/2026/07/cities-6.png' },
    columns: defaultColumns,
    airports: defaultAirports,
    faqs: sprinterFaqs,
    ctaTitle: 'Experience the Ultimate Luxury & Comfort',
    ctaText: 'Contact us today to book your Sprinter Limo. Our professional team is standing by to help you plan the perfect ride.',
  },

  'black-car-service': {
    slug: 'black-car-service',
    heroTitle: 'Executive SUV & Black Car Service',
    heroWord: 'Black Car',
    heroSubtitle: 'Private Luxury Transportation',
    heroBg: '/cbm-assets/deluxe-limousine/black-car-service.jpeg',
    heroIntro: [
      'We offer Luxury SUV Service, Black Car Service, Executive Car Service, Sprinter Limo, Party Bus, Hummer Limo, and Stretch Limo. Experience the ease of executive luxury transportation.',
    ],
    heading: 'Our Full Fleet',
    intro: 'From the Black Chrysler 300 to the Party Bus, choose the perfect vehicle for you.',
    servicesHeading: 'Executive SUV & Black Car Services',
    services: ['Airport Transportation', 'Corporate Transportation', 'Executive Transportation', 'Prom Transportation', 'Homecoming Transportation', 'Concert Transportation', 'Sporting Event Transportation', 'Birthday Transportation', 'Bachelor Party Transportation', 'Bachelorette Party Transportation', 'Graduation Transportation', 'Anniversary Transportation', 'Quinceañera Transportation', 'Sweet 16 Transportation', 'Group Transportation', 'Night Out Transportation', 'Luxury Resort Transportation', 'Special Event Transportation', 'Winery & Brewery Tours', 'Business Meeting Transportation'],
    columns: [
      { title: 'Black Car Service Features', items: ['Executive Black Vehicles', 'Professional Chauffeurs', 'Airport Transfers', 'Late-Model Fleet', 'Privacy Partition', 'Complimentary Refreshments', 'Luggage Assistance', 'Point-to-Point Transfers', 'Meet & Greet Service', '24/7 Availability'] },
      { title: 'Areas We Serve', items: ['Anaheim', 'Los Angeles', 'Irvine', 'San Diego', 'John Wayne Airport (SNA)', 'Long Beach', 'Los Angeles (LAX)', 'Newport Beach', 'Temecula', 'Palm Springs'] },
    ],
    faqs: sprinterFaqs.map((f) => ({ q: f.q.replace('Sprinter Limo', 'Black Car'), a: f.a.replace('Mercedes Sprinter Limo', 'Executive Black Car') })),
  },

  'hummer-limo-service': {
    slug: 'hummer-limo-service',
    heroTitle: 'Hummer Limo Service Anaheim',
    heroWord: 'Limo',
    heroSubtitle: 'Extended Hummer Limousine',
    heroBg: '/cbm-assets/deluxe-limousine/hummer-limo.jpeg',
    heroIntro: [
      'Extended Hummer Limo Service Anaheim is one of our most popular limos. It is perfect for proms because of the large spacious interior, premium sound system, and party atmosphere.',
    ],
    heading: 'Our Full Fleet',
    intro: 'From the Black Chrysler 300 to the Party Bus, choose the perfect vehicle for you.',
    servicesHeading: 'Hummer Limo Services',
    services: ['Airport Transportation', 'Corporate Transportation', 'Executive Transportation', 'Prom Transportation', 'Homecoming Transportation', 'Concert Transportation', 'Sporting Event Transportation', 'Birthday Transportation', 'Bachelor Party Transportation', 'Bachelorette Party Transportation', 'Graduation Transportation', 'Anniversary Transportation', 'Quinceañera Transportation', 'Sweet 16 Transportation', 'Group Transportation', 'Night Out Transportation', 'Luxury Resort Transportation', 'Special Event Transportation', 'Winery & Brewery Tours', 'City Tours'],
    columns: [
      { title: 'Hummer Limo Features', items: ['Seating for up to 20 passengers', 'Neon mood lighting', 'Premium sound system', 'Flat-screen TVs', 'Wet bar area', 'Dance pole', 'Leather seating', 'Privacy partition', 'Climate control', 'Ice buckets & glassware'] },
      { title: 'Perfect Occasions', items: ['Prom night', 'Quinceañera', 'Birthday parties', 'Bachelor parties', 'Bachelorette parties', 'Concert transportation', 'Night on the town', 'Wedding parties', 'Graduation', 'Group celebrations'] },
    ],
    faqs: sprinterFaqs.map((f) => ({ q: f.q.replace('Sprinter Limo', 'Hummer Limo'), a: f.a.replace('Mercedes Sprinter Limo', 'Extended Hummer Limo') })),
  },

  'party-bus-rental': {
    slug: 'party-bus-rental',
    heroTitle: 'Party Bus Rental Anaheim, OC',
    heroWord: 'Bus',
    heroSubtitle: 'The Ultimate Party Experience',
    heroBg: '/images/2026/07/cities-3.png',
    heroIntro: [
      'Party bus rental is the most requested limo in our fleet. Built on the history of being an ultimate entertainment limousine, our party buses bring the nightlife to you.',
    ],
    heading: 'Our Full Fleet',
    intro: 'From the Black Chrysler 300 to the Party Bus, choose the perfect vehicle for you.',
    servicesHeading: 'Party Bus Services',
    services: ['Airport Transportation', 'Corporate Transportation', 'Prom Transportation', 'Concert Transportation', 'Sporting Event Transportation', 'Birthday Transportation', 'Bachelor Party Transportation', 'Bachelorette Party Transportation', 'Graduation Transportation', 'Anniversary Transportation', 'Quinceañera Transportation', 'Sweet 16 Transportation', 'Group Transportation', 'Night Out Transportation', 'Luxury Resort Transportation', 'Special Event Transportation', 'Winery & Brewery Tours', 'Wedding Parties', 'City Tours', 'Tailgating Events'],
    columns: [
      { title: 'Party Bus Amenities', items: ['Seating for up to 30 passengers', 'Dance floor & pole', 'Club lighting systems', 'Dual smart TVs', 'Wet bar & ice wells', 'Premium surround sound', 'Leather lounge seating', 'USB charging ports', 'Climatic control', 'Cooler compartments'] },
      { title: 'Perfect for Any Event', items: ['Bachelor party', 'Bachelorette party', 'Wedding parties', 'Birthday celebrations', 'Concert night', 'Prom & homecoming', 'Quinceañera', 'Tailgating', 'Night out', 'City tours'] },
    ],
    faqs: sprinterFaqs.map((f) => ({ q: f.q.replace('Sprinter Limo', 'Party Bus'), a: f.a.replace('Mercedes Sprinter Limo', 'Party Bus') })),
  },

  'limo-service-orange-county': {
    slug: 'limo-service-orange-county',
    heroTitle: 'Chrysler 300 Limo Service Orange County',
    heroWord: 'Limo',
    heroSubtitle: 'Modern Luxury Limousine',
    heroBg: '/images/2026/05/Chrsyler-Limousine-.png',
    heroIntro: [
      'Our Chrysler 300 limo service in Orange County is one of our most popular choices for elegant transportation. With seating for up to 10 passengers, it is perfect for weddings, nights out, and corporate events.',
    ],
    heading: 'Our Full Fleet',
    intro: 'From the Black Chrysler 300 to the Party Bus, choose the perfect vehicle for you.',
    servicesHeading: 'Chrysler 300 Limo Services',
    services: ['Airport Transportation', 'Corporate Transportation', 'Wedding Transportation', 'Prom Transportation', 'Homecoming Transportation', 'Concert Transportation', 'Sporting Event Transportation', 'Birthday Transportation', 'Bachelor Party Transportation', 'Bachelorette Party Transportation', 'Graduation Transportation', 'Anniversary Transportation', 'Quinceañera Transportation', 'Sweet 16 Transportation', 'Group Transportation', 'Night Out Transportation', 'Luxury Resort Transportation', 'Special Event Transportation', 'Winery & Brewery Tours', 'Date Night'],
    columns: [
      { title: 'Chrysler 300 Limo Features', items: ['Seating for up to 10 passengers', 'Lamborghini-style doors', 'LED fiber optic lighting', 'Premium sound system', 'Leather seating', 'Mini bar area', 'Privacy partition', 'Bluetooth audio', 'Ice chests', 'Complimentary refreshments'] },
      { title: 'Perfect Occasions', items: ['Weddings', 'Prom night', 'Anniversary', 'Birthday', 'Corporate events', 'Bachelor party', 'Bachelorette party', 'Night out', 'Airport transfers', 'Wine tours'] },
    ],
    faqs: sprinterFaqs.map((f) => ({ q: f.q.replace('Sprinter Limo', 'Chrysler 300'), a: f.a.replace('Mercedes Sprinter Limo', 'Chrysler 300 Limo') })),
  },
};
