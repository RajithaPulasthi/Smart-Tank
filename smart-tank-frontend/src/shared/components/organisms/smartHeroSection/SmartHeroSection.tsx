import { Box, Button, Container, Typography, Fade, Slide } from "@mui/material";
import {
  ArrowForward,
  Store,
  Search,
  ShoppingCart,
  PlayArrow,
} from "@mui/icons-material";
import SmartHeroBackground from "../../../../assets/SmartHeroBackground.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SmartHeroSection = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Fish Listings
    {
      title: "Find the Perfect Fish.",
      highlightedTitle: "Anywhere. Anytime.",
      description:
        "Discover local fish listings, connect with trusted sellers nearby, and ensure your aquatic friends thrive with optimal water conditions.",
      buttons: [
        {
          text: "Explore Listings",
          icon: <Search />,
          onClick: () => navigate("/aquariums"),
          variant: "contained" as const,
        },
        {
          text: "List Your Store",
          icon: <Store />,
          onClick: () => navigate("/RegisterAquarium"),
          variant: "outlined" as const,
        },
      ],
    },
    // Slide 2: Smart Sensor
    {
      title: "Ready to Upgrade Your",
      highlightedTitle: "Aquarium?",
      subtitle: "Monitor. Protect. Thrive.",
      description:
        "Bring smart technology to your tank with the Smart Tank Sensor — your partner in maintaining healthy, vibrant aquatic life.",
      callout: "👉 Order now and get started in minutes!",
      buttons: [
        {
          text: "Buy Now",
          icon: <ShoppingCart />,
          onClick: () => navigate("/order-sensor"),
          variant: "contained" as const,
        },
        {
          text: "Learn More",
          icon: <PlayArrow />,
          onClick: () => navigate("/smart-sensor"),
          variant: "outlined" as const,
        },
      ],
    },
  ];

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: "600px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 25, 47, 1) 100%), url(${SmartHeroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: { xs: "scroll", md: "fixed" },
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          animation: "pulse 4s ease-in-out infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.5 },
            "100%": { opacity: 0.8 },
          },
        }}
      />

      {/* Floating elements */}
      <Box
        sx={{
          position: "absolute",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          top: "10%",
          right: "10%",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(0, 192, 255, 0.2)",
          bottom: "20%",
          left: "15%",
          animation: "float 4s ease-in-out infinite 2s",
        }}
      />

      {/* Slide Indicators */}
      <Box
        sx={{
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 3,
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
                currentSlide === index ? "#00c0ff" : "rgba(255, 255, 255, 0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                background:
                  currentSlide === index
                    ? "#0077ff"
                    : "rgba(255, 255, 255, 0.6)",
              },
            }}
          />
        ))}
      </Box>

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2, height: "100%" }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
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
                transition: "opacity 0.8s ease-in-out",
                pointerEvents: currentSlide === index ? "auto" : "none",
              }}
            >
              <Fade in={animate && currentSlide === index} timeout={1000}>
                <Box
                  sx={{
                    color: "white",
                    maxWidth: 800,
                    mb: 4,
                    textAlign: { xs: "center", md: "left" },
                    px: { xs: 2, md: 0 },
                  }}
                >
                  <Slide
                    direction="right"
                    in={animate && currentSlide === index}
                    timeout={800}
                  >
                    <Typography
                      variant="h2"
                      component="h1"
                      gutterBottom
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                        lineHeight: 1.2,
                        textShadow: "2px 4px 12px rgba(0,0,0,0.8)",
                        color: "white",
                        mb: 3,
                      }}
                    >
                      {slide.title}{" "}
                      <Box
                        component="span"
                        sx={{
                          background:
                            "linear-gradient(45deg, #00c0ff, #64ffda)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          filter: "brightness(1.2)",
                          textShadow: "1px 1px 10px rgba(0, 192, 255, 0.5)",
                        }}
                      >
                        {slide.highlightedTitle}
                      </Box>
                    </Typography>
                  </Slide>

                  {slide.subtitle && (
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#00c0ff",
                        mb: 3,
                        fontWeight: 600,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        textShadow: "1px 2px 6px rgba(0,0,0,0.7)",
                      }}
                    >
                      {slide.subtitle}
                    </Typography>
                  )}

                  <Slide
                    direction="left"
                    in={animate && currentSlide === index}
                    timeout={1200}
                  >
                    <Typography
                      variant="h6"
                      paragraph
                      sx={{
                        mb: 4,
                        fontSize: "1.25rem",
                        opacity: 0.9,
                        lineHeight: 1.6,
                        textShadow: "1px 2px 6px rgba(0,0,0,0.7)",
                      }}
                    >
                      {slide.description}
                    </Typography>
                  </Slide>

                  {slide.callout && (
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
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "#00c0ff", fontWeight: "bold" }}
                      >
                        {slide.callout}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Fade>

              <Fade in={animate && currentSlide === index} timeout={1600}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", md: "flex-start" },
                    alignItems: "center",
                  }}
                >
                  {slide.buttons.map((button, buttonIndex) => (
                    <Button
                      key={buttonIndex}
                      variant={button.variant}
                      size="large"
                      onClick={button.onClick}
                      endIcon={button.icon}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        borderRadius: 3,
                        textTransform: "none",
                        transition: "all 0.3s ease",
                        ...(button.variant === "contained"
                          ? {
                              background:
                                "linear-gradient(45deg, #00c0ff, #0077ff)",
                              boxShadow: "0 8px 32px rgba(0, 192, 255, 0.3)",
                              "&:hover": {
                                background:
                                  "linear-gradient(45deg, #0077ff, #004aad)",
                                boxShadow: "0 12px 40px rgba(0, 192, 255, 0.4)",
                                transform: "translateY(-2px)",
                              },
                            }
                          : {
                              color: "white",
                              borderColor: "rgba(255, 255, 255, 0.5)",
                              borderWidth: 2,
                              backdropFilter: "blur(10px)",
                              background: "rgba(255, 255, 255, 0.1)",
                              "&:hover": {
                                borderColor: "white",
                                background: "rgba(255, 255, 255, 0.2)",
                                transform: "translateY(-2px)",
                                boxShadow:
                                  "0 8px 32px rgba(255, 255, 255, 0.2)",
                              },
                            }),
                      }}
                    >
                      {button.text}
                    </Button>
                  ))}
                </Box>
              </Fade>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          opacity: 0.7,
          animation: "bounce 2s infinite",
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateX(-50%) translateY(0)",
            },
            "40%": { transform: "translateX(-50%) translateY(-10px)" },
            "60%": { transform: "translateX(-50%) translateY(-5px)" },
          },
        }}
      >
        <Typography variant="caption" sx={{ mb: 1, fontSize: "0.75rem" }}>
          Scroll to explore
        </Typography>
        <ArrowForward sx={{ transform: "rotate(90deg)", fontSize: "1.5rem" }} />
      </Box>
    </Box>
  );
};

export default SmartHeroSection;
