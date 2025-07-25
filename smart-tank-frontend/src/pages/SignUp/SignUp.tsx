import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";
import AuthService from "../../services/authService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      if (error) setError("");
    };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await AuthService.signUp({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      setSuccess(true);
      setError("");

      setTimeout(() => {
        navigate("/signin", {
          state: {
            message:
              "Account created successfully! Please sign in with your credentials.",
          },
        });
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth
    console.log("Google sign up clicked");
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
            maxWidth: 480,
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
              Create Your Account
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 1 }}>
              Join the Smart Tank community today
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Account created successfully! Redirecting to sign in...
              </Alert>
            )}

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <SmartTextInput
                label="First Name"
                fullWidth
                margin="normal"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#00c0ff" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your first name"
                autoComplete="given-name"
                sx={{
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
                label="Last Name"
                fullWidth
                margin="normal"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                placeholder="Enter your last name"
                autoComplete="family-name"
                sx={{
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
            </Box>

            <SmartTextInput
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleInputChange("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#00c0ff" }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your email address"
              autoComplete="email"
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
              autoComplete="new-password"
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
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      aria-label="toggle confirm password visibility"
                      sx={{ color: "#00c0ff" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Confirm your password"
              autoComplete="new-password"
              sx={{
                mb: 3,
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || success}
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
                  Creating Account...
                </Box>
              ) : success ? (
                "Account Created!"
              ) : (
                "Create Account"
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
              onClick={handleGoogleSignUp}
              disabled={loading || success}
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
                "&:disabled": {
                  borderColor: "#e2e8f0",
                  color: "#9e9e9e",
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
              Already have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/signin")}
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
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
