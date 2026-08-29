export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  image: string;
  tagline: string;
  description: string;
  link: string;
  amenities: string[];
}

export const fleetList: Vehicle[] = [
  {
    id: "suv-stretch",
    name: "SUV Stretch Limo",
    capacity: 10,
    image: "/cbm-assets/deluxe-limousine/hummer-limo.jpeg",
    tagline: "Unmatched Command & Style",
    description: "The ultimate presence on the road. Ideal for larger groups who want to make a bold entrance at weddings, proms, or VIP nights out. Custom bar, mood lighting, and leather seating.",
    link: "/hummer-limo-service",
    amenities: ["Up to 10 Passengers", "Neon Mood Lighting", "Mini Bar", "Premium Sound System", "Privacy Partition"]
  },
  {
    id: "lincoln-stretch",
    name: "Lincoln MKT Stretch Limo",
    capacity: 12,
    image: "/images/2022/09/Deluxe-Limousine-Service-adds-1-6-1-1.png",
    tagline: "The Classic Luxury Experience",
    description: "Elegant, sophisticated, and timeless. The standard of elegance for weddings, corporate executives, and wine tours in Southern California.",
    link: "/hummer-limo-service",
    amenities: ["Up to 12 Passengers", "Plush Leather Seating", "Chilled Drink Stations", "LCD Screens", "Climate Control"]
  },
  {
    id: "suburban-suv",
    name: "Suburban SUV",
    capacity: 6,
    image: "/images/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4.png",
    tagline: "Executive Travel & Discretion",
    description: "Perfect for airport runs to LAX, John Wayne (SNA), or corporate transport. Blends class-leading safety with executive-level comfort.",
    link: "/black-car-service",
    amenities: ["Up to 6 Passengers", "Luggage Space (6 Bags)", "Leather Captain Seats", "USB Charging Ports", "Tinted Windows"]
  },
  {
    id: "preferred-limo",
    name: "Preferred Chrysler Limo",
    capacity: 9,
    image: "/images/2022/09/Deluxe-Limousine-Service-adds-1-6.png",
    tagline: "Modern Elegance Redefined",
    description: "Features a modern aesthetic with Chrysler styling. A popular pick for bachelor/bachelorette parties and high-profile client transfers.",
    link: "/hummer-limo-service",
    amenities: ["Up to 9 Passengers", "Lamborghini Doors", "LED Fiber Optic Show", "Bluetooth Audio", "Ice Chests"]
  },
  {
    id: "mercedes-sprinter",
    name: "Mercedes Sprinter Limo",
    capacity: 14,
    image: "/images/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4-2.png",
    tagline: "Group Travel in First-Class",
    description: "Stand-up headroom, luxury seating, and advanced multimedia. Replaces cramped rideshares for wedding shuttles, corporate tours, and airport transfers.",
    link: "/sprinter-limo",
    amenities: ["Up to 14 Passengers", "Stand-Up Headroom", "Wrap-Around Seating", "Smart TV & Sound System", "Wi-Fi Ready"]
  },
  {
    id: "party-bus",
    name: "Luxury Party Bus",
    capacity: 30,
    image: "/images/2022/09/Deluxe-Limousine-Service-adds-1-6.png",
    tagline: "The Party Begins When You Step In",
    description: "A nightclub on wheels. High-output audio, light shows, dual TVs, and spacious lounge seating for up to 30 passengers. The premier choice for major events.",
    link: "/party-bus-rental",
    amenities: ["Up to 30 Passengers", "Dance Floor & Pole", "Club Lighting Systems", "Dual Smart TVs", "Wet Bar & Ice Wells"]
  }
];

