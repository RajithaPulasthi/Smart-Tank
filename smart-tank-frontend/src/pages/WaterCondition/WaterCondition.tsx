import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";
import SmartButton from "../../shared/components/atoms/SmartButtons";
import { getPredictions } from "../../services/predictionService";
import AuthService from "../../services/authService";
import type {
  PredictionRequest,
  FishPrediction,
} from "../../services/predictionService";

const SmartWaterRecommendation = () => {
  const [form, setForm] = useState({
    temperature: "",
    ph: "",
    gHardness: "",
    cHardness: "",
    nitrate: "",
  });

  const [predictions, setPredictions] = useState<FishPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFind = async () => {
    // Validate form
    if (
      !form.temperature ||
      !form.ph ||
      !form.gHardness ||
      !form.cHardness ||
      !form.nitrate
    ) {
      setError("Please fill in all water parameters");
      return;
    }

    // Check if user is authenticated
    if (!AuthService.isAuthenticated()) {
      setError("Please log in to access fish predictions.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const predictionData: PredictionRequest = {
        model: "RandomForest",
        temp: parseFloat(form.temperature),
        ph: parseFloat(form.ph),
        gh: parseFloat(form.gHardness),
        kh: parseFloat(form.cHardness),
        nitrate: parseFloat(form.nitrate),
      };

      console.log("Form data:", form);
      console.log("Prediction request data:", predictionData);

      const fishPredictions = await getPredictions(predictionData);
      setPredictions(fishPredictions);
    } catch (err) {
      console.error("Prediction error:", err);
      if (err instanceof Error) {
        if (err.message.includes("401")) {
          setError("Please log in to access fish predictions.");
        } else {
          // Show the actual error message from the server
          setError(`Error: ${err.message}`);
        }
      } else {
        setError("Failed to get fish predictions. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
          {/* Form Section - Left Side */}
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
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

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <SmartTextInput
                label="Temperature (°C)"
                type="number"
                value={form.temperature}
                onChange={(e) => handleChange("temperature", e.target.value)}
                fullWidth
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-input": { color: "#ffffff" },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
              <SmartTextInput
                label="pH Level"
                type="number"
                value={form.ph}
                onChange={(e) => handleChange("ph", e.target.value)}
                fullWidth
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-input": { color: "#ffffff" },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
              <SmartTextInput
                label="General Hardness (dGH)"
                type="number"
                value={form.gHardness}
                onChange={(e) => handleChange("gHardness", e.target.value)}
                fullWidth
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-input": { color: "#ffffff" },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
              <SmartTextInput
                label="Carbonate Hardness (dKH)"
                type="number"
                value={form.cHardness}
                onChange={(e) => handleChange("cHardness", e.target.value)}
                fullWidth
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-input": { color: "#ffffff" },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
              <SmartTextInput
                label="Nitrate (ppm)"
                type="number"
                value={form.nitrate}
                onChange={(e) => handleChange("nitrate", e.target.value)}
                fullWidth
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-input": { color: "#ffffff" },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
              <SmartButton
                text={loading ? "Analyzing..." : "Find Suitable Fish"}
                onClick={handleFind}
                type="button"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  background: loading
                    ? "rgba(255,255,255,0.3)"
                    : "linear-gradient(45deg, #00c0ff, #0077ff)",
                  "&:hover": {
                    background: loading
                      ? "rgba(255,255,255,0.3)"
                      : "linear-gradient(45deg, #0077ff, #004aad)",
                  },
                }}
              />
              {loading && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress size={24} sx={{ color: "#00c0ff" }} />
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Results Section - Right Side */}
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Paper
              sx={{
                p: 4,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 4,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                minHeight: "500px",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ mb: 3, textAlign: "center" }}
              >
                Compatible Fish Predictions
              </Typography>

              {!predictions.length && !loading && (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="400px"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: "rgba(255,255,255,0.7)",
                      textAlign: "center",
                    }}
                  >
                    Enter water parameters to get fish recommendations
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      maxWidth: "400px",
                    }}
                  >
                    Our AI model will analyze your water conditions and
                    recommend the most suitable fish species for your aquarium
                  </Typography>
                </Box>
              )}

              {predictions.length > 0 && (
                <Grid container spacing={3}>
                  {predictions.map((prediction, index) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                      <Card
                        sx={{
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.2)",
                            border: "1px solid rgba(0, 192, 255, 0.4)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          {prediction.image_url && (
                            <Box
                              sx={{
                                mb: 2,
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={prediction.image_url}
                                alt={prediction.name}
                                style={{
                                  width: "100px",
                                  height: "80px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  border: "2px solid rgba(255,255,255,0.2)",
                                }}
                              />
                            </Box>
                          )}

                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{
                              mb: 2,
                              color: "#ffffff",
                              textAlign: "center",
                            }}
                          >
                            {prediction.name}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "rgba(255,255,255,0.8)",
                                fontWeight: "500",
                              }}
                            >
                              Compatibility Score:
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={prediction.percentage}
                              sx={{
                                mt: 1,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "rgba(255,255,255,0.2)",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor:
                                    prediction.percentage > 80
                                      ? "#4caf50"
                                      : prediction.percentage > 60
                                      ? "#ff9800"
                                      : "#f44336",
                                  borderRadius: 4,
                                },
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#ffffff",
                                textAlign: "center",
                                mt: 1,
                                fontWeight: "600",
                              }}
                            >
                              {Math.round(prediction.percentage)}%
                            </Typography>
                          </Box>

                          {prediction.binomial_name && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "rgba(255,255,255,0.6)",
                                textAlign: "center",
                                mt: 2,
                                fontStyle: "italic",
                              }}
                            >
                              {prediction.binomial_name}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <SmartFooter />
    </Box>
  );
};

export default SmartWaterRecommendation;
