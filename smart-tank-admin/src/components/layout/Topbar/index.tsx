import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

type TopBarProps = {
  onToggleSidebar: () => void;
};

const TopBar = ({ onToggleSidebar }: TopBarProps) => {
  return (
    <AppBar position="fixed" elevation={2} sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            Smart Tank
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>DP</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
