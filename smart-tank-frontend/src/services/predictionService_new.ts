// Prediction service for the frontend (DEMO VERSION - Using dummy data)

export interface PredictionRequest {
  model: string;
  temp: number;
  ph: number;
  gh: number;
  kh: number;
  nitrate: number;
}

export interface FishPrediction {
  binomial_name: string;
  image_url: string;
  name: string;
  percentage: number;
  scientific_classification?: Record<string, unknown>;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy prediction data
const dummyPredictions: FishPrediction[] = [
  {
    binomial_name: "Paracheirodon innesi",
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
    name: "Neon Tetra",
    percentage: 92.5,
    scientific_classification: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Characiformes",
      family: "Characidae"
    }
  },
  {
    binomial_name: "Pterophyllum scalare",
    image_url: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400",
    name: "Angelfish",
    percentage: 87.3,
    scientific_classification: {
      kingdom: "Animalia",
      phylum: "Chordata", 
      class: "Actinopterygii",
      order: "Cichliformes",
      family: "Cichlidae"
    }
  },
  {
    binomial_name: "Poecilia reticulata",
    image_url: "https://images.unsplash.com/photo-1544551763-885b29e8aa9b?w=400",
    name: "Guppy",
    percentage: 89.1,
    scientific_classification: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cyprinodontiformes", 
      family: "Poeciliidae"
    }
  },
  {
    binomial_name: "Betta splendens",
    image_url: "https://images.unsplash.com/photo-1520637836862-4d197d17c5a4?w=400",
    name: "Siamese Fighting Fish",
    percentage: 85.7,
    scientific_classification: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Anabantiformes",
      family: "Osphronemidae"
    }
  },
  {
    binomial_name: "Carassius auratus",
    image_url: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400",
    name: "Goldfish",
    percentage: 94.2,
    scientific_classification: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Cypriniformes",
      family: "Cyprinidae"
    }
  }
];

export const getPredictions = async (data: PredictionRequest): Promise<FishPrediction[]> => {
  await delay(1200); // Simulate API delay
  
  try {
    console.log('Demo: Getting fish predictions for water parameters:', data);
    
    // Simulate intelligent prediction based on water parameters
    let predictions = [...dummyPredictions];
    
    // Adjust percentages based on water conditions (simple simulation)
    predictions = predictions.map(p => ({
      ...p,
      percentage: Math.max(60, p.percentage - Math.abs(data.ph - 7) * 5)
    }));
    
    // Sort by percentage (highest first)
    predictions.sort((a, b) => b.percentage - a.percentage);
    
    console.log('Demo: Prediction results:', predictions);
    return predictions;
  } catch (error) {
    console.error("Error getting predictions:", error);
    throw new Error("Failed to get fish predictions");
  }
};

// Default export for compatibility
const PredictionService = {
  getPredictions
};

export default PredictionService;
