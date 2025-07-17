export type Authority = {
  authority: string;
};

export type User = {
  id?: number; // Optional: auto-generated for new users
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  address: string;
  status: number; // 1 = Active, 0 = Inactive
  userType: number; // 1 = Admin, 0 = Others
};
