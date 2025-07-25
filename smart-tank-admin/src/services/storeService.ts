import type { Store } from "../types/Store";
import type { AquariumFish } from "../types/Fish";

export interface StoreInfo {
  id?: number;
  about: string;
  shopEmail: string;
  contactNumber: string;
  shopAddress: string;
  openingHours: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youTubeUrl?: string;
  twitterUrl?: string;
  aquariumId: number;
}

export interface AquariumRegistrationStats {
  date: string;
  count: number;
}

const API_BASE = "http://localhost:8082/api/Aquariums";
const USER_AQUARIUM_API = "http://localhost:8082/api";

export const getAllStores = async (token: string): Promise<Store[]> => {
  const res = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stores");
  }

  return res.json();
};

export const getPendingStores = async (token: string): Promise<Store[]> => {
  const stores = await getAllStores(token);
  return stores.filter((store) => store.status === "PENDING");
};

export const getApprovedStores = async (token: string): Promise<Store[]> => {
  const stores = await getAllStores(token);
  return stores.filter((store) => store.status === "APPROVED");
};

export const getRejectedStores = async (token: string): Promise<Store[]> => {
  const stores = await getAllStores(token);
  return stores.filter((store) => store.status === "REJECTED");
};

// Get aquarium registration statistics by date range
export interface AquariumRegistrationStats {
  date: string;
  count: number;
}

export const getAquariumRegistrationStats = async (
  token: string,
  days: number = 7
): Promise<AquariumRegistrationStats[]> => {
  try {
    const stores = await getAllStores(token);
    
    // Generate date range for the last 'days' days
    const dateMap = new Map<string, number>();
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit' 
      });
      dateMap.set(dateKey, 0);
    }
    
    // Count registrations by date
    stores.forEach(store => {
      if (store.createdDate) {
        const storeDate = new Date(store.createdDate);
        const dateKey = storeDate.toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: '2-digit' 
        });
        
        if (dateMap.has(dateKey)) {
          dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
        }
      }
    });
    
    // Convert to array format for chart
    return Array.from(dateMap.entries()).map(([date, count]) => ({
      date,
      count
    }));
  } catch (error) {
    console.error("Error fetching aquarium registration stats:", error);
    // Return dummy data if API fails
    const dateMap = new Map<string, number>();
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit' 
      });
      dateMap.set(dateKey, Math.floor(Math.random() * 10));
    }
    
    return Array.from(dateMap.entries()).map(([date, count]) => ({
      date,
      count
    }));
  }
};

export const getActiveStores = async (token: string): Promise<Store[]> => {
  const stores = await getAllStores(token);
  return stores.filter((store) => store.status === "ACTIVE");
};

export const getInactiveStores = async (token: string): Promise<Store[]> => {
  const stores = await getAllStores(token);
  return stores.filter((store) => store.status === "INACTIVE");
};

export const approveStore = async (
  storeId: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/status/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "APPROVED" }),
  });

  return res.ok;
};

export const rejectStore = async (
  storeId: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/status/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "REJECTED" }),
  });

  return res.ok;
};

export const activateStore = async (
  storeId: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/status/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "ACTIVE" }),
  });

  return res.ok;
};

export const deactivateStore = async (
  storeId: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/status/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "INACTIVE" }),
  });

  return res.ok;
};

export const getStoreById = async (
  storeId: number,
  token: string
): Promise<Store> => {
  const res = await fetch(`${API_BASE}/${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch store details");
  }

  return res.json();
};

export const downloadFishListAsTxt = async (
  aquariumId: number,
  aquariumName: string
): Promise<void> => {
  try {
    console.log(`Attempting to download fish list for aquarium ID: ${aquariumId}`);
    
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      'Accept': 'text/plain',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`http://localhost:8082/api/Aquariums/download-fish-list/${aquariumId}`, {
      method: 'GET',
      headers,
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorText = await response.text();
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      } catch {
        // Cannot read error text
      }
      throw new Error(`Failed to download fish list. ${errorMessage}`);
    }

    // Get the response as plain text
    const txtContent = await response.text();
    console.log(`Retrieved text content for download`);
    
    // Create and download the text file
    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${aquariumName.replace(/[^a-z0-9]/gi, '_')}_fish_list.txt`;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('Fish list downloaded as TXT file successfully');
    
  } catch (error) {
    console.error('Error downloading fish list:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to download fish list. Please try again.');
    }
  }
};

export const connectUserToAquarium = async (
  userId: number,
  aquariumId: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/user-aquarium/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        aquariumId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to connect user to aquarium: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error connecting user to aquarium:", error);
    throw error;
  }
};

// Check if there is a user assigned to an aquarium
export const checkAquariumUser = async (
  aquariumId: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/user-aquarium/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return false; // No user assigned
    }

    if (response.status === 400) {
      // Bad request - likely invalid aquarium ID or malformed request
      console.warn(`Bad request for aquarium ${aquariumId}. Treating as no user assigned.`);
      return false;
    }

    if (!response.ok) {
      throw new Error(`Failed to check aquarium user: ${response.status} ${response.statusText}`);
    }

    return true; // User is assigned
  } catch (error) {
    console.error("Error checking aquarium user:", error);
    // Return false to handle gracefully - assume no user assigned
    return false;
  }
};

// Get user data assigned to an aquarium
export interface AquariumUserData {
  id: number;
  userId: number;
  aquariumId: number;
  aquariumName: string;
}

export const getAquariumUserData = async (
  aquariumId: number,
  token: string
): Promise<AquariumUserData | null> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/user-aquarium/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return null; // No user assigned
    }

    if (response.status === 400) {
      // Bad request - likely invalid aquarium ID or malformed request
      console.warn(`Bad request for aquarium ${aquariumId}. Treating as no user assigned.`);
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to get aquarium user data: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting aquarium user data:", error);
    return null;
  }
};

// Get user details by user ID
export interface UserDetails {
  id: number;
  userId: number;
  aquariumId: number;
  aquariumName: string;
}

export const getUserById = async (
  userId: number,
  token: string
): Promise<UserDetails | null> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user data: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Check if a user is already assigned to any aquarium
export const checkUserAquariumAssignment = async (
  userId: number,
  token: string
): Promise<UserDetails | null> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return null; // User is not assigned to any aquarium
    }

    if (!response.ok) {
      throw new Error(`Failed to check user assignment: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking user assignment:", error);
    return null;
  }
};

export const addFishToStore = async (
  fishId: number,
  aquariumId: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/Aquarium-fish/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fishId,
        aquariumId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add fish to store: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error adding fish to store:", error);
    throw error;
  }
};

// Check if store has connected users
export const checkStoreHasUsers = async (
  aquariumId: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/user-aquarium/aquarium/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const users = await response.json();
    return Array.isArray(users) && users.length > 0;
  } catch (error) {
    console.error("Error checking store users:", error);
    return false;
  }
};

// Check if store has fish list
export const checkStoreHasFish = async (
  aquariumId: number,
  token: string
): Promise<boolean> => {
  try {
    console.log(`Checking fish for aquarium ID: ${aquariumId}`);
    
    // Use the same API endpoint as getAquariumFish to check for fish IDs
    const response = await fetch(`${USER_AQUARIUM_API}/fish-ids/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Fish check response status: ${response.status}`);

    // If the aquarium has no fish, these status codes indicate empty aquarium
    if (response.status === 400 || response.status === 404) {
      console.log(`No fish found for aquarium ${aquariumId} (status: ${response.status})`);
      return false;
    }

    if (!response.ok) {
      console.error(`Error checking fish: ${response.status} ${response.statusText}`);
      return false;
    }

    const fishIds = await response.json();
    console.log(`Fish IDs for aquarium ${aquariumId}:`, fishIds);
    
    const hasFish = Array.isArray(fishIds) && fishIds.length > 0;
    console.log(`Has fish result: ${hasFish}`);
    
    return hasFish;
  } catch (error) {
    console.error("Error checking aquarium fish:", error);
    return false;
  }
};

// Complete store (change status to ACTIVE)
export const completeStore = async (
  storeId: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/status/${storeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "ACTIVE",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to complete store: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error completing store:", error);
    throw error;
  }
};

// Get fish in a specific aquarium
export const getAquariumFish = async (
  aquariumId: number,
  token: string
): Promise<AquariumFish[]> => {
  try {
    // First, get the fish IDs for this aquarium
    const fishIdsResponse = await fetch(`${USER_AQUARIUM_API}/fish-ids/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If the aquarium has no fish, return empty array instead of throwing error
    if (fishIdsResponse.status === 400 || fishIdsResponse.status === 404) {
      console.log(`No fish found for aquarium ${aquariumId}`);
      return [];
    }

    if (!fishIdsResponse.ok) {
      throw new Error(`Failed to fetch aquarium fish IDs: ${fishIdsResponse.status} ${fishIdsResponse.statusText}`);
    }

    const fishIds: number[] = await fishIdsResponse.json();
    
    if (!Array.isArray(fishIds) || fishIds.length === 0) {
      return [];
    }

    // Then, fetch full fish data for each ID from the fish service
    const fishDataPromises = fishIds.map(async (fishId) => {
      const fishResponse = await fetch(`http://localhost:8083/api/Aquariums/fish/${fishId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!fishResponse.ok) {
        console.warn(`Failed to fetch fish data for ID ${fishId}`);
        return null;
      }

      const fishData = await fishResponse.json();
      // Add aquariumFishId for deletion purposes (using the fishId as identifier)
      return {
        ...fishData,
        aquariumFishId: fishId, // We'll use the fish ID as the aquarium fish ID for deletion
      };
    });

    const fishDataResults = await Promise.all(fishDataPromises);
    
    // Filter out any null results (failed fetches)
    const validFishData = fishDataResults.filter((fish): fish is AquariumFish => fish !== null);
    
    return validFishData;
  } catch (error) {
    console.error("Error fetching aquarium fish:", error);
    // Return empty array instead of throwing error for better UX
    return [];
  }
};

// Get fish IDs in a specific aquarium (helper function)
export const getAquariumFishIds = async (
  aquariumId: number,
  token: string
): Promise<number[]> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/fish-ids/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 400 || response.status === 404) {
      return []; // No fish in aquarium
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch aquarium fish IDs: ${response.status} ${response.statusText}`);
    }

    const fishIds: number[] = await response.json();
    return Array.isArray(fishIds) ? fishIds : [];
  } catch (error) {
    console.error("Error fetching aquarium fish IDs:", error);
    return [];
  }
};

// Delete fish from aquarium  
export const deleteFishFromStore = async (
  fishId: number,
  aquariumId: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/Aquarium-fish/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fishId,
        aquariumId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete fish from aquarium: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting fish from aquarium:", error);
    throw error;
  }
};

export const getStoreInfo = async (
  aquariumId: number,
  token: string
): Promise<StoreInfo | null> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/aquarium-shop-info/${aquariumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to get store info: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting store info:", error);
    return null;
  }
};

export const updateStoreInfo = async (
  id: number,
  storeInfo: StoreInfo,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/aquarium-shop-info/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(storeInfo),
    });

    return response.ok;
  } catch (error) {
    console.error("Error updating store info:", error);
    return false;
  }
};

export const addStoreInfo = async (
  storeInfo: StoreInfo,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${USER_AQUARIUM_API}/aquarium-shop-info/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storeInfo),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error adding store info:", error);
    return false;
  }
};