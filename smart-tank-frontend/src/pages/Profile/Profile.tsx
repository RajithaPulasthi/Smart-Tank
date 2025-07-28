import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Button,
  Alert,
  CircularProgress,
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
import AuthService from "../../services/authService";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<{
    id: number;
    fullName: string;
    email: string;
    address: string;
    phone: string;
    userName: string;
    status: string;
    userType: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const splitFullName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: "" };
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");
    return { firstName, lastName };
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const user = AuthService.getUser();
        if (!user) {
          navigate("/signin");
          return;
        }

        try {
          const details = await AuthService.getUserDetails(user.id);
          setUserDetails({
            ...details,
            address: details.address || "",
          });

          const { firstName: fName, lastName: lName } = splitFullName(
            details.fullName
          );
          setFirstName(fName);
          setLastName(lName);
          setEmail(details.email);
          setAddress(details.address || "");
          setPhone(details.phone || "");
        } catch {
          const mockData = {
            id: 1,
            fullName: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St, City, State 12345",
            phone: "+1 (555) 123-4567",
            userName: "johndoe",
            status: "Active",
            userType: "Customer",
          };
          setUserDetails(mockData);

          const { firstName: fName, lastName: lName } = splitFullName(
            mockData.fullName
          );
          setFirstName(fName);
          setLastName(lName);
          setEmail(mockData.email);
          setAddress(mockData.address || "");
          setPhone(mockData.phone || "");
        }
      } catch {
        setError("Failed to load user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [navigate]);

  const handleSave = async () => {
    if (!userDetails) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

      setUserDetails({
        ...userDetails,
        fullName,
        address: address.trim(),
        phone: phone.trim(),
      });

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
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
            <CircularProgress size={60} />
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
            Failed to load user profile. Please try refreshing the page.
          </Alert>
        </Container>
        <SmartFooter />
      </>
    );
  }

  return (
    <>
      <SmartNavbar />
      <Container maxWidth="md" sx={{ py: 8 }}>
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

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Profile
            </Typography>

            <Box display="flex" gap={2}>
              {!isEditing ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{
                    borderColor: "#00c0ff",
                    color: "#00c0ff",
                    "&:hover": {
                      borderColor: "#0077ff",
                      backgroundColor: "rgba(0, 192, 255, 0.1)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                      background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #0077ff, #0056cc)",
                      },
                    }}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              {userDetails.fullName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {userDetails.fullName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userDetails.userType} • {userDetails.status}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/tanks")}
              sx={{
                mb: 2,
                background: "linear-gradient(45deg, #ff9800, #f57c00)",
                "&:hover": {
                  background: "linear-gradient(45deg, #f57c00, #e65100)",
                },
              }}
            >
              View My Tanks
            </Button>
          </Box>

          <Box display="flex" flexDirection="column" gap={3}>
            <SmartTextInput
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#00c0ff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-input": { color: "#1e293b" } }}
            />

            <SmartTextInput
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#00c0ff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-input": { color: "#1e293b" } }}
            />

            <SmartTextInput
              label="Email Address"
              value={email}
              disabled={true}
              helperText="Email address cannot be changed"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#00c0ff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-input": { color: "#1e293b" } }}
            />

            <SmartTextInput
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#00c0ff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-input": { color: "#1e293b" } }}
            />

            <SmartTextInput
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditing}
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ alignSelf: "flex-start", mt: 1 }}
                  >
                    <HomeIcon sx={{ color: "#00c0ff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-input": { color: "#1e293b" } }}
            />
          </Box>
        </Paper>
      </Container>
      <SmartFooter />
    </>
  );
};

export default Profile;
