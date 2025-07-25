import { Box, Container, Typography, Button } from "@mui/material";
import { PlayArrow, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SmartSensorCTASection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Original content
    {
      title: "Ready to Upgrade Your",
      highlightedTitle: "Aquarium",
      subtitle: "Monitor. Protect. Thrive.",
      description:
        "Bring smart technology to your tank with the Smart Tank Sensor — your partner in maintaining healthy, vibrant aquatic life.",
      callout: "👉 Order now and get started in minutes!",
    },
    // Slide 2: Your new content (same as slide 1 in this case)
    {
      title: "Ready to Upgrade Your",
      highlightedTitle: "Aquarium",
      subtitle: "Monitor. Protect. Thrive.",
      description:
        "Bring smart technology to your tank with the Smart Tank Sensor — your partner in maintaining healthy, vibrant aquatic life.",
      callout: "👉 Order now and get started in minutes!",
    },
  ];

  const handleBuyNow = () => {
    navigate("/order-sensor");
  };

  const handleLearnMore = () => {
    navigate("/smart-sensor");
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        py: 10,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: [
            "radial-gradient(circle at 20% 20%, rgba(0, 192, 255, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(0, 119, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
          ].join(", "),
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Slide Indicators */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mb: 6,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background:
                  currentSlide === index
                    ? "#00c0ff"
                    : "rgba(255, 255, 255, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    currentSlide === index
                      ? "#0077ff"
                      : "rgba(255, 255, 255, 0.5)",
                },
              }}
            />
          ))}
        </Box>

        {/* Slider Content */}
        <Box
          sx={{
            textAlign: "center",
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: 800,
                opacity: currentSlide === index ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
                pointerEvents: currentSlide === index ? "auto" : "none",
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                fontWeight="bold"
                sx={{
                  color: "white",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.8rem", lg: "3.5rem" },
                }}
              >
                {slide.title}{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {slide.highlightedTitle}
                </Box>
                ?
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: "#00c0ff",
                  mb: 3,
                  fontWeight: 600,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                {slide.subtitle}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#94a3b8",
                  maxWidth: 700,
                  mx: "auto",
                  lineHeight: 1.7,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  mb: 3,
                }}
              >
                {slide.description}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 4,
                  px: 3,
                  py: 1,
                  background: "rgba(0, 192, 255, 0.2)",
                  borderRadius: 25,
                  border: "1px solid rgba(0, 192, 255, 0.3)",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#00c0ff", fontWeight: "bold" }}
                >
                  {slide.callout}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleBuyNow}
                  sx={{
                    background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                    px: 5,
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderRadius: 3,
                    boxShadow: "0 8px 25px rgba(0, 192, 255, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #0077ff, #0056cc)",
                      boxShadow: "0 12px 35px rgba(0, 192, 255, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Buy Now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={handleLearnMore}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    px: 5,
                    py: 2,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    "&:hover": {
                      borderColor: "#00c0ff",
                      background: "rgba(0, 192, 255, 0.1)",
                      color: "#00c0ff",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Trust Signals */}
        <Typography
          variant="body2"
          sx={{
            color: "#64748b",
            textAlign: "center",
            mt: 8,
            fontSize: "0.9rem",
          }}
        >
          Free shipping worldwide • 30-day money-back guarantee • 2-year
          warranty
        </Typography>
      </Container>
    </Box>
  );
};

export default SmartSensorCTASection;
