import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import type { AquariumFish } from "../../types/Fish";

interface FishListDialogProps {
  open: boolean;
  onClose: () => void;
  fish: AquariumFish[];
  loading: boolean;
  aquariumName: string;
}

const FishListDialog = ({
  open,
  onClose,
  fish,
  loading,
  aquariumName,
}: FishListDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Fish in {aquariumName}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : fish.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            No fish found in this aquarium.
          </Typography>
        ) : (
          <List>
            {fish.map((f) => (
              <ListItem key={f.id}>
                <ListItemText primary={f.name} secondary={f.species} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FishListDialog;