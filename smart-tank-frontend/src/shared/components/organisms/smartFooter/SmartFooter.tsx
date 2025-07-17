import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const SmartFooter = () => {
  return (
    <Box sx={{ backgroundColor: '#003F9E', color: '#fff', pt: 6 }}>
      <Grid container spacing={4} px={4}>
        {/* About */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: 450, mb: 2 }}>
            We’re passionate about connecting fish enthusiasts with trusted sellers and smart
            aquarium tools. From local store listings to real-time tank insights, we make
            fishkeeping easier, smarter, and more accessible.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton sx={{ color: 'white' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
              <TwitterIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Links + Contact */}
        <Grid item xs={12} md={6} container spacing={2}>
          {/* Links */}
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {/* empty to align with contact heading */}
              &nbsp;
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['About Us', 'Find Fish', 'FAQs', 'Terms & Conditions', 'Privacy Policy'].map(
                (text) => (
                  <Link
                    key={text}
                    href="#"
                    underline="hover"
                    sx={{ color: 'white', fontSize: '0.9rem' }}
                  >
                    {text}
                  </Link>
                )
              )}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              077–1212123
            </Typography>
            <Typography variant="body2">
              <Box fontWeight={600}>No 23/B</Box>
              Bandaranayake Road,<br />Colombo 11.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom bar */}
      <Box sx={{ backgroundColor: 'black', textAlign: 'center', py: 2, mt: 4 }}>
        <Typography variant="body2" sx={{ color: '#ccc' }}>
          ©2025 Smart Tank. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default SmartFooter;
