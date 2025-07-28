import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import type { Customer } from "../../types/Customer";

type Props = {
  users: Customer[];
  loading: boolean;
};

const UserListTable = ({ users }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Avatar />
                  <Typography>{user.fullName}</Typography>
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <Chip label={user.role} color="primary" />
              </TableCell>
              <TableCell>
                <Chip
                  label={user.status}
                  color={
                    String(user.status).toLowerCase() === "active"
                      ? "success"
                      : "warning"
                  }
                />
              </TableCell>
              <TableCell>{user.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
