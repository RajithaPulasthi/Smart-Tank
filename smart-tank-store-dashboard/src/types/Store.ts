// src/types/Store.ts

export interface Authority {
  authority: string;
}

export interface StoreUser {
  id: number;
  fullName: string;
  userName: string;
  address: string | null;
  email: string;
  phone: string;
  status: string;
  userType: string;
}

export interface LoginResponse {
  token: string;
  user: StoreUser;
  authorities: Authority[];
}
