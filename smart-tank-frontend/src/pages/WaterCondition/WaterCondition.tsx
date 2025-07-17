import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";

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
    <>
      <SmartNavbar />

      <Box sx={{ px: 4, py: 6 }}>
        <Typography variant="h5" fontWeight="bold" color="#0077FF" gutterBottom>
          Smart Recommendations
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mt: 4,
          }}
        >
          {/* Form Section */}
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <SmartTextInput
              label="Temperature (°C)"
              value={form.temperature}
              onChange={(e) => handleChange("temperature", e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <SmartTextInput
              label="pH Level"
              value={form.ph}
              onChange={(e) => handleChange("ph", e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <SmartTextInput
              label="General Hardness (dGH)"
              value={form.gHardness}
              onChange={(e) => handleChange("gHardness", e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <SmartTextInput
              label="Carbonate Hardness (dKH)"
              value={form.cHardness}
              onChange={(e) => handleChange("cHardness", e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <SmartTextInput
              label="Nitrate (ppm)"
              value={form.nitrate}
              onChange={(e) => handleChange("nitrate", e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button variant="contained" onClick={handleFind} fullWidth>
              Find
            </Button>
          </Box>

          {/* Results Section */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            {results.map((group, colIdx) => (
              <Box
                key={colIdx}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {group.map((fish) => (
                  <Box
                    key={fish}
                    sx={{
                      px: 3,
                      py: 1.5,
                      bgcolor: "#fff",
                      boxShadow: 2,
                      borderRadius: 1,
                      textAlign: "center",
                      fontWeight: 500,
                      minWidth: 140,
                    }}
                  >
                    {fish}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <SmartFooter />
    </>
  );
};

export default SmartWaterRecommendation;
