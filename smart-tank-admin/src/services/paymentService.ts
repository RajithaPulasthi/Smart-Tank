import type { Payment } from "../types/Payment";

const API_BASE = "http://localhost:8080/api/Payments";

export const getAllPayments = async (token: string): Promise<Payment[]> => {
  try {
    const response = await fetch(`${API_BASE}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication failed. Please login again.");
      }
      if (response.status === 403) {
        throw new Error("Access denied. Insufficient permissions.");
      }
      throw new Error(`Failed to fetch payments: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching payments:", error);
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Network error: Cannot connect to the server. Please check if the API server is running.");
    }
    throw error;
  }
};

export const updatePaymentStatus = async (
  paymentId: number,
  status: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/status/${paymentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(status),
    });

    if (!response.ok) {
      throw new Error(`Failed to update payment status: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

export const getPendingPayments = async (token: string): Promise<Payment[]> => {
  const payments = await getAllPayments(token);
  return payments.filter((payment) => payment.status === "Pending");
};

export const getApprovedPayments = async (token: string): Promise<Payment[]> => {
  const payments = await getAllPayments(token);
  return payments.filter((payment) => payment.status === "Approved");
};

export const getRejectedPayments = async (token: string): Promise<Payment[]> => {
  const payments = await getAllPayments(token);
  return payments.filter((payment) => payment.status === "Rejected");
};
