export interface Device {
  id: number;
  serialNumber: string;
  tankId?: number;
  isAssigned: boolean;
  status: string;
}

export interface AssignDeviceRequest {
  tankId: number;
  serialNumber: string;
  password: string;
}
