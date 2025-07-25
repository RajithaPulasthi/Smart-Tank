import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { predictFish, type PredictedFish } from "../../services/fishService";
import FishPredictionCard from "../../components/fish/FishPredictionCard";

const FishPredictionExample: React.FC = () => {
  const [fishName, setFishName] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictedFish, setPredictedFish] = useState<PredictedFish | null>(
    null
  );
  const [error, setError] = useState<string>("");

  const handlePredict = async () => {
    if (!fishName.trim()) {
      setError("Please enter a fish name");
      return;
    }

    setLoading(true);
    setError("");
    setPredictedFish(null);

    try {
      const result = await predictFish(fishName.trim());
      setPredictedFish(result);
      console.log("Predicted fish data:", result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to predict fish";
      setError(errorMessage);
      console.error("Fish prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !loading) {
      handlePredict();
    }
  };

  const handleReset = () => {
    setFishName("");
    setPredictedFish(null);
    setError("");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="600" textAlign="center" mb={1}>
          Fish Prediction Demo
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Test the fish prediction API by entering a fish name
        </Typography>

        {/* Input Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              label="Fish Name"
              value={fishName}
              onChange={(e) => setFishName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Try: Tinfoil Barb, Goldfish, Betta, etc."
              disabled={loading}
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={handlePredict}
              disabled={loading || !fishName.trim()}
              sx={{ minWidth: 120, height: 56 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Predict"
              )}
            </Button>
            {(predictedFish || error) && (
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ minWidth: 80, height: 56 }}
              >
                Reset
              </Button>
            )}
          </Box>

          {/* Error Section */}
          {error && (
            <Alert severity="error" sx={{ borderRadius: 1 }}>
              <Typography variant="body2">{error}</Typography>
            </Alert>
          )}

          {/* Example suggestions */}
          {!predictedFish && !loading && (
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Try these fish names:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {[
                  "Tinfoil Barb",
                  "Goldfish",
                  "Betta",
                  "Angelfish",
                  "Neon Tetra",
                ].map((name) => (
                  <Button
                    key={name}
                    variant="outlined"
                    size="small"
                    onClick={() => setFishName(name)}
                    disabled={loading}
                  >
                    {name}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Results Section */}
        {predictedFish && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <FishPredictionCard fish={predictedFish} />
          </Box>
        )}

        {/* API Information */}
        <Box sx={{ mt: 4, p: 3, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
          <Typography variant="h6" mb={2}>
            API Details:
          </Typography>
          <Typography variant="body2" fontFamily="monospace" mb={1}>
            GET
            http://localhost:8083/api/Aquariums/predict-fish?name=Tinfoil%20Barb
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Returns: Fish name, scientific name (binomial_Name), image URL, and
            scientific classification
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default FishPredictionExample;
