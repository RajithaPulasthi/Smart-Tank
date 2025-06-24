import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

const SmartButton = (props: ButtonProps) => {
  return <Button variant="contained" fullWidth sx={{ mt: 2 }} {...props} />;
};

export default SmartButton;
