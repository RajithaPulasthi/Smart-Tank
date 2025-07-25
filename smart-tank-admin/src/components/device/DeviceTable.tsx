import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import type { Device } from "../../types/Device";

interface DeviceTableProps {
  devices: Device[];
  loading?: boolean;
}

const DeviceTable = ({ devices, loading = false }: DeviceTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "pending":
        return "warning";
      case "inactive":
        return "default";
      case "deactivated":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (devices.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No devices found
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id} hover>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  #{device.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{device.type}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{device.serialNumber}</Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={device.status}
                  color={
                    getStatusColor(device.status) as
                      | "success"
                      | "warning"
                      | "error"
                      | "default"
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceTable;
