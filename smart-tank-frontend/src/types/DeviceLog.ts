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
  id: string | null;
  serialNumber: string;
  status: string;
  temperature: string;
  ph: string;
  uptime: number;
  lastSeen: string;
}
