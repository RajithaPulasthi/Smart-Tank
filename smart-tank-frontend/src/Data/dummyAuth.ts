// Dummy authentication data for demo
export interface User {
  id: number;
  fullName: string;
  address: string | null;
  email: string;
  userName: string;
  status: string;
  userType: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  authorities: { authority: string }[];
}

export const dummyUsers: User[] = [
  {
    id: 1,
    fullName: "John Smith",
    address: "123 Ocean Drive, Colombo 03",
    email: "john.smith@email.com",
    userName: "johnsmith",
    status: "ACTIVE",
    userType: "CUSTOMER"
  },
  {
    id: 2,
    fullName: "Sarah Johnson",
    address: "456 Marine Street, Kandy",
    email: "sarah.johnson@email.com",
    userName: "sarahjohnson", 
    status: "ACTIVE",
    userType: "CUSTOMER"
  },
  {
    id: 3,
    fullName: "Mike Davis",
    address: "789 Aquarium Lane, Galle",
    email: "mike.davis@email.com",
    userName: "mikedavis",
    status: "ACTIVE", 
    userType: "CUSTOMER"
  }
];

export const dummyCredentials = [
  { userName: "johnsmith", password: "demo123" },
  { userName: "sarahjohnson", password: "demo123" },
  { userName: "mikedavis", password: "demo123" },
  { userName: "demo", password: "demo" }
];

export const getDummyAuthResponse = (userName: string): AuthResponse => {
  const user = dummyUsers.find(u => u.userName === userName) || dummyUsers[0];
  
  return {
    token: `demo_token_${Date.now()}`,
    user,
    authorities: [{ authority: "ROLE_USER" }]
  };
};
