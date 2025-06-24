import { Box, Paper, Typography } from "@mui/material";
import SmartTextInput from "../../components/ui/SmartTextInput";
import SmartButton from "../../components/ui/SmartButton";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

type Authority = { authority: string };

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await loginUser({ userName, password });
      const isAdmin = data?.authorities?.some(
        (a: Authority) => a.authority === "ROLE_AQUARIUM_ADMIN"
      );

      if (isAdmin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert("Not authorized");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: "url('/src/assets/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: "90%" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          color="primary"
        >
          Smart Tank Admin
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          Login to your dashboard
        </Typography>
        <SmartTextInput
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <SmartTextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SmartButton onClick={handleSubmit}>Sign In</SmartButton>
      </Paper>
    </Box>
  );
};

export default Login;
