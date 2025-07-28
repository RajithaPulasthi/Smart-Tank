// src/components/fish/AddFishDialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  CircularProgress,
  Box,
  TextField,
  Chip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
  getAllFish,
  addFishToAquarium,
  Fish,
} from "../../services/fishService";

interface AddFishDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  aquariumId: number;
}

const AddFishDialog = ({
  open,
  onClose,
  onSuccess,
  aquariumId,
}: AddFishDialogProps) => {
  const [allFish, setAllFish] = useState<Fish[]>([]);
  const [filteredFish, setFilteredFish] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [addingFishId, setAddingFishId] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      const fetchAllFish = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            setLoading(true);
            const data = await getAllFish(token);
            setAllFish(data);
            setFilteredFish(data);
          } catch (error) {
            enqueueSnackbar("Failed to fetch fish species.", {
              variant: "error",
            });
            console.error(error);
          } finally {
            setLoading(false);
          }
        } else {
          enqueueSnackbar("Authentication token not found.", {
            variant: "error",
          });
        }
      };
      fetchAllFish();
    }
  }, [open, enqueueSnackbar]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = allFish.filter((fish) =>
      fish.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredFish(filteredData);
  }, [searchTerm, allFish]);

  const handleAddFish = async (fishId: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setAddingFishId(fishId);
        await addFishToAquarium(fishId, aquariumId, token);
        onSuccess();
      } catch (error) {
        enqueueSnackbar("Failed to add fish.", { variant: "error" });
        console.error(error);
      } finally {
        setAddingFishId(null);
      }
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Fish to Your Store</DialogTitle>
      <DialogContent>
        <TextField
          label="Search Fish"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ maxHeight: 400, overflow: "auto" }}>
            {filteredFish.map((fish) => (
              <ListItem
                key={fish.id}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  mb: 1,
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6">{fish.name}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddFish(fish.id)}
                    disabled={addingFishId === fish.id}
                    size="small"
                  >
                    {addingFishId === fish.id ? (
                      <CircularProgress size={16} />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Water Parameters:
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Chip
                    label={`Temp: ${fish.temp}°C`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`pH: ${fish.ph}`}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                  <Chip
                    label={`GH: ${fish.gh}`}
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                  <Chip
                    label={`KH: ${fish.kh}`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                  <Chip
                    label={`NO₃: ${fish.nitrate}ppm`}
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                </Box>
              </ListItem>
            ))}
            {filteredFish.length === 0 && !loading && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", py: 2 }}
              >
                No fish found matching your search.
              </Typography>
            )}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFishDialog;
