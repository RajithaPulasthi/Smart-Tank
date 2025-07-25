import { Box } from "@mui/material";

import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartHeroSection from "../../shared/components/organisms/smartHeroSection/SmartHeroSection";
import SmartHowItWorksSection from "../../shared/components/organisms/smartHowItWorksSection/SmartHowItWorksSection";
import SmartWhyChooseSection from "../../shared/components/organisms/smartWhyChooseSection/SmartWhyChooseSection";
import SmartSellerCTASection from "../../shared/components/organisms/smartSellerCTAction/SmartSellerCTASection";
import SmartFeaturedAquariumsSection from "../../shared/components/organisms/smartFeaturedAquariumsSection/SmartFeaturedAquariumsSection";
import SmartStatsSection from "../../shared/components/organisms/smartStatsSection/SmartStatsSection";
import SmartSensorCTASection from "../../shared/components/organisms/smartSensorCTASection/SmartSensorCTASection";
import SmartNewsletterSection from "../../shared/components/organisms/smartNewsletterSection/SmartNewsletterSection";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <SmartNavbar />
      <SmartHeroSection />
      <SmartHowItWorksSection />
      <SmartWhyChooseSection />
      <SmartSellerCTASection />
      <SmartFeaturedAquariumsSection />
      <SmartStatsSection />
      <SmartSensorCTASection />
      <SmartNewsletterSection />
      <SmartFooter />
    </Box>
  );
};

export default Home;
