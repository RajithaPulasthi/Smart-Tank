// Dummy device and tank data for demo
export interface DeviceLog {
  id: string;
  serialNumber: string;
  status: string;
  temperature: string;
  ph: string;
  uptime: number;
  lastSeen: string;
}

export interface LiveStatus {
  tankId: number;
  serialNumber: string;
  status: string;
  temperature: number;
  ph: number;
  uptime: number;
  lastSeen: string;
}

export interface UserTank {
  id: number;
  tankName: string;
  deviceSerialNumber: string | null;
  status: string;
  userId: number;
}

export interface AssignDeviceRequest {
  serialNumber: string;
  tankId: number;
}

export const dummyDeviceLogs: DeviceLog[] = [
  {
    id: "log_001",
    serialNumber: "TANK_001",
    status: "online",
    temperature: "26.5",
    ph: "7.2",
    uptime: 1440,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 minutes ago
  },
  {
    id: "log_002", 
    serialNumber: "TANK_001",
    status: "online",
    temperature: "26.3",
    ph: "7.1",
    uptime: 1435,
    lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 minutes ago
  },
  {
    id: "log_003",
    serialNumber: "TANK_001", 
    status: "online",
    temperature: "26.7",
    ph: "7.3",
    uptime: 1430,
    lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 minutes ago
  },
  {
    id: "log_004",
    serialNumber: "TANK_002",
    status: "online", 
    temperature: "24.8",
    ph: "6.8",
    uptime: 2880,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString() // 2 minutes ago
  },
  {
    id: "log_005",
    serialNumber: "TANK_002",
    status: "online",
    temperature: "24.9",
    ph: "6.9", 
    uptime: 2875,
    lastSeen: new Date(Date.now() - 7 * 60 * 1000).toISOString() // 7 minutes ago
  },
  {
    id: "log_006",
    serialNumber: "TANK_003",
    status: "offline",
    temperature: "0.0",
    ph: "0.0",
    uptime: 0,
    lastSeen: new Date(Date.now() - 120 * 60 * 1000).toISOString() // 2 hours ago
  }
];

export const dummyLiveStatuses: LiveStatus[] = [
  {
    tankId: 1,
    serialNumber: "TANK_001", 
    status: "online",
    temperature: 26.5,
    ph: 7.2,
    uptime: 1440,
    lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString() // 1 minute ago
  },
  {
    tankId: 2,
    serialNumber: "TANK_002",
    status: "online", 
    temperature: 24.8,
    ph: 6.8,
    uptime: 2880,
    lastSeen: new Date(Date.now() - 30 * 1000).toISOString() // 30 seconds ago
  },
  {
    tankId: 3,
    serialNumber: "TANK_003",
    status: "offline",
    temperature: 0.0,
    ph: 0.0,
    uptime: 0,
    lastSeen: new Date(Date.now() - 120 * 60 * 1000).toISOString() // 2 hours ago
  }
];

export const dummyUserTanks: UserTank[] = [
  {
    id: 1,
    tankName: "Living Room Display Tank",
    deviceSerialNumber: "TANK_001",
    status: "ACTIVE",
    userId: 1
  },
  {
    id: 2,
    tankName: "Bedroom Freshwater Setup",
    deviceSerialNumber: "TANK_002", 
    status: "ACTIVE",
    userId: 1
  },
  {
    id: 3,
    tankName: "Office Saltwater Tank",
    deviceSerialNumber: "TANK_003",
    status: "MAINTENANCE",
    userId: 1
  },
  {
    id: 4,
    tankName: "Kids Room Community Tank",
    deviceSerialNumber: null,
    status: "PENDING",
    userId: 2
  },
  {
    id: 5,
    tankName: "Study Room Nano Tank",
    deviceSerialNumber: null,
    status: "PENDING", 
    userId: 2
  }
];

export const dummyAvailableDevices = [
  { serialNumber: "TANK_004", status: "available" },
  { serialNumber: "TANK_005", status: "available" },
  { serialNumber: "TANK_006", status: "available" },
  { serialNumber: "TANK_007", status: "available" },
  { serialNumber: "TANK_008", status: "available" }
];
