import { Box } from "@mui/material";
import SmartHorizontalScrollSection from "../smartHorizontalScrollSection/SmartHorizontalScrollSection";
import SmartStoreCard from "../../molecules/SmartStoreCard/SmartStoreCard";
import { aquariums } from "../../../../Data/aquarium.data";

const SmartFeaturedAquariumsSection = () => {
  const stores = aquariums.slice(0, 8); // Get a few more stores

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #040d1c 0%, #0c2a4d 100%)",
        color: "white",
        py: { xs: 4, md: 8 },
      }}
    >
      <SmartHorizontalScrollSection
        title="Featured Local Aquariums"
        subtitle="Discover top-rated stores near you"
        items={stores}
        renderItem={(store) => (
          <SmartStoreCard
            key={store.id}
            id={store.id}
            imageSrc={store.bannerImage}
            title={store.name}
            location={store.address}
          />
        )}
      />
    </Box>
  );
};

export default SmartFeaturedAquariumsSection;
