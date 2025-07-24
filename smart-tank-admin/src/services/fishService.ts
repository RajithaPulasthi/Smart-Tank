import type { Fish, FishFormData } from "../types/Fish";

const API_BASE = "http://localhost:8083/api/Aquariums/fish";

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
