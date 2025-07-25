import type { Tank } from '../types/Tank';

const API_URL = 'http://localhost:8084/api/Tanks';

export const getTanksByUserId = async (userId: number, token: string): Promise<Tank[]> => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (response.status === 404) {
    // No tanks found for this user - return empty array
    return [];
  }
  
  if (!response.ok) {
    throw new Error('Failed to fetch tanks');
  }
  return response.json();
};

export const createTank = async (tankData: Omit<Tank, 'id' | 'userId'>, userId: number, token: string): Promise<Tank> => {
    const tankPayload = {
        ...tankData,
        userId,
    };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(tankPayload),
  });
  if (!response.ok) {
    throw new Error('Failed to create tank');
  }
  return response.json();
};
