import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FishService, {
  type FishDetails,
} from "../../../../services/fishService";

export interface SmartFishCardProps {
  id: number;
  name: string;
  scientificName?: string;
  image?: string;
}

const SmartFishCard = ({ name, scientificName, image }: SmartFishCardProps) => {
  const navigate = useNavigate();
  const [fishData, setFishData] = useState<FishDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch fish data from prediction API
  useEffect(() => {
    const fetchFishData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await FishService.getFishDetails(name);
        setFishData(data);
      } catch (err) {
        console.error("Error fetching fish data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch fish data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFishData();
  }, [name]);

  // Use API data if available, otherwise fall back to props
  const displayName = fishData?.name || name;
  const displayScientificName = fishData?.binomial_Name || scientificName;
  const displayImage = fishData?.image_Url || image;

  // Handle image loading with fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://via.placeholder.com/240x120/00c0ff/ffffff?text=Fish+Image";
  };

  const handleNavigate = () => {
    navigate(`/fish/${name}`); // Use name instead of id for API compatibility
  };

  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          width: { xs: 180, sm: 200, md: 200, lg: 240 },
          maxWidth: "100%",
          height: 240,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      onClick={handleNavigate}
      sx={{
        width: { xs: 180, sm: 200, md: 220, lg: 240 },
        maxWidth: "100%",
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px 0 rgba(0, 192, 255, 0.3)",
        },
      }}
    >
      {/* Fish Image */}
      <Box
        component="img"
        src={
          displayImage ||
          "https://via.placeholder.com/240x120/00c0ff/ffffff?text=Fish+Image"
        }
        alt={displayName}
        onError={handleImageError}
        sx={{
          width: "100%",
          height: 120,
          objectFit: "contain",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            {displayName}
          </Typography>
          {displayScientificName && (
            <Typography
              variant="body2"
              fontStyle="italic"
              sx={{ mb: 2, opacity: 0.8 }}
            >
              {displayScientificName}
            </Typography>
          )}
          {error && (
            <Typography
              variant="caption"
              sx={{ color: "rgba(255, 100, 100, 0.8)", fontSize: "0.7rem" }}
            >
              Failed to load fish data
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SmartFishCard;
