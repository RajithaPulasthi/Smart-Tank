import type { User } from "../types/User";
import type { Customer } from "../types/Customer";

const PUBLIC_USERS_API = "http://localhost:8080/api/Users"; 
const API_BASE = "http://localhost:8080/api/Users"; 

export const getAllAdminsFromUsersList = async (
  token: string
): Promise<Customer[]> => {
  const res = await fetch(PUBLIC_USERS_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: Customer[] = await res.json();

  return data.filter((user) => user.userType === "Admin");
};

export const saveUser = async (
  user: User,
  token: string
): Promise<boolean> => {
  const method = user.id ? "PUT" : "POST";
  const url = user.id ? `${API_BASE}/${user.id}` : API_BASE;
  const payload: Partial<User> = {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    email: user.email,
    userName: user.userName,
    password: user.password,
    userType: user.userType,
    status: user.status,
  };
  if (user.id) payload.id = user.id;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
};

export const getAllUsers = async (token: string): Promise<Customer[]> => {
  const res = await fetch(PUBLIC_USERS_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const saveAdminUser = async (user: User, token: string): Promise<boolean> => {
  try {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address ?? "",
      email: user.email,
      userName: user.userName,
      password: user.password ?? "1234", // default/fallback password
      userType: 2, // Store Admin (corrected from 1)
      status: 1    // Active
    };

    const res = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status === 409) {
        throw new Error("A user with this email or username already exists. Please use different email or username.");
      }
      
      // Try to get the error message from the response
      let errorMessage = `Failed to create user: ${res.status} ${res.statusText}`;
      try {
        const errorData = await res.text();
        if (errorData) {
          errorMessage = errorData;
        }
      } catch (e) {
        // If we can't parse the error, use the default message
      }
      
      throw new Error(errorMessage);
    }

    // Check if the response has content
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const responseData = await res.json();
      console.log("User created successfully:", responseData);
    }

    return true;
  } catch (error) {
    console.error("Error in saveAdminUser:", error);
    throw error; // Re-throw the error so it can be handled by the calling component
  }
};

export const updateUserStatus = async (
  userId: number,
  statusId: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/${userId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ statusId }),
  });

  return res.ok;
};

export const updateUserDetails = async (
  userId: number,
  updates: { firstName: string; lastName: string; email: string },
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  return res.ok;
};


/**
 * Public users: Fetch all customers & store admins.
 */
export const getAllCustomersAndStoreAdmins = async (
  token: string
): Promise<Customer[]> => {
  const res = await fetch(PUBLIC_USERS_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: Customer[] = await res.json();

  // Filter only Customer and StoreAdmin users
  return data.filter((user) =>
    ["Customer", "StoreAdmin"].includes(user.userType)
  );
};

export const getAllCustomers = async (token: string): Promise<Customer[]> => {
  const users = await getAllUsers(token);
  return users.filter(
    (user) => user.userType && user.userType.toLowerCase() === "customer"
  );
};

export const getAllStoreAdmins = async (token: string): Promise<Customer[]> => {
  const users = await getAllUsers(token);
  return users.filter(
    (user) => user.userType && user.userType.toLowerCase() === "storeadmin"
  );
};
