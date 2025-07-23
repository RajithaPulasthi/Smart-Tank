import { Box, Typography, Container, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Search, ConnectWithoutContact, WaterDrop } from "@mui/icons-material";

const SmartHowItWorksSection = () => {
  const steps = [
    {
      icon: <Search sx={{ fontSize: 48, color: "#00c0ff" }} />,
      title: "Search for Fish",
      description:
        "Enter fish name that you are looking for to see listings nearby and optimal water conditions.",
      step: "01",
    },
    {
      icon: <ConnectWithoutContact sx={{ fontSize: 48, color: "#00c0ff" }} />,
      title: "Connect with Local Sellers",
      description: "View store info, fish availability, and directions.",
      step: "02",
    },
    {
      icon: <WaterDrop sx={{ fontSize: 48, color: "#00c0ff" }} />,
      title: "Real-time Water Condition",
      description:
        "Ensure your tank's water conditions are optimal for your fish.",
      step: "03",
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
            "radial-gradient(circle at 30% 70%, rgba(0, 192, 255, 0.1) 0%, transparent 50%)",
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
              color: "#1e293b",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
            }}
          >
            How{" "}
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
            </Box>{" "}
            Works
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Three simple steps to find your perfect aquatic companion
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: 4,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 25px 50px rgba(0, 192, 255, 0.15)",
                    background: "rgba(255, 255, 255, 0.95)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #00c0ff, #0077ff)",
                  },
                }}
              >
                <CardContent
                  sx={{ p: 4, textAlign: "center", position: "relative" }}
                >
                  {/* Step number */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: 20,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      boxShadow: "0 4px 12px rgba(0, 192, 255, 0.3)",
                    }}
                  >
                    {step.step}
                  </Box>

                  <Box sx={{ mb: 3 }}>{step.icon}</Box>

                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    sx={{
                      color: "#1e293b",
                      mb: 2,
                      fontSize: "1.4rem",
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.6,
                      fontSize: "1rem",
                    }}
                  >
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Connection lines */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: "50%",
            left: "15%",
            right: "15%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%)",
            zIndex: 0,
          }}
        />
      </Container>
    </Box>
  );
};

export default SmartHowItWorksSection;
