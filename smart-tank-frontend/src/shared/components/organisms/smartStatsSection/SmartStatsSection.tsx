import { Box } from "@mui/material";
import SmartStatCard from "../../molecules/smartStatCard/SmartStatCard";

const SmartStatsSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#003F9E",
        overflow: "hidden",
      }}
    >
      <SmartStatCard targetNumber={100} label="Fish Listed" bgColor="#003041" />
      <SmartStatCard
        targetNumber={100}
        label="Verified Sellers"
        bgColor="#00A6FF"
        isCenter
      />
      <SmartStatCard
        targetNumber={100}
        label="Cities Covered"
        bgColor="#003041"
      />
    </Box>
  );
};

export default SmartStatsSection;
