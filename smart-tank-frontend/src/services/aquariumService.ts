// Aquarium service for the frontend (DEMO VERSION - Using dummy data)
import { dummyAquariums, dummyShopInfos, type AquariumListItem, type AquariumShopInfo } from '../Data/dummyAquariums';

export interface AquariumRegistrationData {
  AquariumName: string;
  Location: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  BusinessName: string;
  BusinessRegNumber: string;
  Address: string;
  Province: string;
  PostalCode: string;
  FishListFile: File;
}

export { type AquariumListItem, type AquariumShopInfo };

const registerAquarium = async (data: AquariumRegistrationData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // In demo mode, always succeed
    console.log("Demo: Aquarium registration successful", data);
    
    return {
      success: true,
      message: "Aquarium registered successfully! (Demo mode - data not persisted)",
      id: Date.now() // Return a mock ID
    };
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

const getAllAquariums = async (): Promise<AquariumListItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  try {
    return [...dummyAquariums]; // Return copy of dummy data
  } catch (error) {
    console.error("Error fetching aquariums:", error);
    throw new Error("Failed to load aquariums");
  }
};

const getAquariumShopInfo = async (id: number): Promise<AquariumShopInfo> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  try {
    const shopInfo = dummyShopInfos.find(shop => shop.id === id);
    
    if (!shopInfo) {
      throw new Error("Aquarium shop not found");
    }
    
    return shopInfo;
  } catch (error) {
    console.error("Error fetching aquarium shop info:", error);
    throw error;
  }
};

const aquariumService = {
  registerAquarium,
  getAllAquariums,
  getAquariumShopInfo,
};

export default aquariumService;
