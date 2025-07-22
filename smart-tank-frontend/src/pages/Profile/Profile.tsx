import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";
import AuthService, {
  type UserDetailsResponse,
  type UpdateUserCredentials,
} from "../../services/authService";

// Mock data for testing when backend is not available
const mockUserDetails: UserDetailsResponse = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St, City, State 12345",
  phone: "+1 (555) 123-4567",
  userName: "johndoe",
  status: "ACTIVE",
  userType: "CUSTOMER",
};

const Profile = () => {
  const [userDetails, setUserDetails] = useState<UserDetailsResponse | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState<UpdateUserCredentials>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Check if user is authenticated first
        if (!AuthService.isAuthenticated()) {
          console.log("User not authenticated, redirecting to signin");
          navigate("/signin");
          return;
        }

        const currentUser = AuthService.getUser();
        console.log("Current user from localStorage:", currentUser);
        console.log("Full localStorage contents:", {
          token: localStorage.getItem("token"),
          user: localStorage.getItem("user"),
          authorities: localStorage.getItem("authorities"),
        });

        if (!currentUser) {
          console.log("No user found, redirecting to signin");
          navigate("/signin");
          return;
        }

        // Check if user has id property and log the full structure
        console.log("User object keys:", Object.keys(currentUser));
        console.log("User ID type:", typeof currentUser.id);
        console.log("User ID value:", currentUser.id);

        if (!currentUser.id && currentUser.id !== 0) {
          console.log("User ID is missing or invalid:", currentUser);
          setError("User ID is missing. Please sign in again.");
          return;
        }

        // Test backend connection first
        const isConnected = await AuthService.testConnection();
        if (!isConnected) {
          console.log(
            "Backend connection test failed, using mock data for development"
          );
          // Use mock data when backend is not available
          setUserDetails(mockUserDetails);
          setEditForm({
            firstName: mockUserDetails.firstName || "",
            lastName: mockUserDetails.lastName || "",
            email: mockUserDetails.email || "",
            address: mockUserDetails.address || "",
            phone: mockUserDetails.phone || "",
          });
          setError(
            "Note: Backend is not available. Showing mock data for development."
          );
          return;
        }

        console.log("Fetching user details for ID:", currentUser.id);
        const details = await AuthService.getUserDetails(currentUser.id);
        console.log("User details received:", details);

        setUserDetails(details);
        setEditForm({
          firstName: details.firstName || "",
          lastName: details.lastName || "",
          email: details.email || "",
          address: details.address || "",
          phone: details.phone || "",
        });
      } catch (err) {
        console.error("Error fetching user details:", err);
        console.error(
          "Error stack:",
          err instanceof Error ? err.stack : "No stack"
        );
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load user details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleInputChange =
    (field: keyof UpdateUserCredentials) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear messages when user starts typing
      if (error) setError("");
      if (success) setSuccess("");
    };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    if (userDetails) {
      setEditForm({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        address: userDetails.address || "",
        phone: userDetails.phone || "",
      });
    }
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!editForm.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!editForm.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!editForm.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm() || !userDetails) return;

    setSaving(true);
    try {
      const updatedUser = await AuthService.updateUserDetails(
        userDetails.id,
        editForm
      );
      setUserDetails(updatedUser);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const formatMemberSince = () => {
    // You can customize this based on your user data structure
    return "May, 2025"; // Placeholder - replace with actual date logic
  };

  if (loading) {
    return (
      <>
        <SmartNavbar />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress size={50} />
          </Box>
        </Container>
        <SmartFooter />
      </>
    );
  }

  if (!userDetails) {
    return (
      <>
        <SmartNavbar />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Alert severity="error">
            Failed to load user details. Please try refreshing the page.
          </Alert>
        </Container>
        <SmartFooter />
      </>
    );
  }

  return (
    <>
      <SmartNavbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {/* Profile Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: "2rem",
                fontWeight: "bold",
                bgcolor: "primary.main",
                mr: 3,
              }}
            >
              {userDetails.firstName?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {userDetails.fullName ||
                  `${userDetails.firstName} ${userDetails.lastName}`}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Email Address: {userDetails.email}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Mobile Number: {userDetails.phone || "Not provided"}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Location: {userDetails.address || "Not provided"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Member Since: {formatMemberSince()}
              </Typography>
            </Box>
            {!isEditing && (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ alignSelf: "flex-start" }}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Messages */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Edit Form */}
          {isEditing && (
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Edit Profile
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <SmartTextInput
                      label="First Name"
                      fullWidth
                      value={editForm.firstName}
                      onChange={handleInputChange("firstName")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "action.active" }} />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Enter your first name"
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <SmartTextInput
                      label="Last Name"
                      fullWidth
                      value={editForm.lastName}
                      onChange={handleInputChange("lastName")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "action.active" }} />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Enter your last name"
                    />
                  </Box>
                </Box>

                <SmartTextInput
                  label="Email"
                  type="email"
                  fullWidth
                  value={editForm.email}
                  onChange={handleInputChange("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "action.active" }} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter your email address"
                />

                <SmartTextInput
                  label="Phone Number"
                  fullWidth
                  value={editForm.phone}
                  onChange={handleInputChange("phone")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "action.active" }} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter your phone number"
                />

                <SmartTextInput
                  label="Address"
                  fullWidth
                  multiline
                  rows={3}
                  value={editForm.address}
                  onChange={handleInputChange("address")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 1 }}
                      >
                        <HomeIcon sx={{ color: "action.active" }} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter your address"
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  startIcon={
                    saving ? <CircularProgress size={16} /> : <SaveIcon />
                  }
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
      <SmartFooter />
    </>
  );
};

export default Profile;
