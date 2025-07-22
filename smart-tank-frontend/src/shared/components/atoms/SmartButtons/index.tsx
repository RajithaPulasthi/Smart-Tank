"use client";

import Button from "@mui/material/Button";

interface ButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  sx?: object;
}

const SmartButton = ({
  text,
  onClick,
  type,
  disabled,
  variant = "contained",
  fullWidth,
  sx,
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={sx}
    >
      {text}
    </Button>
  );
};

export default SmartButton;
