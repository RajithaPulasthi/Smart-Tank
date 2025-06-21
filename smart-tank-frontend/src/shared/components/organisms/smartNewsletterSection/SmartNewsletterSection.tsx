import { Box, Typography, TextField } from "@mui/material";
import SmartButton from "../../atoms/SmartButtons";
import { useState } from "react";

const SmartNewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribed with:", email);
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        backgroundColor: "#f2fcff",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Stay Updated on Fish Trends & Tips
      </Typography>

      {/* Input + Button Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            backgroundColor: "#00aaff",
            borderRadius: "8px",
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
            width: 250,
          }}
          inputProps={{
            style: { padding: "10px 14px" },
          }}
        />

        <SmartButton
          text="Subscribe"
          type="button"
          variant="contained"
          onClick={handleSubscribe}
        />
      </Box>

      <Typography variant="body2" fontWeight={500}>
        We respect your privacy. Unsubscribe at any time.
      </Typography>
    </Box>
  );
};

export default SmartNewsletterSection;
