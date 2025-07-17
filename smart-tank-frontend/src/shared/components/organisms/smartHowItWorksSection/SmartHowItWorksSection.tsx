import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoCard from "../../molecules/SmartInfoCard/SmartInfoCard";

const SmartHowItWorksSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#004aad",
        py: 6,
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{ color: "#fff", mb: 4 }}
      >
        How <span style={{ color: "#00c0ff" }}>Smart Tank</span> Works
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            iconSrc="/assets/search-icon.png"
            title="Search for Fish"
            description="Enter fish name that you are looking for to see listings nearby and optimal water conditions."
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            iconSrc="/assets/connect-icon.png"
            title="Connect with Local Sellers"
            description="View store info, fish availability, and directions."
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            iconSrc="/assets/water-condition-icon.png"
            title="Realtime water condition"
            description="Ensure your tank’s water conditions are optimal for your fish."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SmartHowItWorksSection;
