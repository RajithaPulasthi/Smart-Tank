import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SmartStoreCard from "../../molecules/SmartStoreCard/SmartStoreCard";
import { aquariums } from "../../../../Data/aquarium.data";

const SmartFeaturedAquariumsSection = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  const stores = aquariums.slice(0, 5); 

  return (
    <Box sx={{ px: 3, py: 5, backgroundColor: "#f4fbff" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Featured Local Aquariums
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" fontWeight={500}>
            See all
          </Typography>
          <IconButton onClick={() => scroll("left")} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => scroll("right")} size="small">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Scrollable Cards */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {stores.map((store) => (
          <SmartStoreCard
            key={store.id}
            id={store.id}
            imageSrc={store.bannerImage}
            title={store.name}
            location={store.address}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SmartFeaturedAquariumsSection;
