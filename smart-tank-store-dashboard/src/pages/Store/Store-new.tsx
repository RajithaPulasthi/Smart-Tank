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
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import {
  getStoreInfo,
  addStoreInfo,
  updateStoreInfo,
  StoreInfo,
} from "../../services/authService";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const getAquariumId = (): number | null => {
    const storeData = localStorage.getItem("currentStore");
    if (storeData) {
      try {
        const parsed = JSON.parse(storeData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].id;
        }
      } catch (e) {
        console.error("Failed to parse currentStore data", e);
        return null;
      }
    }
    return null;
  };

  // Parse opening hours string back to OperatingHours object
  const parseOpeningHours = (openingHoursString: string): OperatingHours => {
    const defaultHours: OperatingHours = {
      mon: { from: "09:00", to: "17:00" },
      tue: { from: "09:00", to: "17:00" },
      wed: { from: "09:00", to: "17:00" },
      thu: { from: "09:00", to: "17:00" },
      fri: { from: "09:00", to: "17:00" },
      sat: { from: "09:00", to: "17:00" },
      sun: { from: "09:00", to: "17:00" },
    };

    try {
      // Expected format: "mon:09:00-17:00;tue:09:00-17:00;..."
      const dayPairs = openingHoursString.split(";");
      const parsedHours: Partial<OperatingHours> = {};

      dayPairs.forEach((pair) => {
        const [day, hours] = pair.split(":");
        if (day && hours) {
          const [from, to] = hours.split("-");
          if (from && to) {
            parsedHours[day as keyof OperatingHours] = { from, to };
          }
        }
      });

      return { ...defaultHours, ...parsedHours };
    } catch (e) {
      console.error("Failed to parse opening hours:", e);
      return defaultHours;
    }
  };

  const fetchStoreInfo = async () => {
    const aquariumId = getAquariumId();
    const token = localStorage.getItem("token");

    if (!aquariumId || !token) {
      enqueueSnackbar("Missing aquarium ID or authentication token.", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getStoreInfo(aquariumId, token);

      if (data) {
        setStoreInfo(data);
        // Populate form data with fetched store info
        setFormData({
          about: data.about,
          shopEmail: data.shopEmail,
          contactNumber: data.contactNumber,
          shopAddress: data.shopAddress,
          operatingHours: parseOpeningHours(data.openingHours),
          facebookUrl: data.facebookUrl,
          instagramUrl: data.instagramUrl,
          youTubeUrl: data.youTubeUrl,
          twitterUrl: data.twitterUrl,
          aquariumId: data.aquariumId,
        });
      } else {
        // No store info found, initialize with user data
        const currentUserData = localStorage.getItem("currentUser");
        if (currentUserData) {
          const currentUser = JSON.parse(currentUserData);
          setFormData((prev) => ({
            ...prev,
            aquariumId: aquariumId,
            shopEmail: currentUser.email || "",
            contactNumber: currentUser.phone || "",
            shopAddress: currentUser.address || "",
            about: `At ${
              currentUser.fullName || "your store"
            }, we bring passion for aquatics to your living room. Specializing in vibrant freshwater fish like tetras, gouramis, and barbs, we also offer aquascaping tips and free beginner advice. Whether you're setting up your first tank or expanding your collection, our fish are healthy, tank-raised, and stunning!`,
          }));
        }
      }
    } catch (error) {
      enqueueSnackbar("Failed to fetch store information.", {
        variant: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreInfo();
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
    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar("Authentication token not found. Please log in again.", {
        variant: "error",
      });
      return;
    }

    if (!formData.aquariumId) {
      enqueueSnackbar("Aquarium ID is missing. Please log in again.", {
        variant: "error",
      });
      return;
    }

    // Format operating hours into a single string as required by the backend
    const formattedOperatingHours = Object.entries(formData.operatingHours)
      .map(([day, hours]) => {
        const { from, to } = hours as DayHours;
        return `${day}:${from}-${to}`;
      })
      .join(";");

    const payload: StoreInfo = {
      ...formData,
      openingHours: formattedOperatingHours,
    };

    try {
      setSaving(true);

      if (storeInfo && storeInfo.id) {
        // Update existing store info
        await updateStoreInfo(storeInfo.id, payload, token);
        enqueueSnackbar("Store information updated successfully!", {
          variant: "success",
        });
      } else {
        // Add new store info
        await addStoreInfo(payload, token);
        enqueueSnackbar("Store information added successfully!", {
          variant: "success",
        });
      }

      // Refresh the data
      await fetchStoreInfo();
      setIsEditing(false);
    } catch (error) {
      enqueueSnackbar("Failed to save store information.", {
        variant: "error",
      });
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If no store info exists and not editing, show the "Add Store Info" view
  if (!storeInfo && !isEditing) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            maxWidth: 600,
            mx: "auto",
            mt: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Your Store Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven't set up your store information yet. Click the button
            below to add your store details and start managing your aquarium
            business.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsEditing(true)}
          >
            Add Store Information
          </Button>
        </Paper>
      </Box>
    );
  }

  // If store info exists and not editing, show the display view
  if (storeInfo && !isEditing) {
    return (
      <Box sx={{ p: 3 }}>
        {/* Store Header with Image */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
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

        {/* Store Information Display */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Store Information
            </Typography>
            <Button variant="outlined" onClick={() => setIsEditing(true)}>
              Update Information
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {storeInfo.about}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong> {storeInfo.shopEmail}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Phone:</strong> {storeInfo.contactNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> {storeInfo.shopAddress}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Operating Hours
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {Object.entries(parseOpeningHours(storeInfo.openingHours)).map(
                  ([day, hours]) => (
                    <Box
                      key={day}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "capitalize", minWidth: 80 }}
                      >
                        {day}:
                      </Typography>
                      <Typography variant="body2">
                        {hours.from} - {hours.to}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Social Media
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {storeInfo.facebookUrl && (
                  <Chip
                    label="Facebook"
                    component="a"
                    href={storeInfo.facebookUrl}
                    target="_blank"
                    clickable
                    color="primary"
                  />
                )}
                {storeInfo.instagramUrl && (
                  <Chip
                    label="Instagram"
                    component="a"
                    href={storeInfo.instagramUrl}
                    target="_blank"
                    clickable
                    color="secondary"
                  />
                )}
                {storeInfo.youTubeUrl && (
                  <Chip
                    label="YouTube"
                    component="a"
                    href={storeInfo.youTubeUrl}
                    target="_blank"
                    clickable
                    color="error"
                  />
                )}
                {storeInfo.twitterUrl && (
                  <Chip
                    label="Twitter"
                    component="a"
                    href={storeInfo.twitterUrl}
                    target="_blank"
                    clickable
                    color="info"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }

  // Editing/Adding form view
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
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {storeInfo ? "Update Store Information" : "Add Store Information"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsEditing(false);
                if (storeInfo) {
                  // Reset form data to original store info
                  setFormData({
                    about: storeInfo.about,
                    shopEmail: storeInfo.shopEmail,
                    contactNumber: storeInfo.contactNumber,
                    shopAddress: storeInfo.shopAddress,
                    operatingHours: parseOpeningHours(storeInfo.openingHours),
                    facebookUrl: storeInfo.facebookUrl,
                    instagramUrl: storeInfo.instagramUrl,
                    youTubeUrl: storeInfo.youTubeUrl,
                    twitterUrl: storeInfo.twitterUrl,
                    aquariumId: storeInfo.aquariumId,
                  });
                }
              }}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={saving}>
              {saving ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </Box>
        </Box>

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
            <Typography variant="h6" gutterBottom>
              About Your Shop
            </Typography>
            <TextField
              fullWidth
              label="About"
              multiline
              rows={4}
              value={formData.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              sx={{ mb: 3 }}
              disabled={saving}
            />

            {/* Contact Information Section */}
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Shop Email"
                value={formData.shopEmail}
                onChange={(e) => handleInputChange("shopEmail", e.target.value)}
                disabled={saving}
              />
              <TextField
                fullWidth
                label="Contact Number"
                value={formData.contactNumber}
                onChange={(e) =>
                  handleInputChange("contactNumber", e.target.value)
                }
                disabled={saving}
              />
            </Box>
            <TextField
              fullWidth
              label="Shop Address"
              value={formData.shopAddress}
              onChange={(e) => handleInputChange("shopAddress", e.target.value)}
              sx={{ mb: 3 }}
              disabled={saving}
            />
          </Box>

          {/* Right Column */}
          <Box sx={{ flex: 1 }}>
            {/* Operating Hours Section */}
            <Typography variant="h6" gutterBottom>
              Operating Hours
            </Typography>
            <Box sx={{ mb: 3 }}>
              {days.map((day) => (
                <Box
                  key={day.key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <Typography sx={{ minWidth: 100 }}>{day.label}</Typography>
                  <FormControl sx={{ minWidth: 100 }}>
                    <Select
                      value={
                        formData.operatingHours[day.key as keyof OperatingHours]
                          .from
                      }
                      onChange={(e) =>
                        handleTimeChange(day.key, "from", e.target.value)
                      }
                      size="small"
                      disabled={saving}
                    >
                      {timeOptions.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography>to</Typography>
                  <FormControl sx={{ minWidth: 100 }}>
                    <Select
                      value={
                        formData.operatingHours[day.key as keyof OperatingHours]
                          .to
                      }
                      onChange={(e) =>
                        handleTimeChange(day.key, "to", e.target.value)
                      }
                      size="small"
                      disabled={saving}
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

            {/* Social Media Section */}
            <Typography variant="h6" gutterBottom>
              Social Media Links (Optional)
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Facebook URL"
                value={formData.facebookUrl}
                onChange={(e) =>
                  handleInputChange("facebookUrl", e.target.value)
                }
                disabled={saving}
              />
              <TextField
                fullWidth
                label="Instagram URL"
                value={formData.instagramUrl}
                onChange={(e) =>
                  handleInputChange("instagramUrl", e.target.value)
                }
                disabled={saving}
              />
              <TextField
                fullWidth
                label="YouTube URL"
                value={formData.youTubeUrl}
                onChange={(e) =>
                  handleInputChange("youTubeUrl", e.target.value)
                }
                disabled={saving}
              />
              <TextField
                fullWidth
                label="Twitter URL"
                value={formData.twitterUrl}
                onChange={(e) =>
                  handleInputChange("twitterUrl", e.target.value)
                }
                disabled={saving}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StorePage;
