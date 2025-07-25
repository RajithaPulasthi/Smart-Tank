import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import StatCard from "../../components/dashboard/StatCard";
import UserRegistrationChart from "../../components/dashboard/UserRegistrationChart";
import DateRangePicker from "../../components/dashboard/DateRangePicker";
import { getActiveStores, getAllStores } from "../../services/storeService";
import { getAllCustomers } from "../../services/userService";

const Dashboard = () => {
  const [storeStats, setStoreStats] = useState({
    active: 0,
    total: 0,
  });
  const [customerCount, setCustomerCount] = useState(0);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const [activeStores, allStores, customers] = await Promise.all([
          getActiveStores(token),
          getAllStores(token),
          getAllCustomers(token),
        ]);

        setStoreStats({
          active: activeStores.length,
          total: allStores.length,
        });
        setCustomerCount(customers.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container>
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <StatCard title="Total Fish Count" value={140} />
        <StatCard title="Active Devices" value={358} />
        <StatCard title="Customers" value={customerCount} />
        <StatCard title="Active Stores" value={storeStats.active} />
        <StatCard title="Total Stores" value={storeStats.total} />
      </Box>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <Box mt={2}>
        <UserRegistrationChart startDate={startDate} endDate={endDate} />
      </Box>
    </Container>
  );
};

export default Dashboard;
