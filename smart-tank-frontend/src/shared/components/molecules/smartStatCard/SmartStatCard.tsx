import { Box, Typography } from '@mui/material';
import { useCounter } from '../../../hooks/useCounter';

export interface SmartStatCardProps {
    targetNumber: number;
    label: string;
    bgColor: string;
    isCenter?: boolean;
  }
  
const SmartStatCard = ({ targetNumber, label, bgColor, isCenter }: SmartStatCardProps) => {
  const count = useCounter(targetNumber, 1500);

  return (
    <Box
      sx={{
        flex: 1,
        py: 4,
        backgroundColor: bgColor,
        color: isCenter ? 'black' : 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {count}+
      </Typography>
      <Typography variant="subtitle1" fontWeight={isCenter ? 500 : 400}>
        {label}
      </Typography>
    </Box>
  );
};

export default SmartStatCard;
