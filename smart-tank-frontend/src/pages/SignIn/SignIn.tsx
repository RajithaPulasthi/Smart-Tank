import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import AuthFormCard from "../../shared/components/organisms/authFormCard/AuthFormCard";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthFormCard title="Create Account">
      <TextField
        label="Email"
        fullWidth
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="dense"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Typography variant="caption" display="block" sx={{ mt: 1, mb: 2 }}>
        Forgot Password?
      </Typography>
      <Button fullWidth variant="contained" sx={{ mb: 2 }}>
        SIGNIN
      </Button>
      <Typography variant="caption" sx={{ mb: 1 }}>
        OR
      </Typography>
      <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
        Login with Google
      </Button>
      <Typography variant="body2">
        Don’t have an account? <a href="/signup">Signup</a>
      </Typography>
    </AuthFormCard>
  );
};

export default SignIn;
