"use client";

import Button from '@mui/material/Button';


interface ButtonProps{
    text: string;
    onClick: () => void;
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    variant: "contained" | "outlined" | "text";
}

const SmartButton = ({text, onClick, type, disabled, variant}: ButtonProps) => {
    return (
        <Button
            variant={variant}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </Button>
    );
};

export default SmartButton;