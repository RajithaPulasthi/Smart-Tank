import type { User } from "../types/User";

const API_URL = "http://localhost:8080/api/User";

export const getAllUsers = async (token: string) => {
  const res = await fetch(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const saveUser = async (user: User, token: string) => {
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
