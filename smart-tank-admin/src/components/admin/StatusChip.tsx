import { Chip } from "@mui/material";

const StatusChip = ({ status }: { status: string }) => {
  const color = status === "active" ? "success" : "warning";
  return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} color={color} />;
};

export default StatusChip;
