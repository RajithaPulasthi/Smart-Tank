import type { Tank } from '../types/Tank';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy tank data
const dummyTanks: Tank[] = [
  {
    id: 1,
    userId: 1,
    name: "Living Room Aquarium",
    capacity: 50,
    volume: 45,
    location: "Living Room",
    description: "Beautiful 50-gallon community tank with tropical fish"
  },
  {
    id: 2,
    userId: 1,
    name: "Office Reception Tank",
    capacity: 75,
    volume: 70,
    location: "Office Reception",
    description: "Professional display tank for office environment"
  },
  {
    id: 3,
    userId: 2,
    name: "Bedroom Mini Tank",
    capacity: 20,
    volume: 18,
    location: "Bedroom",
    description: "Small peaceful tank with betta fish"
  },
  {
    id: 4,
    userId: 3,
    name: "Kids Room Fun Tank",
    capacity: 30,
    volume: 25,
    location: "Kids Room",
    description: "Colorful tank designed for children's room"
  }
];

export const getTanksByUserId = async (userId: number, _token: string): Promise<Tank[]> => {
  await delay(600);
  
  try {
    // Filter tanks by userId
    const userTanks = dummyTanks.filter(tank => tank.userId === userId);
    return [...userTanks]; // Return copy
  } catch (error) {
    console.error("Error fetching tanks:", error);
    throw new Error("Failed to fetch tanks");
  }
};

export const createTank = async (tankData: Omit<Tank, 'id' | 'userId'>, userId: number, _token: string): Promise<Tank> => {
  await delay(1000);
  
  try {
    const newTank: Tank = {
      ...tankData,
      id: Date.now(), // Simple ID generation
      userId
    };
    
    // In demo mode, we don't persist data, but we can simulate success
    console.log("Demo: Tank created successfully", newTank);
    
    return newTank;
  } catch (error) {
    console.error("Error creating tank:", error);
    throw new Error("Failed to create tank");
  }
};

export const getTankById = async (tankId: number, _token: string): Promise<Tank | null> => {
  await delay(400);
  
  try {
    const tank = dummyTanks.find(tank => tank.id === tankId);
    return tank || null;
  } catch (error) {
    console.error("Error fetching tank:", error);
    throw new Error("Failed to fetch tank");
  }
};

export const updateTank = async (tankId: number, updateData: Partial<Tank>, _token: string): Promise<Tank> => {
  await delay(800);
  
  try {
    const existingTank = dummyTanks.find(tank => tank.id === tankId);
    if (!existingTank) {
      throw new Error("Tank not found");
    }
    
    const updatedTank: Tank = { ...existingTank, ...updateData };
    console.log("Demo: Tank updated successfully", updatedTank);
    
    return updatedTank;
  } catch (error) {
    console.error("Error updating tank:", error);
    throw new Error("Failed to update tank");
  }
};

export const deleteTank = async (tankId: number, _token: string): Promise<{ success: boolean; message: string }> => {
  await delay(600);
  
  try {
    const tankExists = dummyTanks.some(tank => tank.id === tankId);
    if (!tankExists) {
      throw new Error("Tank not found");
    }
    
    console.log("Demo: Tank deleted successfully", tankId);
    
    return {
      success: true,
      message: "Tank deleted successfully (Demo mode)"
    };
  } catch (error) {
    console.error("Error deleting tank:", error);
    throw new Error("Failed to delete tank");
  }
};
