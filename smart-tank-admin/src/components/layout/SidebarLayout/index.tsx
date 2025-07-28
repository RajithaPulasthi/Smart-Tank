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
  ShoppingCart,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface SidebarLayoutProps {
  collapsed: boolean;
}

const SidebarLayout = ({ collapsed }: SidebarLayoutProps) => {
  const [adminOpen, setAdminOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Use strict or startsWith matching to avoid overlaps
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const menuItems = [
    { label: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    {
      label: "Admin Panel",
      icon: <Settings />,
      children: [
        { label: "User", icon: <People />, path: "/admin/user" },
        { label: "Permission", icon: <Lock />, path: "/admin/permission" },
      ],
    },
    {
      label: "Users",
      icon: <People />,
      children: [
        {
          label: "Customers",
          icon: <People />,
          path: "/users/customer",
        },
        {
          label: "Store Admins",
          icon: <People />,
          path: "/users/store-admin",
        },
      ],
    },
    { label: "Store", icon: <Store />, path: "/store" },
    { label: "Fish", icon: <Pets />, path: "/fish" },
    { label: "Orders", icon: <ShoppingCart />, path: "/orders" },
    { label: "Device", icon: <AccountTree />, path: "/device" },
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
                selected={item.children.some((child) => isActive(child.path))}
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
