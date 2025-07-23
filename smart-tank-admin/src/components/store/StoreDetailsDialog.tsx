import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  Store as StoreIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from "@mui/icons-material";
import type { Store } from "../../types/Store";

interface StoreDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  store: Store | null;
  onApprove?: (store: Store) => void;
  onReject?: (store: Store) => void;
  showActions?: boolean;
}

const StoreDetailsDialog = ({
  open,
  onClose,
  store,
  onApprove,
  onReject,
  showActions = false,
}: StoreDetailsDialogProps) => {
  if (!store) return null;

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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <StoreIcon />
            <Typography variant="h6">Store Details</Typography>
          </Box>
          <Chip
            label={store.status}
            color={getStatusColor(store.status) as "success" | "warning" | "error" | "default"}
            size="small"
          />
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Store Information */}
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <StoreIcon color="primary" />
                <Typography variant="h6" color="primary">
                  Store Information
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Aquarium Name
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {store.aquariumName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Business Name
                  </Typography>
                  <Typography variant="body1">{store.businessName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Business Registration Number
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {store.businessRegNumber}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PersonIcon color="primary" />
                <Typography variant="h6" color="primary">
                  Owner Information
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {store.firstName} {store.lastName}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Email
                    </Typography>
                    <Typography variant="body1">{store.email}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1">{store.phoneNumber}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <LocationIcon color="primary" />
                <Typography variant="h6" color="primary">
                  Location Information
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Address
                  </Typography>
                  <Typography variant="body1">{store.address}</Typography>
                </Box>
                <Box display="flex" gap={4}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Province
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {store.province}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Postal Code
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {store.postalCode}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Business Summary */}
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <BusinessIcon color="primary" />
                <Typography variant="h6" color="primary">
                  Business Summary
                </Typography>
              </Box>
              <Box display="flex" gap={4}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Store ID
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    #{store.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Registration Status
                  </Typography>
                  <Chip
                    label={store.status}
                    color={getStatusColor(store.status) as "success" | "warning" | "error" | "default"}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Business Reg. No.
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {store.businessRegNumber}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box display="flex" gap={1} width="100%" justifyContent="space-between">
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
          {showActions && (
            <Box display="flex" gap={1}>
              <Button
                onClick={() => onReject?.(store)}
                color="error"
                variant="contained"
                startIcon={<RejectIcon />}
              >
                Reject
              </Button>
              <Button
                onClick={() => onApprove?.(store)}
                color="success"
                variant="contained"
                startIcon={<ApproveIcon />}
              >
                Approve
              </Button>
            </Box>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default StoreDetailsDialog;
