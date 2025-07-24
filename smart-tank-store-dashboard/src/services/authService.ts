import type { LoginResponse } from "../types/Store";

const API_BASE_URL = "http://localhost:8080/api";

export const loginStoreAdmin = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return null;
    }

    const result: LoginResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Network error or unexpected response:", error);
    return null;
  }
};