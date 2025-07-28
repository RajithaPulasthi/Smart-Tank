import { Tank } from "../types/Tank";
import { Tank } from "../types/Tank";
import axios from "axios";

const API_BASE_URL = "http://localhost:8084/api/Tanks";

export const createTank = async (tank: Omit<Tank, "id">): Promise<Tank> => {
  const response = await axios.post(API_BASE_URL, tank);
  return response.data;
};

export const getTanksByUserId = async (userId: number): Promise<Tank[]> => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
  return response.data;
};
