import { Box, Typography, Paper } from "@mui/material";
import { ReactNode } from "react";

const AuthFormCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          width: 320,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default AuthFormCard;
