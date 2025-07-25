import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Sensors,
  PhoneIphone,
  Psychology,
  Dashboard,
  ElectricalServices,
  Home,
  Store,
  Science,
  School,
  ThermostatAuto,
  WaterDrop,
  Air,
  Analytics,
  Notifications,
  AutoGraph,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";

const SmartSensor = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sensors sx={{ fontSize: 40, color: "#00c0ff" }} />,
      title: "Real-Time Monitoring",
      description:
        "Track vital parameters like temperature, pH, ammonia levels, and oxygen instantly.",
      highlights: ["Temperature", "pH Levels", "Ammonia", "Oxygen"],
    },
    {
      icon: <PhoneIphone sx={{ fontSize: 40, color: "#00c0ff" }} />,
      title: "Live Updates on the Go",
      description:
        "Get instant alerts and data through your Smart Tank account – accessible anytime, anywhere.",
      highlights: [
        "Instant Alerts",
        "Mobile Access",
        "24/7 Monitoring",
        "Cloud Sync",
      ],
    },
    {
      icon: <Psychology sx={{ fontSize: 40, color: "#00c0ff" }} />,
      title: "AI-Driven Insights",
      description:
        "Our system doesn't just monitor – it learns. Get tailored water condition suggestions based on your fish species and historical trends.",
      highlights: [
        "Machine Learning",
        "Species-Specific",
        "Trend Analysis",
        "Smart Suggestions",
      ],
    },
    {
      icon: <Dashboard sx={{ fontSize: 40, color: "#00c0ff" }} />,
      title: "Visual Dashboard",
      description:
        "All your sensor data in one intuitive, easy-to-read panel. Know the status of every tank at a glance.",
      highlights: [
        "Real-time Charts",
        "Status Overview",
        "Historical Data",
        "Export Reports",
      ],
    },
    {
      icon: <ElectricalServices sx={{ fontSize: 40, color: "#00c0ff" }} />,
      title: "Easy Installation",
      description:
        "Plug and play. No technical skills required. Works with any aquarium setup.",
      highlights: [
        "Plug & Play",
        "Universal Compatibility",
        "No Wiring",
        "5min Setup",
      ],
    },
  ];

  const targetAudience = [
    {
      icon: <Home sx={{ fontSize: 35, color: "#00c0ff" }} />,
      title: "Home Aquarium Hobbyists",
      description:
        "Perfect for passionate aquarium enthusiasts maintaining home tanks",
    },
    {
      icon: <Store sx={{ fontSize: 35, color: "#00c0ff" }} />,
      title: "Aquarium Store Owners",
      description:
        "Ideal for managing multiple display tanks and livestock inventory",
    },
    {
      icon: <Science sx={{ fontSize: 35, color: "#00c0ff" }} />,
      title: "Fish Breeders",
      description: "Essential for maintaining optimal breeding conditions",
    },
    {
      icon: <School sx={{ fontSize: 35, color: "#00c0ff" }} />,
      title: "Research & Educational Institutions",
      description:
        "Perfect for academic research and educational demonstrations",
    },
  ];

  const monitoringParams = [
    {
      icon: <ThermostatAuto />,
      name: "Temperature",
      unit: "°C/°F",
      accuracy: "±0.1°",
    },
    { icon: <WaterDrop />, name: "pH Levels", unit: "pH", accuracy: "±0.01" },
    { icon: <Air />, name: "Dissolved Oxygen", unit: "mg/L", accuracy: "±0.1" },
    {
      icon: <Analytics />,
      name: "Ammonia (NH3)",
      unit: "ppm",
      accuracy: "±0.01",
    },
  ];

  const handleOrderNow = () => {
    navigate("/order-sensor");
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <SmartNavbar />
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          color: "white",
          py: 12,
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
            ].join(", "),
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#00c0ff",
                mb: 2,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Box component="span" sx={{ fontSize: "1.5rem" }}>
                🌊
              </Box>
              Introducing the Smart Tank Sensor
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(45deg, #ffffff, #00c0ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Real-Time Water Monitoring
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                color: "#94a3b8",
                fontWeight: 300,
                fontSize: { xs: "1.3rem", md: "1.8rem" },
              }}
            >
              for Healthier Aquariums
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.7,
                color: "#cbd5e1",
                mb: 6,
              }}
            >
              Upgrade your aquarium experience with our Smart Tank Sensor — a
              cutting-edge IoT device designed to monitor your tank's water
              conditions 24/7. Whether you're an aquarium enthusiast or a store
              owner, stay informed and proactive with live updates, alerts, and
              detailed insights — all from your Smart Tank dashboard.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleOrderNow}
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
                Order Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Monitoring Parameters */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            color: "#1e293b",
          }}
        >
          What We Monitor
        </Typography>
        <Grid container spacing={4}>
          {monitoringParams.map((param, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  "&:hover": {
                    boxShadow: "0 8px 30px rgba(0, 192, 255, 0.15)",
                    transform: "translateY(-5px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box sx={{ color: "#00c0ff", mb: 2 }}>{param.icon}</Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  {param.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
                  Unit: {param.unit}
                </Typography>
                <Chip
                  label={`Accuracy: ${param.accuracy}`}
                  size="small"
                  sx={{
                    background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                    color: "white",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Key Features */}
      <Box sx={{ bgcolor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h6"
              sx={{ color: "#00c0ff", mb: 2, fontWeight: 600 }}
            >
              ✅ Key Features
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", color: "#1e293b" }}
            >
              Everything You Need for Perfect Water Conditions
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 4,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    "&:hover": {
                      boxShadow: "0 8px 30px rgba(0, 192, 255, 0.15)",
                      transform: "translateY(-5px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      {feature.icon}
                      <Typography
                        variant="h5"
                        sx={{ ml: 2, fontWeight: "bold", color: "#1e293b" }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: "#64748b", lineHeight: 1.7, mb: 3 }}
                    >
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {feature.highlights.map((highlight, idx) => (
                        <Chip
                          key={idx}
                          label={highlight}
                          size="small"
                          sx={{
                            background: "rgba(0, 192, 255, 0.1)",
                            color: "#00c0ff",
                            border: "1px solid rgba(0, 192, 255, 0.3)",
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Target Audience */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h6"
            sx={{ color: "#00c0ff", mb: 2, fontWeight: 600 }}
          >
            🎯 Perfect For
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: "bold", color: "#1e293b" }}
          >
            Who Benefits Most from Smart Tank Sensor
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {targetAudience.map((audience, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  "&:hover": {
                    boxShadow: "0 8px 30px rgba(0, 192, 255, 0.15)",
                    transform: "translateY(-5px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box sx={{ mb: 2 }}>{audience.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold", color: "#1e293b" }}
                >
                  {audience.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", lineHeight: 1.6 }}
                >
                  {audience.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Smart Tank */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Card
            sx={{
              p: 6,
              textAlign: "center",
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#00c0ff", mb: 2, fontWeight: 600 }}
            >
              💡 Why Choose Smart Tank Sensor?
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "bold", color: "#1e293b", mb: 4 }}
            >
              More Than Just Monitoring
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#64748b",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.7,
                mb: 6,
              }}
            >
              With Smart Tank, you're not just listing your aquarium — you're
              managing it smarter. Seamlessly integrated with our platform, the
              sensor gives your listings an edge by showing real-time water
              quality to buyers and fellow enthusiasts.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
                mb: 4,
              }}
            >
              <Chip
                icon={<Notifications />}
                label="Smart Alerts"
                sx={{ background: "rgba(0, 192, 255, 0.1)", color: "#00c0ff" }}
              />
              <Chip
                icon={<AutoGraph />}
                label="Trend Analysis"
                sx={{ background: "rgba(0, 192, 255, 0.1)", color: "#00c0ff" }}
              />
              <Chip
                icon={<Dashboard />}
                label="Integrated Dashboard"
                sx={{ background: "rgba(0, 192, 255, 0.1)", color: "#00c0ff" }}
              />
            </Box>
            <Divider sx={{ my: 4 }} />
            <Typography
              variant="h5"
              sx={{
                color: "#1e293b",
                fontWeight: "bold",
                mb: 4,
              }}
            >
              🔗 Order now and make your aquarium smarter, safer, and more
              efficient.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleOrderNow}
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                px: 6,
                py: 2.5,
                fontSize: "1.3rem",
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
              Order Smart Tank Sensor Now
            </Button>
          </Card>
        </Container>
      </Box>

      {/* Trust Signals Footer */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          Free shipping worldwide • 30-day money-back guarantee • 2-year
          warranty • 24/7 support
        </Typography>
      </Container>
      <SmartFooter />
    </Box>
  );
};

export default SmartSensor;
