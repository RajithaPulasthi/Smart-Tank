import { Box, TextField } from "@mui/material";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) => {
  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        type="date"
        label="Start Date"
        size="small"
        fullWidth
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        type="date"
        label="End Date"
        size="small"
        fullWidth
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default DateRangePicker;
