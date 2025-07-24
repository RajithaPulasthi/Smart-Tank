import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { getAllStoreAdmins, saveAdminUser } from "../../services/userService";
import type { Customer } from "../../types/Customer";
import type { User } from "../../types/User";
import UserListTable from "../../components/users/UserListTable";
import UserSearch from "../../components/users/UserSearch";
import UserFormDialog from "../../components/admin/UserFormDialog";

const StoreAdminManagement = () => {
  const [storeAdmins, setStoreAdmins] = useState<Customer[]>([]);
  const [filteredStoreAdmins, setFilteredStoreAdmins] = useState<Customer[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchStoreAdmins = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const storeAdminData = await getAllStoreAdmins(token);
      setStoreAdmins(storeAdminData);
      setFilteredStoreAdmins(storeAdminData);
    } catch (error) {
      console.error("Error fetching store admins:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilter = useCallback(() => {
    const filtered = storeAdmins.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStoreAdmins(filtered);
  }, [storeAdmins, searchTerm]);

  useEffect(() => {
    fetchStoreAdmins();
  }, [fetchStoreAdmins]);

  useEffect(() => {
    applyFilter();
  }, [searchTerm, storeAdmins, applyFilter]);

  const handleAddUser = async (user: User) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const success = await saveAdminUser(user, token);
      if (success) {
        fetchStoreAdmins();
        setDialogOpen(false);
        alert("Store admin created successfully!");
      } else {
        alert("Failed to create store admin.");
      }
    } catch (error) {
      console.error("Error creating store admin:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred while creating the store admin.");
      }
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Store Admin Management
        </Typography>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Add New Store Admin
        </Button>
      </Box>

      <UserSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by name, email, or username"
      />

      <UserListTable users={filteredStoreAdmins} loading={loading} />

      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddUser}
        user={null}
        userType={2} // Store Admin
      />
    </Box>
  );
};

export default StoreAdminManagement;
