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

  const handleNavigate = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      navigate(`/aquarium/${id}`);
    }
  };

  return (
    <Box
      onClick={handleNavigate}
      sx={{
        width: 320,
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "white",
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
      {/* Image */}
      <Box
        component="img"
        src={imageSrc}
        alt={title}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          p: 2.5,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" noWrap sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
            {location}
          </Typography>
        </Box>
        <SmartButton
          text="Explore Store"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default SmartStoreCard;
