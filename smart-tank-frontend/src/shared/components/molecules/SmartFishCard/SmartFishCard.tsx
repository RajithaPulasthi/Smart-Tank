import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface SmartFishCardProps {
  id: number;
  name: string;
  scientificName?: string;
  image?: string;
  temp?: number;
  ph?: number;
  gh?: number;
  kh?: number;
  nitrate?: number;
}

const SmartFishCard = ({
  name,
  scientificName,
  image,
  temp,
  ph,
  gh,
  kh,
  nitrate,
}: SmartFishCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/fish/${name}`); // Use name instead of id for API compatibility
  };

  // Handle image loading with fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://via.placeholder.com/260x180/00c0ff/ffffff?text=Fish+Image";
  };

  return (
    <Box
      onClick={handleNavigate}
      sx={{
        width: 260,
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
          image ||
          "https://via.placeholder.com/260x180/00c0ff/ffffff?text=Fish+Image"
        }
        alt={name}
        onError={handleImageError}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
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
            {name}
          </Typography>
          {scientificName && (
            <Typography
              variant="body2"
              fontStyle="italic"
              sx={{ mb: 2, opacity: 0.8 }}
            >
              {scientificName}
            </Typography>
          )}

          {/* Water Conditions */}
          {(temp || ph || gh || kh || nitrate) && (
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ mb: 1, opacity: 0.9 }}
              >
                Water Conditions:
              </Typography>
              {temp && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", opacity: 0.8 }}
                >
                  Temperature: {temp}°C
                </Typography>
              )}
              {ph && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", opacity: 0.8 }}
                >
                  pH: {ph}
                </Typography>
              )}
              {gh && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", opacity: 0.8 }}
                >
                  General Hardness: {gh}
                </Typography>
              )}
              {kh && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", opacity: 0.8 }}
                >
                  KH: {kh}
                </Typography>
              )}
              {nitrate && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", opacity: 0.8 }}
                >
                  Nitrate: {nitrate} ppm
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SmartFishCard;
