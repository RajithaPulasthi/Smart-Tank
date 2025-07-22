import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import type { JSX } from "react";

type SmartHorizontalScrollSectionProps<T> = {
  title: string;
  subtitle?: string;
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
};

const SmartHorizontalScrollSection = <T,>({
  title,
  subtitle,
  items,
  renderItem,
}: SmartHorizontalScrollSectionProps<T>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const scroll = (dir: "left" | "right") => {
    const scrollAmount = isMobile ? 280 : 340;
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ my: 6, position: "relative" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          px: { xs: 2, md: 0 }, // Add some padding on mobile
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="700" component="h2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => scroll("left")}
              size="small"
              sx={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": { background: "rgba(255,255,255,0.2)" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => scroll("right")}
              size="small"
              sx={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": { background: "rgba(255,255,255,0.2)" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Scrollable Row */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: { xs: 2, md: 3 },
          py: 2,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for a cleaner look
          },
          // Add padding to the sides to see the start and end cards fully
          px: { xs: 2, md: 0 },
        }}
      >
        {items.map((item, index) => renderItem(item, index))}
      </Box>
    </Box>
  );
};

export default SmartHorizontalScrollSection;
