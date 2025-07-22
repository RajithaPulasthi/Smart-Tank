import { Box, Button, Container, Typography, Fade, Slide } from "@mui/material";
import { ArrowForward, Store, Search } from "@mui/icons-material";
import SmartHeroBackground from "../../../../assets/SmartHeroBackground.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SmartHeroSection = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleExploreListing = () => {
    navigate("/aquariums");
  };
  const handleListYourStore = () => {
    navigate("/RegisterAquarium");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 25, 47, 1) 100%), url(${SmartHeroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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

      <Container maxWidth="lg">
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Fade in={animate} timeout={1000}>
            <Box sx={{ color: "white", maxWidth: 800, mb: 4 }}>
              <Slide direction="right" in={animate} timeout={800}>
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
                  Find the Perfect Fish.{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(45deg, #00c0ff, #64ffda)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "brightness(1.2)",
                      textShadow: "1px 1px 10px rgba(0, 192, 255, 0.5)",
                    }}
                  >
                    Anywhere. Anytime.
                  </Box>
                </Typography>
              </Slide>

              <Slide direction="left" in={animate} timeout={1200}>
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
                  Discover local fish listings, connect with trusted sellers
                  nearby, and ensure your aquatic friends thrive with optimal
                  water conditions.
                </Typography>
              </Slide>
            </Box>
          </Fade>

          <Fade in={animate} timeout={1600}>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleExploreListing}
                endIcon={<Search />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                  boxShadow: "0 8px 32px rgba(0, 192, 255, 0.3)",
                  borderRadius: 3,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(45deg, #0077ff, #004aad)",
                    boxShadow: "0 12px 40px rgba(0, 192, 255, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Explore Listings
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleListYourStore}
                endIcon={<Store />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  borderWidth: 2,
                  borderRadius: 3,
                  textTransform: "none",
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "white",
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                List Your Store
              </Button>
            </Box>
          </Fade>
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
