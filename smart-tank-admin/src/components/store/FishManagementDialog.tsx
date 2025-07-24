import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { getAllFish } from "../../services/fishService";
import {
  getAquariumFish,
  getAquariumFishIds,
  addFishToStore,
  deleteFishFromStore,
} from "../../services/storeService";
import { useNotification } from "../../hooks/useNotification";
import type { Fish, AquariumFish } from "../../types/Fish";

interface FishManagementDialogProps {
  open: boolean;
  onClose: () => void;
  aquariumId: number;
  aquariumName: string;
}

const FishManagementDialog = ({
  open,
  onClose,
  aquariumId,
  aquariumName,
}: FishManagementDialogProps) => {
  const { showSuccess } = useNotification();
  const [availableFish, setAvailableFish] = useState<Fish[]>([]);
  const [aquariumFish, setAquariumFish] = useState<AquariumFish[]>([]);
  const [selectedFishIds, setSelectedFishIds] = useState<string[]>([]);
  const [currentFishSearch, setCurrentFishSearch] = useState("");
  const [availableFishSearch, setAvailableFishSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const [allFishData, aquariumFishData, aquariumFishIds] =
        await Promise.all([
          getAllFish(token),
          getAquariumFish(aquariumId, token),
          getAquariumFishIds(aquariumId, token),
        ]);

      setAvailableFish(allFishData || []);
      setAquariumFish(aquariumFishData || []);

      console.log("All fish:", allFishData);
      console.log("Aquarium fish:", aquariumFishData);
      console.log("Aquarium fish IDs:", aquariumFishIds);
    } catch (error) {
      console.error("Error fetching fish data:", error);
      if (
        error instanceof Error &&
        error.message.includes("Failed to fetch fish data")
      ) {
        setError(
          "Failed to load available fish. Please check if the fish service is running on port 8083."
        );
      } else {
        setError("Failed to load fish data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [aquariumId]);

  useEffect(() => {
    if (open) {
      fetchData();
      setSelectedFishIds([]);
    }
  }, [open, fetchData]);

  const handleFishSelection = (fishId: string) => {
    setSelectedFishIds((prev) =>
      prev.includes(fishId)
        ? prev.filter((id) => id !== fishId)
        : [...prev, fishId]
    );
  };

  const handleAddSelectedFish = async () => {
    if (selectedFishIds.length === 0) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    setActionLoading(true);
    setError(null);

    try {
      // Add selected fish one by one
      const addPromises = selectedFishIds.map((fishId) =>
        addFishToStore(Number(fishId), aquariumId, token)
      );

      await Promise.all(addPromises);

      // Show success message
      const fishCount = selectedFishIds.length;
      showSuccess(
        `Successfully added ${fishCount} fish to the aquarium "${aquariumName}"!`
      );

      // Refresh the data and clear selection
      await fetchData();
      setSelectedFishIds([]);
    } catch (error) {
      console.error("Error adding fish:", error);
      setError("Failed to add fish. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteFish = async (fishId: string, fishName: string) => {
    if (
      !confirm(
        `Are you sure you want to remove ${fishName} from this aquarium?`
      )
    ) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    setActionLoading(true);
    setError(null);

    try {
      await deleteFishFromStore(Number(fishId), aquariumId, token);
      await fetchData(); // Refresh the data
      showSuccess(`${fishName} removed successfully from "${aquariumName}"!`);
    } catch (error) {
      console.error("Error deleting fish:", error);
      setError("Failed to remove fish. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedFishIds([]);
    setCurrentFishSearch("");
    setAvailableFishSearch("");
    setError(null);
    onClose();
  };

  // Filter available fish to exclude those already in the aquarium
  const availableFishToAdd = availableFish.filter(
    (fish) => !aquariumFish.some((aqFish) => aqFish.id === fish.id)
  );

  // Filter current fish in aquarium based on search
  const filteredCurrentFish = aquariumFish.filter((fish) =>
    fish.name.toLowerCase().includes(currentFishSearch.toLowerCase())
  );

  // Filter available fish based on search
  const filteredAvailableFish = availableFishToAdd.filter((fish) =>
    fish.name.toLowerCase().includes(availableFishSearch.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Manage Fish - {aquariumName}</Typography>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Current Fish in Aquarium */}
            <Typography variant="h6" gutterBottom>
              Current Fish in Aquarium ({aquariumFish.length})
            </Typography>

            {aquariumFish.length === 0 ? (
              <Typography
                color="textSecondary"
                sx={{ mb: 3, fontStyle: "italic" }}
              >
                No fish added to this aquarium yet.
              </Typography>
            ) : (
              <>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search current fish..."
                  value={currentFishSearch}
                  onChange={(e) => setCurrentFishSearch(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <List sx={{ mb: 3, maxHeight: 200, overflow: "auto" }}>
                  {filteredCurrentFish.map((fish) => (
                    <ListItem key={fish.aquariumFishId} divider>
                      <ListItemText
                        primary={fish.name}
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              Temp: {fish.temp}°C | pH: {fish.ph} | GH:{" "}
                              {fish.gh} | KH: {fish.kh} | Nitrate:{" "}
                              {fish.nitrate}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => handleDeleteFish(fish.id!, fish.name)}
                          disabled={actionLoading}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Available Fish to Add */}
            <Typography variant="h6" gutterBottom>
              Available Fish to Add ({availableFishToAdd.length})
            </Typography>

            {availableFishToAdd.length === 0 ? (
              <Typography color="textSecondary" sx={{ fontStyle: "italic" }}>
                All available fish have been added to this aquarium.
              </Typography>
            ) : (
              <>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search available fish..."
                  value={availableFishSearch}
                  onChange={(e) => setAvailableFishSearch(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddSelectedFish}
                    disabled={selectedFishIds.length === 0 || actionLoading}
                    size="small"
                  >
                    Add Selected Fish ({selectedFishIds.length})
                  </Button>
                </Box>

                <List sx={{ maxHeight: 300, overflow: "auto" }}>
                  {filteredAvailableFish.map((fish) => (
                    <ListItem key={fish.id} divider>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedFishIds.includes(fish.id!)}
                            onChange={() => handleFishSelection(fish.id!)}
                            disabled={actionLoading}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle2">
                              {fish.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Temp: {fish.temp}°C | pH: {fish.ph} | GH:{" "}
                              {fish.gh} | KH: {fish.kh} | Nitrate:{" "}
                              {fish.nitrate}
                            </Typography>
                          </Box>
                        }
                        sx={{ width: "100%" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={actionLoading}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FishManagementDialog;
