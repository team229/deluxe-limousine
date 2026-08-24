export interface PageData {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  tagline: string;
  introduction: string;
  features: string[];
  detailsHtml: string;
  faqs: { question: string; answer: string }[];
}

export const servicesList: PageData[] = [
  {
    slug: "sprinter-limo",
    title: "Mercedes Sprinter Limo Service",
    subtitle: "Premium group transportation in Southern California",
    metaTitle: "Mercedes Sprinter Limo Rental Anaheim & Orange County | Deluxe",
    metaDescription: "Rent a luxury Mercedes Sprinter Limo in Orange County and Anaheim. Premium sound, stand-up headroom, and custom seating for 10-14 passengers. Get a free quote.",
    heroImage: "https://deluxelimousineservice.com/wp-content/uploads/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4-2.png",
    tagline: "The Modern standard for group travel.",
    introduction: "Our Mercedes Sprinter Limos are the perfect solution for medium-sized groups who want to travel together without compromising on luxury. Featuring spacious headroom, state-of-the-art audio and video, and premium wrap-around leather seating, it feels like a private lounge on wheels.",
    features: [
      "Stand-Up Headroom: No more crouching or squeezing in.",
      "Custom Seating: Comfortable wrap-around leather seating for up to 14 guests.",
      "Entertainment Hub: Multiple LED screens, Bluetooth audio, and custom lighting.",
      "Professional Chauffeur: Trained, background-checked, and highly knowledgeable driver."
    ],
    detailsHtml: `
      <p>Whether you are planning a corporate outing, a wine tasting tour in Temecula, or need a wedding party shuttle, our Sprinter Limousine gets you there in absolute comfort and style. Skip the stress of hailing multiple rideshares and coordinate your group travel seamlessly.</p>
      <p>Every Sprinter in our fleet is maintained to the highest safety and cleanliness standards. Chilled sodas, bottled water, and ice are provided with every rental. Occasion decorations are available upon request.</p>
    `,
    faqs: [
      { question: "How many passengers can fit in the Sprinter Limo?", answer: "Our Mercedes Benz Sprinters can comfortably accommodate up to 14 passengers with luggage space." },
      { question: "Does the Sprinter Limo have a bar?", answer: "Yes, our Sprinters feature a fully integrated bar area stocked with ice, cups, bottled water, and sodas." }
    ]
  },
  {
    slug: "black-car-service",
    title: "Executive Black Car Service",
    subtitle: "Chauffeured town cars and SUVs for corporate & personal travel",
    metaTitle: "Executive Black Car Service Orange County | Deluxe Limousine",
    metaDescription: "Reliable, professional, and discreet black car service in Anaheim, Irvine, and Orange County. Perfect for corporate travel, SNA, and LAX airport transfers.",
    heroImage: "https://deluxelimousineservice.com/wp-content/uploads/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4.png",
    tagline: "Reliable. Professional. Discreet.",
    introduction: "For business travel, airport transfers, or personal trips where punctuality and discretion are paramount, our Executive Black Car Service is the gold standard. Travel in quiet comfort in our late-model luxury SUVs and sedans.",
    features: [
      "24/7 Dispatch & Support: We monitor flights and adjust pickups in real-time.",
      "Discreet & Quiet: Late-model SUVs with tinted glass for ultimate privacy.",
      "Professional Chauffeurs: Suited drivers who respect your time and agenda.",
      "Airport Permits: Direct curbside pickup at LAX, SNA, LGB, and SAN."
    ],
    detailsHtml: `
      <p>Arrive relaxed and ready for your meetings or flight. Our black car service eliminates the hassle of navigating Southern California's unpredictable freeways or dealing with airport parking lots.</p>
      <p>We serve major corporations, executives, and discerning travelers throughout Irvine, Anaheim, Newport Beach, and surrounding cities. WiFi and phone chargers are available in every vehicle.</p>
    `,
    faqs: [
      { question: "Do you monitor flight delays for airport pickups?", answer: "Yes, we track all flights in real-time. If your flight is delayed or lands early, your chauffeur will be adjusted accordingly." },
      { question: "Can I book a recurring corporate ride?", answer: "Yes! We offer corporate accounts for businesses looking for regular, reliable executive travel with monthly invoicing." }
    ]
  },
  {
    slug: "party-bus-rental",
    title: "Luxury Party Bus Rental",
    subtitle: "A private nightclub on wheels for up to 30 passengers",
    metaTitle: "Party Bus Rental Anaheim & Orange County | Deluxe Limousine",
    metaDescription: "Book the ultimate Party Bus in Anaheim and Orange County. Features laser light shows, premium sound, dual bars, and room for 20-30 guests. Get your quote today.",
    heroImage: "https://deluxelimousineservice.com/wp-content/uploads/2022/09/Deluxe-Limousine-Service-adds-1-6.png",
    tagline: "Keep the party moving.",
    introduction: "Our Luxury Party Buses are designed to bring the nightclub experience directly to the road. Featuring high-output sound systems, club-style LED lighting, flat-screen TVs, and built-in bars, it is the ultimate way to celebrate with a large group.",
    features: [
      "Lounge Seating: Wrap-around leather sofas with plenty of room to mingle.",
      "Club Lighting: Laser shows, neon accents, and synchronized fiber optics.",
      "Pro Sound System: High-end audio with Bluetooth connectivity so you control the playlist.",
      "Dual Bar Stations: Stocked with ice, crystal glassware, water, and sodas."
    ],
    detailsHtml: `
      <p>Perfect for bachelor and bachelorette parties, concert transfers, sporting events, and large prom groups. Our party buses ensure your group stays together, stays safe, and enjoys the journey as much as the destination.</p>
      <p>Your professional chauffeur handles all routing, parking, and designated driver duties, letting you focus entirely on having fun with your guests.</p>
    `,
    faqs: [
      { question: "Can we bring our own drinks on the party bus?", answer: "Yes, passengers over 21 years of age are welcome to bring alcoholic beverages. Glass bottles should be handled with care." },
      { question: "Is there a restroom on the party bus?", answer: "Some of our larger buses have restroom facilities, while others do not. Please request a restroom-equipped bus at the time of booking if required." }
    ]
  },
  {
    slug: "airport-transportation-service",
    title: "Airport Limo & Transfer Service",
    subtitle: "Punctual, stress-free airport rides to LAX, SNA, and LGB",
    metaTitle: "Airport Limo Service Orange County & LAX | Deluxe Limousine",
    metaDescription: "Book a luxury limo or black car for airport transfers to LAX, SNA (John Wayne), and Long Beach Airport. Reliable, on-time pickups with flight tracking.",
    heroImage: "https://deluxelimousineservice.com/wp-content/uploads/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4.png",
    tagline: "Arrive on time, every time.",
    introduction: "Traveling can be stressful, but getting to and from the airport doesn't have to be. Our Airport Transfer Service offers curbside pickups, luggage assistance, and flight tracking to ensure a smooth, worry-free connection.",
    features: [
      "Real-Time Flight Tracking: We adjust to any flight schedule shifts.",
      "Curbside or Meet-and-Greet: Choose your preferred level of service.",
      "Luggage Assistance: Chauffeurs handle all loading and unloading.",
      "All Regional Airports Covered: Serving LAX, SNA, LGB, SAN, and ONT."
    ],
    detailsHtml: `
      <p>Whether you're returning home from a business trip or jetting off on vacation, start and end your journey on a high note. Our professional chauffeurs navigate the optimal routes, avoiding traffic bottlenecks to ensure you arrive at your gate relaxed.</p>
      <p>Skip the shuttle queues and rideshare surge pricing. Benefit from our fixed, transparent pricing models for airport transfers.</p>
    `,
    faqs: [
      { question: "Where will my driver meet me at the airport?", answer: "For curbside pickup, your driver will text you when you land and coordinate a meeting point outside the baggage claim. For Meet-and-Greet, your driver will stand inside the terminal with a name sign." },
      { question: "What happens if my flight is delayed late at night?", answer: "No worries! We track flights 24/7. Your reservation is automatically adjusted, and a driver will be waiting for you regardless of the hour." }
    ]
  },
  {
    slug: "hummer-limo-service",
    title: "Hummer & SUV Stretch Limo Rental",
    subtitle: "Bold styling and spacious luxury for major occasions",
    metaTitle: "Hummer Limo Service Anaheim & Orange County | Deluxe Limousine",
    metaDescription: "Make a statement with a Hummer Limo rental in Orange County and Anaheim. Perfect for proms, bachelor parties, and birthdays. Call for special offers.",
    heroImage: "https://deluxelimousineservice.com/wp-content/uploads/2022/09/Deluxe-Limousine-Service-adds-hummer-1-3-1.png",
    tagline: "Bold style. Maximum impact.",
    introduction: "Nothing makes an impression like our Hummer and SUV Stretch Limousines. Built for groups who want to stand out, these massive luxury vehicles offer incredible interior volume, custom entertainment stations, and spectacular lighting arrangements.",
    features: [
      "Rugged and Stylish: Instantly recognizable exterior that commands attention.",
      "Custom Bar & Ice Wells: Stocked with refreshments and glassware.",
      "Laser & Neon Shows: Immersive lighting that adapts to your occasion.",
      "Premium Comfort: Plush leather seating for up to 10-14 passengers."
    ],
    detailsHtml: `
      <p>The Hummer limo is the go-to choice for proms, quinceañeras, birthdays, and wild nights out with friends. From the moment the doors lift, you enter a private lounge designed entirely for your entertainment.</p>
      <p>Equipped with subwoofers, custom speaker enclosures, and multiple TV monitors, your ride becomes an active part of the celebration.</p>
    `,
    faqs: [
      { question: "Is the Hummer Limo suitable for wedding transfers?", answer: "Absolutely! The Hummer limo is highly popular for wedding parties, providing ample room for wedding gowns and group photo sessions." },
      { question: "What is included with the Hummer limo rental?", answer: "Rental includes a professional chauffeur, chilled sodas, water, ice, and custom occasion decorations if requested." }
    ]
  },
  {
    slug: "wedding",
    title: "Wedding Limousine Service",
    subtitle: "Elegant transportation for your special day",
    metaTitle: "Wedding Limo Service Orange County & Anaheim | Deluxe",
    metaDescription: "Elegant wedding limo rentals in Orange County. Red carpet service, luxury stretch limos, and professional chauffeurs for your perfect wedding day.",
    heroImage: "https://deluxelimousineservice.com/wp-content/uploads/2022/09/Deluxe-Limousine-Service-adds-1-6-1-1.png",
    tagline: "Your perfect day deserve a perfect ride.",
    introduction: "On your wedding day, every detail matters. Our Wedding Limousine Service ensures that you, your wedding party, and your guests arrive in classic elegance, on time, and completely relaxed.",
    features: [
      "VIP Red Carpet Rollout: A classic touch for stunning photo opportunities.",
      "Just Married Decals & Decor: Styled to match your wedding color scheme.",
      "Complimentary Champagne Toast: Celebrate your first moments as newlyweds.",
      "Coordinated Multi-Car Bookings: Move the bride, groom, and wedding party together."
    ],
    detailsHtml: `
      <p>We work closely with wedding planners and couples to coordinate timelines down to the minute. Our immaculate white and black stretch limousines offer the perfect backdrop for photos that you will cherish forever.</p>
      <p>From the hotel to the ceremony, and on to the reception, our professional chauffeurs provide a calm, courteous, and highly reliable service so you can focus on making memories.</p>
    `,
    faqs: [
      { question: "How far in advance should I book my wedding limo?", answer: "We recommend booking 3 to 6 months in advance, especially for spring and summer wedding dates which fill up quickly." },
      { question: "Do you offer guest transportation?", answer: "Yes! We can arrange Mercedes Sprinter vans and shuttle buses to transfer wedding guests between hotels, ceremonies, and reception venues safely." }
    ]
  },
  {
    slug: "prom",
    title: "Prom & Homecoming Limo Service",
    subtitle: "Safe, exciting, and unforgettable arrivals for students",
    metaTitle: "Prom Limo Rental Anaheim & Orange County | Deluxe Limousine",
    metaDescription: "Rent a prom limo or party bus in Orange County. Safe, reliable chauffeurs and exciting stretch limos. Lock in your free hour for prom bookings.",
    heroImage: "https://deluxelimousineservice.com/wp-content/uploads/2022/09/Deluxe-Limousine-Service-adds-hummer-1-3-1.png",
    tagline: "Arrive in style. Return home safely.",
    introduction: "Prom is one of the most anticipated nights of high school. Our Prom Limo Service offers students an unforgettable VIP arrival experience while providing parents with complete peace of mind.",
    features: [
      "Safety First Policy: Professional, background-checked chauffeurs who enforce strict safety rules.",
      "Premium Sound & Media: Let the students play their own music via Bluetooth.",
      "Split Booking Options: Coordinate pickups and dropoffs for the entire group.",
      "Stunning Fleet: Choose between Hummer limos, Sprinters, or classic stretches."
    ],
    detailsHtml: `
      <p>Make a grand entrance with your friends. Our limousines and party buses are equipped with incredible light shows and sound systems to kickstart the celebration on the way to the venue.</p>
      <p>Parents can rest easy knowing that we hold a strict zero-tolerance policy for underage drinking or smoking, ensuring a safe, supervised, and reliable environment.</p>
    `,
    faqs: [
      { question: "Are parents allowed to ride along?", answer: "Yes, parents are welcome to ride along, or we can coordinate pick-up and drop-off notifications for your peace of mind." },
      { question: "Can we book a limo for just drop-off and pick-up?", answer: "Most prom bookings require a minimum hourly block to secure the vehicle for the evening, ensuring it remains dedicated to your group." }
    ]
  }
];

export const getPageBySlug = (slug: string): PageData | undefined => {
  return servicesList.find(s => s.slug === slug);
};
