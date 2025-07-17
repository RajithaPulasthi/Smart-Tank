import { Box, Typography, IconButton } from "@mui/material";
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

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
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
          {subtitle && <Typography variant="body2">{subtitle}</Typography>}
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

      {/* Scrollable Row */}
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
        {items.map((item, index) => renderItem(item, index))}
      </Box>
    </Box>
  );
};

export default SmartHorizontalScrollSection;
