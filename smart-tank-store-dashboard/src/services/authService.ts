// src/services/authService.ts

import type { LoginResponse } from "../types/Store";

const API_BASE_URL = "http://localhost:8080/api";
const STORE_API_BASE_URL = "http://localhost:8082/api/Aquariums/aquarium-shop-info";

export interface StoreInfo {
  id?: number;
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

export const loginStoreAdmin = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return null;
    }

    const result: LoginResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Network error or unexpected response:", error);
    return null;
  }
};

export const getStoreInfo = async (
  aquariumId: number,
  token: string
): Promise<StoreInfo | null> => {
  try {
    const response = await fetch(`${STORE_API_BASE_URL}/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      // No store info found
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch store info: ${response.statusText}`);
    }

    const result: StoreInfo = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching store info:", error);
    throw error;
  }
};

export const addStoreInfo = async (
  storeInfo: StoreInfo,
  token: string
): Promise<StoreInfo> => {
  try {
    const response = await fetch(`${STORE_API_BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(storeInfo),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add store info: ${errorText}`);
    }

    // Try to parse JSON, but handle cases where the response might be empty
    try {
      const result: StoreInfo = await response.json();
      return result;
    } catch {
      // If no JSON response, return the input data
      return storeInfo;
    }
  } catch (error) {
    console.error("Error adding store info:", error);
    throw error;
  }
};

export const updateStoreInfo = async (
  storeId: number,
  storeInfo: StoreInfo,
  token: string
): Promise<StoreInfo> => {
  try {
    const response = await fetch(`${STORE_API_BASE_URL}/update/${storeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(storeInfo),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update store info: ${errorText}`);
    }

    // Try to parse JSON, but handle cases where the response might be empty
    try {
      const result: StoreInfo = await response.json();
      return result;
    } catch {
      // If no JSON response, return the input data
      return storeInfo;
    }
  } catch (error) {
    console.error("Error updating store info:", error);
    throw error;
  }
};
