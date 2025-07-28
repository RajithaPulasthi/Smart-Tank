import { Box } from "@mui/material";
import TopBar from "../../components/layout/TopBar";
import Sidebar from "../../components/layout/Sidebar";
import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <TopBar onToggleSidebar={handleToggleSidebar} />
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Sidebar collapsed={sidebarCollapsed} />
        <Box
          component="main"
          sx={{
            flex: 1,
            backgroundColor: "#f0f2f5",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default ProtectedLayout;
