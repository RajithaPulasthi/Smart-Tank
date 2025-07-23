import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import type { Store } from "../../types/Store";

interface PendingRequestsDialogProps {
  open: boolean;
  onClose: () => void;
  pendingStores: Store[];
  onViewDetails: (store: Store) => void;
  onApprove: (store: Store) => void;
  onReject: (store: Store) => void;
}

const PendingRequestsDialog = ({
  open,
  onClose,
  pendingStores,
  onViewDetails,
  onApprove,
  onReject,
}: PendingRequestsDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <StoreIcon />
          <Typography variant="h6">
            Pending Store Requests ({pendingStores.length})
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {pendingStores.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            <Typography variant="h6" color="textSecondary">
              No pending requests
            </Typography>
          </Box>
        ) : (
          <List>
            {pendingStores.map((store, index) => (
              <Box key={store.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {store.aquariumName}
                        </Typography>
                        <Chip label="PENDING" color="warning" size="small" />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Owner: {store.firstName} {store.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Business: {store.businessName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Location: {store.province} - {store.postalCode}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Email: {store.email} | Phone: {store.phoneNumber}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box display="flex" gap={1}>
                      <IconButton
                        edge="end"
                        onClick={() => onViewDetails(store)}
                        size="small"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="success"
                        onClick={() => onApprove(store)}
                        size="small"
                      >
                        <ApproveIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => onReject(store)}
                        size="small"
                      >
                        <RejectIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < pendingStores.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PendingRequestsDialog;
