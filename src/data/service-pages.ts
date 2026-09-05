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
  hideFleet?: boolean;
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
      'Are you looking for a Sprinter Van Limo, well we got the perfect vehicle for your airport and [corporate event limo service](/corporates-event-limo-service/) travel. Our Mercedes Sprinter is very comfortable and spacious. Deluxe Limousine Service offers [Sprinter Limo Rental in Anaheim](/anaheim/sprinter-limo-service/) and Orange County with the added comfort and luxury.',
      'Whether you need a [Limousine for a special event](/orange/limousine-service/), a night out, or to visit one of your favorite attractions, we have the best vehicle for you. Our spacious and luxurious Sprinter is perfect for Weddings, Airport Transportation, Corporate Events, Wine Tasting, Party Bus, Birthday, Prom, Quinceañera, and more — offering the flexibility and style you expect from a premium luxury vehicle.',
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
      'We offer Luxury SUV Service, Black Car Service, Executive Car Service, Sprinter Limo, Party Bus, Hummer Limo, and Stretch Limo. Experience the ease of executive luxury transportation. For meetings and conferences, our [corporate limo service Orange County](/orange/corporate-limo-service/) and [corporate event limo service](/corporates-event-limo-service/) keep executives on schedule, while [Santa Ana limo service](/santa-ana/limo-service/) covers every SNA and LAX transfer.',
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
    heroBg: '/cbm-assets/deluxe-limousine/hummer-limo-hero.png',
    heroIntro: [
      '[Extended Hummer Limo Service in Anaheim](/anaheim/hummer-limo-service/) is one of our most popular limos. It is perfect for proms because of the large spacious interior, premium sound system, and party atmosphere.',
      'Renting a [Hummer Limo in Orange County](/orange/hummer-limo-rental/) or a [party bus in Anaheim](/anaheim/party-bus-rental/) takes any celebration to the next level.',
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
      '[Party bus rental](/anaheim/party-bus-rental/) is the most requested limo in our fleet. Built on the history of being an ultimate entertainment limousine, our party buses bring the nightlife to you.',
      'Groups planning a [bachelor party limo rental in Anaheim](/anaheim/bachelor-party-limo-rental/) or a [Hummer limo service near Anaheim](/anaheim/hummer-limo-service/) love our high-capacity buses.',
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
      'Our Chrysler 300 [limo service in Orange County](/orange/limousine-service/) is one of our most popular choices for elegant transportation. With seating for up to 10 passengers, it is perfect for [wedding limo service in Orange County](/orange/wedding-limo-service/), nights out, and [corporate events](/orange/corporate-limo-service/).',
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

  'parties': {
    slug: 'parties',
    heroTitle: 'Party Limo Service Orange County',
    heroWord: 'Party',
    heroSubtitle: 'Celebrate Every Occasion in Style',
    heroBg: '/cbm-assets/deluxe-limousine/homepage/occasions-bachelor-bachelorette.jpeg',
    hideFleet: true,
    heroIntro: [
      'From milestone celebrations to spontaneous nights out, Deluxe Limousine Service turns every party into an unforgettable experience. Gather your friends, bring the playlist, and let our professional chauffeurs handle the rest — you focus on the fun.',
      'Whether it is a house party transfer, a nightclub crawl through Downtown Anaheim, or a private venue celebration, our party-ready fleet ensures your group travels together, safely, and in luxury. Fully licensed, bonded, and available 24/7.',
    ],
    stats: defaultStats,
    heading: 'Our Full Fleet',
    intro: 'From the Party Bus to the Hummer Limo, find the perfect ride for your party.',
    proseTitle: 'Party Limo Service for Every Celebration',
    proseSubheading: 'Party Transportation',
    proseIntro: [
      'Planning a party is about creating memories — not worrying about parking, designated drivers, or coordinating multiple rideshares. Our Party Limo Service is designed to keep your group together from the first pickup to the final drop-off.',
      'Choose from our luxury Party Buses, [Hummer Stretch Limos](/orange/hummer-limo-rental/), and [Sprinter Vans](/anaheim/sprinter-limo-service/) — each equipped with premium sound, club-style lighting, leather lounge seating, and chilled refreshments. Every vehicle is professionally cleaned and inspected before every trip.',
      'We serve birthday parties, [bachelor and bachelorette parties](/orange/bachelorette-party-bus/), holiday gatherings, reunion parties, and more across Anaheim, Irvine, Newport Beach, and all of Orange County. Custom decorations and themed lighting are available upon request.',
    ],
    servicesHeading: 'Party Services We Offer',
    services: ['Birthday Party Transportation', 'Bachelor Party Transportation', 'Bachelorette Party Transportation', 'Holiday Party Transfers', 'House Party Shuttle Service', 'Nightclub & Bar Crawls', 'Concert Party Buses', 'Sporting Event Parties', 'Graduation Parties', 'Anniversary Parties', 'Quinceañera & Sweet 16', 'Retirement Parties', 'Reunion Transportation', 'Private Venue Parties', 'Themed Party Transfers', 'Group Night Out', 'Wine & Brewery Party Tours', 'Corporate Parties', 'Pool Parties', 'Karaoke Night Transfers'],
    highlight: { title: 'The Party Starts When You Step Inside', text: 'Our Party Buses feature high-output sound, laser light shows, flat-screen TVs, leather wrap-around seating, and built-in bars — a private nightclub on wheels. Your chauffeur handles routing, parking, and safety so everyone can celebrate together.', image: '/cbm-assets/deluxe-limousine/homepage/party-bus-7.webp' },
    columns: [
      { title: 'Party Fleet Features', items: ['Seating for up to 30 passengers', 'High-end audio with Bluetooth', 'Laser & LED club lighting', 'Flat-screen TVs', 'Leather lounge seating', 'Built-in bar with ice & glassware', 'Dance floor & pole (select buses)', 'Privacy partitions', 'Climate control', 'USB charging ports'] },
      { title: 'Perfect for Any Party', items: ['Birthdays & milestones', 'Bachelor & bachelorette', 'Holiday parties', 'Nightclub crawls', 'Concert & sports pre-games', 'House parties', 'Retirement celebrations', 'Graduation parties', 'Anniversary parties', 'Group night out'] },
    ],
    airports: defaultAirports,
    faqs: [
      { q: 'How far in advance should I book a party limo?', a: 'We recommend booking 2 to 4 weeks in advance for weekends, especially during prom and holiday seasons. Same-day bookings may be available — call (714) 313-9173 to check.' },
      { q: 'Can we bring our own drinks and decorations?', a: 'Yes, guests 21+ may bring alcoholic beverages. You are welcome to bring light decorations, balloons, and themed props — just avoid anything that damages the interior. We can also provide decorations on request.' },
      { q: 'How many passengers can the party bus hold?', a: 'Our party buses accommodate 20 to 30 passengers, while Hummer limos seat 14 to 16 and Sprinters seat up to 14. Tell us your group size and we will recommend the perfect vehicle.' },
      { q: 'Do you offer round-trip and multi-stop party routes?', a: 'Absolutely. Most party bookings are multi-stop: dinner, venue, bar, and return. We plan the most efficient route and wait curbside between stops — you never need to find a new ride.' },
      { q: 'What is included in the party package?', a: 'Every party rental includes a professional chauffeur, chilled sodas and water, ice and glassware, premium sound and lighting, and complimentary red carpet on request.' },
      { q: 'Is there a minimum rental time for parties?', a: 'Most party bookings have a 3 to 4 hour minimum to ensure the vehicle stays dedicated to your group for the full celebration. Hourly extensions are available.' },
    ],
    ctaTitle: 'Ready to Party in Style?',
    ctaText: 'Gather your crew and let Deluxe Limousine Service handle the ride. Book your party limo today for a safe, stylish, and unforgettable celebration.',
  },

  'birthdays': {
    slug: 'birthdays',
    heroTitle: 'Birthday Limo Service Orange County',
    heroWord: 'Birthday',
    heroSubtitle: 'Make Every Birthday Unforgettable',
    heroBg: '/cbm-assets/deluxe-limousine/homepage/occasions-prom.jpeg',
    hideFleet: true,
    heroIntro: [
      'Birthdays deserve more than a dinner reservation — they deserve a celebration on wheels. Deluxe Limousine Service makes birthdays of every age special, from sweet 16s to milestone 50ths and beyond, with luxury vehicles, red carpet service, and professional chauffeurs.',
      'Whether it is a surprise birthday party, a wine tour with friends, or a family gathering at Disneyland, we provide safe, stylish, and punctual transportation across Anaheim and Orange County. Custom birthday decorations are complimentary. Larger birthday crews can also book a [Hummer Limo in Orange County](/orange/hummer-limo-rental/) or a [limousine service in Anaheim](/anaheim/limousine-service/).',
    ],
    stats: defaultStats,
    heading: 'Our Full Fleet',
    intro: 'From the Chrysler 300 to the Party Bus, choose the perfect birthday ride.',
    proseTitle: 'Birthday Limo Service for All Ages',
    proseSubheading: 'Birthday Transportation',
    proseIntro: [
      'A birthday only comes once a year — make it count. Our Birthday Limo Service brings the celebration to the road with party-ready vehicles, personalized decorations, and a chauffeur who ensures everything runs smoothly.',
      'From intimate rides for two to [party buses in Anaheim](/anaheim/party-bus-rental/) for 30, we have the perfect vehicle for your guest list. Our stretch limos, SUVs, and Sprinters are fully air-conditioned, immaculately detailed, and stocked with refreshments. Add birthday banners, balloons, and themed lighting at no extra charge.',
      'We handle birthday transfers to restaurants, venues, theme parks, wineries, nightclubs, and surprise party locations throughout Orange County. Parents booking for teens can rely on our strict safety policies and real-time dispatch updates.',
    ],
    servicesHeading: 'Birthday Services We Offer',
    services: ['Kids Birthday Party Transfers', 'Sweet 16 Limo Service', '18th Birthday Parties', '21st Birthday Limo & Party Bus', 'Milestone Birthday Parties (30th, 40th, 50th)', 'Surprise Birthday Parties', 'Birthday Dinner Transfers', 'Birthday Wine & Brewery Tours', 'Theme Park Birthday Trips', 'Birthday Bar & Nightclub Crawls', 'Family Birthday Gatherings', 'Birthday Concert Transfers', 'Birthday Sporting Event Rides', 'Quinceañera Birthdays', 'Birthday Shopping Trips', 'Birthday Photography Tours', 'Group Birthday Parties', 'Private Birthday Venues', 'Hotel Birthday Transfers', 'Custom Birthday Packages'],
    highlight: { title: 'Custom Birthday Decorations on Us', text: 'Every birthday booking includes complimentary setup: birthday banners, balloons, LED lighting in your party colors, and a red carpet rollout for photo-perfect entrances. Tell us the theme and we will style the vehicle to match.', image: '/cbm-assets/deluxe-limousine/homepage/black-chrysler-stretch-limo-2.webp' },
    columns: [
      { title: 'Birthday Fleet Features', items: ['Seating for 6 to 30 passengers', 'Complimentary birthday decorations', 'Red carpet entrance', 'Premium sound with Bluetooth', 'LED mood lighting', 'Leather seating & mini bar', 'Ice, sodas, and bottled water', 'Privacy partition', 'Climate control', 'Professional chauffeur'] },
      { title: 'Perfect for Every Birthday', items: ['Sweet 16 & Quinceañera', '21st birthday bar crawls', 'Milestone birthdays (30, 40, 50, 60)', 'Kids birthday parties', 'Surprise parties', 'Wine tasting birthdays', 'Theme park birthdays', 'Concert & sports birthdays', 'Family birthday dinners', 'Night out birthdays'] },
    ],
    airports: defaultAirports,
    faqs: [
      { q: 'Can you decorate the limo for a birthday party?', a: 'Yes! We provide complimentary birthday decorations including banners, balloons, and themed LED lighting. Let us know the birthday person\'s favorite colors and we will customize the interior.' },
      { q: 'Is the birthday limo service safe for teenage birthdays?', a: 'Absolutely. Our chauffeurs are background-checked and enforce a strict no-alcohol policy for passengers under 21. Parents receive real-time updates and the vehicle stays dedicated to the group.' },
      { q: 'How far in advance should I book a birthday limo?', a: 'For weekend birthdays, book 2 to 3 weeks ahead. For popular dates and holidays, earlier is better — call (714) 313-9173 to check same-day availability.' },
      { q: 'What is the minimum rental time for birthdays?', a: 'Most birthday bookings are 3 to 4 hours minimum. We offer flexible hourly extensions so your celebration can run as long as you need.' },
      { q: 'Can you handle surprise birthday logistics?', a: 'Yes, we specialize in surprise parties. We coordinate discreet pickups and timing directly with the organizer so the birthday guest is genuinely surprised.' },
      { q: 'Do you offer birthday party packages with multiple vehicles?', a: 'Yes, for large birthday gatherings we can deploy multiple vehicles with synchronized routing — perfect for extended family and friend groups.' },
    ],
    ctaTitle: 'Make Their Birthday Unforgettable',
    ctaText: 'Book a birthday limo today and give the guest of honor a celebration they will never forget. Our dispatch team is standing by to plan the perfect ride.',
  },

  'airport-rides': {
    slug: 'airport-rides',
    heroTitle: 'Airport Rides Orange County & LAX',
    heroWord: 'Airport',
    heroSubtitle: 'Stress-Free Airport Transportation',
    heroBg: '/images/2026/07/Car-image.png',
    hideFleet: true,
    heroIntro: [
      'Skip the shuttle queues, surge pricing, and parking headaches. Deluxe Limousine Service provides punctual, comfortable, and reliable airport rides to and from LAX, John Wayne (SNA), Long Beach (LGB), Ontario (ONT), and San Diego (SAN).',
      'Our professional chauffeurs track your flight in real time, assist with luggage, and ensure you arrive relaxed — whether you are catching an early morning flight or landing late at night. Fixed, transparent pricing with no hidden fees. From [limousine service in Anaheim](/anaheim/limousine-service/) to [Santa Ana limo service](/santa-ana/limo-service/), we cover every Orange County airport transfer.',
    ],
    stats: defaultStats,
    heading: 'Our Full Fleet',
    intro: 'From the Executive SUV to the Sprinter Van, travel to the airport in comfort.',
    proseTitle: 'Airport Ride Service You Can Count On',
    proseSubheading: 'Airport Transportation',
    proseIntro: [
      'Airport travel should be the easiest part of your trip. Our Airport Ride service eliminates the stress of navigating Orange County freeways, airport parking structures, and unpredictable traffic — your chauffeur handles it all.',
      'We offer curbside pickup, meet-and-greet service inside the terminal with a name sign, luggage assistance, and flight tracking that automatically adjusts for delays or early arrivals. Every vehicle is late-model, climate-controlled, and equipped with phone chargers and bottled water.',
      'Serving leisure travelers, corporate executives, and families from Anaheim, Irvine, Newport Beach, and beyond. Available 24/7, including holidays and red-eyes. Corporate accounts with monthly invoicing are available. We also provide [corporate limo service in Orange County](/orange/corporate-limo-service/) for executive travel.',
    ],
    servicesHeading: 'Airport Services We Offer',
    services: ['LAX Airport Transfers', 'John Wayne Airport (SNA) Transfers', 'Long Beach Airport (LGB) Transfers', 'Ontario Airport (ONT) Transfers', 'San Diego Airport (SAN) Transfers', 'Curbside Pickup & Drop-off', 'Meet-and-Greet Service', 'Flight Tracking & Delay Adjustments', 'Luggage Assistance', 'Corporate Airport Rides', 'Group Airport Shuttles', 'Executive Airport Transfers', 'Family Airport Transportation', 'International Flight Pickups', 'Early Morning & Red-Eye Flights', 'One-Way & Round-Trip Airport Rides', 'Hotel to Airport Transfers', 'Cruise Port Transfers', 'Private Airport Charters', 'Fixed-Rate Airport Pricing'],
    highlight: { title: 'Flight Tracking Included — Always', text: 'We monitor your flight status in real time. Delayed, early, or on time — your chauffeur adjusts automatically. Text updates keep you informed from wheels-down to curbside pickup. No extra charge, no stress.', image: '/cbm-assets/deluxe-limousine/black-car-service.jpeg' },
    columns: [
      { title: 'Airport Ride Features', items: ['Real-time flight tracking', 'Curbside or meet-and-greet options', 'Luggage loading and unloading', 'Late-model luxury SUVs & sedans', 'Phone chargers & bottled water', 'Tinted privacy windows', 'Fixed, transparent pricing', 'Professional, suited chauffeurs', 'Airport permits for curbside access', '24/7 availability including holidays'] },
      { title: 'Airports We Serve', items: ['LAX — Los Angeles International', 'SNA — John Wayne (Orange County)', 'LGB — Long Beach Airport', 'ONT — Ontario International', 'SAN — San Diego International', 'BUR — Hollywood Burbank', 'PSP — Palm Springs International', 'SJC — San Jose (charters)', 'SAN — Cruise port transfers', 'Private jet terminals (FBO)'] },
    ],
    airports: defaultAirports,
    faqs: [
      { q: 'How do I know my driver will be there if my flight is delayed?', a: 'We track your flight number in real time. Your reservation is automatically adjusted for delays, and your chauffeur will be waiting when you land — no extra fee for waiting due to airline delays.' },
      { q: 'Where does my driver meet me at the airport?', a: 'For curbside, your driver texts you upon landing and meets you outside baggage claim. For meet-and-greet, your driver waits inside the terminal with a name sign and escorts you to the vehicle.' },
      { q: 'What is the cost of an airport ride to LAX?', a: 'Airport ride pricing is fixed and all-inclusive — no surge, no meter. Rates depend on distance and vehicle type. Call (714) 313-9173 for an instant quote.' },
      { q: 'Can you handle large groups and luggage for airport transfers?', a: 'Yes, our Sprinter Vans and Party Buses accommodate 14 to 30 passengers with ample luggage space — perfect for family trips, teams, and corporate groups.' },
      { q: 'Do you offer early morning and late-night airport rides?', a: 'We operate 24/7, including 3 AM departures and midnight arrivals. Book any time — our dispatch is always staffed.' },
      { q: 'Do you provide airport rides outside Orange County?', a: 'Yes, we serve all of Orange County plus Los Angeles, Riverside, and San Bernardino counties. Long-distance charters to any Southern California airport are available.' },
    ],
    ctaTitle: 'Your Flight Is Tracked — Your Ride Is Ready',
    ctaText: 'Book your next airport ride with Deluxe Limousine Service and experience punctual, stress-free transfers. Call now for a fixed-rate quote.',
  },
};
