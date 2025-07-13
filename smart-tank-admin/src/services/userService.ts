import type { User } from "../types/User";
import type { Customer } from "../types/Customers";

const API_URL = "http://localhost:8080/api/User";

/**
 * Get all admin panel users
 */
export const getAllUsers = async (token: string): Promise<User[]> => {
  const res = await fetch(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

/**
 * Get all website-registered customers
 */
export const getAllCustomers = async (token: string): Promise<Customer[]> => {
  const res = await fetch(`${API_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
};

/**
 * Save or update an admin panel user
 */
export const saveUser = async (user: User, token: string): Promise<boolean> => {
  const method = user.id ? "PUT" : "POST";
  const url = user.id ? `${API_URL}/${user.id}` : `${API_URL}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  return res.ok;
};
