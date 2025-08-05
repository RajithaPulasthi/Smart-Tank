export interface FishProfile {
    id: string;
    name: string;
    image: string;
    scientificName: string;
    ph: number;
    hardness: number;
    temperature: number;
    maxLengthCm: number;
    feedingHabits: string;
    reproduction: string;
    temperament: string;
  }
  
  export const fishProfiles: FishProfile[] = [
    {
      id: "angel-fish",
      name: "Angel Fish",
      image: "https://intanaquariumfeeds.com/cdn/shop/articles/3d-colorful-fish-with-dark-background_23-2150721042.jpg?v=1715687210",
      scientificName: "Pterophyllum scalare",
      ph: 7,
      hardness: 8,
      temperature: 26,
      maxLengthCm: 15,
      feedingHabits: "Dry, packed foods",
      reproduction: "Egg layer",
      temperament: "Peaceful community species",
    },
    {
      id: "neon-tetra",
      name: "Neon Tetra",
      image: "https://coburgaquarium.com.au/cdn/shop/products/NeonTetra_1200x1000px.jpg?v=1668659269",
      scientificName: "Paracheirodon innesi",
      ph: 6.5,
      hardness: 4,
      temperature: 24,
      maxLengthCm: 4,
      feedingHabits: "Flake food, micro pellets",
      reproduction: "Egg scatterer",
      temperament: "Peaceful schooling fish",
    },
    {
      id: "guppy",
      name: "Guppy",
      image: "https://cdn.britannica.com/02/117202-004-526214C9.jpg",
      scientificName: "Poecilia reticulata",
      ph: 7.2,
      hardness: 9,
      temperature: 25,
      maxLengthCm: 6,
      feedingHabits: "Flakes, brine shrimp",
      reproduction: "Livebearer",
      temperament: "Peaceful, active",
    },
    {
      id: "betta-fish",
      name: "Betta Fish",
      image: "https://splashyfishstore.com/cdn/shop/articles/beta-4701894_640.jpg?v=1695600858",
      scientificName: "Betta splendens",
      ph: 7,
      hardness: 5,
      temperature: 27,
      maxLengthCm: 7,
      feedingHabits: "Pellets, frozen bloodworms",
      reproduction: "Bubble nest builder",
      temperament: "Aggressive (males), solitary",
    },
    {
      id: "zebra-danio",
      name: "Zebra Danio",
      image: "https://www.aquariumcoop.com/cdn/shop/articles/zebra_danio.jpg?v=1697139307",
      scientificName: "Danio rerio",
      ph: 7,
      hardness: 8,
      temperature: 23,
      maxLengthCm: 5,
      feedingHabits: "Flakes, daphnia",
      reproduction: "Egg scatterer",
      temperament: "Hardy, peaceful",
    },
    {
      id: "corydoras-catfish",
      name: "Corydoras Catfish",
      image: "https://cdn.shopify.com/s/files/1/0311/3149/files/corydoras_sterbai.jpg?v=1605035087",
      scientificName: "Corydoras aeneus",
      ph: 7,
      hardness: 6,
      temperature: 24,
      maxLengthCm: 6,
      feedingHabits: "Sinking pellets, bloodworms",
      reproduction: "Egg layer",
      temperament: "Bottom-dweller, peaceful",
    },
  ];
  