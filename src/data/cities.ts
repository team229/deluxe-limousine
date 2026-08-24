export interface CityData {
  slug: string;
  name: string;
  county: string;
  tagline: string;
  venues: string[];
  description: string;
  airports: string;
}

export const citiesList: CityData[] = [
  {
    slug: "anaheim",
    name: "Anaheim",
    county: "Orange County",
    tagline: " Anaheim's Premier Limousine & Executive Transport Service",
    venues: ["Anaheim Convention Center", "Disneyland Resort Hotels", "The Grove of Anaheim", "House of Blues Anaheim"],
    description: "Serving the bustling hub of Anaheim, from convention attendees and Disney vacationers to local wedding venues. We provide on-time, premium travel solutions.",
    airports: "15 miles to SNA, 30 miles to LAX, 20 miles to LGB"
  },
  {
    slug: "irvine",
    name: "Irvine",
    county: "Orange County",
    tagline: "Elite Executive Travel & Black Car Services in Irvine",
    venues: ["Irvine Spectrum Center", "Marriott Irvine Spectrum", "Oak Creek Golf Club", "Shady Canyon Country Club"],
    description: "Irvine's leading corporations and residential communities trust Deluxe Limousine for premium black car service, SNA airport transfers, and corporate shuttles.",
    airports: "5 miles to SNA, 45 miles to LAX, 30 miles to LGB"
  },
  {
    slug: "newport-beach",
    name: "Newport Beach",
    county: "Orange County",
    tagline: "Luxury Yacht-Side Limo Rentals in Newport Beach",
    venues: ["The Resort at Pelican Hill", "Balboa Bay Resort", "Newport Beach Country Club", "Fashion Island Hotels"],
    description: "Arrive in style at the coast. Serving Newport Beach with elegant wedding cars, yacht transfer shuttles, and luxury airport transportation.",
    airports: "8 miles to SNA, 45 miles to LAX, 28 miles to LGB"
  },
  {
    slug: "huntington-beach",
    name: "Huntington Beach",
    county: "Orange County",
    tagline: "Surf City's Choice for Stretch Limos & Party Buses",
    venues: ["The Waterfront Beach Resort", "Hyatt Regency Huntington Beach", "SeaCliff Country Club"],
    description: "Enjoy Huntington Beach without worrying about traffic or beach parking. Perfect for beach weddings, resort transfers, and nightlife shuttle runs.",
    airports: "14 miles to SNA, 38 miles to LAX, 18 miles to LGB"
  },
  {
    slug: "santa-ana",
    name: "Santa Ana",
    county: "Orange County",
    tagline: "Reliable Civic and Airport Car Service in Santa Ana",
    venues: ["Bowers Museum", "The Ebell Club Santa Ana", "Historic Downtown Venues"],
    description: "Providing professional executive transport, court-house shuttles, and SNA John Wayne Airport transfers for Santa Ana residents and businesses.",
    airports: "4 miles to SNA, 40 miles to LAX, 25 miles to LGB"
  },
  {
    slug: "costa-mesa",
    name: "Costa Mesa",
    county: "Orange County",
    tagline: "First-Class Theater & Arts Transfers in Costa Mesa",
    venues: ["Segerstrom Center for the Arts", "South Coast Plaza", "The Westin South Coast Plaza"],
    description: "Serving Costa Mesa's thriving arts district, shopping centers, and business hubs with immaculate black cars and stretch limos.",
    airports: "5 miles to SNA, 41 miles to LAX, 24 miles to LGB"
  },
  {
    slug: "long-beach",
    name: "Long Beach",
    county: "Los Angeles County",
    tagline: "Premium Harbor & Airport Limousine Service in Long Beach",
    venues: ["Long Beach Convention Center", "The Queen Mary", "Aquarium of the Pacific", "Hyatt Regency Long Beach"],
    description: "Connecting Long Beach harbor travelers, cruisers, and business travelers to LAX and local destinations with seamless, reliable black cars.",
    airports: "25 miles to SNA, 20 miles to LAX, 5 miles to LGB"
  },
  {
    slug: "fullerton",
    name: "Fullerton",
    county: "Orange County",
    tagline: "Fullerton's Choice for Proms, Weddings & Nights Out",
    venues: ["Fullerton Arboretum", "Summit House Restaurant", "Muckenthaler Cultural Center"],
    description: "Trusted by Fullerton families for safe prom transportation, elegant wedding travel, and hassle-free nights out in Downtown Fullerton.",
    airports: "18 miles to SNA, 30 miles to LAX, 18 miles to LGB"
  },
  {
    slug: "orange",
    name: "Orange",
    county: "Orange County",
    tagline: "Elegant Limo Hire in the Historic City of Orange",
    venues: ["The Villa Orange", "Chapman University Campus", "Orange Hill Restaurant"],
    description: "Providing local transport solutions around Old Towne Orange, Chapman University events, and beautiful foothill wedding venues.",
    airports: "10 miles to SNA, 38 miles to LAX, 22 miles to LGB"
  },
  {
    slug: "brea",
    name: "Brea",
    county: "Orange County",
    tagline: "Corporate Executive Shuttles & Event Limos in Brea",
    venues: ["Brea Improv", "Coyote Hills Golf Course", "Brea Mall Commercial Hub"],
    description: "Serving North Orange County with premium airport runs, commercial shuttles, and special event stretch limo hires.",
    airports: "20 miles to SNA, 35 miles to LAX, 25 miles to LGB"
  },
  {
    slug: "buena-park",
    name: "Buena Park",
    county: "Orange County",
    tagline: "Fun and Entertainment Limo Rides in Buena Park",
    venues: ["Knott's Berry Farm Resort", "Medieval Times", "Pirate's Dinner Adventure"],
    description: "Plan a memorable family outing or birthday party in Buena Park. We provide safe, spacious transport for kids and adults alike.",
    airports: "18 miles to SNA, 28 miles to LAX, 15 miles to LGB"
  },
  {
    slug: "laguna-beach",
    name: "Laguna Beach",
    county: "Orange County",
    tagline: "Stunning Ocean-View Limo Service in Laguna Beach",
    venues: ["Montage Laguna Beach", "Surf & Sand Resort", "The Ranch at Laguna Beach"],
    description: "For art festivals, scenic beach weddings, and elite coastal retreats, travel in ultimate luxury with Deluxe Limousine.",
    airports: "15 miles to SNA, 52 miles to LAX, 35 miles to LGB"
  },
  {
    slug: "yorba-linda",
    name: "Yorba Linda",
    county: "Orange County",
    tagline: "Premium Residential & Event Limousines in Yorba Linda",
    venues: ["Richard Nixon Presidential Library", "Black Gold Golf Club"],
    description: "Serving the community of Yorba Linda with classic wedding cars, library event shuttles, and regular airport black car runs.",
    airports: "18 miles to SNA, 42 miles to LAX, 28 miles to LGB"
  },
  {
    slug: "temecula",
    name: "Riverside County",
    tagline: "Temecula Valley Wine Country Limo Tours",
    venues: ["Ponte Winery", "South Coast Winery Resort", "Wilson Creek Winery"],
    description: "Plan the perfect wine tasting tour. Let our professional chauffeurs navigate the wineries while you relax in our luxury sprinters and stretch limos.",
    airports: "55 miles to SNA, 90 miles to LAX, 68 miles to LGB"
  },
  {
    slug: "santa-monica",
    name: "Santa Monica",
    county: "Los Angeles County",
    tagline: "Elite Beachside Black Car & Limo Hires in Santa Monica",
    venues: ["Shutters on the beach", "The Fairmont Miramar", "Santa Monica Pier"],
    description: "Serving Santa Monica businesses and tourists with premium airport transfers to LAX and luxury coastal transportation.",
    airports: "42 miles to SNA, 8 miles to LAX, 20 miles to LGB"
  }
];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return citiesList.find(c => c.slug === slug);
};

export const cities = citiesList;

