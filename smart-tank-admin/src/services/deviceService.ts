import type { Device } from "../types/Device";

const API_URL = "http://localhost:8084/api/Device";

export const getAllDevices = async (token: string): Promise<Device[]> => {
  const response = await fetch(`${API_URL}/All`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch devices");
  }
  return response.json();
};

export const registerDevice = async (
  device: Device,
  token: string
): Promise<Device> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(device),
  });
  if (!response.ok) {
    throw new Error("Failed to register device");
  }
  return response.json();
};
