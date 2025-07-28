import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { FishFormData } from "../../types/Fish";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (fish: FishFormData) => void;
};

type FishFormErrors = {
  name?: string;
  temp?: string;
  ph?: string;
  gh?: string;
  kh?: string;
  nitrate?: string;
};

const FishFormDialog = ({ open, onClose, onSave }: Props) => {
  const [form, setForm] = useState<FishFormData>({
    name: "",
    temp: 0,
    ph: 0,
    gh: 0,
    kh: 0,
    nitrate: 0,
  });

  const [errors, setErrors] = useState<FishFormErrors>({});

  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        temp: 0,
        ph: 0,
        gh: 0,
        kh: 0,
        nitrate: 0,
      });
      setErrors({});
    }
  }, [open]);

  const handleChange = (field: keyof FishFormData, value: string) => {
    if (field === "name") {
      setForm({ ...form, [field]: value });
    } else {
      const numValue = parseFloat(value) || 0;
      setForm({ ...form, [field]: numValue });
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FishFormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (form.temp <= 0) {
      newErrors.temp = "Temperature must be greater than 0";
    }

    if (form.ph < 0 || form.ph > 14) {
      newErrors.ph = "pH must be between 0 and 14";
    }

    if (form.gh < 0) {
      newErrors.gh = "GH must be greater than or equal to 0";
    }

    if (form.kh < 0) {
      newErrors.kh = "KH must be greater than or equal to 0";
    }

    if (form.nitrate < 0) {
      newErrors.nitrate = "Nitrate must be greater than or equal to 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(form);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Add New Fish
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Fish Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />

          <TextField
            label="Temperature (°C)"
            type="number"
            value={form.temp}
            onChange={(e) => handleChange("temp", e.target.value)}
            error={!!errors.temp}
            helperText={errors.temp}
            fullWidth
            required
          />

          <TextField
            label="pH Level"
            type="number"
            inputProps={{ step: 0.1, min: 0, max: 14 }}
            value={form.ph}
            onChange={(e) => handleChange("ph", e.target.value)}
            error={!!errors.ph}
            helperText={errors.ph}
            fullWidth
            required
          />

          <TextField
            label="GH Level"
            type="number"
            inputProps={{ step: 0.1, min: 0 }}
            value={form.gh}
            onChange={(e) => handleChange("gh", e.target.value)}
            error={!!errors.gh}
            helperText={errors.gh}
            fullWidth
            required
          />

          <TextField
            label="KH Level"
            type="number"
            inputProps={{ step: 0.1, min: 0 }}
            value={form.kh}
            onChange={(e) => handleChange("kh", e.target.value)}
            error={!!errors.kh}
            helperText={errors.kh}
            fullWidth
            required
          />

          <TextField
            label="Nitrate (ppm)"
            type="number"
            inputProps={{ step: 0.1, min: 0 }}
            value={form.nitrate}
            onChange={(e) => handleChange("nitrate", e.target.value)}
            error={!!errors.nitrate}
            helperText={errors.nitrate}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Add Fish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FishFormDialog;
