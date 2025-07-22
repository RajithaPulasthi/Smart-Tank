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

const aquariumService = {
  registerAquarium,
};

export default aquariumService;
