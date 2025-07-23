import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import StatCard from "../../components/dashboard/StatCard";
import UserRegistrationChart from "../../components/dashboard/UserRegistrationChart";
import DateRangePicker from "../../components/dashboard/DateRangePicker";
import { getApprovedStores, getPendingStores } from "../../services/storeService";
import { getAllUsers } from "../../services/userService";

const Dashboard = () => {
  const [storeStats, setStoreStats] = useState({
    approved: 0,
    pending: 0,
  });
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const [approvedStores, pendingStores, users] = await Promise.all([
          getApprovedStores(token),
          getPendingStores(token),
          getAllUsers(token),
        ]);

        setStoreStats({
          approved: approvedStores.length,
          pending: pendingStores.length,
        });
        setUserCount(users.length);
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
        <StatCard title="Users" value={userCount} />
        <StatCard title="Approved Stores" value={storeStats.approved} />
        <StatCard title="Pending Stores" value={storeStats.pending} />
      </Box>

      <DateRangePicker />
      <Box mt={2}>
        <UserRegistrationChart />
      </Box>
    </Container>
  );
};

export default Dashboard;
