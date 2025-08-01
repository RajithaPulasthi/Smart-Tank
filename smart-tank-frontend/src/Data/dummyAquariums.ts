// Dummy aquarium data for demo
export interface AquariumListItem {
  id: number;
  aquariumName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  businessRegNumber: string;
  address: string;
  province: string;
  postalCode: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
}

export interface AquariumShopInfo {
  id: number;
  aquariumName: string;
  about: string;
  shopEmail: string;
  contactNumber: string;
  shopAddress: string;
  openingHours: string;
  facebookUrl: string;
  instagramUrl: string;
  youTubeUrl: string;
  twitterUrl: string;
  aquariumId: number;
}

export const dummyAquariums: AquariumListItem[] = [
  {
    id: 1,
    aquariumName: "Blue Ocean Aquatics",
    firstName: "Michael",
    lastName: "Chen",
    email: "info@blueocean.lk",
    phoneNumber: "+94 11 234 5678",
    businessName: "Blue Ocean Aquatics (Pvt) Ltd",
    businessRegNumber: "PV 12345",
    address: "123 Marine Drive, Colombo 03",
    province: "Western",
    postalCode: "00300",
    status: "ACTIVE"
  },
  {
    id: 2,
    aquariumName: "Tropical Fish Paradise",
    firstName: "Sarah",
    lastName: "Fernando",
    email: "contact@tropicalfish.lk",
    phoneNumber: "+94 81 987 6543",
    businessName: "Tropical Fish Paradise",
    businessRegNumber: "BRC 67890",
    address: "456 Lake Road, Kandy",
    province: "Central",
    postalCode: "20000",
    status: "ACTIVE"
  },
  {
    id: 3,
    aquariumName: "Coral Reef Aquarium",
    firstName: "David",
    lastName: "Silva",
    email: "shop@coralreef.lk",
    phoneNumber: "+94 91 555 4321",
    businessName: "Coral Reef Aquarium Center",
    businessRegNumber: "PV 11111",
    address: "789 Galle Road, Galle",
    province: "Southern",
    postalCode: "80000",
    status: "ACTIVE"
  },
  {
    id: 4,
    aquariumName: "Freshwater World",
    firstName: "Priya",
    lastName: "Perera",
    email: "hello@freshwaterworld.lk",
    phoneNumber: "+94 37 777 8888",
    businessName: "Freshwater World (Pvt) Ltd",
    businessRegNumber: "PV 22222",
    address: "321 Main Street, Negombo",
    province: "Western",
    postalCode: "11500",
    status: "PENDING"
  },
  {
    id: 5,
    aquariumName: "Aqua Haven",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "info@aquahaven.lk",
    phoneNumber: "+94 65 333 2222",
    businessName: "Aqua Haven Aquarium Shop",
    businessRegNumber: "BRC 33333",
    address: "654 Hill Street, Kurunegala",
    province: "North Western",
    postalCode: "60000",
    status: "ACTIVE"
  }
];

export const dummyShopInfos: AquariumShopInfo[] = [
  {
    id: 1,
    aquariumName: "Blue Ocean Aquatics",
    about: "At Blue Ocean Aquatics, we bring the beauty of marine life to your home. Specializing in both freshwater and saltwater aquariums, we offer a wide variety of tropical fish, plants, and premium aquarium equipment. Our expert team provides personalized advice to help you create the perfect aquatic environment.",
    shopEmail: "info@blueocean.lk",
    contactNumber: "+94 11 234 5678",
    shopAddress: "123 Marine Drive, Colombo 03, Sri Lanka",
    openingHours: "Monday - Saturday: 9:00 AM - 7:00 PM, Sunday: 10:00 AM - 5:00 PM",
    facebookUrl: "https://facebook.com/BlueOceanAquatics",
    instagramUrl: "https://instagram.com/blueoceanaquatics",
    youTubeUrl: "https://youtube.com/BlueOceanAquatics",
    twitterUrl: "https://twitter.com/BlueOceanAqua",
    aquariumId: 1
  },
  {
    id: 2,
    aquariumName: "Tropical Fish Paradise",
    about: "Welcome to Tropical Fish Paradise, your premier destination for exotic tropical fish and aquarium supplies in Kandy. We pride ourselves on maintaining healthy, vibrant fish from around the world. Our knowledgeable staff helps both beginners and experienced aquarists create stunning underwater landscapes.",
    shopEmail: "contact@tropicalfish.lk",
    contactNumber: "+94 81 987 6543",
    shopAddress: "456 Lake Road, Kandy, Sri Lanka",
    openingHours: "Monday - Friday: 8:30 AM - 6:30 PM, Saturday: 9:00 AM - 8:00 PM, Sunday: Closed",
    facebookUrl: "https://facebook.com/TropicalFishParadise", 
    instagramUrl: "https://instagram.com/tropicalfishparadise",
    youTubeUrl: "",
    twitterUrl: "",
    aquariumId: 2
  },
  {
    id: 3,
    aquariumName: "Coral Reef Aquarium",
    about: "Coral Reef Aquarium Center is the South's leading aquarium specialist. We focus on marine aquariums and coral propagation, offering rare saltwater species and custom reef setups. Our facility includes a coral nursery and specialized quarantine systems to ensure the healthiest specimens.",
    shopEmail: "shop@coralreef.lk",
    contactNumber: "+94 91 555 4321",
    shopAddress: "789 Galle Road, Galle, Sri Lanka",
    openingHours: "Daily: 10:00 AM - 6:00 PM",
    facebookUrl: "https://facebook.com/CoralReefAquarium",
    instagramUrl: "https://instagram.com/coralreefaquarium",
    youTubeUrl: "https://youtube.com/CoralReefAquarium",
    twitterUrl: "https://twitter.com/CoralReefAqua",
    aquariumId: 3
  },
  {
    id: 4, 
    aquariumName: "Freshwater World",
    about: "Freshwater World specializes exclusively in freshwater aquarium setups. From peaceful community tanks to aggressive cichlid displays, we provide everything needed for freshwater success. Our plant section features live aquatic plants and complete CO2 systems for planted tank enthusiasts.",
    shopEmail: "hello@freshwaterworld.lk",
    contactNumber: "+94 37 777 8888",
    shopAddress: "321 Main Street, Negombo, Sri Lanka",
    openingHours: "Monday - Saturday: 9:00 AM - 6:00 PM, Sunday: 11:00 AM - 4:00 PM",
    facebookUrl: "https://facebook.com/FreshwaterWorld",
    instagramUrl: "https://instagram.com/freshwaterworld",
    youTubeUrl: "",
    twitterUrl: "",
    aquariumId: 4
  },
  {
    id: 5,
    aquariumName: "Aqua Haven",
    about: "Aqua Haven is your neighborhood aquarium store with a personal touch. We believe every aquarist deserves quality fish and reliable equipment at fair prices. Our small but carefully curated selection ensures every fish is healthy and every product is tested by our team.",
    shopEmail: "info@aquahaven.lk", 
    contactNumber: "+94 65 333 2222",
    shopAddress: "654 Hill Street, Kurunegala, Sri Lanka",
    openingHours: "Monday - Friday: 9:30 AM - 5:30 PM, Saturday: 10:00 AM - 7:00 PM, Sunday: Closed",
    facebookUrl: "https://facebook.com/AquaHaven",
    instagramUrl: "https://instagram.com/aquahaven",
    youTubeUrl: "",
    twitterUrl: "",
    aquariumId: 5
  }
];
