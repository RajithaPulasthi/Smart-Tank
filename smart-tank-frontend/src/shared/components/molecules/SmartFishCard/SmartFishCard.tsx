import { Box, Typography } from "@mui/material";
import SmartButton from "../../atoms/SmartButtons";
import { useNavigate } from "react-router-dom";

export interface SmartFishCardProps {
  id: string;
  name: string;
  scientificName: string;
  image: string;
}

const SmartFishCard = ({
  id,
  name,
  scientificName,
  image,
}: SmartFishCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/fish/${id}`);
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
        src={image}
        alt={name}
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
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            fontStyle="italic"
            sx={{ mb: 2, opacity: 0.8 }}
          >
            {scientificName}
          </Typography>
        </Box>
        <SmartButton
          text="More Details"
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card's onClick from firing
            handleNavigate();
          }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default SmartFishCard;
