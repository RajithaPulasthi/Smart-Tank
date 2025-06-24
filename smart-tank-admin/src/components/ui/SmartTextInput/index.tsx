import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

const SmartTextInput = (props: TextFieldProps) => {
  return <TextField fullWidth variant="outlined" margin="normal" {...props} />;
};

export default SmartTextInput;
