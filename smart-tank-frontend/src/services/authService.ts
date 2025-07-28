// Authentication service for the frontend
export interface User {
  id: number;
  fullName: string;
  address: string | null;
  email: string;
  userName: string;
  status: string;
  userType: string;
}

export interface Authority {
  authority: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  authorities: Authority[];
}

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface SignUpCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export interface UpdateUserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export interface UserDetailsResponse {
  id: number;
  fullName: string;
  address: string | null;
  email: string;
  phone: string;
  userName: string;
  status: string;
  userType: string;
}

class AuthService {
  private static readonly API_BASE = "http://localhost:8080/api";
  private static readonly STORAGE_KEYS = {
    TOKEN: "token",
    USER: "user",
    AUTHORITIES: "authorities",
  };

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.API_BASE}/Authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // Try to parse error response as JSON first
        let errorMessage = "Invalid credentials";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, get text response
          const errorText = await response.text();
          if (errorText.trim()) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      // Try to parse successful response as JSON
      let data: AuthResponse;
      try {
        data = await response.json();
      } catch {
        // If JSON parsing fails, get the text to see what we received
        const responseText = await response.text();
        console.error("Failed to parse JSON response:", responseText);
        throw new Error("Invalid response format from server");
      }

      // Check if user has the required authority for customer portal
      const hasCustomerRole = data.authorities?.some(
        (auth) => auth.authority === "ROLE_AQUARIUM_CUSTOMER"
      );

      if (!hasCustomerRole) {
        throw new Error("Access denied. This portal is for aquarium customers only.");
      }

      // Store authentication data
      this.storeAuthData(data);

      return data;
    } catch (error) {
      // Handle network errors or other fetch errors
      if (error instanceof TypeError) {
        throw new Error("Network error. Please check your connection and try again.");
      }
      throw error;
    }
  }

  static async signUp(credentials: SignUpCredentials): Promise<SignUpResponse> {
    try {
      const response = await fetch(`${this.API_BASE}/Users/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // Try to parse error response as JSON first
        let errorMessage = "Registration failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, get text response
          const errorText = await response.text();
          if (errorText.trim()) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      // Try to parse successful response as JSON
      let data;
      try {
        data = await response.json();
      } catch {
        // If JSON parsing fails for success response, assume it's successful
        data = { success: true };
      }

      return {
        success: true,
        message: "Account created successfully",
        user: data
      };
    } catch (error) {
      // Handle network errors or other fetch errors
      if (error instanceof TypeError) {
        throw new Error("Network error. Please check your connection and try again.");
      }
      throw error;
    }
  }

  static async getUserDetails(userId: number): Promise<UserDetailsResponse> {
    try {
      console.log("Making GET request to:", `${this.API_BASE}/Users/${userId}`);
      console.log("Headers:", this.getAuthHeaders());
      
      const response = await fetch(`${this.API_BASE}/Users/${userId}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        console.error("Response not ok, status:", response.status);
        let errorMessage = "Failed to fetch user details";
        try {
          const errorData = await response.json();
          console.error("Error data:", errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          console.error("Failed to parse error JSON:", jsonError);
          const errorText = await response.text();
          console.error("Error text:", errorText);
          if (errorText.trim()) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      const data: UserDetailsResponse = await response.json();
      console.log("Successfully fetched user details:", data);
      return data;
    } catch (error) {
      console.error("Error in getUserDetails:", error);
      if (error instanceof TypeError) {
        throw new Error("Network error. Please check your connection and try again.");
      }
      throw error;
    }
  }

  static async updateUserDetails(userId: number, credentials: UpdateUserCredentials): Promise<UserDetailsResponse> {
    try {
      const response = await fetch(`${this.API_BASE}/Users/${userId}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        let errorMessage = "Failed to update user details";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          const errorText = await response.text();
          if (errorText.trim()) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      const data: UserDetailsResponse = await response.json();
      
      // Update stored user data
      const currentUser = this.getUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          fullName: data.fullName,
          email: data.email,
          address: data.address,
        };
        localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error. Please check your connection and try again.");
      }
      throw error;
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      console.log("Testing backend connection...");
      const response = await fetch(`${this.API_BASE}/test`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log("Test connection response status:", response.status);
      return response.ok;
    } catch (error) {
      console.error("Backend connection test failed:", error);
      return false;
    }
  }

  static storeAuthData(authData: AuthResponse): void {
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, authData.token);
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(authData.user));
    localStorage.setItem(this.STORAGE_KEYS.AUTHORITIES, JSON.stringify(authData.authorities));
  }

  static getToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEYS.TOKEN);
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  static getAuthorities(): Authority[] {
    const authStr = localStorage.getItem(this.STORAGE_KEYS.AUTHORITIES);
    return authStr ? JSON.parse(authStr) : [];
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    const authorities = this.getAuthorities();

    return !!(
      token &&
      user &&
      authorities.some((auth) => auth.authority === "ROLE_AQUARIUM_CUSTOMER")
    );
  }

  static hasAuthority(authority: string): boolean {
    const authorities = this.getAuthorities();
    return authorities.some((auth) => auth.authority === authority);
  }

  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(this.STORAGE_KEYS.USER);
    localStorage.removeItem(this.STORAGE_KEYS.AUTHORITIES);
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        };
  }
}

export default AuthService;
