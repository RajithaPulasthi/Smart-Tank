import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StatusChip from "./StatusChip";
import type { User } from "../../types/User";

type UserTableProps = {
  users: User[];
  onEdit: (user?: User | null) => void;
  onDeactivate: (user: User) => void;
  refresh: () => void;
};

const UserTable = ({ users, onEdit, onDeactivate }: UserTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Avatar />
                  <Typography>
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.userName}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>{user.email || "—"}</TableCell>

              <TableCell>
                <Typography>📍 {user.address || "Colombo"}</Typography>
              </TableCell>

              <TableCell>
                <StatusChip status={String(user.status) || "active"} />
              </TableCell>

              <TableCell>
                <Typography>
                  {user.userType === 1 ? "Admin" : "User"}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(user)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {user.status === 1 && (
                  <Tooltip title="Deactivate">
                    <Button
                      color="warning"
                      size="small"
                      onClick={() => onDeactivate(user)}
                      sx={{ ml: 1 }}
                    >
                      Deactivate
                    </Button>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
