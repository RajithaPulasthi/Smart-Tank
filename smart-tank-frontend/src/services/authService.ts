import { dummyCredentials, getDummyAuthResponse, type AuthResponse, type User } from '../Data/dummyAuth';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (credentials: { userName: string; password: string }): Promise<AuthResponse> => {
  await delay(1000); // Simulate network delay
  
  // Check if credentials match any dummy user
  const validCredential = dummyCredentials.find(
    cred => cred.userName === credentials.userName && cred.password === credentials.password
  );
  
  if (!validCredential) {
    throw new Error('Invalid username or password');
  }
  
  const authResponse = getDummyAuthResponse(credentials.userName);
  
  // Store token and user data in localStorage for persistence
  localStorage.setItem('token', authResponse.token);
  localStorage.setItem('user', JSON.stringify(authResponse.user));
  
  return authResponse;
};

export const registerUser = async (userData: {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  address: string;
}): Promise<AuthResponse> => {
  await delay(1500); // Simulate network delay
  
  // In a real app, you'd validate the data and save to backend
  // For demo, just return a success response
  const newUser: User = {
    id: Date.now(), // Simple ID generation
    fullName: userData.fullName,
    address: userData.address,
    email: userData.email,
    userName: userData.userName,
    status: 'ACTIVE',
    userType: 'CUSTOMER'
  };
  
  return {
    token: `demo_token_${Date.now()}`,
    user: newUser,
    authorities: [{ authority: 'ROLE_USER' }]
  };
};

export const getUserProfile = async (): Promise<User> => {
  await delay(500);
  
  // Get user from localStorage or return demo user
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  
  // Extract user info from token (in demo, just use first user)
  const authResponse = getDummyAuthResponse('johnsmith');
  return authResponse.user;
};

export const updateUserProfile = async (_token: string, userData: Partial<User>): Promise<User> => {
  await delay(800);
  
  // In demo, just return updated user data
  const currentUser = await getUserProfile();
  const updatedUser = { ...currentUser, ...userData };
  
  // Update stored user in localStorage
  localStorage.setItem('user', JSON.stringify(updatedUser));
  
  return updatedUser;
};

export const logoutUser = async (): Promise<void> => {
  await delay(300);
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// AuthService object for default export compatibility
const AuthService = {
  login: loginUser,
  register: registerUser,
  signUp: registerUser, // Alias for register
  getUserProfile,
  getUserDetails: getUserProfile, // Alias for getUserProfile  
  updateUserProfile,
  logout: logoutUser,
  
  // Helper methods for compatibility
  getToken: () => localStorage.getItem('token'),
  isAuthenticated: () => !!localStorage.getItem('token'),
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default AuthService;