import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const data = [
  { date: "01/06", count: 150 },
  { date: "02/06", count: 130 },
  { date: "03/06", count: 160 },
  { date: "04/06", count: 100 },
  { date: "05/06", count: 170 },
  { date: "06/06", count: 130 },
  { date: "07/06", count: 140 },
];

const UserRegistrationChart = () => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        User Registration
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#673ab7" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default UserRegistrationChart;
