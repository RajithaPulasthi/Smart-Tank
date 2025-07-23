export type StoreAdmin = {
  id: number;
  username: string;
  password: string;
  storeName: string;
  storeId: number;
};

export type Store = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
};
