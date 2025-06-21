import React from 'react';
import { Box, Typography } from '@mui/material';
import SmartWhyChooseCard from '../../molecules/smartWhyChoseCard/SmartWhyChooseCard';

const SmartWhyChooseSection = () => {
  return (
    <Box sx={{ backgroundColor: '#f0f8ff', py: 6, px: 2 }}>
      <Typography
        variant="h4"
        align="left"
        fontWeight="bold"
        sx={{ color: '#000', mb: 3 }}
      >
        Why Choose <span style={{ color: '#0077FF' }}>Smart Tank</span>?
      </Typography>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '4px',
          },
          paddingBottom: 2,
        }}
      >
        <SmartWhyChooseCard
          iconSrc="/assets/store-icon.png"
          title="Find Local Fish Sellers Near You Instantly"
          description="Easily discover nearby aquarium stores and fish sellers based on your location. Whether you’re looking for rare species or local breeders, our location-based directory helps you connect with trusted sellers in your area—fast, reliable, and hassle-free."
        />

        <SmartWhyChooseCard
          iconSrc="/assets/water-monitor-icon.png"
          title="Real-Time Water Monitoring"
          description="Track and analyze your tank’s water parameters in real time. Receive instant alerts and insights to maintain a healthy environment for your fish."
        />

        <SmartWhyChooseCard
          iconSrc="/assets/community-icon.png"
          title="Connect with Fishkeeping Community"
          description="Join a vibrant community of fish enthusiasts. Share experiences, tips, and advice with fellow hobbyists and professionals."
        />

        <SmartWhyChooseCard
          iconSrc="/assets/recommendations-icon.png"
          title="Smart Recommendations for Your Tank"
          description="Get AI-powered suggestions on compatible fish species, tank mates, and ideal water conditions based on your tank profile."
        />
      </Box>
    </Box>
  );
};

export default SmartWhyChooseSection;
