import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Dashboard,
  Settings,
  People,
  Store,
  Pets,
  ExpandLess,
  ExpandMore,
  Menu,
  AccountTree,
  Lock,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FC } from "react";

interface SidebarLayoutProps {
  collapsed: boolean;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ collapsed }) => {
  const [adminOpen, setAdminOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  const menuItems = [
    { label: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    {
      label: "Admin Panel",
      icon: <Settings />,
      children: [
        { label: "User", icon: <People />, path: "/admin/user" },
        { label: "Device", icon: <AccountTree />, path: "/admin/device" },
        { label: "Permission", icon: <Lock />, path: "/admin/permission" },
      ],
    },
    { label: "Users", icon: <People />, path: "/user" },
    { label: "Store", icon: <Store />, path: "/store" },
    { label: "Aquarium", icon: <Pets />, path: "/aquarium" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 64 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 64 : 240,
          boxSizing: "border-box",
          transition: "width 0.3s",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <IconButton onClick={() => {}}>
          <Menu />
        </IconButton>
        {!collapsed && (
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
            Smart Tank
          </Typography>
        )}
      </Box>

      <List>
        {menuItems.map((item, index) =>
          item.children ? (
            <Box key={index}>
              <ListItemButton
                onClick={() => setAdminOpen(!adminOpen)}
                selected={isActive("/admin")}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
                {!collapsed && (adminOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              <Collapse in={adminOpen}>
                {item.children.map((child, i) => (
                  <ListItemButton
                    key={i}
                    sx={{ pl: collapsed ? 2 : 4 }}
                    onClick={() => navigate(child.path)}
                    selected={isActive(child.path)}
                  >
                    <ListItemIcon>{child.icon}</ListItemIcon>
                    {!collapsed && <ListItemText primary={child.label} />}
                  </ListItemButton>
                ))}
              </Collapse>
            </Box>
          ) : (
            <ListItemButton
              key={index}
              onClick={() => navigate(item.path)}
              selected={isActive(item.path)}
            >
              <Tooltip title={collapsed ? item.label : ""} placement="right">
                <ListItemIcon>{item.icon}</ListItemIcon>
              </Tooltip>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          )
        )}
      </List>
    </Drawer>
  );
};

export default SidebarLayout;
