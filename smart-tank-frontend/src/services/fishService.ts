// Service for fish-related API calls
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

class FishService {
  private static readonly API_BASE = "http://localhost:8083/api/Aquariums";

  // Get all fish list
  static async getAllFish(): Promise<FishListItem[]> {
    try {
      const response = await fetch(`${this.API_BASE}/fish`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch fish list: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching fish list:", error);
      throw error;
    }
  }

  // Get fish details by name
  static async getFishDetails(name: string): Promise<FishDetails> {
    try {
      const response = await fetch(`${this.API_BASE}/predict-fish?name=${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch fish details: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching fish details:", error);
      throw error;
    }
  }

  // Search fish by name (filter from all fish)
  static async searchFish(searchTerm: string): Promise<FishListItem[]> {
    try {
      const allFish = await this.getAllFish();
      return allFish.filter(fish => 
        fish.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching fish:", error);
      throw error;
    }
  }
}

export default FishService;
