import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import type { Fish } from "../../types/Fish";

type Props = {
  fish: Fish[];
  loading?: boolean;
};

const FishTable = ({ fish, loading = false }: Props) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (fish.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          No fish found
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Temperature (°C)</TableCell>
            <TableCell>pH Level</TableCell>
            <TableCell>GH Level</TableCell>
            <TableCell>KH Level</TableCell>
            <TableCell>Nitrate (ppm)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fish.map((fishItem, index) => (
            <TableRow key={fishItem.id || index} hover>
              <TableCell>
                <Typography fontWeight={500}>{fishItem.name}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={`${fishItem.temp}°C`}
                  color="info"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{fishItem.ph}</TableCell>
              <TableCell>{fishItem.gh}</TableCell>
              <TableCell>{fishItem.kh}</TableCell>
              <TableCell>
                <Chip
                  label={`${fishItem.nitrate} ppm`}
                  color="success"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FishTable;
