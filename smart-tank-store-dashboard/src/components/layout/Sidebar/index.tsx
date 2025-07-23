import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Pets as FishIcon,
  Spa as TankIcon,
  Chat as ChatIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Store } from "../../../types/Store";

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storeData = localStorage.getItem("currentStore");
    if (storeData) setCurrentStore(JSON.parse(storeData));
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Store", icon: <StoreIcon />, path: "/store" },
    { label: "Fish List", icon: <FishIcon />, path: "/fish" },
    { label: "Tanks", icon: <TankIcon />, path: "/tanks" },
    { label: "Customer Chats", icon: <ChatIcon />, path: "/chats" },
    { label: "Users", icon: <UsersIcon />, path: "/users" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Box
      sx={{
        width: collapsed ? 64 : 240,
        height: "100vh",
        backgroundColor: "white",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
      }}
    >
      {/* Store Header */}
      <Box
        sx={{
          p: collapsed ? 1.5 : 2,
          backgroundColor: "#1976d2",
          color: "white",
          textAlign: "left",
          overflow: "hidden",
        }}
      >
        {!collapsed && (
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ fontSize: "1.125rem" }}
          >
            {currentStore?.name || "Shop 1"}
          </Typography>
        )}
        {collapsed && (
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ fontSize: "1.125rem", textAlign: "center" }}
          >
            S1
          </Typography>
        )}
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, pt: 1 }}>
        <List component="nav" sx={{ px: 0 }}>
          {menuItems.map((item, index) => (
            <Tooltip
              key={index}
              title={collapsed ? item.label : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isActive(item.path)}
                sx={{
                  mx: 0,
                  px: collapsed ? 1.5 : 2,
                  py: 1.5,
                  justifyContent: collapsed ? "center" : "flex-start",
                  "&.Mui-selected": {
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    "& .MuiListItemIcon-root": {
                      color: "#1976d2",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path) ? "#1976d2" : "#666",
                    minWidth: collapsed ? "auto" : 40,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: isActive(item.path) ? 600 : 400,
                      color: isActive(item.path) ? "#1976d2" : "#333",
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
