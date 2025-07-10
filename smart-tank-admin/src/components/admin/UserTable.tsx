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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StatusChip from "./StatusChip";
import { RoleChip } from "./RoleSelect";

type User = {
  fullName: string;
  email: string;
  userName: string;
  status: string;
  authorities: { authority: string }[];
  address?: string;
};

type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  refresh: () => void;
};

const UserTable = ({ users, onEdit }: UserTableProps) => {
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
                  <Typography>{user.fullName || user.userName}</Typography>
                </Box>
              </TableCell>
              <TableCell>{user.email || "—"}</TableCell>
              <TableCell>
                <Typography>📍 {user.address || "Colombo"}</Typography>
              </TableCell>
              <TableCell>
                <StatusChip status={user.status || "active"} />
              </TableCell>
              <TableCell>
                <RoleChip
                  authority={user.authorities?.[0]?.authority || "USER"}
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(user)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
