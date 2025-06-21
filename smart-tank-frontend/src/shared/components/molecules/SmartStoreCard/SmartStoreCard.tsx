import { Box, Typography } from "@mui/material";
import SmartButton from "../../atoms/SmartButtons";
import { useNavigate } from "react-router-dom";

export interface SmartStoreCardProps {
  id: string;
  imageSrc: string;
  title: string;
  location: string;
  onExploreClick?: () => void;
}

const SmartStoreCard = ({
  id,
  imageSrc,
  title,
  location,
  onExploreClick,
}: SmartStoreCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 300,
        borderRadius: 4,
        backgroundColor: "#0057D8",
        overflow: "hidden",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={imageSrc}
        alt={title}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {location}
          </Typography>
        </Box>
        <SmartButton
          text="Explore"
          type="button"
          variant="contained"
          onClick={() =>
            onExploreClick ? onExploreClick() : navigate(`/aquarium/${id}`)
          }
        />
      </Box>
    </Box>
  );
};

export default SmartStoreCard;
