// Extended dummy fish data for demo
export interface FishPrediction {
  name: string;
  binomial_Name: string;
  image_Url: string;
  scientific_Classification: {
    domain: string | null;
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
}

export const dummyFishPredictions: Record<string, FishPrediction> = {
  "goldfish": {
    name: "Goldfish",
    binomial_Name: "Carassius auratus",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Goldfish3.jpg/250px-Goldfish3.jpg",
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia",
      phylum: "Chordata", 
      class: "Actinopterygii",
      order: "Cypriniformes",
      family: "Cyprinidae",
      genus: "Carassius",
      species: "C. auratus"
    }
  },
  "betta": {
    name: "Betta",
    binomial_Name: "Betta splendens",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Betta_splendens_-_Blue_male.jpg/250px-Betta_splendens_-_Blue_male.jpg",
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii", 
      order: "Anabantiformes",
      family: "Osphronemidae",
      genus: "Betta",
      species: "B. splendens"
    }
  },
  "angelfish": {
    name: "Angelfish",
    binomial_Name: "Pterophyllum scalare",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pterophyllum_scalare_-_various_color_forms.jpg/250px-Pterophyllum_scalare_-_various_color_forms.jpg",
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cichliformes", 
      family: "Cichlidae",
      genus: "Pterophyllum",
      species: "P. scalare"
    }
  },
  "neon tetra": {
    name: "Neon Tetra",
    binomial_Name: "Paracheirodon innesi",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Neon_tetra.jpg/250px-Neon_tetra.jpg",
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Characiformes",
      family: "Characidae", 
      genus: "Paracheirodon",
      species: "P. innesi"
    }
  },
  "tinfoil barb": {
    name: "Tinfoil Barb",
    binomial_Name: "Barbonymus schwanenfeldii",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Barbonymus_schwanenfeldii.jpg/250px-Barbonymus_schwanenfeldii.jpg",  
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cypriniformes",
      family: "Cyprinidae",
      genus: "Barbonymus", 
      species: "B. schwanenfeldii"
    }
  },
  "guppy": {
    name: "Guppy",
    binomial_Name: "Poecilia reticulata",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Male_guppy_with_colourful_tail.jpg/250px-Male_guppy_with_colourful_tail.jpg",
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia", 
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cyprinodontiformes",
      family: "Poeciliidae",
      genus: "Poecilia",
      species: "P. reticulata"
    }
  },
  "molly": {
    name: "Molly",
    binomial_Name: "Poecilia sphenops",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Poecilia_sphenops_female.jpg/250px-Poecilia_sphenops_female.jpg",
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cyprinodontiformes",
      family: "Poeciliidae",
      genus: "Poecilia",
      species: "P. sphenops"
    }
  },
  "platy": {
    name: "Platy", 
    binomial_Name: "Xiphophorus maculatus",
    image_Url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Southern_platyfish.jpg/250px-Southern_platyfish.jpg",
    scientific_Classification: {
      domain: null,
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cyprinodontiformes",
      family: "Poeciliidae", 
      genus: "Xiphophorus",
      species: "X. maculatus"
    }
  }
};

export const predictFishByName = (fishName: string): FishPrediction | null => {
  const key = fishName.toLowerCase().trim();
  return dummyFishPredictions[key] || null;
};

export const getAllFishNames = (): string[] => {
  return Object.keys(dummyFishPredictions).map(key => 
    dummyFishPredictions[key].name
  );
};
