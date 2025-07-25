import type { Fish, FishFormData } from "../types/Fish";

const API_BASE = "http://localhost:8083/api/Aquariums/fish";
const PREDICT_API_BASE = "http://localhost:8083/api/Aquariums";

export interface PredictedFish {
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

export const getAllFish = async (token: string): Promise<Fish[]> => {
  const res = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch fish data");
  }

  const data: Fish[] = await res.json();
  return data;
};

export const addFish = async (
  fishData: FishFormData,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fishData),
  });

  return res.ok;
};

export const predictFish = async (fishName: string): Promise<PredictedFish> => {
  const url = `${PREDICT_API_BASE}/predict-fish?name=${encodeURIComponent(fishName)}`;
  console.log("Calling fish prediction API:", url);
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "accept": "*/*",
    },
  });

  console.log("Fish prediction response status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fish prediction error response:", errorText);
    throw new Error(`Failed to predict fish: ${res.status} ${res.statusText} - ${errorText}`);
  }

  const data: PredictedFish = await res.json();
  console.log("Fish prediction response data:", data);
  return data;
};
