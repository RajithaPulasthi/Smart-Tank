import type { Authority } from "./User";

export type Customer = {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  address?: string;
  status: string | number;
  userType: string;
  authorities?: Authority[]; 
};
