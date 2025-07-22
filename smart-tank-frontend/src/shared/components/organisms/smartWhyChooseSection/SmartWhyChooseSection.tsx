import React from "react";
import { Box, Typography, Container } from "@mui/material";
import SmartWhyChooseCard from "../../molecules/smartWhyChoseCard/SmartWhyChooseCard";

const SmartWhyChooseSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        py: 8,
        px: 2,
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
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            sx={{
              color: "white",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
            }}
          >
            Why Choose{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Smart Tank
            </Box>
            ?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#94a3b8",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Discover why thousands of fish enthusiasts trust Smart Tank for
            their aquatic needs
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
            justifyContent: "center",
          }}
        >
          <SmartWhyChooseCard
            iconSrc="/assets/store-icon.png"
            title="Find Local Fish Sellers Near You Instantly"
            description="Easily discover nearby aquarium stores and fish sellers based on your location. Whether you're looking for rare species or local breeders, our location-based directory helps you connect with trusted sellers in your area—fast, reliable, and hassle-free."
          />

          <SmartWhyChooseCard
            iconSrc="/assets/water-monitor-icon.png"
            title="Real-Time Water Monitoring"
            description="Track and analyze your tank's water parameters in real time. Receive instant alerts and insights to maintain a healthy environment for your fish."
          />

          <SmartWhyChooseCard
            iconSrc="/assets/community-icon.png"
            title="Connect with Fishkeeping Community"
            description="Join a vibrant community of fish enthusiasts. Share experiences, tips, and advice with fellow hobbyists and professionals."
          />

          <SmartWhyChooseCard
            iconSrc="/assets/recommendations-icon.png"
            title="Smart Recommendations for Your Tank"
            description="Get AI-powered suggestions on compatible fish species, tank mates, and ideal water conditions based on your tank profile."
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SmartWhyChooseSection;
