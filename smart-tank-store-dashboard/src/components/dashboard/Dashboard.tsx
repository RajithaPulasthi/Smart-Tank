import {
  Box,
  Typography,
  Paper,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";

// Sample data for the chart
const chartData = [
  { date: "01/06", views: 140 },
  { date: "02/06", views: 120 },
  { date: "03/06", views: 160 },
  { date: "04/06", views: 100 },
  { date: "05/06", views: 180 },
  { date: "06/06", views: 120 },
  { date: "07/06", views: 150 },
];

// Colors for each bar
const barColors = [
  "#8B4513",
  "#8B4513",
  "#228B22",
  "#1E90FF",
  "#4B0082",
  "#008B8B",
  "#8B008B",
];

const StatCard = ({
  title,
  count,
  color,
}: {
  title: string;
  count: number;
  color: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      textAlign: "center",
      borderRadius: 2,
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      height: "100%",
    }}
  >
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography
      variant="h3"
      fontWeight="bold"
      sx={{ color, fontSize: "2.5rem" }}
    >
      {count}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("01-06-2025 - 07-06-2025");

  return (
    <Box sx={{ p: 2 }}>
      {/* Stats Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <StatCard title="Total Fish Count" count={25} color="#1976d2" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <StatCard title="Total Tank Count" count={40} color="#388e3c" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <StatCard title="Total View Count" count={150} color="#f57c00" />
        </Box>
      </Box>

      {/* View Count Chart */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" fontWeight="600" color="text.primary">
            View Count
          </Typography>
          <FormControl size="small">
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              sx={{
                minWidth: 200,
                height: 32,
                "& .MuiSelect-select": {
                  py: 0.5,
                  fontSize: "0.875rem",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d0d0d0",
                },
              }}
            >
              <MenuItem value="01-06-2025 - 07-06-2025">
                01-06-2025 - 07-06-2025
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                domain={[0, 200]}
                ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160, 180]}
              />
              <Bar dataKey="views" barSize={50}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
