import type { StoreAdmin, Store } from "../types/Store";

// Mock data for store admins
const mockStoreAdmins: StoreAdmin[] = [
  {
    id: 1,
    username: "admin1",
    password: "1234",
    storeName: "Shop 1",
    storeId: 1,
  },
  {
    id: 2,
    username: "admin2",
    password: "1234",
    storeName: "Shop 2",
    storeId: 2,
  },
];

// Mock data for stores
const mockStores: Store[] = [
  {
    id: 1,
    name: "Shop 1",
    address: "123 Main Street, Colombo",
    phone: "+94771234567",
    email: "shop1@smarttank.com",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Shop 2",
    address: "456 Lake Road, Kandy",
    phone: "+94777654321",
    email: "shop2@smarttank.com",
    status: "ACTIVE",
  },
];

export const loginStoreAdmin = async (credentials: {
  username: string;
  password: string;
}): Promise<{ admin: StoreAdmin; store: Store } | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const admin = mockStoreAdmins.find(
    (admin) =>
      admin.username === credentials.username &&
      admin.password === credentials.password
  );

  if (admin) {
    const store = mockStores.find((store) => store.id === admin.storeId);
    if (store) {
      return { admin, store };
    }
  }

  return null;
};

export const getStoreById = async (storeId: number): Promise<Store | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockStores.find((store) => store.id === storeId) || null;
};
