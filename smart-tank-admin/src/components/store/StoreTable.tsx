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
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import type { Store } from "../../types/Store";

interface StoreTableProps {
  stores: Store[];
  onViewDetails: (store: Store) => void;
  showActions?: boolean;
  onApprove?: (store: Store) => void;
  onReject?: (store: Store) => void;
  loading?: boolean;
}

const StoreTable = ({
  stores,
  onViewDetails,
  showActions = false,
  onApprove,
  onReject,
  loading = false,
}: StoreTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "PENDING":
        return "warning";
      case "REJECTED":
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

  if (stores.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No stores found
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Store Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Business Info</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id} hover>
              <TableCell>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {store.aquariumName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {store.businessName}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Box>
                  <Typography variant="body1">
                    {store.firstName} {store.lastName}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Box>
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{store.email}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2">{store.phoneNumber}</Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <LocationIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="body2">{store.province}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {store.postalCode}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  Reg: {store.businessRegNumber}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Chip
                  label={store.status}
                  color={
                    getStatusColor(store.status) as
                      | "success"
                      | "warning"
                      | "error"
                      | "default"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell align="center">
                <Box display="flex" justifyContent="center" gap={1}>
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() => onViewDetails(store)}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>

                  {showActions && store.status === "PENDING" && (
                    <>
                      <Tooltip title="Approve">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => onApprove?.(store)}
                        >
                          <ApproveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onReject?.(store)}
                        >
                          <RejectIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StoreTable;
