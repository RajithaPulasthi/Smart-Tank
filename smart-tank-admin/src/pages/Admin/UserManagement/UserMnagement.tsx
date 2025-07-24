import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import UserTable from "../../../components/admin/UserTable";
import UserFormDialog from "../../../components/admin/UserFormDialog";
import {
  getAllAdminsFromUsersList,
  saveUser,
} from "../../../services/userService";
import type { User } from "../../../types/User";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(
    () => () => {}
  );
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. User might not be authenticated.");
      return;
    }

    try {
      const data = await getAllAdminsFromUsersList(token);
      const admins: User[] = data.map((admin) => {
        // Split fullName into firstName and lastName
        const [firstName, ...lastNameParts] = (admin.fullName ?? "").split(" ");
        return {
          id: admin.id ?? 0,
          firstName: firstName ?? "",
          lastName: lastNameParts.join(" ") ?? "",
          email: admin.email ?? "",
          userName: admin.userName ?? "",
          password: "", // Do not expose password
          address: admin.address ?? "",
          status:
            typeof admin.status === "string"
              ? admin.status.toLowerCase() === "active"
                ? 1
                : 0
              : typeof admin.status === "number"
              ? admin.status
              : 0,
          userType: admin.userType === "Admin" ? 1 : 0,
        };
      });
      setUsers(admins);
    } catch (err) {
      console.error("Failed to fetch admin users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenForm = (user?: User | null) => {
    setSelectedUser(user ?? null);
    setOpenForm(true);
  };

  const handleDeactivate = (user: User) => {
    setConfirmationMessage("Are you sure you want to deactivate this user?");
    setConfirmAction(() => async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const updatedUser: User = { ...user, status: 0 };
        const success = await saveUser(updatedUser, token);
        if (success) {
          fetchUsers();
        } else {
          console.error("Failed to deactivate user");
        }
      } catch (err) {
        console.error("Error deactivating user", err);
      }
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleSaveUser = (user: User) => {
    setConfirmationMessage("Are you sure you want to save this user?");
    setConfirmAction(() => async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const success = await saveUser(user, token);
        if (success) {
          fetchUsers();
          setOpenForm(false);
        } else {
          console.error("Failed to save user");
        }
      } catch (err) {
        console.error("Error saving user", err);
      }
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">User Management</Typography>
        <IconButton
          color="primary"
          onClick={() =>
            handleOpenForm({
              id: 0,
              email: "",
              userName: "",
              password: "",
              address: "",
              status: 1,
              userType: 1,
              firstName: "",
              lastName: "",
            })
          }
        >
          <AddIcon />
        </IconButton>
      </Box>

      <UserTable
        users={users}
        onEdit={handleOpenForm}
        onDeactivate={handleDeactivate}
        refresh={fetchUsers}
      />

      <UserFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        userType={1}
      />

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>{confirmationMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button onClick={confirmAction} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
