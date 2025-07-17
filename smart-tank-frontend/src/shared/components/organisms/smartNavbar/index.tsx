import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SmartTankLogo from "../../../../assets/SmartTankLogo.png";

const pages = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Aquariums", path: "/aquariums" },
  { label: "Find Fish", path: "/find-fish" },
  { label: "Water Condition", path: "/water-condition" },
  { label: "Contact Us", path: "/contactUs" },
];
const settings = ["Profile", "Logout"];

function SmartNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#0043A6",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={SmartTankLogo}
            alt="Smart Tank Logo"
            style={{
              width: "150px",
              cursor: "pointer",
              marginRight: "24px",
              marginLeft: "100px",
            }}
            onClick={handleLogoClick}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                >
                  <Typography
                    textAlign="center"
                    fontWeight={location.pathname === page.path ? 700 : 500}
                    color={
                      location.pathname === page.path ? "#1976d2" : "inherit"
                    }
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Button
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  sx={{
                    my: 2,
                    mx: 1,
                    color: isActive ? "#FBFD0FF" : "white",
                    fontWeight: isActive ? 700 : 600,
                    fontSize: "1rem",
                    borderBottom: isActive ? "2px solid #FBFD0FF" : "none",
                    borderRadius: 0,
                    "&:hover": {
                      color: "#FBFD0FF",
                    },
                  }}
                >
                  {page.label}
                </Button>
              );
            })}
          </Box>

          {/* Avatar / User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid white",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" fontWeight={500}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SmartNavbar;
