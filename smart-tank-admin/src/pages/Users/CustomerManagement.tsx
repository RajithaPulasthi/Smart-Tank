import { Box, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { getAllCustomers } from "../../services/userService";
import type { Customer } from "../../types/Customer";
import UserListTable from "../../components/users/UserListTable";
import UserSearch from "../../components/users/UserSearch";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCustomers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const customerData = await getAllCustomers(token);
      setCustomers(customerData);
      setFilteredCustomers(customerData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilter = useCallback(() => {
    const filtered = customers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    applyFilter();
  }, [searchTerm, customers, applyFilter]);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Customer Management
      </Typography>

      <UserSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by name, email, or username"
      />

      <UserListTable users={filteredCustomers} loading={loading} />
    </Box>
  );
};

export default CustomerManagement;
