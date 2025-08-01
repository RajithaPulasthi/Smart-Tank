import { fishProfiles, type FishProfile } from '../Data/fish.data';
import { dummyFishDetails, dummyFishList, type FishDetails, type FishListItem } from '../Data/dummyFish';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllFish = async (): Promise<FishListItem[]> => {
  await delay(600);
  
  try {
    return [...dummyFishList]; // Return copy of fish list items
  } catch (error) {
    console.error("Error fetching fish profiles:", error);
    throw new Error("Failed to load fish profiles");
  }
};

export const searchFish = async (searchTerm: string): Promise<FishListItem[]> => {
  await delay(400);
  
  try {
    const normalizedSearch = searchTerm.toLowerCase();
    return dummyFishList.filter(fish =>
      fish.name.toLowerCase().includes(normalizedSearch)
    );
  } catch (error) {
    console.error("Error searching fish:", error);
    throw new Error("Failed to search fish");
  }
};

export const getFishById = async (id: string): Promise<FishProfile | null> => {
  await delay(400);
  
  try {
    const fish = fishProfiles.find(fish => fish.id === id);
    return fish || null;
  } catch (error) {
    console.error("Error fetching fish profile:", error);
    throw new Error("Failed to load fish profile");
  }
};

export const getFishDetails = async (fishName: string): Promise<FishDetails | null> => {
  await delay(500);
  
  try {
    const normalizedSearchName = fishName.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // First try to find in dummyFishDetails with flexible matching
    let fish = dummyFishDetails.find(fish => {
      const fishNameNormalized = fish.name.toLowerCase().replace(/\s+/g, ' ').trim();
      return fishNameNormalized === normalizedSearchName || 
             fishNameNormalized.includes(normalizedSearchName) ||
             normalizedSearchName.includes(fishNameNormalized);
    });
    
    // If not found in dummyFishDetails, try to create from fishProfiles
    if (!fish) {
      const fishProfile = fishProfiles.find(profile => {
        const profileNameNormalized = profile.name.toLowerCase().replace(/\s+/g, ' ').trim();
        return profileNameNormalized === normalizedSearchName || 
               profileNameNormalized.includes(normalizedSearchName) ||
               normalizedSearchName.includes(profileNameNormalized);
      });
      
      if (fishProfile) {
        // Convert FishProfile to FishDetails format
        fish = {
          name: fishProfile.name,
          binomial_Name: fishProfile.scientificName,
          image_Url: `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=400&h=300&fit=crop&auto=format`,
          scientific_Classification: {
            domain: "Eukaryota",
            kingdom: "Animalia",
            phylum: "Chordata",
            class: "Actinopterygii",
            order: "Unknown",
            family: "Unknown", 
            genus: fishProfile.scientificName.split(' ')[0],
            species: fishProfile.scientificName.split(' ')[1] || "Unknown"
          },
          temp: fishProfile.temperature,
          ph: fishProfile.ph,
          gh: fishProfile.hardness,
          kh: Math.round(fishProfile.hardness * 0.5), // Estimate KH from hardness
          nitrate: 15 // Default safe value
        };
      }
    }
    
    return fish || null;
  } catch (error) {
    console.error("Error fetching fish details:", error);  
    throw new Error("Failed to load fish details");
  }
};

export const getFishBySpecies = async (species: string): Promise<FishProfile[]> => {
  await delay(500);
  
  try {
    const normalizedSpecies = species.toLowerCase();
    return fishProfiles.filter(fish => 
      fish.name.toLowerCase().includes(normalizedSpecies) ||
      fish.scientificName.toLowerCase().includes(normalizedSpecies)
    );
  } catch (error) {
    console.error("Error searching fish by species:", error);
    throw new Error("Failed to search fish profiles");
  }
};

export const getCompatibleFish = async (currentFish: FishProfile): Promise<FishProfile[]> => {
  await delay(800);
  
  try {
    // Simple compatibility logic based on water parameters
    const compatible = fishProfiles.filter(fish => {
      if (fish.id === currentFish.id) return false;
      
      // Check if water parameters are within reasonable range
      const phDiff = Math.abs(fish.ph - currentFish.ph);
      const tempDiff = Math.abs(fish.temperature - currentFish.temperature);
      const hardnessDiff = Math.abs(fish.hardness - currentFish.hardness);
      
      return phDiff <= 0.8 && tempDiff <= 3 && hardnessDiff <= 3;
    });
    
    return compatible.slice(0, 6); // Limit to 6 compatible fish
  } catch (error) {
    console.error("Error finding compatible fish:", error);
    throw new Error("Failed to find compatible fish");
  }
};

export const getFishRecommendations = async (tankSize: number, experience: 'beginner' | 'intermediate' | 'advanced'): Promise<FishProfile[]> => {
  await delay(700);
  
  try {
    let recommendations = [...fishProfiles];
    
    // Filter by tank size (assuming minimum tank size based on fish length)
    if (tankSize < 50) {
      recommendations = recommendations.filter(fish => fish.maxLengthCm <= 8);
    } else if (tankSize < 100) {
      recommendations = recommendations.filter(fish => fish.maxLengthCm <= 15);
    }
    
    // Filter by experience level (simple logic)
    if (experience === 'beginner') {
      recommendations = recommendations.filter(fish => 
        fish.temperament.toLowerCase().includes('peaceful') ||
        fish.feedingHabits.toLowerCase().includes('dry')
      );
    }
    
    return recommendations.slice(0, 8); // Limit to 8 recommendations
  } catch (error) {
    console.error("Error getting fish recommendations:", error);
    throw new Error("Failed to get fish recommendations");
  }
};

// Default export for compatibility
const FishService = {
  getAllFish,
  searchFish,
  getFishById,
  getFishDetails,
  getFishBySpecies,
  getCompatibleFish,
  getFishRecommendations
};

export default FishService;

// Re-export types for convenience
export type { FishDetails, FishListItem };