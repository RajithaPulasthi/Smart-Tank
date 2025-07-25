import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import {
  School,
  Water,
  People,
  TrendingUp,
  Nature,
  Support,
  LocationOn,
} from "@mui/icons-material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: <People /> },
    { label: "Partner Stores", value: "500+", icon: <LocationOn /> },
    { label: "Fish Species", value: "1,200+", icon: <Water /> },
    { label: "Years Experience", value: "5+", icon: <TrendingUp /> },
  ];

  const features = [
    {
      icon: <Water />,
      title: "Water Quality Monitoring",
      description:
        "Advanced monitoring systems to ensure optimal water conditions for your aquatic pets.",
    },
    {
      icon: <LocationOn />,
      title: "Store Locator",
      description:
        "Find the nearest aquarium stores and fish sellers in your area with ease.",
    },
    {
      icon: <School />,
      title: "Expert Guidance",
      description:
        "Get professional advice from experienced aquarists and marine biologists.",
    },
    {
      icon: <People />,
      title: "Community Support",
      description:
        "Connect with fellow fish enthusiasts and share experiences.",
    },
    {
      icon: <Nature />,
      title: "Sustainable Practices",
      description:
        "Promoting eco-friendly aquarium keeping and responsible fish breeding.",
    },
    {
      icon: <Support />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support for all your aquarium needs.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Marine Biologist",
      image: "/assets/team/sarah.jpg",
      expertise: ["Water Chemistry", "Fish Health", "Ecosystem Design"],
    },
    {
      name: "Mike Chen",
      role: "Aquarium Designer",
      image: "/assets/team/mike.jpg",
      expertise: ["Tank Design", "Filtration", "Lighting Systems"],
    },
    {
      name: "Emma Rodriguez",
      role: "Fish Specialist",
      image: "/assets/team/emma.jpg",
      expertise: ["Breeding", "Nutrition", "Species Care"],
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <SmartNavbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
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
            background:
              "radial-gradient(circle at 70% 30%, rgba(0, 119, 255, 0.1) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              sx={{
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              }}
            >
              About{" "}
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
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#94a3b8",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              Revolutionizing aquarium keeping with smart technology, expert
              guidance, and a passionate community of fish enthusiasts.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/contact-us")}
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                "&:hover": {
                  background: "linear-gradient(45deg, #0077ff, #0056cc)",
                },
              }}
            >
              Get in Touch
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                  borderRadius: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#0077ff",
                    mb: 2,
                    "& svg": { fontSize: "2.5rem" },
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="primary"
                  sx={{ mb: 1 }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission Section */}
      <Box sx={{ background: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                sx={{ mb: 3, color: "#1e293b" }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  lineHeight: 1.8,
                  color: "#475569",
                  fontSize: "1.1rem",
                }}
              >
                At Smart Tank, we believe that every fish deserves the perfect
                home. Our mission is to make aquarium keeping accessible,
                enjoyable, and sustainable for enthusiasts of all levels.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  lineHeight: 1.8,
                  color: "#475569",
                  fontSize: "1.1rem",
                }}
              >
                We combine cutting-edge technology with expert knowledge to
                provide comprehensive solutions for modern aquarium keeping.
                From water quality monitoring to connecting you with local fish
                stores, we're here to support your aquatic journey.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #0077ff 0%, #00c0ff 100%)",
                  borderRadius: 3,
                  p: 4,
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Water sx={{ fontSize: "4rem", mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Creating Healthy Aquatic Ecosystems
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  Through innovation, education, and community support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 6, color: "#1e293b" }}
        >
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0, 119, 255, 0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      color: "#0077ff",
                      mb: 2,
                      "& svg": { fontSize: "2.5rem" },
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 6, color: "white" }}
          >
            Meet Our Expert Team
          </Typography>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={5}
                  sx={{
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mx: "auto",
                        mb: 2,
                        background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                      }}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ mb: 2 }}>
                      {member.role}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                      }}
                    >
                      {member.expertise.map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #e3f2fd, #bbdefb)",
                            color: "#0077ff",
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

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #0077ff 0%, #00c0ff 100%)",
            borderRadius: 3,
            p: 6,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Ready to Start Your Aquarium Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of fish enthusiasts who trust Smart Tank
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/aquariums")}
            sx={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            Explore Aquariums
          </Button>
        </Box>
      </Container>

      <SmartFooter />
    </Box>
  );
};

export default About;
