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
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        position: "relative",
        py: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: [
            "radial-gradient(circle at 20% 20%, rgba(0, 192, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(0, 119, 255, 0.05) 0%, transparent 50%)",
          ].join(", "),
          zIndex: 0,
        },
      }}
    >
      {/* Back to Home Button */}
      <Box sx={{ position: "absolute", top: 20, left: 20, zIndex: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              color: "#00c0ff",
              background: "rgba(0, 192, 255, 0.1)",
            },
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
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 450,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(0, 192, 255, 0.2)",
            p: 5,
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Smart Tank Logo/Title */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Smart Tank
            </Typography>
            <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: 600 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 1 }}>
              Sign in to your account to continue
            </Typography>
          </Box>

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
                      <EmailIcon sx={{ color: "#00c0ff" }} />
                    ) : (
                      <PersonIcon sx={{ color: "#00c0ff" }} />
                    )}
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your email or username"
              autoComplete="username"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "#f8fafc",
                  border: "2px solid #e2e8f0",
                  "&:hover": {
                    borderColor: "#00c0ff",
                  },
                  "&.Mui-focused": {
                    borderColor: "#00c0ff",
                    boxShadow: "0 0 0 3px rgba(0, 192, 255, 0.1)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#64748b",
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "#00c0ff",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#1e293b",
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
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
                      sx={{ color: "#00c0ff" }}
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
                  borderRadius: 3,
                  backgroundColor: "#f8fafc",
                  border: "2px solid #e2e8f0",
                  "&:hover": {
                    borderColor: "#00c0ff",
                  },
                  "&.Mui-focused": {
                    borderColor: "#00c0ff",
                    boxShadow: "0 0 0 3px rgba(0, 192, 255, 0.1)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#64748b",
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "#00c0ff",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#1e293b",
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
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
                  color: "#00c0ff",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#0077ff",
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
                py: 2,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 700,
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                boxShadow: "0 8px 25px rgba(0, 192, 255, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #0077ff, #0056cc)",
                  boxShadow: "0 12px 35px rgba(0, 192, 255, 0.4)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: "#94a3b8",
                  boxShadow: "none",
                  transform: "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CircularProgress size={20} color="inherit" />
                  Signing In...
                </Box>
              ) : (
                "Sign In"
              )}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography
                variant="body2"
                color="#64748b"
                sx={{ px: 2, fontWeight: 500 }}
              >
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
                py: 2,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderColor: "#e2e8f0",
                color: "#64748b",
                borderWidth: 2,
                "&:hover": {
                  borderColor: "#00c0ff",
                  backgroundColor: "rgba(0, 192, 255, 0.05)",
                  color: "#00c0ff",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Continue with Google
            </Button>

            <Typography
              variant="body1"
              color="#64748b"
              sx={{ fontWeight: 500 }}
            >
              Don't have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/signup")}
                sx={{
                  textDecoration: "none",
                  color: "#00c0ff",
                  fontWeight: 700,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#0077ff",
                  },
                }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
