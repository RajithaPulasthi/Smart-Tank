import { Box, Typography, Paper } from "@mui/material";
import { useCounter } from "../../../hooks/useCounter";

export interface SmartStatCardProps {
  targetNumber: number;
  label: string;
  icon: React.ReactElement;
}

const SmartStatCard = ({ targetNumber, label, icon }: SmartStatCardProps) => {
  const count = useCounter(targetNumber, 2000);

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "white",
        borderRadius: 4,
        minWidth: 200,
      }}
    >
      <Box sx={{ fontSize: 48, lineHeight: 1, mb: 1.5, color: "#64ffda" }}>
        {icon}
      </Box>
      <Typography variant="h3" fontWeight="700" component="p">
        {count}+
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.8 }}>
        {label}
      </Typography>
    </Paper>
  );
};

export default SmartStatCard;
