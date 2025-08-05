import { 
  dummyDeviceLogs, 
  dummyLiveStatuses, 
  dummyUserTanks,
  type DeviceLog,
  type LiveStatus,
  type UserTank,
  type AssignDeviceRequest
} from '../Data/dummyDevices';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getDeviceLogs = async (): Promise<DeviceLog[]> => {
  await delay(800);
  
  try {
    // Return copy of dummy data with random variations for realism
    return dummyDeviceLogs.map(log => ({
      ...log,
      temperature: (parseFloat(log.temperature) + (Math.random() - 0.5) * 0.5).toFixed(1),
      ph: (parseFloat(log.ph) + (Math.random() - 0.5) * 0.2).toFixed(1),
      lastSeen: new Date(Date.now() - Math.random() * 30 * 60 * 1000).toISOString() // Random time within last 30 mins
    }));
  } catch (error) {
    console.error("Error fetching device logs:", error);
    throw new Error("Failed to load device logs");
  }
};

export const getLiveStatus = async (): Promise<LiveStatus[]> => {
  await delay(600);
  
  try {
    // Return live status with slightly randomized values
    return dummyLiveStatuses.map(status => ({
      ...status,
      temperature: status.temperature + (Math.random() - 0.5) * 0.5,
      ph: status.ph + (Math.random() - 0.5) * 0.2,
      uptime: status.uptime + Math.floor(Math.random() * 60), // Add random minutes
      lastSeen: new Date(Date.now() - Math.random() * 10 * 60 * 1000).toISOString() // Within last 10 mins
    }));
  } catch (error) {
    console.error("Error fetching live status:", error);
    throw new Error("Failed to load live status");
  }
};

export const getUserTanks = async (): Promise<UserTank[]> => {
  await delay(500);
  
  try {
    return [...dummyUserTanks];
  } catch (error) {
    console.error("Error fetching user tanks:", error);
    throw new Error("Failed to load user tanks");
  }
};

export const assignDeviceToTank = async (token: string, request: AssignDeviceRequest): Promise<{ success: boolean; message: string }> => {
  await delay(1200);
  
  try {
    // In demo mode, always succeed
    console.log("Demo: Device assignment successful", request);
    
    return {
      success: true,
      message: `Device ${request.serialNumber} successfully assigned to tank ${request.tankId} (Demo mode)`
    };
  } catch (error) {
    console.error("Error assigning device:", error);
    throw new Error("Failed to assign device to tank");
  }
};

export const createTank = async (token: string, tankData: { tankName: string }): Promise<{ success: boolean; message: string; tankId?: number }> => {
  await delay(1000);
  
  try {
    const newTankId = Date.now(); // Simple ID generation
    
    console.log("Demo: Tank creation successful", { ...tankData, tankId: newTankId });
    
    return {
      success: true,
      message: `Tank "${tankData.tankName}" created successfully! (Demo mode)`,
      tankId: newTankId
    };
  } catch (error) {
    console.error("Error creating tank:", error);
    throw new Error("Failed to create tank");
  }
};

export const getDeviceHistory = async (serialNumber: string): Promise<DeviceLog[]> => {
  await delay(700);
  
  try {
    // Filter logs by serial number and return with some historical variation
    const filteredLogs = dummyDeviceLogs.filter(log => log.serialNumber === serialNumber);
    
    // Generate some historical data points
    const historicalLogs: DeviceLog[] = [];
    for (let i = 0; i < 10; i++) {
      const baseLog = filteredLogs[0] || dummyDeviceLogs[0];
      historicalLogs.push({
        ...baseLog,
        id: `${baseLog.id}_history_${i}`,
        temperature: (parseFloat(baseLog.temperature) + (Math.random() - 0.5) * 2).toFixed(1),
        ph: (parseFloat(baseLog.ph) + (Math.random() - 0.5) * 0.5).toFixed(1),
        lastSeen: new Date(Date.now() - i * 60 * 60 * 1000).toISOString() // Each hour back
      });
    }
    
    return historicalLogs;
  } catch (error) {
    console.error("Error fetching device history:", error);
    throw new Error("Failed to load device history");
  }
};

export const getTankLogs = async (tankId: number): Promise<DeviceLog[]> => {
  await delay(600);
  
  try {
    // Generate tank-specific logs with realistic data
    const tankLogs: DeviceLog[] = [];
    
    for (let i = 0; i < 20; i++) {
      const timestamp = new Date(Date.now() - i * 2 * 60 * 60 * 1000); // Every 2 hours
      tankLogs.push({
        id: `tank_${tankId}_log_${i}`,
        serialNumber: `TANK_${tankId.toString().padStart(3, '0')}`,
        status: i < 3 ? 'online' : Math.random() > 0.1 ? 'online' : 'offline',
        temperature: (26 + (Math.random() - 0.5) * 4).toFixed(1),
        ph: (7.0 + (Math.random() - 0.5) * 1.0).toFixed(1),
        uptime: Math.floor(Math.random() * 2000 + 500),
        lastSeen: timestamp.toISOString()
      });
    }
    
    console.log(`Demo: Generated ${tankLogs.length} logs for tank ${tankId}`);
    return tankLogs;
  } catch (error) {
    console.error("Error fetching tank logs:", error);
    throw new Error("Failed to load tank logs");
  }
};