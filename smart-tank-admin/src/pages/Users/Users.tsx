import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCustomersAndStoreAdmins } from "../../services/userService";
import type { Customer } from "../../types/Customer";
import UserListTable from "../../components/users/UserListTable";
import SearchIcon from "@mui/icons-material/Search";

const roleOptions = ["All", "Customer", "StoreAdmin"];

const Users = () => {
  const [allUsers, setAllUsers] = useState<Customer[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  // Fetch users on component mount
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const users = await getAllCustomersAndStoreAdmins(token); // ✅ Already filters out admins
      setAllUsers(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Apply role and search filters
  const applyFilters = () => {
    const filtered = allUsers.filter((user) => {
      const matchesRole =
        selectedRole === "All" || user.userType === selectedRole;
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && matchesSearch;
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedRole, allUsers]);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Registered Users
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search by name, email or username"
          variant="outlined"
          size="small"
          sx={{ minWidth: 280 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Filter by Role"
          select
          size="small"
          sx={{ minWidth: 180 }}
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {roleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      <UserListTable users={filteredUsers} />
    </Box>
  );
};

export default Users;
