import { Box, Container } from "@mui/material";
import { useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import TopBar from "../../components/layout/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import UserRegistrationChart from "../../components/dashboard/UserRegistrationChart";
import DateRangePicker from "../../components/dashboard/DateRangePicker";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <TopBar onToggleSidebar={() => setCollapsed(!collapsed)} />
      <SidebarLayout collapsed={collapsed} />
      <Box sx={{ ml: collapsed ? 10 : 30, mt: 10, p: 3, transition: "margin-left 0.3s" }}>
        <Container>
          <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            <StatCard title="Total Fish Count" value={140} />
            <StatCard title="Active Devices" value={358} />
            <StatCard title="Users" value={1570} />
            <StatCard title="Stores" value={75} />
            <StatCard title="Pending Stores" value={3} />
          </Box>

          <DateRangePicker />
          <Box mt={2}>
            <UserRegistrationChart />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
