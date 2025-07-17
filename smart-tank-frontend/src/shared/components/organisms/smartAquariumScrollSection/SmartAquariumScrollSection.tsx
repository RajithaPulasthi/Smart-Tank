import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SmartStoreCard from "../../molecules/SmartStoreCard/SmartStoreCard";
import { aquariums } from "../../../../Data/aquarium.data";

const SmartAquariumScrollSection = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ mb: 6 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box>
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
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {aquariums.map((store) => (
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

export default SmartAquariumScrollSection;
