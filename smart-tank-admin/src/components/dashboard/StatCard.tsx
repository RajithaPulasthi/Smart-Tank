import { Paper, Typography } from "@mui/material";

type StatCardProps = {
  title: string;
  value: number;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 160, textAlign: "center" }}>
      <Typography variant="body1" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
};

export default StatCard;
