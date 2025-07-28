import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Divider,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Water as WaterIcon,
  LocationOn as LocationIcon,
  Storage as StorageIcon,
  Description as DescriptionIcon,
  DeviceHub as DeviceIcon,
  Password as PasswordIcon,
  Timeline as LogIcon,
  LiveTv as LiveIcon,
} from "@mui/icons-material";
import { getTanksByUserId, createTank } from "../../services/tankService";
import {
  assignDeviceToTank,
  getTankLogs,
  getLiveStatus,
} from "../../services/deviceService";
import type { Tank } from "../../types/Tank";
import type { AssignDeviceRequest } from "../../types/Device";
import type { DeviceLog, LiveStatus } from "../../types/DeviceLog";
import { useAuth } from "../../shared/hooks/useAuth";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartTextInput from "../../shared/components/atoms/smartTextInput";

const TanksPage: React.FC = () => {
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);
  const [liveStatusDialogOpen, setLiveStatusDialogOpen] = useState(false);
  const [selectedTankId, setSelectedTankId] = useState<number | null>(null);
  const [tankLogs, setTankLogs] = useState<DeviceLog[]>([]);
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const { user, token } = useAuth();

  const [newTank, setNewTank] = useState({
    name: "",
    description: "",
    volume: 0,
    capacity: 0,
    location: "",
  });

  const [deviceAssignment, setDeviceAssignment] = useState({
    serialNumber: "",
    password: "",
  });

  const fetchTanks = React.useCallback(async () => {
    if (user && token) {
      try {
        setLoading(true);
        const userTanks = await getTanksByUserId(user.id, token);
        setTanks(userTanks);
        setError(null);
      } catch {
        setError("Failed to fetch tanks");
      } finally {
        setLoading(false);
      }
    }
  }, [user, token]);

  useEffect(() => {
    fetchTanks();
  }, [fetchTanks]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTank((prev) => ({
      ...prev,
      [name]: name === "volume" || name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && token) {
      try {
        await createTank(newTank, user.id, token);
        setNewTank({
          name: "",
          description: "",
          volume: 0,
          capacity: 0,
          location: "",
        });
        setOpen(false);
        setSuccess("Tank added successfully!");
        // Reload the page after successful submission
        window.location.reload();
      } catch {
        setError("Failed to create tank");
      }
    }
  };

  const handleDeviceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeviceAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && token && selectedTankId) {
      try {
        const assignData: AssignDeviceRequest = {
          tankId: selectedTankId,
          serialNumber: deviceAssignment.serialNumber,
          password: deviceAssignment.password,
        };
        await assignDeviceToTank(assignData, token);
        setDeviceAssignment({
          serialNumber: "",
          password: "",
        });
        setDeviceDialogOpen(false);
        setSelectedTankId(null);
        setSuccess("Device assigned successfully!");
        window.location.reload();
      } catch {
        setError("Failed to assign device to tank");
      }
    }
  };

  const openDeviceDialog = (tankId: number) => {
    setSelectedTankId(tankId);
    setDeviceDialogOpen(true);
  };

  const openLogsDialog = async (tankId: number) => {
    if (user && token) {
      try {
        setSelectedTankId(tankId);
        const logs = await getTankLogs(tankId, token);
        setTankLogs(logs);
        setLogsDialogOpen(true);
      } catch {
        setError("Failed to fetch tank logs");
      }
    }
  };

  const openLiveStatusDialog = async (tankId: number) => {
    if (user && token) {
      try {
        setSelectedTankId(tankId);
        const status = await getLiveStatus(tankId, token);
        console.log("Live Status Response:", status); // Debug log
        setLiveStatus(status);
        setLiveStatusDialogOpen(true);
      } catch (error) {
        console.error("Failed to fetch live status:", error); // Debug log
        setError("Failed to fetch live status");
      }
    }
  };

  const refreshLiveStatus = async () => {
    if (user && token && selectedTankId) {
      try {
        const status = await getLiveStatus(selectedTankId, token);
        console.log("Refreshed Live Status Response:", status); // Debug log
        setLiveStatus(status);
      } catch (error) {
        console.error("Failed to refresh live status:", error); // Debug log
        setError("Failed to refresh live status");
      }
    }
  };

  if (loading) {
    return (
      <>
        <SmartNavbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress size={60} />
          </Box>
        </Container>
        <SmartFooter />
      </>
    );
  }

  return (
    <>
      <SmartNavbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Tanks
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                "&:hover": {
                  background: "linear-gradient(45deg, #0077ff, #0056cc)",
                },
              }}
            >
              Add New Tank
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {tanks.length === 0 ? (
            <Box textAlign="center" py={8}>
              <WaterIcon sx={{ fontSize: 80, color: "#00c0ff", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" mb={2}>
                No tanks found
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                You don't have any tanks yet. Add your first tank to get
                started!
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{
                  borderColor: "#00c0ff",
                  color: "#00c0ff",
                  "&:hover": {
                    borderColor: "#0077ff",
                    backgroundColor: "rgba(0, 192, 255, 0.1)",
                  },
                }}
              >
                Add Your First Tank
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {tanks.map((tank) => (
                <Card
                  key={tank.id}
                  elevation={2}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0, 192, 255, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                      {tank.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                      sx={{ minHeight: "40px" }}
                    >
                      {tank.description}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <WaterIcon sx={{ fontSize: 16, color: "#00c0ff" }} />
                        <Typography variant="body2">
                          Volume: {tank.volume}L
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <StorageIcon sx={{ fontSize: 16, color: "#00c0ff" }} />
                        <Typography variant="body2">
                          Capacity: {tank.capacity} fish
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationIcon sx={{ fontSize: 16, color: "#00c0ff" }} />
                        <Typography variant="body2">{tank.location}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        backgroundColor: "#e8f5e8",
                        color: "#2e7d32",
                        fontWeight: "bold",
                      }}
                    />
                    <Box
                      display="flex"
                      gap={1}
                      flexWrap="wrap"
                      justifyContent="center"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DeviceIcon />}
                        onClick={() => openDeviceDialog(tank.id)}
                        sx={{
                          borderColor: "#00c0ff",
                          color: "#00c0ff",
                          "&:hover": {
                            borderColor: "#0077ff",
                            backgroundColor: "rgba(0, 192, 255, 0.1)",
                          },
                        }}
                      >
                        Assign Device
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<LogIcon />}
                        onClick={() => openLogsDialog(tank.id)}
                        sx={{
                          borderColor: "#ff9800",
                          color: "#ff9800",
                          "&:hover": {
                            borderColor: "#f57c00",
                            backgroundColor: "rgba(255, 152, 0, 0.1)",
                          },
                        }}
                      >
                        View Logs
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<LiveIcon />}
                        onClick={() => openLiveStatusDialog(tank.id)}
                        sx={{
                          borderColor: "#4caf50",
                          color: "#4caf50",
                          "&:hover": {
                            borderColor: "#388e3c",
                            backgroundColor: "rgba(76, 175, 80, 0.1)",
                          },
                        }}
                      >
                        Live Status
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}
        </Paper>

        {/* Add Tank Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>Add New Tank</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <SmartTextInput
                label="Tank Name"
                value={newTank.name}
                onChange={handleInputChange}
                name="name"
                required
                fullWidth
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-input": { color: "#000000" },
                  "& .MuiInputLabel-root": { color: "#666666" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WaterIcon sx={{ color: "#00c0ff" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <SmartTextInput
                label="Description"
                value={newTank.description}
                onChange={handleInputChange}
                name="description"
                required
                fullWidth
                multiline
                rows={3}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-input": { color: "#000000" },
                  "& .MuiInputLabel-root": { color: "#666666" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <DescriptionIcon sx={{ color: "#00c0ff" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Box display="flex" gap={2} sx={{ mb: 3 }}>
                <Box flex={1}>
                  <SmartTextInput
                    label="Volume (L)"
                    type="number"
                    value={newTank.volume}
                    onChange={handleInputChange}
                    name="volume"
                    required
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-input": { color: "#000000" },
                      "& .MuiInputLabel-root": { color: "#666666" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WaterIcon sx={{ color: "#00c0ff" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box flex={1}>
                  <SmartTextInput
                    label="Capacity (Fish)"
                    type="number"
                    value={newTank.capacity}
                    onChange={handleInputChange}
                    name="capacity"
                    required
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-input": { color: "#000000" },
                      "& .MuiInputLabel-root": { color: "#666666" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <StorageIcon sx={{ color: "#00c0ff" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>

              <SmartTextInput
                label="Location"
                value={newTank.location}
                onChange={handleInputChange}
                name="location"
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-input": { color: "#000000" },
                  "& .MuiInputLabel-root": { color: "#666666" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon sx={{ color: "#00c0ff" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                "&:hover": {
                  background: "linear-gradient(45deg, #0077ff, #0056cc)",
                },
              }}
            >
              Add Tank
            </Button>
          </DialogActions>
        </Dialog>

        {/* Assign Device Dialog */}
        <Dialog
          open={deviceDialogOpen}
          onClose={() => setDeviceDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Assign Device to Tank
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleAssignDevice} sx={{ mt: 2 }}>
              <SmartTextInput
                label="Device Serial Number"
                value={deviceAssignment.serialNumber}
                onChange={handleDeviceInputChange}
                name="serialNumber"
                required
                fullWidth
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-input": { color: "#000000" },
                  "& .MuiInputLabel-root": { color: "#666666" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DeviceIcon sx={{ color: "#00c0ff" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <SmartTextInput
                label="Device Password"
                type="password"
                value={deviceAssignment.password}
                onChange={handleDeviceInputChange}
                name="password"
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-input": { color: "#000000" },
                  "& .MuiInputLabel-root": { color: "#666666" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon sx={{ color: "#00c0ff" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setDeviceDialogOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignDevice}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #00c0ff, #0077ff)",
                "&:hover": {
                  background: "linear-gradient(45deg, #0077ff, #0056cc)",
                },
              }}
            >
              Assign Device
            </Button>
          </DialogActions>
        </Dialog>

        {/* Tank Logs Dialog */}
        <Dialog
          open={logsDialogOpen}
          onClose={() => setLogsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>Tank Logs</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              {tankLogs.length === 0 ? (
                <Typography>No logs available</Typography>
              ) : (
                tankLogs.map((log, index) => (
                  <Paper key={log.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Log Entry #{index + 1}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Typography variant="body2">
                        <strong>Serial Number:</strong> {log.serialNumber}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong>{" "}
                        <Chip
                          label={
                            log.status ? log.status.toUpperCase() : "UNKNOWN"
                          }
                          size="small"
                          color={log.status === "online" ? "success" : "error"}
                          sx={{ fontWeight: "bold" }}
                        />
                      </Typography>
                      <Typography variant="body2">
                        <strong>Temperature:</strong>{" "}
                        {log.temperature
                          ? parseFloat(log.temperature).toFixed(1)
                          : "N/A"}
                        °C
                      </Typography>
                      <Typography variant="body2">
                        <strong>pH Level:</strong>{" "}
                        {log.ph ? parseFloat(log.ph).toFixed(2) : "N/A"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Uptime:</strong>{" "}
                        {log.uptime ? log.uptime.toLocaleString() : "0"} seconds
                      </Typography>
                      <Typography variant="body2">
                        <strong>Last Seen:</strong>{" "}
                        {new Date(log.lastSeen).toLocaleString()}
                      </Typography>
                    </Box>
                  </Paper>
                ))
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setLogsDialogOpen(false)} variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Live Status Dialog */}
        <Dialog
          open={liveStatusDialogOpen}
          onClose={() => setLiveStatusDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Live Tank Status
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              {liveStatus ? (
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Current Status
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={refreshLiveStatus}
                      startIcon={<LiveIcon />}
                    >
                      Refresh
                    </Button>
                  </Box>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body1">
                        <strong>Serial Number:</strong>{" "}
                        {liveStatus.serialNumber || "N/A"}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body1">
                        <strong>Status:</strong>
                      </Typography>
                      <Chip
                        label={
                          liveStatus.status
                            ? liveStatus.status.toUpperCase()
                            : "UNKNOWN"
                        }
                        size="small"
                        color={
                          liveStatus.status === "online" ? "success" : "error"
                        }
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                    <Typography variant="body1">
                      <strong>Temperature:</strong>{" "}
                      {liveStatus.temperature
                        ? parseFloat(liveStatus.temperature).toFixed(1)
                        : "N/A"}
                      °C
                    </Typography>
                    <Typography variant="body1">
                      <strong>pH Level:</strong>{" "}
                      {liveStatus.ph
                        ? parseFloat(liveStatus.ph).toFixed(2)
                        : "N/A"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Uptime:</strong>{" "}
                      {liveStatus.uptime
                        ? liveStatus.uptime.toLocaleString()
                        : "0"}{" "}
                      seconds
                    </Typography>
                    <Typography variant="body1">
                      <strong>Last Seen:</strong>{" "}
                      {new Date(liveStatus.lastSeen).toLocaleString()}
                    </Typography>
                  </Box>
                </Paper>
              ) : (
                <Typography>No status data available</Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setLiveStatusDialogOpen(false)}
              variant="outlined"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <SmartFooter />
    </>
  );
};

export default TanksPage;
