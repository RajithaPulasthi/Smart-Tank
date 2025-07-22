import { useState } from "react";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";
import SmartButton from "../../shared/components/atoms/SmartButtons";

const SmartWaterRecommendation = () => {
  const [form, setForm] = useState({
    temperature: "",
    ph: "",
    gHardness: "",
    cHardness: "",
    nitrate: "",
  });

  const [results, setResults] = useState<string[][]>([]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFind = () => {
    // Replace with API call later
    setResults([
      ["Angel Fish", "Danio", "Koi", "Goldfish", "Molly Balloon"],
      ["Guppy", "Platy", "Swordtail", "Fighter", "Molly"],
    ]);
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <SmartNavbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            Water Condition Analyzer
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}
          >
            Get fish recommendations based on your tank's water parameters.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Form Section */}
          <Grid xs={12} md={5} lg={4}>
            <Paper
              sx={{
                p: 4,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 4,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ mb: 3, textAlign: "center" }}
              >
                Enter Water Parameters
              </Typography>
              <SmartTextInput
                label="Temperature (°C)"
                value={form.temperature}
                onChange={(e) => handleChange("temperature", e.target.value)}
                fullWidth
                sx={{ mb: 2.5 }}
              />
              <SmartTextInput
                label="pH Level"
                value={form.ph}
                onChange={(e) => handleChange("ph", e.target.value)}
                fullWidth
                sx={{ mb: 2.5 }}
              />
              <SmartTextInput
                label="General Hardness (dGH)"
                value={form.gHardness}
                onChange={(e) => handleChange("gHardness", e.target.value)}
                fullWidth
                sx={{ mb: 2.5 }}
              />
              <SmartTextInput
                label="Carbonate Hardness (dKH)"
                value={form.cHardness}
                onChange={(e) => handleChange("cHardness", e.target.value)}
                fullWidth
                sx={{ mb: 2.5 }}
              />
              <SmartTextInput
                label="Nitrate (ppm)"
                value={form.nitrate}
                onChange={(e) => handleChange("nitrate", e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
              <SmartButton
                text="Find Suitable Fish"
                onClick={handleFind}
                type="button"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #0077ff, #004aad)",
                  },
                }}
              />
            </Paper>
          </Grid>

          {/* Results Section */}
          {results.length > 0 && (
            <Grid xs={12} md={7} lg={8}>
              <Paper
                sx={{
                  p: 4,
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: 4,
                  minHeight: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="600" sx={{ mb: 3 }}>
                  Recommended Fish
                </Typography>
                <Grid container spacing={3}>
                  {results.map((group, colIdx) => (
                    <Grid xs={12} sm={6} key={colIdx}>
                      <Typography variant="h6" sx={{ mb: 2, color: "#64ffda" }}>
                        {colIdx === 0 ? "Ideal Matches" : "Good Matches"}
                      </Typography>
                      <Box>
                        {group.map((fish, rowIdx) => (
                          <Paper
                            key={rowIdx}
                            sx={{
                              p: 2,
                              mb: 1.5,
                              background: "rgba(0,0,0,0.2)",
                              borderRadius: 2,
                              borderLeft: "3px solid #00c0ff",
                            }}
                          >
                            <Typography>{fish}</Typography>
                          </Paper>
                        ))}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>

      <SmartFooter />
    </Box>
  );
};

export default SmartWaterRecommendation;
