import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStoreAdmin } from "../../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginStoreAdmin({ username, password });

      if (result) {
        // Store token and user data in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        localStorage.setItem("storeAdmin", JSON.stringify(result.user)); // Add this line

        // Fetch aquarium ID
        const userId = result.user.id;
        const token = localStorage.getItem("token"); // Get the token

        if (!token) {
          console.error("Authentication token not found after login.");
          navigate("/login"); // Redirect to login if token is missing
          return;
        }

        try {
          const aquariumResponse = await fetch(`http://localhost:8082/api/Aquariums/user/${userId}`, {
            headers: {
              "Authorization": `Bearer ${token}`, // Add Authorization header
            },
          });
          if (aquariumResponse.ok) {
            const aquariumData = await aquariumResponse.json();
            console.log("Aquarium API response:", aquariumData); // Log the full response
            if (aquariumData && aquariumData.length > 0 && aquariumData[0].id) {
              // Aquarium ID will be fetched directly when needed, not stored here
            } else {
              console.warn("Aquarium ID not found in response or response is empty:", aquariumData);
            }
          } else {
            console.error("Failed to fetch aquarium data. Status:", aquariumResponse.status, "StatusText:", aquariumResponse.statusText);
            const errorBody = await aquariumResponse.text(); // Read response body for more details
            console.error("Failed to fetch aquarium data. Response body:", errorBody);
          }
        } catch (aquariumError) {
          console.error("Error fetching aquarium data:", aquariumError);
        }

        navigate("/dashboard");

        // const storeStatus = result.store.status; // This is no longer available directly

        // if (storeStatus === "ACTIVE") {
        //   navigate("/dashboard");
        // } else if (storeStatus === "PENDING") {
        //   setError("Your store is pending approval. Please wait for activation.");
        // } else if (storeStatus === "APPROVED") {
        //   setError("Your store has been approved but is not yet active. Please wait for activation.");
        // } else {
        //   setError("Your store is inactive or has an unknown status. Please contact support.");
        // }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Paper elevation={8} sx={{ p: 4, maxWidth: 400, width: "90%" }}>
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Smart Tank
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Store Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Sign in to manage your store
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>

        
      </Paper>
    </Box>
  );
};

export default Login;
