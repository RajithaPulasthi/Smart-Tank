// src/services/fishService.ts

const FISH_API_BASE_URL = "http://localhost:8083/api/Aquariums/fish";
const AQUARIUM_FISH_API_BASE_URL = "http://localhost:8082/api/Aquariums/Aquarium-fish";
const AQUARIUM_API_BASE_URL = "http://localhost:8082/api/Aquariums";

export interface Fish {
  id: number;
  name: string;
  temp: number;
  ph: number;
  gh: number;
  kh: number;
  nitrate: number;
}

export interface AquariumFish {
  fishId: number;
  aquariumId: number;
}

// Get all available fish
export const getAllFish = async (token: string): Promise<Fish[]> => {
  const response = await fetch(`${FISH_API_BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all fish");
  }
  return response.json();
};

// Get specific fish details by ID
export const getFishById = async (fishId: number, token: string): Promise<Fish> => {
  const response = await fetch(`${FISH_API_BASE_URL}/${fishId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fish details");
  }
  return response.json();
};

// Get fish IDs for a specific aquarium
export const getFishIdsForAquarium = async (
  aquariumId: number,
  token: string
): Promise<number[]> => {
  const response = await fetch(`${AQUARIUM_API_BASE_URL}/fish-ids/${aquariumId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fish IDs for aquarium");
  }
  return response.json();
};

// Add fish to aquarium
export const addFishToAquarium = async (
  fishId: number,
  aquariumId: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${AQUARIUM_FISH_API_BASE_URL}/add`, {
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

// Remove fish from aquarium
export const removeFishFromAquarium = async (
  fishId: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${AQUARIUM_FISH_API_BASE_URL}/delete/${fishId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to remove fish from aquarium");
  }
};
