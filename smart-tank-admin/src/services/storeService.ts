import type { Store } from "../types/Store";

const API_BASE = "http://localhost:8082/api/Aquariums";

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

export const approveStore = async (
  storeId: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/${storeId}/approve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
};

export const rejectStore = async (
  storeId: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/${storeId}/reject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
