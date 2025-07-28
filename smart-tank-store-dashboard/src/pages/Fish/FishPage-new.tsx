// src/pages/Fish/FishPage.tsx
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import {
  getAllFish,
  getFishIdsForAquarium,
  getFishById,
  removeFishFromAquarium,
  Fish,
} from "../../services/fishService";
import AddFishDialog from "../../components/fish/AddFishDialog";

const FishPage = () => {
  const [aquariumFish, setAquariumFish] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const getAquariumId = useCallback((): number | null => {
    const storeData = localStorage.getItem("currentStore");
    if (storeData) {
      try {
        const parsed = JSON.parse(storeData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].id;
        }
      } catch (e) {
        console.error("Failed to parse currentStore data", e);
        return null;
      }
    }
    return null;
  }, []);

  const fetchAquariumFish = useCallback(async () => {
    const aquariumId = getAquariumId();
    const token = localStorage.getItem("token");

    if (aquariumId && token) {
      try {
        setLoading(true);
        // Get fish IDs for this aquarium
        const fishIds = await getFishIdsForAquarium(aquariumId, token);

        // Get detailed information for each fish
        const fishDetails = await Promise.all(
          fishIds.map((fishId) => getFishById(fishId, token))
        );

        setAquariumFish(fishDetails);
      } catch (error) {
        enqueueSnackbar("Failed to fetch fish list.", { variant: "error" });
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else if (!token) {
      enqueueSnackbar("Authentication token not found.", { variant: "error" });
      setLoading(false);
    } else {
      enqueueSnackbar("Aquarium ID not found.", { variant: "error" });
      setLoading(false);
    }
  }, [enqueueSnackbar, getAquariumId]);

  useEffect(() => {
    fetchAquariumFish();
  }, [fetchAquariumFish]);

  const handleRemoveFish = async (fishId: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await removeFishFromAquarium(fishId, token);
        enqueueSnackbar("Fish removed successfully.", { variant: "success" });
        fetchAquariumFish(); // Refresh the list
      } catch (error) {
        enqueueSnackbar("Failed to remove fish.", { variant: "error" });
        console.error(error);
      }
    }
  };

  const handleAddFishSuccess = () => {
    setAddDialogOpen(false);
    fetchAquariumFish();
    enqueueSnackbar("Fish added successfully.", { variant: "success" });
  };

  const aquariumId = getAquariumId();

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Manage Your Fish
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
          disabled={!aquariumId}
        >
          Add Fish
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : aquariumFish.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No fish in your store yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Start building your fish collection by adding some fish to your
            store.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
            disabled={!aquariumId}
          >
            Add Your First Fish
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {aquariumFish.map((fish) => (
            <Grid item key={fish.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {fish.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Water Parameters:
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
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
                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveFish(fish.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {aquariumId && (
        <AddFishDialog
          open={isAddDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onSuccess={handleAddFishSuccess}
          aquariumId={aquariumId}
        />
      )}
    </Box>
  );
};

export default FishPage;
