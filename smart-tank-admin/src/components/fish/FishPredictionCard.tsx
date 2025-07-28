import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import type { PredictedFish } from "../../services/fishService";

interface FishPredictionCardProps {
  fish: PredictedFish;
  onClick?: () => void;
}

const FishPredictionCard: React.FC<FishPredictionCardProps> = ({
  fish,
  onClick,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load:", fish.image_Url);
    e.currentTarget.src =
      "https://via.placeholder.com/300x200/1976d2/ffffff?text=No+Image";
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", fish.image_Url);
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 345,
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": onClick
          ? {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            }
          : {},
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #e0e0e0",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          fish.image_Url ||
          "https://via.placeholder.com/300x200/1976d2/ffffff?text=No+Image"
        }
        alt={fish.name}
        onError={handleImageError}
        onLoad={handleImageLoad}
        sx={{
          objectFit: "cover",
          backgroundColor: "#f5f5f5",
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          fontWeight="600"
          sx={{
            mb: 1,
            color: "#1976d2",
            fontSize: "1.1rem",
          }}
        >
          {fish.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontStyle="italic"
          sx={{
            fontSize: "0.9rem",
            opacity: 0.8,
          }}
        >
          {fish.binomial_Name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FishPredictionCard;
