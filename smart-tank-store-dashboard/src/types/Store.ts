export type StoreAdmin = {
  id: number;
  fullName: string;
  address: string | null;
  email: string;
  phone: string;
  userName: string;
  status: string;
  userType: string;
};

export type LoginResponse = {
  token: string;
  user: StoreAdmin;
  authorities: Array<{ authority: string }>;
};