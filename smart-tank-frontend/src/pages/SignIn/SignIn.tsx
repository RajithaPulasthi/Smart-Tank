import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Link,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";
import AuthService from "../../services/authService";

const SignIn = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from sign-up redirect
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear error when user starts typing
      if (error) setError("");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.emailOrUsername || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting to login with:", {
        userName: formData.emailOrUsername,
        password: "***", // Don't log actual password
      });

      await AuthService.login({
        userName: formData.emailOrUsername,
        password: formData.password,
      });

      console.log("Login successful!");
      // Navigate to home page on successful login
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log("Google sign in clicked");
  };

  const isEmailFormat = (value: string) => {
    return value.includes("@");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", py: 4 }}>
      {/* Back to Home Button */}
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Back to Home
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "2px solid #e0e0e0",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 4, color: "#1a1a1a" }}
          >
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            {successMessage && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {successMessage}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <SmartTextInput
              label="Email or Username"
              fullWidth
              margin="normal"
              value={formData.emailOrUsername}
              onChange={handleInputChange("emailOrUsername")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isEmailFormat(formData.emailOrUsername) ? (
                      <EmailIcon sx={{ color: "action.active" }} />
                    ) : (
                      <PersonIcon sx={{ color: "action.active" }} />
                    )}
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your email or username"
              autoComplete="username"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                },
              }}
            />

            <SmartTextInput
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mb: 3,
                py: 1.8,
                borderRadius: 2,
                textTransform: "uppercase",
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                "&:disabled": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "SIGN IN"
              )}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                OR
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                mb: 4,
                py: 1.8,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderColor: "#db4437",
                color: "#db4437",
                "&:hover": {
                  borderColor: "#c23321",
                  backgroundColor: "#fef7f7",
                },
              }}
            >
              Login with Google
            </Button>

            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/signup")}
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Signup
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
