import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { StoreAdmin } from "../../../types/Store";

type TopBarProps = {
  onToggleSidebar: () => void;
};

const TopBar = ({ onToggleSidebar }: TopBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentAdmin, setCurrentAdmin] = useState<StoreAdmin | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("storeAdmin");
    if (adminData) setCurrentAdmin(JSON.parse(adminData));
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("storeAdmin");
    localStorage.removeItem("currentStore");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#1976d2",
        borderBottom: "1px solid #1565c0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3, height: 64 }}>
        {/* Left side - Menu button and User Name */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="inherit" onClick={onToggleSidebar} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="body1"
            color="white"
            fontWeight="500"
            sx={{ fontSize: "1rem" }}
          >
            User Name
          </Typography>
        </Box>

        {/* Right side - Date selector and User Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small">
            <Select
              value="Today"
              displayEmpty
              sx={{
                backgroundColor: "white",
                minWidth: 120,
                height: 32,
                "& .MuiSelect-select": {
                  py: 0.5,
                  px: 1,
                  fontSize: "0.875rem",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                borderRadius: 1,
              }}
            ></Select>
          </FormControl>

          <Button
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ p: 0, minWidth: "auto" }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#ff9800",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {currentAdmin?.username === "admin1" ? "A1" : "A2"}
            </Avatar>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
