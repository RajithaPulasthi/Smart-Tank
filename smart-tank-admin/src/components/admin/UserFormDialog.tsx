import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { saveUser } from "../../services/userService";

type User = {
  fullName: string;
  email: string;
  userName: string;
  status: string;
  authorities: { authority: string }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: () => void;
};

const roleOptions = [
  { value: "ROLE_AQUARIUM_ADMIN", label: "Admin" },
  { value: "ROLE_SUPER_ADMIN", label: "Super Admin" },
  { value: "ROLE_USER", label: "User" },
];

const UserFormDialog = ({ open, onClose, user, onSave }: Props) => {
  const [form, setForm] = useState<User>({
    fullName: "",
    email: "",
    userName: "",
    status: "active",
    authorities: [{ authority: "ROLE_USER" }],
  });

  useEffect(() => {
    if (user) setForm({ ...user });
    else
      setForm({
        fullName: "",
        email: "",
        userName: "",
        status: "active",
        authorities: [{ authority: "ROLE_USER" }],
      });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "authority") {
      setForm({ ...form, authorities: [{ authority: value }] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token")!;
    const success = await saveUser(form, token);
    if (success) {
      onSave();
      onClose();
    } else {
      alert("Failed to save user");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            name="userName"
            value={form.userName}
            onChange={handleChange}
          />
          <TextField
            select
            label="Account Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </TextField>
          <TextField
            select
            label="Role"
            name="authority"
            value={form.authorities?.[0]?.authority}
            onChange={handleChange}
          >
            {roleOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
