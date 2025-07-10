import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import UserTable from "../../../components/admin/UserTable";
import UserFormDialog from "../../../components/admin/UserFormDialog";
import { getAllUsers } from "../../../services/userServuce";
import type { User } from "../../../types/User";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await getAllUsers(token);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          onClick={() => {
            setSelectedUser(null);
            setOpenForm(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <UserTable
        users={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setOpenForm(true);
        }}
        refresh={fetchUsers}
      />

      <UserFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        user={selectedUser}
        onSave={fetchUsers}
      />
    </Box>
  );
};

export default UserManagement;
