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
        // Store login data in localStorage
        localStorage.setItem("storeAdmin", JSON.stringify(result.admin));
        localStorage.setItem("currentStore", JSON.stringify(result.store));

        // Navigate to dashboard
        navigate("/dashboard");
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

        <Box mt={3} p={2} sx={{ backgroundColor: "grey.50", borderRadius: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Demo Accounts:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • admin1 / 1234 (Shop 1)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • admin2 / 1234 (Shop 2)
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
