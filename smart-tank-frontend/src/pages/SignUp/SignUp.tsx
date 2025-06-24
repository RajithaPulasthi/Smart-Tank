import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import AuthFormCard from "../../shared/components/organisms/authFormCard/AuthFormCard";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  return (
    <AuthFormCard title="Create Account">
      <TextField
        label="Name"
        fullWidth
        margin="dense"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <TextField
        label="Re-Password"
        type="password"
        fullWidth
        margin="dense"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />
      <Button fullWidth variant="contained" sx={{ mb: 2 }}>
        SIGN UP
      </Button>
      <Typography variant="caption" sx={{ mb: 1 }}>
        OR
      </Typography>
      <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
        Login with Google
      </Button>
      <Typography variant="body2">
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </AuthFormCard>
  );
};

export default SignUp;
