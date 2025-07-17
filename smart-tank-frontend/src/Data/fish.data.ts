import AngelFish from "../assets/fish/angel-fish.jpg";

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
      image: AngelFish,
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
      image: "../assets/fish/neon-tetra.jpg",
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
      image: "../assets/fish/guppy.jpg",
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
      image: "../assets/fish/betta.jpg",
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
      image: "../assets/fish/zebra-danio.jpg",
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
      image: "../assets/fish/corydoras.jpg",
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
  