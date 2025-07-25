import axios from "axios";

const API_URL = "http://localhost:8082/api/Aquariums";

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

const registerAquarium = async (data: AquariumRegistrationData) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key as keyof AquariumRegistrationData]);
  });

  const response = await axios.post(`${API_URL}/register-aquarium`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const getAllAquariums = async (): Promise<AquariumListItem[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching aquariums:", error);
    throw error;
  }
};

const getAquariumShopInfo = async (id: number): Promise<AquariumShopInfo> => {
  try {
    const response = await axios.get(`${API_URL}/aquarium-shop-info/${id}`);
    return response.data;
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
