import { Box } from "@mui/material";

import SmartNavbar from "../../shared/components/organisms";
import SmartHeroSection from "../../shared/components/organisms/smartHeroSection/SmartHeroSection";

const Home = () => {
    return (
        <Box>
            <SmartNavbar />
            <SmartHeroSection />
        </Box>
    )
}

export default Home;