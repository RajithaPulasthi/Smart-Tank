import { Box } from "@mui/material";
import SidebarLayout from "../../components/layout/SidebarLayout";
import TopBar from "../../components/layout/Topbar";
import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <TopBar onToggleSidebar={() => setCollapsed(!collapsed)} />
      <SidebarLayout collapsed={collapsed} />
      <Box
        sx={{
          ml: collapsed ? 10 : 30,
          mt: 10,
          p: 3,
          transition: "margin-left 0.3s",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default ProtectedLayout;
