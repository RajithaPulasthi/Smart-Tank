import React from 'react';
import { Box, Typography } from '@mui/material';

interface SmartWhyChooseCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

const SmartWhyChooseCard = ({ iconSrc, title, description }: SmartWhyChooseCardProps) => {
  return (
    <Box
      sx={{
        minWidth: 300,
        maxWidth: 340,
        background: 'linear-gradient(135deg, #0077FF 0%, #004AAD 100%)',
        color: '#fff',
        borderRadius: '16px',
        padding: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        flex: '0 0 auto',
        mr: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
      </Box>

      <Box
        component="img"
        src={iconSrc}
        alt={title}
        sx={{
          width: 80,
          height: 80,
          alignSelf: 'flex-end',
        }}
      />
    </Box>
  );
};

export default SmartWhyChooseCard;
