import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Container,
  Paper,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { 
  Thermostat, 
  Science, 
  Water, 
  Opacity 
} from "@mui/icons-material";
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
            minHeight: "100vh",
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress 
              size={60} 
              sx={{ color: "#00c0ff", mb: 2 }} 
            />
            <Typography 
              variant="h6" 
              sx={{ color: "white", opacity: 0.8 }}
            >
              Loading fish details...
            </Typography>
          </Box>
        </Box>
        <SmartFooter />
      </>
    );
  }

  if (error || !fishDetails) {
    return (
      <>
        <SmartNavbar />
        <Box
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  background: "rgba(255, 0, 0, 0.1)",
                  color: "white",
                  border: "1px solid rgba(255, 0, 0, 0.3)",
                }}
              >
                {error || "Fish not found."}
              </Alert>
              <IconButton 
                onClick={() => navigate(-1)} 
                sx={{ 
                  color: "#00c0ff",
                  "&:hover": {
                    background: "rgba(0, 192, 255, 0.1)",
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Paper>
          </Container>
        </Box>
        <SmartFooter />
      </>
    );
  }

  return (
    <>
      <SmartNavbar />

      <Box 
        sx={{ 
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          py: 8,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 70% 30%, rgba(0, 119, 255, 0.1) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Back Button & Title */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton 
              onClick={() => navigate(-1)}
              sx={{
                color: "#00c0ff",
                background: "rgba(0, 192, 255, 0.1)",
                "&:hover": {
                  background: "rgba(0, 192, 255, 0.2)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                color: "white",
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {fishDetails.name}
            </Typography>
          </Paper>

          {/* Fish Information Card */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 25px 50px rgba(0, 119, 255, 0.2)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 4,
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              {/* Fish Image */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0, 192, 255, 0.3)",
                }}
              >
                <Box
                  component="img"
                  src={fishDetails.image_Url}
                  alt={fishDetails.name}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x300/00c0ff/ffffff?text=Fish+Image";
                  }}
                  sx={{
                    width: { xs: 280, md: 300 },
                    height: { xs: 280, md: 300 },
                    objectFit: "cover",
                    borderRadius: 3,
                  }}
                />
              </Box>

              {/* Fish Details */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {fishDetails.name}
                </Typography>
                
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 4,
                    p: 2,
                    background: "rgba(0, 192, 255, 0.1)",
                    borderRadius: 2,
                    border: "1px solid rgba(0, 192, 255, 0.3)",
                  }}
                >
                  <Science sx={{ color: "#00c0ff", fontSize: 20 }} />
                  <Typography sx={{ color: "white", fontStyle: "italic" }}>
                    <strong>Scientific name:</strong> {fishDetails.binomial_Name}
                  </Typography>
                </Box>

                {/* Water Conditions Section */}
                <Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: "bold",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Water sx={{ color: "#00c0ff" }} />
                    Water Conditions
                  </Typography>
                  
                  {waterConditions ? (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                        gap: 2,
                      }}
                    >
                      <Chip
                        icon={<Thermostat sx={{ color: "#00c0ff" }} />}
                        label={`Temperature: ${waterConditions.temp}°C`}
                        sx={{
                          background: "rgba(0, 192, 255, 0.1)",
                          color: "white",
                          border: "1px solid rgba(0, 192, 255, 0.3)",
                          "& .MuiChip-icon": { color: "#00c0ff" },
                        }}
                      />
                      <Chip
                        icon={<Science sx={{ color: "#00c0ff" }} />}
                        label={`pH: ${waterConditions.ph}`}
                        sx={{
                          background: "rgba(0, 192, 255, 0.1)",
                          color: "white",
                          border: "1px solid rgba(0, 192, 255, 0.3)",
                          "& .MuiChip-icon": { color: "#00c0ff" },
                        }}
                      />
                      <Chip
                        icon={<Opacity sx={{ color: "#00c0ff" }} />}
                        label={`GH: ${waterConditions.gh}`}
                        sx={{
                          background: "rgba(0, 192, 255, 0.1)",
                          color: "white",
                          border: "1px solid rgba(0, 192, 255, 0.3)",
                          "& .MuiChip-icon": { color: "#00c0ff" },
                        }}
                      />
                      <Chip
                        icon={<Water sx={{ color: "#00c0ff" }} />}
                        label={`KH: ${waterConditions.kh}`}
                        sx={{
                          background: "rgba(0, 192, 255, 0.1)",
                          color: "white",
                          border: "1px solid rgba(0, 192, 255, 0.3)",
                          "& .MuiChip-icon": { color: "#00c0ff" },
                        }}
                      />
                      <Chip
                        label={`Nitrate: ${waterConditions.nitrate} ppm`}
                        sx={{
                          gridColumn: { xs: "1", sm: "1 / -1" },
                          background: "rgba(0, 192, 255, 0.1)",
                          color: "white",
                          border: "1px solid rgba(0, 192, 255, 0.3)",
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        p: 3,
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: 2,
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: "rgba(255, 255, 255, 0.7)", 
                          fontStyle: "italic" 
                        }}
                      >
                        Water condition data not available
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      <SmartFooter />
    </>
  );
};

export default FishDetailsPage;
