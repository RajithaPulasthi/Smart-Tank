export interface Threshold {
  minTemperature: number;
  maxTemperature: number;
  minPh: number;
  maxPh: number;
}

export interface TankStatus {
  serialNumber: string;
  status: string;
  temperature: number | null;
  ph: number | null;
  uptime: number;
  lastSeen: string;
  message: string;
}
