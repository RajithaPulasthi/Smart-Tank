import { Box, Typography, Container } from "@mui/material";
import SmartButton from "../../atoms/SmartButtons";
import SmartSellerBackground from "../../../../assets/SmartSellerBackground.png";
import { useNavigate } from "react-router-dom";

const SmartSellerCTASection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/RegisterAquarium");
  };

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        background: `url(${SmartSellerBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Parallax effect
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(90deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 25, 47, 0.8) 50%, rgba(0,0,0,0.3) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ color: "#fff", maxWidth: { xs: "100%", md: 650 } }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.2rem", md: "3rem" },
              lineHeight: 1.2,
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Are You a Pet Fish Seller?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
          >
            Join our platform to showcase your store, attract new buyers, and
            grow your visibility in the local aquatic community.
          </Typography>
          <SmartButton
            text="List Your Store Now"
            type="button"
            onClick={handleNavigate}
            sx={{
              py: 2,
              px: 5,
              fontSize: "1.1rem",
              fontWeight: 600,
              background: "linear-gradient(45deg, #00c0ff, #0077ff)",
              boxShadow: "0 8px 32px rgba(0, 192, 255, 0.3)",
              borderRadius: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #0077ff, #004aad)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px rgba(0, 192, 255, 0.4)",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SmartSellerCTASection;
