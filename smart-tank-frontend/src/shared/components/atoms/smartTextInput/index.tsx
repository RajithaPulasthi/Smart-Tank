import { TextField, styled } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    "&:hover": {
      background: "rgba(255, 255, 255, 0.12)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
}));

const SmartTextInput = ({ label, ...props }: TextFieldProps) => {
  return <StyledTextField variant="outlined" label={label} {...props} />;
};

export default SmartTextInput;
