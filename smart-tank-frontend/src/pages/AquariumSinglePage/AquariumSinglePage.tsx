import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import aquariumService, {
  type AquariumListItem,
  type AquariumShopInfo,
} from "../../services/aquariumService";
import SmartHeroBackground from "../../assets/SmartHeroBackground.png";

const AquariumSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [aquariumData, setAquariumData] = useState<AquariumListItem | null>(
    null
  );
  const [shopInfo, setShopInfo] = useState<AquariumShopInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadAquariumData = async () => {
      if (!id) {
        setError("Aquarium ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const allAquariums = await aquariumService.getAllAquariums();
        const aquarium = allAquariums.find((a) => a.id === parseInt(id));

        if (!aquarium) {
          setError("Aquarium not found");
          setLoading(false);
          return;
        }

        setAquariumData(aquarium);

        // Fetch detailed shop info
        try {
          const info = await aquariumService.getAquariumShopInfo(parseInt(id));
          setShopInfo(info);
        } catch (shopError) {
          console.warn("Shop info not available:", shopError);
          // Continue without shop info
        }
      } catch (err) {
        console.error("Error loading aquarium data:", err);
        setError("Failed to load aquarium data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAquariumData();
  }, [id]);

  const parseOpeningHours = (hours: string) => {
    if (!hours) return null;

    try {
      const daysMap: { [key: string]: string } = {
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday",
        sun: "Sunday",
      };

      return hours.split(";").map((dayHour) => {
        const [day, timeRange] = dayHour.split(":");
        return {
          day: daysMap[day.toLowerCase()] || day,
          hours: timeRange,
        };
      });
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <>
        <SmartNavbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <CircularProgress size={60} sx={{ color: "#00c0ff" }} />
        </Box>
        <SmartFooter />
      </>
    );
  }

  if (error || !aquariumData) {
    return (
      <>
        <SmartNavbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Aquarium not found."}
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/aquariums")}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #00c0ff, #0077ff)",
              "&:hover": {
                background: "linear-gradient(45deg, #0077ff, #0056cc)",
              },
            }}
          >
            Back to Aquariums
          </Button>
        </Container>
        <SmartFooter />
      </>
    );
  }

  const openingHours =
    shopInfo && shopInfo.openingHours
      ? parseOpeningHours(shopInfo.openingHours)
      : null;

  return (
    <>
      <SmartNavbar />
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          minHeight: "100vh",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: [
              "radial-gradient(circle at 20% 20%, rgba(0, 192, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(0, 119, 255, 0.05) 0%, transparent 50%)",
            ].join(", "),
            zIndex: 0,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ py: 4, position: "relative", zIndex: 1 }}
        >
          {/* Back Button */}
          <Box sx={{ mb: 4 }}>
            <IconButton
              onClick={() => navigate("/aquariums")}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(0, 192, 255, 0.2)",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>

          {/* Hero Section */}
          <Card
            sx={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 4,
              color: "white",
              mb: 4,
              overflow: "hidden",
            }}
          >
            {/* Header Image */}
            <Box
              sx={{
                height: 300,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${SmartHeroBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                  textAlign: "center",
                  px: 2,
                }}
              >
                {aquariumData.aquariumName}
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {/* Basic Info */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                  {aquariumData.aquariumName}
                </Typography>
              </Box>

              {/* Shop Info Section */}
              {shopInfo && (
                <>
                  <Divider
                    sx={{ my: 4, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  />

                  {/* About Section */}
                  {shopInfo.about && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        About Us
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ lineHeight: 1.8, opacity: 0.9 }}
                      >
                        {shopInfo.about}
                      </Typography>
                    </Box>
                  )}

                  {/* Contact Info */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                      Contact Information
                    </Typography>

                    <Box sx={{ display: "grid", gap: 2 }}>
                      {shopInfo.contactNumber && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PhoneIcon sx={{ mr: 2, opacity: 0.7 }} />
                          <Typography variant="body1">
                            Shop Phone: {shopInfo.contactNumber}
                          </Typography>
                        </Box>
                      )}

                      {shopInfo.shopEmail && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EmailIcon sx={{ mr: 2, opacity: 0.7 }} />
                          <Typography variant="body1">
                            Shop Email: {shopInfo.shopEmail}
                          </Typography>
                        </Box>
                      )}

                      {shopInfo.shopAddress && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocationOnIcon sx={{ mr: 2, opacity: 0.7 }} />
                          <Typography variant="body1">
                            Shop Address: {shopInfo.shopAddress}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Opening Hours */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                      Opening Hours
                    </Typography>
                    {openingHours ? (
                      <Box sx={{ display: "grid", gap: 1 }}>
                        {openingHours.map((schedule, index) => (
                          <Box
                            key={index}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <AccessTimeIcon
                              sx={{ mr: 2, opacity: 0.7, fontSize: 20 }}
                            />
                            <Typography variant="body1">
                              <strong>{schedule.day}:</strong> {schedule.hours}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon
                          sx={{ mr: 2, opacity: 0.7, fontSize: 20 }}
                        />
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                          Opening hours not available. Please contact the store
                          for more information.
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Social Media */}
                  {(shopInfo.facebookUrl ||
                    shopInfo.instagramUrl ||
                    shopInfo.youTubeUrl ||
                    shopInfo.twitterUrl) && (
                    <Box>
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                        Follow Us
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        {shopInfo.facebookUrl && (
                          <IconButton
                            component="a"
                            href={shopInfo.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              backgroundColor: "#1877f2",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#166fe5",
                              },
                            }}
                          >
                            <FacebookIcon />
                          </IconButton>
                        )}

                        {shopInfo.instagramUrl && (
                          <IconButton
                            component="a"
                            href={shopInfo.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              background:
                                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                              color: "white",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <InstagramIcon />
                          </IconButton>
                        )}

                        {shopInfo.youTubeUrl && (
                          <IconButton
                            component="a"
                            href={shopInfo.youTubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              backgroundColor: "#ff0000",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#cc0000",
                              },
                            }}
                          >
                            <YouTubeIcon />
                          </IconButton>
                        )}

                        {shopInfo.twitterUrl && (
                          <IconButton
                            component="a"
                            href={shopInfo.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              backgroundColor: "#1da1f2",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#0d8bd9",
                              },
                            }}
                          >
                            <TwitterIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
      <SmartFooter />
    </>
  );
};

export default AquariumSinglePage;
