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
import AuthService from "../../../../services/authService";
import SmartButton from "../../atoms/SmartButtons";

const pages = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Aquariums", path: "/aquariums" },
  { label: "Find Fish", path: "/find-fish" },
  { label: "Water Condition", path: "/water-condition" },
  { label: "Contact Us", path: "/contactUs" },
];

function SmartNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<{
    fullName: string;
    userName: string;
  } | null>(null);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // Check authentication status on component mount and route changes
  React.useEffect(() => {
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      const userData = AuthService.getUser();
      setIsAuthenticated(authenticated);
      setUser(userData);
    };

    checkAuth();
    // Listen for storage changes (when user logs in from another tab)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [location]);

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

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    handleCloseUserMenu();
    navigate("/");
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        // Dark, modern background
        background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        // Ensure text color is light for the dark background
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={SmartTankLogo}
            alt="Smart Tank Logo"
            sx={{
              width: { xs: 100, md: 150 },
              cursor: "pointer",
              mr: { xs: 1, md: 3 },
              // Since the logo is white, no filter is needed on a dark background
            }}
            onClick={handleLogoClick}
          />

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
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
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  background: "rgba(31, 41, 55, 0.9)", // Dark glassmorphism
                  backdropFilter: "blur(10px)",
                  borderRadius: "10px",
                  color: "white",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  sx={{
                    fontWeight:
                      location.pathname === page.path ? "bold" : "normal",
                    color:
                      location.pathname === page.path
                        ? "primary.light"
                        : "inherit",
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => navigate(page.path)}
                sx={{
                  my: 2,
                  color:
                    location.pathname === page.path ? "primary.light" : "white",
                  display: "block",
                  fontWeight: location.pathname === page.path ? 700 : 500,
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: "-5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "primary.light",
                    transition: "width 0.3s ease-in-out",
                    ...(location.pathname === page.path && { width: "70%" }),
                  },
                  "&:hover:after": {
                    width: "70%",
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* User/Auth Section */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.fullName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <SmartButton
                text="Login"
                type="button"
                onClick={handleLogin}
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "white",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                }}
              />
            )}
            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  background: "rgba(31, 41, 55, 0.9)", // Dark glassmorphism
                  backdropFilter: "blur(10px)",
                  borderRadius: "10px",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                  color: "white",
                },
              }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/order-history")}>
                <Typography textAlign="center">Order History</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default SmartNavbar;
