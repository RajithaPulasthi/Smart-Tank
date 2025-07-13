import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../../services/userService";
import type { Customer } from "../../types/Customers";
import UserListTable from "../../components/users/UserListTable";

const Users = () => {
  const [users, setUsers] = useState<Customer[]>([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await getAllCustomers(token);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Registered Website Users
      </Typography>
      <UserListTable users={users} />
    </Box>
  );
};

export default Users;
