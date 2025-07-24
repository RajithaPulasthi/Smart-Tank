import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { getAllStoreAdmins } from "../../services/userService";
import { checkUserAquariumAssignment } from "../../services/storeService";
import type { Customer } from "../../types/Customer";

interface UserSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (userId: number) => void;
  title: string;
  currentAquariumId?: number; // Optional prop to exclude current aquarium assignment
}

const UserSelectionDialog = ({
  open,
  onClose,
  onSelect,
  title,
  currentAquariumId,
}: UserSelectionDialogProps) => {
  const [users, setUsers] = useState<Customer[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [userAssignments, setUserAssignments] = useState<Map<number, string>>(
    new Map()
  );

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const userData = await getAllStoreAdmins(token);
      setUsers(userData);
      setFilteredUsers(userData);

      // Check assignment status for each user
      const assignments = new Map<number, string>();

      for (const user of userData) {
        if (user.id) {
          try {
            const assignmentData = await checkUserAquariumAssignment(
              user.id,
              token
            );
            if (
              assignmentData &&
              assignmentData.aquariumId !== currentAquariumId
            ) {
              assignments.set(user.id, assignmentData.aquariumName);
            }
          } catch (error) {
            console.error(
              `Error checking assignment for user ${user.id}:`,
              error
            );
          }
        }
      }

      setUserAssignments(assignments);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentAquariumId]);

  useEffect(() => {
    if (open) {
      fetchUsers();
      setSearchTerm("");
      setSelectedUser(null);
    }
  }, [open, fetchUsers]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSelect = () => {
    if (selectedUser && selectedUser.id) {
      const assignedAquarium = userAssignments.get(selectedUser.id);

      if (assignedAquarium) {
        const confirmSelection = confirm(
          `This user is already assigned to "${assignedAquarium}".\n\n` +
            `Proceeding will reassign them to the new aquarium.\n\n` +
            `Do you want to continue?`
        );

        if (!confirmSelection) {
          return;
        }
      }

      onSelect(selectedUser.id);
      onClose();
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    setSelectedUser(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, email, or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {filteredUsers.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No users found"
                  secondary="Try adjusting your search criteria"
                />
              </ListItem>
            ) : (
              filteredUsers.map((user) => {
                const assignedAquarium = userAssignments.get(user.id || 0);
                return (
                  <ListItem key={user.id} disablePadding>
                    <ListItemButton
                      selected={selectedUser?.id === user.id}
                      onClick={() => setSelectedUser(user)}
                    >
                      <ListItemText
                        primary={user.fullName}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Username: {user.userName}
                            </Typography>
                            {assignedAquarium && (
                              <Typography
                                variant="body2"
                                color="warning.main"
                                sx={{ fontWeight: "bold", mt: 0.5 }}
                              >
                                ⚠️ Already assigned to: {assignedAquarium}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
            )}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSelect}
          variant="contained"
          disabled={!selectedUser}
        >
          Select User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserSelectionDialog;
