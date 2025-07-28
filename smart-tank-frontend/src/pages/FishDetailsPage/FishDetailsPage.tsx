import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import FishService, {
  type FishDetails,
  type FishListItem,
} from "../../services/fishService";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";

const FishDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // This will be the fish name
  const navigate = useNavigate();
  const [fishDetails, setFishDetails] = useState<FishDetails | null>(null);
  const [waterConditions, setWaterConditions] = useState<FishListItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFishData = async () => {
      if (!id) {
        setError("Fish name not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch both fish details and water conditions
        const [details, allFish] = await Promise.all([
          FishService.getFishDetails(id),
          FishService.getAllFish(),
        ]);

        setFishDetails(details);

        // Find water conditions for this specific fish
        const fishWaterData = allFish.find(
          (fish) => fish.name.toLowerCase() === id.toLowerCase()
        );
        setWaterConditions(fishWaterData || null);
      } catch (err) {
        console.error("Error loading fish data:", err);
        setError("Failed to load fish data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFishData();
  }, [id]);

  if (loading) {
    return (
      <>
        <SmartNavbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
        <SmartFooter />
      </>
    );
  }

  if (error || !fishDetails) {
    return (
      <>
        <SmartNavbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Fish not found."}
          </Alert>
          <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        </Container>
        <SmartFooter />
      </>
    );
  }

  return (
    <>
      <SmartNavbar />

      <Box sx={{ px: 4, pt: 4 }}>
        {/* Back + Name */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" sx={{ ml: 1 }}>
            {fishDetails.name}
          </Typography>
        </Box>

        {/* Fish Info */}
        <Box
          sx={{
            backgroundColor: "#004aad",
            color: "#fff",
            p: 4,
            borderRadius: 2,
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={fishDetails.image_Url}
            alt={fishDetails.name}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src =
                "https://via.placeholder.com/240x240/00c0ff/ffffff?text=Fish+Image";
            }}
            sx={{
              width: 240,
              height: 240,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <Box sx={{ minWidth: 260 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              {fishDetails.name}
            </Typography>
            <Typography sx={{ mb: 3 }}>
              <strong>Scientific name:</strong> {fishDetails.binomial_Name}
            </Typography>

            {/* Water Conditions */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Water Conditions
              </Typography>
              {waterConditions ? (
                <>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>Temperature:</strong> {waterConditions.temp}°C
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>pH:</strong> {waterConditions.ph}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>General Hardness (GH):</strong> {waterConditions.gh}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>KH:</strong> {waterConditions.kh}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }}>
                    <strong>Nitrate:</strong> {waterConditions.nitrate} ppm
                  </Typography>
                </>
              ) : (
                <Typography sx={{ opacity: 0.7, fontStyle: "italic" }}>
                  Water condition data not available
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Nearby Aquariums - Coming Soon */}
        {/* 
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Aquariums Near You
              </Typography>
              <Typography variant="body2">
                Aquariums near you where you can buy "{fishDetails.name}"
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {aquariums.slice(0, 5).map((store) => (
              <Box key={store.id}>
                <SmartStoreCard
                  id={store.id}
                  imageSrc={store.bannerImage}
                  title={store.name}
                  location={store.address}
                />
              </Box>
            ))}
          </Box>
        </Box>
        */}
      </Box>

      <SmartFooter />
    </>
  );
};

export default FishDetailsPage;
