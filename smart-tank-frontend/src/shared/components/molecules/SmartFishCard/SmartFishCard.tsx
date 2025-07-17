import { Box, Typography } from "@mui/material";
import SmartButton from "../../atoms/SmartButtons";
import { useNavigate } from "react-router-dom";

export interface SmartFishCardProps {
  id: string;
  name: string;
  scientificName: string;
  image: string;
}

const SmartFishCard = ({ id, name, scientificName, image }: SmartFishCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 240,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#0057D8",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Fish Image */}
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: "100%",
          height: 160,
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" fontStyle="italic" sx={{ mb: 1 }}>
          {scientificName}
        </Typography>
        <SmartButton
          text="More Details"
          type="button"
          variant="contained"
          onClick={() => navigate(`/fish/${id}`)}
        />
      </Box>
    </Box>
  );
};

export default SmartFishCard;
