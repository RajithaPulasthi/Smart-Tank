import { Box, Container, Grid, Typography } from "@mui/material";
import SmartStatCard from "../../molecules/smartStatCard/SmartStatCard";
import { Phishing, Store, LocationCity } from "@mui/icons-material";

const stats = [
  {
    icon: <Phishing fontSize="inherit" />,
    targetNumber: 500,
    label: "Fish Species Listed",
  },
  {
    icon: <Store fontSize="inherit" />,
    targetNumber: 150,
    label: "Verified Sellers",
  },
  {
    icon: <LocationCity fontSize="inherit" />,
    targetNumber: 45,
    label: "Cities Covered",
  },
];

const SmartStatsSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(180deg, #0c2a4d 0%, #040d1c 100%)",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="700"
            sx={{ fontSize: { xs: "1.5rem", md: "2.25rem" } }}
          >
            Our Platform by the Numbers
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mt: 1, opacity: 0.8 }}
          >
            A thriving ecosystem for aquatic enthusiasts
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <SmartStatCard
                icon={stat.icon}
                targetNumber={stat.targetNumber}
                label={stat.label}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SmartStatsSection;
