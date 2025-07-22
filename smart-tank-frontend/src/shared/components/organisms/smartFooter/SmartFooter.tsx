import {
  Box,
  Typography,
  Link,
  IconButton,
  Grid,
  Container,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import SmartTankLogo from "../../../../assets/SmartTankLogo.png";

const SmartFooter = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
        color: "rgba(255, 255, 255, 0.9)",
        py: { xs: 4, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          justifyContent="space-between"
        >
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img
                src={SmartTankLogo}
                alt="Smart Tank Logo"
                style={{ width: 150, filter: "brightness(0) invert(1)" }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ maxWidth: 450, mb: 2, color: "rgba(255, 255, 255, 0.7)" }}
            >
              Connecting fish enthusiasts with trusted sellers and smart
              aquarium tools. We make fishkeeping easier, smarter, and more
              accessible.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[<InstagramIcon />, <FacebookIcon />, <TwitterIcon />].map(
                (icon, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "translateY(-2px)",
                      },
                      transition: "transform 0.2s ease-in-out",
                    }}
                  >
                    {icon}
                  </IconButton>
                )
              )}
            </Box>
          </Grid>

          {/* Links + Contact Section */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={{ xs: 4, md: 5 }}>
              {/* Quick Links */}
              <Grid item xs={6} sm={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quick Links
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {[
                    { label: "About Us", href: "/about" },
                    { label: "Find Fish", href: "/find-fish" },
                    { label: "Aquariums", href: "/aquariums" },
                    { label: "Terms & Conditions", href: "#" },
                    { label: "Privacy Policy", href: "#" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      underline="none"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.9rem",
                        "&:hover": {
                          color: "#fff",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              {/* Contact */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "rgba(255, 255, 255, 0.7)" }}
                >
                  077–1212123
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  No 23/B, Bandaranayake Road,
                  <br />
                  Colombo 11.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(255, 255, 255, 0.5)" }}
        >
          © {new Date().getFullYear()} Smart-Tank. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default SmartFooter;
