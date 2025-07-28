import { Box, Typography, Container, Paper } from "@mui/material";
import SmartButton from "../../atoms/SmartButtons";
import { useState } from "react";
import SmartTextInput from "../../atoms/smartTextInput";

const SmartNewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribed with:", email);
      // Here you would typically call an API
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(180deg, #040d1c 0%, #0c2a4d 100%)",
        color: "white",
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            textAlign: "center",
            background: "rgba(10, 25, 47, 0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 4,
            boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="700"
            sx={{ mb: 1.5, color: "white" }}
          >
            Join Our Aquatic Community
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.8, fontWeight: 400, color: "white" }}
          >
            Get exclusive updates, fish care tips, and special offers delivered
            right to your inbox.
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              gap: 2,
              mb: 2,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <SmartTextInput
              label="Your Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <SmartButton
              text="Subscribe"
              type="submit"
              onClick={() => {}}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: "1rem",
                fontWeight: 600,
                flexShrink: 0,
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                "&:hover": {
                  background: "linear-gradient(45deg, #0077ff, #004aad)",
                },
              }}
            />
          </Box>

          <Typography variant="body2" sx={{ opacity: 0.7, color: "white" }}>
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SmartNewsletterSection;
