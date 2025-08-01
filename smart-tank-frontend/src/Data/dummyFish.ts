// Dummy fish data for demo
export interface FishListItem {
  id: number;
  name: string;
  temp: number;
  ph: number;
  gh: number;
  kh: number;
  nitrate: number;
}

export interface ScientificClassification {
  domain: string | null;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
}

export interface FishDetails {
  name: string;
  binomial_Name: string;
  image_Url: string;
  scientific_Classification: ScientificClassification;
  temp?: number;
  ph?: number;
  gh?: number; 
  kh?: number;
  nitrate?: number;
}

export const dummyFishList: FishListItem[] = [
  {
    id: 1,
    name: "Neon Tetra",
    temp: 24,
    ph: 6.5,
    gh: 4,
    kh: 2,
    nitrate: 10
  },
  {
    id: 2,
    name: "Angelfish",
    temp: 26,
    ph: 7.0,
    gh: 8,
    kh: 4,
    nitrate: 20
  },
  {
    id: 3,
    name: "Guppy",
    temp: 25,
    ph: 7.2,
    gh: 10,
    kh: 6,
    nitrate: 15
  },
  {
    id: 4,
    name: "Betta Fish",
    temp: 26,
    ph: 6.8,
    gh: 6,
    kh: 3,
    nitrate: 10
  },
  {
    id: 5,
    name: "Goldfish",
    temp: 20,
    ph: 7.4,
    gh: 12,
    kh: 8,
    nitrate: 25
  },
  {
    id: 6,
    name: "Discus",
    temp: 28,
    ph: 6.2,
    gh: 3,
    kh: 1,
    nitrate: 5
  },
  {
    id: 7,
    name: "Cardinal Tetra",
    temp: 25,
    ph: 6.0,
    gh: 3,
    kh: 2,
    nitrate: 8
  },
  {
    id: 8,
    name: "Corydoras",
    temp: 24,
    ph: 6.8,
    gh: 6,
    kh: 4,
    nitrate: 15
  }
];

export const dummyFishDetails: FishDetails[] = [
  {
    name: "Neon Tetra",
    binomial_Name: "Paracheirodon innesi",
    image_Url: "https://coburgaquarium.com.au/cdn/shop/products/NeonTetra_1200x1000px.jpg?v=1668659269",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia", 
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Characiformes",
      family: "Characidae",
      genus: "Paracheirodon",
      species: "P. innesi"
    },
    temp: 24,
    ph: 6.5,
    gh: 4,
    kh: 2,
    nitrate: 10
  },
  {
    name: "Angelfish",
    binomial_Name: "Pterophyllum scalare",
    image_Url: "https://intanaquariumfeeds.com/cdn/shop/articles/3d-colorful-fish-with-dark-background_23-2150721042.jpg?v=1715687210",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata", 
      class: "Actinopterygii",
      order: "Cichliformes",
      family: "Cichlidae",
      genus: "Pterophyllum",
      species: "P. scalare"
    },
    temp: 26,
    ph: 7.0,
    gh: 8,
    kh: 4,
    nitrate: 20
  },
  {
    name: "Guppy",
    binomial_Name: "Poecilia reticulata",
    image_Url: "https://cdn.britannica.com/02/117202-004-526214C9.jpg",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii", 
      order: "Cyprinodontiformes",
      family: "Poeciliidae",
      genus: "Poecilia",
      species: "P. reticulata"
    },
    temp: 25,
    ph: 7.2,
    gh: 10,
    kh: 6,
    nitrate: 15
  },
  {
    name: "Betta Fish",
    binomial_Name: "Betta splendens",
    image_Url: "https://splashyfishstore.com/cdn/shop/articles/beta-4701894_640.jpg?v=1695600858",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Anabantiformes",
      family: "Osphronemidae",
      genus: "Betta",
      species: "B. splendens"
    },
    temp: 27,
    ph: 7.0,
    gh: 5,
    kh: 3,
    nitrate: 10
  },
  {
    name: "Zebra Danio",
    binomial_Name: "Danio rerio",
    image_Url: "https://www.aquariumcoop.com/cdn/shop/articles/zebra_danio.jpg?v=1697139307",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cypriniformes",
      family: "Danionidae",
      genus: "Danio",
      species: "D. rerio"
    },
    temp: 23,
    ph: 7.0,
    gh: 8,
    kh: 4,
    nitrate: 20
  },
  {
    name: "Corydoras Catfish",
    binomial_Name: "Corydoras aeneus",
    image_Url: "https://cdn.shopify.com/s/files/1/0311/3149/files/corydoras_sterbai.jpg?v=1605035087",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Siluriformes",
      family: "Callichthyidae",
      genus: "Corydoras",
      species: "C. aeneus"
    },
    temp: 24,
    ph: 7.0,
    gh: 6,
    kh: 3,
    nitrate: 15
  },
  {
    name: "Angel Fish",
    binomial_Name: "Pterophyllum scalare",
    image_Url: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop&auto=format",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata", 
      class: "Actinopterygii",
      order: "Cichliformes",
      family: "Cichlidae",
      genus: "Pterophyllum",
      species: "P. scalare"
    },
    temp: 26,
    ph: 7.0,
    gh: 8,
    kh: 4,
    nitrate: 20
  },
  {
    name: "Discus",
    binomial_Name: "Symphysodon discus",
    image_Url: "https://pearlaquatics.my/wp-content/uploads/2023/09/Keeping-Discus-Fish.jpg",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cichliformes",
      family: "Cichlidae",
      genus: "Symphysodon",
      species: "S. discus"
    },
    temp: 28,
    ph: 6.2,
    gh: 3,
    kh: 1,
    nitrate: 5
  },
  {
    name: "Cardinal Tetra",
    binomial_Name: "Paracheirodon axelrodi",
    image_Url: "https://www.aquariumcoop.com/cdn/shop/articles/cardinal_tetra.jpg?v=1697139307",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Characiformes",
      family: "Characidae",
      genus: "Paracheirodon",
      species: "P. axelrodi"
    },
    temp: 25,
    ph: 6.0,
    gh: 3,
    kh: 2,
    nitrate: 8
  },
  {
    name: "Goldfish",
    binomial_Name: "Carassius auratus",
    image_Url: "https://www.squiresgardencentres.co.uk/shop/gallery/Red-Goldfish_shutterstock_417478-medium.jpg",
    scientific_Classification: {
      domain: "Eukaryota",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cypriniformes",
      family: "Cyprinidae",
      genus: "Carassius",
      species: "C. auratus"
    },
    temp: 20,
    ph: 7.4,
    gh: 12,
    kh: 8,
    nitrate: 25
  }
];
