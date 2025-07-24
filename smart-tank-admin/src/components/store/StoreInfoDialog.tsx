import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import {
  Info as InfoIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import type { StoreInfo } from "../../services/storeService";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    slots.push(`${i.toString().padStart(2, "0")}:00`);
    slots.push(`${i.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

interface StoreInfoDialogProps {
  open: boolean;
  onClose: () => void;
  storeInfo: StoreInfo | null;
  onSave: (storeInfo: StoreInfo) => void;
  loading: boolean;
  aquariumId: number;
}

const StoreInfoDialog = ({
  open,
  onClose,
  storeInfo,
  onSave,
  loading,
  aquariumId,
}: StoreInfoDialogProps) => {
  const [formData, setFormData] = useState<StoreInfo | null>(null);
  const [openingHours, setOpeningHours] = useState<
    Record<string, { open: string; close: string }>
  >({});

  useEffect(() => {
    if (storeInfo) {
      setFormData(storeInfo);
      try {
        if (storeInfo.openingHours) {
          const hours = JSON.parse(storeInfo.openingHours);
          setOpeningHours(hours);
        } else {
          const initialHours: Record<string, { open: string; close: string }> =
            {};
          daysOfWeek.forEach((day) => {
            initialHours[day] = { open: "09:00", close: "17:00" };
          });
          setOpeningHours(initialHours);
        }
      } catch (e) {
        console.error("Error parsing opening hours from storeInfo:", e);
        // Fallback to default if parsing fails
        const initialHours: Record<string, { open: string; close: string }> = {};
        daysOfWeek.forEach((day) => {
          initialHours[day] = { open: "09:00", close: "17:00" };
        });
        setOpeningHours(initialHours);
      }
    } else {
      setFormData({
        about: "",
        shopEmail: "",
        contactNumber: "",
        shopAddress: "",
        openingHours: "",
        facebookUrl: "",
        instagramUrl: "",
        youTubeUrl: "",
        twitterUrl: "",
        aquariumId: aquariumId,
      });
      const initialHours: Record<string, { open: string; close: string }> = {};
      daysOfWeek.forEach((day) => {
        initialHours[day] = { open: "09:00", close: "17:00" };
      });
      setOpeningHours(initialHours);
    }
  }, [storeInfo, aquariumId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleOpeningHoursChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const handleSave = () => {
    if (formData) {
      // Basic validation for required fields
      if (
        !formData.about ||
        !formData.shopEmail ||
        !formData.contactNumber ||
        !formData.shopAddress
      ) {
        alert("Please fill in all required fields (About, Shop Email, Contact Number, Shop Address).");
        return;
      }

      // Stringify opening hours object
      const stringifiedOpeningHours = JSON.stringify(openingHours);

      const updatedFormData = {
        ...formData,
        openingHours: stringifiedOpeningHours,
      };
      console.log("Attempting to save store info:", updatedFormData);
      onSave(updatedFormData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Store Information</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          // Inside DialogContent section where loading === false
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="about"
              label="About"
              value={formData?.about || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InfoIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                name="shopEmail"
                label="Shop Email"
                value={formData?.shopEmail || ""}
                onChange={handleChange}
                fullWidth
                sx={{ flex: 1, minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="contactNumber"
                label="Contact Number"
                value={formData?.contactNumber || ""}
                onChange={handleChange}
                fullWidth
                sx={{ flex: 1, minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TextField
              name="shopAddress"
              label="Shop Address"
              value={formData?.shopAddress || ""}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="h6" gutterBottom>
              Opening Hours
            </Typography>

            {daysOfWeek.map((day) => (
              <Box
                key={day}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ width: "25%" }}>
                  <Typography>{day}</Typography>
                </Box>
                <Box sx={{ width: "35%", minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel>Open</InputLabel>
                    <Select
                      value={openingHours[day]?.open || ""}
                      onChange={(e) =>
                        handleOpeningHoursChange(day, "open", e.target.value)
                      }
                    >
                      {generateTimeSlots().map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ width: "35%", minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel>Close</InputLabel>
                    <Select
                      value={openingHours[day]?.close || ""}
                      onChange={(e) =>
                        handleOpeningHoursChange(day, "close", e.target.value)
                      }
                    >
                      {generateTimeSlots().map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            ))}

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                name="facebookUrl"
                label="Facebook URL"
                value={formData?.facebookUrl || ""}
                onChange={handleChange}
                fullWidth
                sx={{ flex: 1, minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="instagramUrl"
                label="Instagram URL"
                value={formData?.instagramUrl || ""}
                onChange={handleChange}
                fullWidth
                sx={{ flex: 1, minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                name="youTubeUrl"
                label="YouTube URL"
                value={formData?.youTubeUrl || ""}
                onChange={handleChange}
                fullWidth
                sx={{ flex: 1, minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <YouTubeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="twitterUrl"
                label="Twitter URL"
                value={formData?.twitterUrl || ""}
                onChange={handleChange}
                fullWidth
                sx={{ flex: 1, minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreInfoDialog;
