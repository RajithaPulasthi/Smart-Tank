import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { getAllFish, addFish } from "../../services/fishService";
import type { Fish, FishFormData } from "../../types/Fish";
import FishTable from "../../components/fish/FishTable";
import FishFormDialog from "../../components/fish/FishFormDialog";
import FishPredictionDialog from "../../components/fish/FishPredictionDialog";

const FishManagement = () => {
  const [fish, setFish] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [predictionDialogOpen, setPredictionDialogOpen] = useState(false);

  const fetchFish = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const fishData = await getAllFish(token);
      setFish(fishData);
    } catch (error) {
      console.error("Error fetching fish:", error);
      alert("Failed to fetch fish data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFish();
  }, [fetchFish]);

  const handleAddFish = async (fishData: FishFormData) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const success = await addFish(fishData, token);
      if (success) {
        fetchFish();
        setDialogOpen(false);
        alert("Fish added successfully!");
      } else {
        alert("Failed to add fish.");
      }
    } catch (error) {
      console.error("Error adding fish:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred while adding the fish.");
      }
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Fish Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setPredictionDialogOpen(true)}
            sx={{ color: "#1976d2", borderColor: "#1976d2" }}
          >
            Predict Fish
          </Button>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add New Fish
          </Button>
        </Box>
      </Box>

      <FishTable fish={fish} loading={loading} />

      <FishFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddFish}
      />

      <FishPredictionDialog
        open={predictionDialogOpen}
        onClose={() => setPredictionDialogOpen(false)}
      />
    </Box>
  );
};

export default FishManagement;
