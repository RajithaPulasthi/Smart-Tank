// src/pages/store/Login.tsx

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
      console.log("Login result:", result);

      const isStoreAdmin = result?.authorities?.some(
        (auth) => auth.authority === "ROLE_AQUARIUM_STOREADMIN"
      );

      if (result && result.token && result.user && isStoreAdmin) {
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...result.user, authorities: result.authorities })
        );
        localStorage.setItem(
          "storeAdmin",
          JSON.stringify({ ...result.user, authorities: result.authorities })
        );

        const userId = result.user.id;

        try {
          const aquariumResponse = await fetch(
            `http://localhost:8082/api/Aquariums/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${result.token}`,
              },
            }
          );

          if (aquariumResponse.ok) {
            const aquariumData = await aquariumResponse.json();
            localStorage.setItem("currentStore", JSON.stringify(aquariumData));
            console.log("Aquarium API response:", aquariumData);
          } else {
            const errorBody = await aquariumResponse.text();
            console.error("Failed to fetch aquarium data:", errorBody);
          }
        } catch (aquariumError) {
          console.error("Error fetching aquarium data:", aquariumError);
        }

        navigate("/dashboard");
      } else if (!isStoreAdmin) {
        setError("You do not have access to the store dashboard.");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
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
