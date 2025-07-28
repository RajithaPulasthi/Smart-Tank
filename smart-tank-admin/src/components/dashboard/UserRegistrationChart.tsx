import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, CircularProgress, Box } from "@mui/material";
import { useState, useEffect } from "react";
import {
  getAquariumRegistrationStats,
  type AquariumRegistrationStats,
} from "../../services/storeService";

interface UserRegistrationChartProps {
  startDate: string;
  endDate: string;
}

const UserRegistrationChart = ({
  startDate,
  endDate,
}: UserRegistrationChartProps) => {
  const [data, setData] = useState<AquariumRegistrationStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const stats = await getAquariumRegistrationStats(
          token,
          startDate,
          endDate
        );
        setData(stats);
      } catch (error) {
        console.error("Error fetching registration stats:", error);
        // Fallback to dummy data
        const fallbackData = [
          { date: "19/07", count: 3 },
          { date: "20/07", count: 5 },
          { date: "21/07", count: 2 },
          { date: "22/07", count: 8 },
          { date: "23/07", count: 4 },
          { date: "24/07", count: 6 },
          { date: "25/07", count: 7 },
        ];
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationData();
  }, [startDate, endDate]);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Aquarium Registrations
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [value, "Registrations"]}
              labelFormatter={(label: string) => `Date: ${label}`}
            />
            <Bar dataKey="count" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default UserRegistrationChart;
