import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

type SmartTextInputProps = TextFieldProps & {
  label: string;
};

const SmartTextInput = ({ label, ...props }: SmartTextInputProps) => {
  return <TextField variant="outlined" label={label} {...props} />;
};

export default SmartTextInput;
