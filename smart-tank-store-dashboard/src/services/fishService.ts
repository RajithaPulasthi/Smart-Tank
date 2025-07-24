// src/services/fishService.ts

const API_BASE_URL = "http://localhost:8082/api/Aquariums/Aquarium-fish";
const ALL_FISH_API_URL = "http://localhost:8081/api/Fish";

export interface AquariumFish {
  id: number;
  fishId: number;
  aquariumId: number;
  fishName: string;
  fishImage: string;
}

export interface Fish {
  id: number;
  name: string;
  image: string;
}

export const getFishForAquarium = async (
  aquariumId: number,
  token: string
): Promise<AquariumFish[]> => {
  const response = await fetch(`${API_BASE_URL}/${aquariumId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fish for aquarium");
  }
  return response.json();
};

export const getAllFish = async (token: string): Promise<Fish[]> => {
  const response = await fetch(`${ALL_FISH_API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all fish");
  }
  return response.json();
};

export const addFishToAquarium = async (
  fishId: number,
  aquariumId: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fishId, aquariumId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add fish to aquarium");
  }
};

export const removeFishFromAquarium = async (
  aquariumFishId: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/delete/${aquariumFishId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to remove fish from aquarium");
  }
};
