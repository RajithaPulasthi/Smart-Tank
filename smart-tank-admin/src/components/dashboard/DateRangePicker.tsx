import { Box, TextField } from "@mui/material";

const DateRangePicker = () => {
  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField type="date" size="small" fullWidth defaultValue="2025-06-01" />
      <TextField type="date" size="small" fullWidth defaultValue="2025-06-07" />
    </Box>
  );
};

export default DateRangePicker;
