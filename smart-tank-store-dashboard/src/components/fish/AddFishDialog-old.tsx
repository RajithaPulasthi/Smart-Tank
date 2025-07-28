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
  ListItemText,
  CircularProgress,
  Box,
  TextField,
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
        await addFishToAquarium(fishId, aquariumId, token);
        onSuccess();
      } catch (error) {
        enqueueSnackbar("Failed to add fish.", { variant: "error" });
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Fish to Your Store</DialogTitle>
      <DialogContent>
        <TextField
          label="Search Fish"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {filteredFish.map((fish) => (
              <ListItem
                key={fish.id}
                secondaryAction={
                  <Button
                    variant="outlined"
                    onClick={() => handleAddFish(fish.id)}
                  >
                    Add
                  </Button>
                }
              >
                <ListItemText primary={fish.name} />
              </ListItem>
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

export default AddFishDialog;
