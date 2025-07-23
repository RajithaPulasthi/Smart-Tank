import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Store } from "../../types/Store";

const StorePage = () => {
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contactNumber: "",
    email: "",
    address: "",
    operatingHours: {
      mon: { from: "", to: "" },
      tue: { from: "", to: "" },
      wed: { from: "", to: "" },
      thu: { from: "", to: "" },
      fri: { from: "", to: "" },
      sat: { from: "", to: "" },
      sun: { from: "", to: "" },
    },
  });

  useEffect(() => {
    const storeData = localStorage.getItem("currentStore");
    if (storeData) {
      const store = JSON.parse(storeData);
      setCurrentStore(store);
      setFormData({
        name: store.name || "",
        description:
          "At " +
          store.name +
          ", we bring passion for aquatics to your living room. Specializing in vibrant freshwater fish like tetras, gouramis, and barbs, we also offer aquascaping tips and free beginner advice. Whether you're setting up your first tank or expanding your collection, our fish are healthy, tank-raised, and stunning!",
        contactNumber: store.phone || "011-4564545",
        email: store.email || "hello@blueaquapets.lk",
        address: store.address || "",
        operatingHours: {
          mon: { from: "9:00", to: "18:00" },
          tue: { from: "9:00", to: "18:00" },
          wed: { from: "9:00", to: "18:00" },
          thu: { from: "9:00", to: "18:00" },
          fri: { from: "9:00", to: "18:00" },
          sat: { from: "9:00", to: "18:00" },
          sun: { from: "10:00", to: "16:00" },
        },
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeChange = (
    day: string,
    timeType: "from" | "to",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day as keyof typeof prev.operatingHours],
          [timeType]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving store data:", formData);
    // Show success message
    alert("Store information updated successfully!");
  };

  const timeOptions = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const days = [
    { key: "mon", label: "Mon" },
    { key: "tue", label: "Tue" },
    { key: "wed", label: "Wed" },
    { key: "thu", label: "Thu" },
    { key: "fri", label: "Fri" },
    { key: "sat", label: "Sat" },
    { key: "sun", label: "Sun" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Store Header with Image */}
      <Paper
        elevation={0}
        sx={{
          mb: 2,
          border: "1px solid #e0e0e0",
          overflow: "hidden",
        }}
      >
        <Card sx={{ boxShadow: "none" }}>
          <CardMedia
            component="img"
            height="200"
            image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Store Banner"
            sx={{ objectFit: "cover" }}
          />
        </Card>
      </Paper>

      {/* Store Information Form */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* Left Column */}
          <Box sx={{ flex: 1 }}>
            {/* Description Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f8f9fa",
                  },
                }}
              />
            </Box>

            {/* Operating Hours */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Operating Hours
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {days.map((day) => (
                  <Box
                    key={day.key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 40, fontWeight: 500 }}
                    >
                      {day.label}
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 70 }}>
                      <Select
                        value={
                          formData.operatingHours[
                            day.key as keyof typeof formData.operatingHours
                          ].from
                        }
                        onChange={(e) =>
                          handleTimeChange(day.key, "from", e.target.value)
                        }
                        sx={{ fontSize: "0.875rem" }}
                      >
                        {timeOptions.map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography variant="body2">to</Typography>
                    <FormControl size="small" sx={{ minWidth: 70 }}>
                      <Select
                        value={
                          formData.operatingHours[
                            day.key as keyof typeof formData.operatingHours
                          ].to
                        }
                        onChange={(e) =>
                          handleTimeChange(day.key, "to", e.target.value)
                        }
                        sx={{ fontSize: "0.875rem" }}
                      >
                        {timeOptions.map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right Column */}
          <Box sx={{ width: { xs: "100%", md: "300px" } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Contact Number */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Contact Number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />
              </Box>

              {/* Email */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />
              </Box>

              {/* Store Status */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Status
                </Typography>
                <Chip
                  label={currentStore?.status || "ACTIVE"}
                  color="success"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Save Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
            pt: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              px: 4,
              py: 1,
            }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default StorePage;
