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
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

type DayHours = {
  from: string;
  to: string;
};

type OperatingHours = {
  mon: DayHours;
  tue: DayHours;
  wed: DayHours;
  thu: DayHours;
  fri: DayHours;
  sat: DayHours;
  sun: DayHours;
};

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, "0");
      const minute = j.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const days = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

const StorePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<{
    about: string;
    shopEmail: string;
    contactNumber: string;
    shopAddress: string;
    operatingHours: OperatingHours;
    facebookUrl: string;
    instagramUrl: string;
    youTubeUrl: string;
    twitterUrl: string;
    aquariumId: number;
  }>({
    about: "",
    shopEmail: "",
    contactNumber: "",
    shopAddress: "",
    operatingHours: {
      mon: { from: "09:00", to: "17:00" },
      tue: { from: "09:00", to: "17:00" },
      wed: { from: "09:00", to: "17:00" },
      thu: { from: "09:00", to: "17:00" },
      fri: { from: "09:00", to: "17:00" },
      sat: { from: "09:00", to: "17:00" },
      sun: { from: "09:00", to: "17:00" },
    },
    facebookUrl: "",
    instagramUrl: "",
    youTubeUrl: "",
    twitterUrl: "",
    aquariumId: 0,
  });

  useEffect(() => {
    const currentUserData = localStorage.getItem("currentUser");
    const storedAquariumId = localStorage.getItem("aquariumId");

    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      setFormData((prev) => ({
        ...prev,
        aquariumId: storedAquariumId ? parseInt(storedAquariumId, 10) : 0, // Use stored aquariumId
        shopEmail: currentUser.email || "",
        contactNumber: currentUser.phone || "",
        shopAddress: currentUser.address || "",
        about: `At ${currentUser.fullName || "your store"}, we bring passion for aquatics to your living room. Specializing in vibrant freshwater fish like tetras, gouramis, and barbs, we also offer aquascaping tips and free beginner advice. Whether you're setting up your first tank or expanding your collection, our fish are healthy, tank-raised, and stunning!`,
        operatingHours: prev.operatingHours, // Explicitly preserve operatingHours
      }));
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

  const handleSave = async () => {
    const formattedOperatingHours = Object.entries(formData.operatingHours)
      .map(([day, hours]) => {
        const { from, to } = hours as DayHours;
        return `${day}: ${from}-${to}`;
      })
      .join("; ");

    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar("Authentication token not found. Please log in again.", { variant: "error" });
      return;
    }

    const currentUserData = localStorage.getItem("currentUser");
    if (!currentUserData) {
      enqueueSnackbar("User data not found. Please log in again.", { variant: "error" });
      return;
    }
    const currentUser = JSON.parse(currentUserData);
    const userId = currentUser.id;

    let fetchedAquariumId = 0;
    try {
      const aquariumResponse = await fetch(`http://localhost:8082/api/Aquariums/user/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (aquariumResponse.ok) {
        const aquariumData = await aquariumResponse.json();
        if (aquariumData && aquariumData.length > 0 && aquariumData[0].id) {
          fetchedAquariumId = aquariumData[0].id;
        } else {
          enqueueSnackbar("Aquarium ID not found for this user.", { variant: "error" });
          return;
        }
      } else {
        enqueueSnackbar(`Failed to fetch aquarium ID: ${aquariumResponse.statusText}`, { variant: "error" });
        return;
      }
    } catch (error) {
      console.error("Error fetching aquarium ID:", error);
      enqueueSnackbar("Network error while fetching aquarium ID.", { variant: "error" });
      return;
    }

    const payload = {
      about: formData.about,
      shopEmail: formData.shopEmail,
      contactNumber: formData.contactNumber,
      shopAddress: formData.shopAddress,
      openingHours: formattedOperatingHours,
      facebookUrl: formData.facebookUrl,
      instagramUrl: formData.instagramUrl,
      youTubeUrl: formData.youTubeUrl,
      twitterUrl: formData.twitterUrl,
      aquariumId: fetchedAquariumId,
    };

    try {
      const response = await fetch(
        "http://localhost:8082/api/Aquariums/aquarium-shop-info/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        enqueueSnackbar("Store information updated successfully!", { variant: "success" });
      } else {
        const errorData = await response.json();
        enqueueSnackbar(`Failed to update store information: ${errorData.message || response.statusText}`, { variant: "error" });
      }
    } catch (error) {
      console.error("Error saving store data:", error);
      enqueueSnackbar("Network error or unexpected response.", { variant: "error" });
    }
  };

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
            {/* About Your Shop Section */}
            <Box sx={{ mb: 3}}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                About Your Shop
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="About"
                value={formData.about}
                onChange={(e) =>
                  handleInputChange("about", e.target.value)
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
                      sx={{ minWidth: 60, fontWeight: 500 }}
                    >
                      {day.label}
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                      <Select
                        value={
                          formData.operatingHours[day.key as keyof OperatingHours].from
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
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                      <Select
                        value={
                          formData.operatingHours[day.key as keyof OperatingHours].to
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
                  label="Contact Number"
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

              {/* Shop Email */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Shop Email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="Shop Email"
                  value={formData.shopEmail}
                  onChange={(e) => handleInputChange("shopEmail", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />
              </Box>

              {/* Shop Address */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Shop Address
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="Shop Address"
                  value={formData.shopAddress}
                  onChange={(e) => handleInputChange("shopAddress", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />
              </Box>

              {/* Social Media Links */}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Facebook URL
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="Facebook URL"
                  value={formData.facebookUrl}
                  onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Instagram URL
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="Instagram URL"
                  value={formData.instagramUrl}
                  onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  YouTube URL
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="YouTube URL"
                  value={formData.youTubeUrl}
                  onChange={(e) => handleInputChange("youTubeUrl", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Twitter URL
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="Twitter URL"
                  value={formData.twitterUrl}
                  onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
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