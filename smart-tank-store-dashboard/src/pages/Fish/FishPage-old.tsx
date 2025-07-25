// src/pages/Fish/FishPage.tsx
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import {
  getFishForAquarium,
  removeFishFromAquarium,
  AquariumFish,
} from "../../services/fishService";
import AddFishDialog from "../../components/fish/AddFishDialog";

const FishPage = () => {
  const [fishList, setFishList] = useState<AquariumFish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const getAquariumId = (): number | null => {
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
  };

  const fetchFish = async () => {
    const aquariumId = getAquariumId();
    const token = localStorage.getItem("token");

    if (aquariumId && token) {
      try {
        setLoading(true);
        const data = await getFishForAquarium(aquariumId, token);
        setFishList(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch fish list.", { variant: "error" });
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else if (!token) {
      enqueueSnackbar("Authentication token not found.", { variant: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFish();
  }, []);

  const handleRemoveFish = async (aquariumFishId: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await removeFishFromAquarium(aquariumFishId, token);
        enqueueSnackbar("Fish removed successfully.", { variant: "success" });
        fetchFish(); // Refresh the list
      } catch (error) {
        enqueueSnackbar("Failed to remove fish.", { variant: "error" });
        console.error(error);
      }
    }
  };

  const handleAddFishSuccess = () => {
    setAddDialogOpen(false);
    fetchFish();
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
      ) : (
        <Grid container spacing={3}>
          {fishList.map((fish) => (
            <Grid item key={fish.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={fish.fishImage || "https://via.placeholder.com/150"}
                  alt={fish.fishName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {fish.fishName}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveFish(fish.id)}
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
