import { Chip } from "@mui/material";

export const RoleChip = ({ authority }: { authority: string }) => {
  const role = authority.replace("ROLE_", "").replace("_", " ");
  return <Chip label={role} color="primary" />;
};
