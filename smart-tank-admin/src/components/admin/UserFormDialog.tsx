import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
// Import both saveUser and saveAdminUser
import { saveUser, saveAdminUser } from "../../services/userService";
import { useNotification } from "../../hooks/useNotification";
import type { User } from "../../types/User"; // Ensure this path is correct for your updated User type

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
  userType: number;
};

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

const UserFormDialog = ({ open, onClose, user, onSave, userType }: Props) => {
  const { showSuccess, showError } = useNotification();
  const [form, setForm] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    address: "",
    status: 1,
    userType: userType,
  });

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        status:
          typeof user.status === "string"
            ? user.status === "Active"
              ? 1
              : 0
            : user.status,
        userType: user.userType ?? userType,
      });
    } else {
      setForm({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        address: "",
        status: 1,
        userType: userType,
      });
    }
  }, [user, userType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "status" || name === "userType") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Use saveAdminUser for creating new Store Admins, otherwise use saveUser
      const isNewStoreAdmin = !user && userType === 2;
      const saveFunction = isNewStoreAdmin ? saveAdminUser : saveUser;

      const payload: Partial<User> = {
        ...form,
        status: form.status,
        userType: form.userType,
      };

      if (user && !form.password) {
        // Only delete if password is present and optional
        (payload as Partial<User>).password = undefined;
      }

      const success = await saveFunction(payload as User, token);
      if (success) {
        showSuccess(
          isNewStoreAdmin
            ? `Store Admin "${form.firstName} ${form.lastName}" created successfully!`
            : `User "${form.firstName} ${form.lastName}" saved successfully!`
        );
        onSave(payload as User);
        onClose();
      }
    } catch (error) {
      console.error("Error saving user:", error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("An unexpected error occurred while saving the user.");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Edit Admin User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
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
          {(!user || !user.id) && (
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          )}
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="User Type"
            name="userType"
            value={form.userType}
            onChange={handleChange}
            disabled={!!user} // Disable editing user type for existing users
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>Store Admin</MenuItem>
            <MenuItem value={0}>User</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
