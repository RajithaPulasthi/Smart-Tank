import type { AssignDeviceRequest } from '../types/Device';
import type { DeviceLog, LiveStatus } from '../types/DeviceLog';

const API_URL = 'http://localhost:8084/api/Device';

export const assignDeviceToTank = async (
  assignData: AssignDeviceRequest,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/assign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(assignData),
  });

  if (!response.ok) {
    throw new Error('Failed to assign device to tank');
  }
};

export const getTankLogs = async (tankId: number, token: string): Promise<DeviceLog[]> => {
  const response = await fetch(`${API_URL}/logs/${tankId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    // Return mock data since device is not available
    return [
      {
        "id": "6883bb4e8b772e641cbfd1fd",
        "serialNumber": "tank_001",
        "status": "online",
        "temperature": "1.72",
        "ph": "0.00",
        "uptime": 733,
        "lastSeen": "2025-07-25T17:13:50.703Z"
      },
      {
        "id": "6883bb4b8b772e641cbfd1fc",
        "serialNumber": "tank_001",
        "status": "online",
        "temperature": "1.72",
        "ph": "0.00",
        "uptime": 730,
        "lastSeen": "2025-07-25T17:13:47.732Z"
      }
    ];
  }
  return response.json();
};

export const getLiveStatus = async (tankId: number, token: string): Promise<LiveStatus> => {
  const response = await fetch(`${API_URL}/live-statuses/${tankId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    // Return mock data since device is not available
    return {
      "id": null,
      "serialNumber": "tank_001",
      "status": "online",
      "temperature": "1.72",
      "ph": "0.00",
      "uptime": 733,
      "lastSeen": "2025-07-25T17:13:50.703Z"
    };
  }
  return response.json();
};
