import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { predictFish, type PredictedFish } from "../../services/fishService";
import FishPredictionCard from "./FishPredictionCard";

interface FishPredictionDialogProps {
  open: boolean;
  onClose: () => void;
}

const FishPredictionDialog: React.FC<FishPredictionDialogProps> = ({
  open,
  onClose,
}) => {
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
      console.log("Predicting fish:", fishName.trim());
      const result = await predictFish(fishName.trim());
      console.log("Fish prediction result:", result);
      setPredictedFish(result);
    } catch (err) {
      console.error("Fish prediction error:", err);
      setError(err instanceof Error ? err.message : "Failed to predict fish");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFishName("");
    setPredictedFish(null);
    setError("");
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !loading) {
      handlePredict();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight="600">
          Fish Prediction
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Enter a fish name to get predicted information
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Input Section */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              label="Fish Name"
              value={fishName}
              onChange={(e) => setFishName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Tinfoil Barb"
              disabled={loading}
              autoFocus
            />
            <Button
              variant="contained"
              onClick={handlePredict}
              disabled={loading || !fishName.trim()}
              sx={{ minWidth: 120, height: 56 }}
            >
              {loading ? <CircularProgress size={24} /> : "Predict"}
            </Button>
          </Box>

          {/* Error Section */}
          {error && (
            <Alert severity="error" sx={{ borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          {/* Results Section */}
          {predictedFish && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <Alert severity="success" sx={{ borderRadius: 1 }}>
                Fish prediction successful! Found: {predictedFish.name}
              </Alert>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <FishPredictionCard fish={predictedFish} />
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FishPredictionDialog;
