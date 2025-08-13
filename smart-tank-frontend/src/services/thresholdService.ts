import type { Threshold, TankStatus } from '../types/Threshold';

const API_URL = 'http://localhost:8084/api';

export const getThreshold = async (tankId: number, token: string): Promise<Threshold> => {
  const response = await fetch(`${API_URL}/Tanks/${tankId}/threshold`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch threshold');
  }
  return response.json();
};

export const setThreshold = async (
  tankId: number,
  threshold: Threshold,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/Tanks/${tankId}/threshold`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(threshold),
  });

  if (!response.ok) {
    throw new Error('Failed to set threshold');
  }
};

export const getTankStatuses = async (tankId: number, token: string): Promise<TankStatus[]> => {
  const response = await fetch(`${API_URL}/Device/tank-statuses/${tankId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tank statuses');
  }
  return response.json();
};
