import { Box, Typography } from "@mui/material";
import SmartButton from "../../atoms/SmartButtons";
import SmartSellerBackground from "../../../../assets/SmartSellerBackground.png";

const SmartSellerCTASection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "350px",
        // FIX: Use the url() CSS function with the imported image path
        backgroundImage: `url(${SmartSellerBackground})`,
        backgroundSize: "cover", // Added to ensure the image covers the area
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        px: 6,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{ position: "relative", zIndex: 2, color: "#fff", maxWidth: 600 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Are You a Pet Fish Seller?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Join our platform to showcase your store, attract new buyers, and grow
          your visibility.
        </Typography>
        <SmartButton
          text="List Your Store"
          type="button"
          variant="contained"
          onClick={() => console.log("List Store clicked")}
        />
      </Box>
    </Box>
  );
};

export default SmartSellerCTASection;