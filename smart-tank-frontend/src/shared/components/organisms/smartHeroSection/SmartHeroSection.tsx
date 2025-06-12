import { Box, Button, Container, Typography } from '@mui/material';
import SmartHeroBackground from "../../../../assets/SmartHeroBackground.png";

const SmartHeroSection = () => {
  return (
    <Box
      sx={{
        height: '90vh',
        backgroundImage: `url(${SmartHeroBackground})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ color: 'white', maxWidth: 1000 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Find the Right Fish. <br /> Anywhere. Anytime.
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Search local fish listings, connect with nearby sellers, and discover which fish thrive in your water.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary">
              Explore Listings
            </Button>
            <Button variant="outlined" color="primary">
              List Your Store
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SmartHeroSection;