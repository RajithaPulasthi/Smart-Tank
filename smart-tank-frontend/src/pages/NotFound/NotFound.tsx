import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white'
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ maxWidth: 600, textAlign: 'center', mb: 3 }}>
        The page you're looking for doesn't exist. This might be because the URL is incorrect or the page has been moved.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
        sx={{ 
          backgroundColor: '#00bcd4',
          '&:hover': { backgroundColor: '#0097a7' }
        }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
