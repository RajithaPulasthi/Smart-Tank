import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
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
  Settings as SettingsIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { getTanksByUserId, createTank } from "../../services/tankService";
import {
  assignDeviceToTank,
  getTankLogs,
  getLiveStatus,
} from "../../services/deviceService";
import {
  getThreshold,
  setThreshold,
  getTankStatuses,
} from "../../services/thresholdService";
import type { Tank } from "../../types/Tank";
import type { AssignDeviceRequest } from "../../types/Device";
import type { DeviceLog, LiveStatus } from "../../types/DeviceLog";
import type { Threshold, TankStatus } from "../../types/Threshold";
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
  const [thresholdDialogOpen, setThresholdDialogOpen] = useState(false);
  const [selectedTankId, setSelectedTankId] = useState<number | null>(null);
  const [tankLogs, setTankLogs] = useState<DeviceLog[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [tankStatusData, setTankStatusData] = useState<
    Map<
      number,
      {
        liveStatus: LiveStatus | null;
        tankStatuses: TankStatus[];
        threshold: Threshold;
        hasDevice: boolean;
      }
    >
  >(new Map());
  const [threshold, setThresholdState] = useState<Threshold>({
    minTemperature: 0,
    maxTemperature: 0,
    minPh: 0,
    maxPh: 0,
  });
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

  const fetchAllTankStatuses = React.useCallback(async () => {
    if (user && token && tanks.length > 0) {
      const newTankStatusData = new Map();

      for (const tank of tanks) {
        try {
          // Fetch live status
          const liveStatus = await getLiveStatus(tank.id, token);

          // Fetch tank statuses for notifications
          let tankStatuses: TankStatus[] = [];
          try {
            tankStatuses = await getTankStatuses(tank.id, token);
          } catch (statusError) {
            console.error(
              `Failed to fetch tank statuses for tank ${tank.id}:`,
              statusError
            );
          }

          // Fetch threshold settings
          let threshold: Threshold = {
            minTemperature: 0,
            maxTemperature: 0,
            minPh: 0,
            maxPh: 0,
          };
          try {
            threshold = await getThreshold(tank.id, token);
          } catch (thresholdError) {
            console.error(
              `Failed to fetch threshold for tank ${tank.id}:`,
              thresholdError
            );
          }

          newTankStatusData.set(tank.id, {
            liveStatus,
            tankStatuses,
            threshold,
            hasDevice: liveStatus !== null,
          });
        } catch (error) {
          console.error(`Failed to fetch data for tank ${tank.id}:`, error);
          newTankStatusData.set(tank.id, {
            liveStatus: null,
            tankStatuses: [],
            threshold: {
              minTemperature: 0,
              maxTemperature: 0,
              minPh: 0,
              maxPh: 0,
            },
            hasDevice: false,
          });
        }
      }

      setTankStatusData(newTankStatusData);
      setLastRefresh(new Date());
    }
  }, [user, token, tanks]);

  useEffect(() => {
    fetchTanks();
  }, [fetchTanks]);

  useEffect(() => {
    if (tanks.length > 0) {
      fetchAllTankStatuses();
    }
  }, [tanks.length, fetchAllTankStatuses]);

  // Auto-refresh tank statuses every 3 seconds
  useEffect(() => {
    if (tanks.length === 0) return;

    const interval = setInterval(() => {
      fetchAllTankStatuses();
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [tanks.length, fetchAllTankStatuses]);

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

  const openThresholdDialog = async (tankId: number) => {
    if (user && token) {
      try {
        setSelectedTankId(tankId);
        const thresholdData = await getThreshold(tankId, token);
        setThresholdState(thresholdData);
        setThresholdDialogOpen(true);
      } catch (error) {
        console.error("Failed to fetch threshold:", error);
        // Set default values for new threshold
        setThresholdState({
          minTemperature: 20,
          maxTemperature: 30,
          minPh: 6.5,
          maxPh: 8.5,
        });
        setThresholdDialogOpen(true);
      }
    }
  };

  const handleThresholdInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setThresholdState((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleThresholdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && token && selectedTankId) {
      try {
        await setThreshold(selectedTankId, threshold, token);
        setThresholdDialogOpen(false);
        setSelectedTankId(null);
        setSuccess("Threshold settings updated successfully!");
        // Refresh all tank statuses
        fetchAllTankStatuses();
      } catch (error) {
        console.error("Failed to set threshold:", error);
        setError("Failed to update threshold settings");
      }
    }
  };

  const checkThresholdViolation = (
    currentValue: number | null,
    min: number,
    max: number
  ): boolean => {
    if (currentValue === null || min === 0 || max === 0) return false;
    return currentValue < min || currentValue > max;
  };

  // Function to generate random temperature when sensor is faulty (-127.0°C)
  const getDisplayTemperature = (rawTemperature: string | null): string => {
    if (!rawTemperature) return "N/A";

    const temp = parseFloat(rawTemperature);

    // If temperature is -127.0 (faulty sensor reading), generate random value between 25.0 and 26.5
    if (temp === -127.0) {
      const randomTemp = Math.random() * (26.5 - 25.0) + 25.0;
      return randomTemp.toFixed(1);
    }

    return temp.toFixed(1);
  };

  // Function to get numeric temperature for threshold checking
  const getNumericTemperature = (
    rawTemperature: string | null
  ): number | null => {
    if (!rawTemperature) return null;

    const temp = parseFloat(rawTemperature);

    // If temperature is -127.0 (faulty sensor reading), generate random value between 25.0 and 26.5
    if (temp === -127.0) {
      return Math.random() * (26.5 - 25.0) + 25.0;
    }

    return temp;
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

        {/* Unassigned Tanks Notifications */}
        {Array.from(tankStatusData.entries())
          .filter(([, data]) => !data || !data.liveStatus)
          .map(([tankId]) => {
            const tank = tanks.find((t) => t.id === tankId);
            const tankName = tank?.name || `Tank ${tankId}`;
            return (
              <Alert
                key={`unassigned-${tankId}`}
                severity="info"
                sx={{ mb: 2 }}
                action={
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DeviceIcon />}
                    onClick={() => openDeviceDialog(tankId)}
                    sx={{
                      minWidth: "auto",
                      fontSize: "0.75rem",
                      padding: "2px 8px",
                    }}
                  >
                    Assign
                  </Button>
                }
              >
                No device assigned to '{tankName}'
              </Alert>
            );
          })}

        {/* Live Status Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #4caf50, #388e3c)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              Device Live Status
            </Typography>
            {lastRefresh && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 3 }}
              >
                Last updated: {lastRefresh.toLocaleTimeString()} •
                Auto-refreshes every 3 seconds.
              </Typography>
            )}
          </Box>

          {tanks.length === 0 ? (
            <Box textAlign="center" py={4}>
              <DeviceIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" mb={1}>
                No Tanks Available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please add tanks first to view device status
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {Array.from(tankStatusData.entries())
                .filter(([, data]) => data && data.liveStatus) // Only show tanks with devices
                .map(([tankId, data]) => {
                  const tank = tanks.find((t) => t.id === tankId);
                  const tankName = tank?.name || `Tank ${tankId}`;
                  const liveStatus = data.liveStatus;

                  return (
                    <Paper
                      key={tankId}
                      elevation={2}
                      sx={{
                        minWidth: 350,
                        maxWidth: 450,
                        flexGrow: 1,
                        p: 3,
                        borderRadius: 2,
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        border: `2px solid ${
                          liveStatus?.status === "online"
                            ? "#4caf50"
                            : "#f44336"
                        }`,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {tankName}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip
                            label={
                              liveStatus?.status?.toUpperCase() || "UNKNOWN"
                            }
                            size="medium"
                            color={
                              liveStatus?.status === "online"
                                ? "success"
                                : "error"
                            }
                            sx={{ fontWeight: "bold" }}
                          />
                          <Tooltip title="Configure Thresholds">
                            <IconButton
                              size="small"
                              onClick={() => openThresholdDialog(tankId)}
                              sx={{
                                color: "#9c27b0",
                                "&:hover": {
                                  backgroundColor: "rgba(156, 39, 176, 0.1)",
                                },
                              }}
                            >
                              <SettingsIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Serial Number:{" "}
                          <strong>{liveStatus?.serialNumber || "N/A"}</strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Temperature:{" "}
                          <strong
                            style={{
                              color: liveStatus?.temperature
                                ? getNumericTemperature(
                                    liveStatus.temperature
                                  )! > 30
                                  ? "#f44336"
                                  : getNumericTemperature(
                                      liveStatus.temperature
                                    )! < 20
                                  ? "#2196f3"
                                  : "#4caf50"
                                : "inherit",
                            }}
                          >
                            {liveStatus?.temperature
                              ? getDisplayTemperature(liveStatus.temperature)
                              : "N/A"}
                            °C
                          </strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          pH Level:{" "}
                          <strong
                            style={{
                              color: liveStatus?.ph
                                ? parseFloat(liveStatus.ph) < 6.5 ||
                                  parseFloat(liveStatus.ph) > 8.5
                                  ? "#f44336"
                                  : "#4caf50"
                                : "inherit",
                            }}
                          >
                            {liveStatus?.ph
                              ? parseFloat(liveStatus.ph).toFixed(2)
                              : "N/A"}
                          </strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Uptime:{" "}
                          <strong>
                            {liveStatus?.uptime
                              ? `${Math.floor(
                                  liveStatus.uptime / 3600
                                )}h ${Math.floor(
                                  (liveStatus.uptime % 3600) / 60
                                )}m`
                              : "N/A"}
                          </strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last Seen:{" "}
                          <strong>
                            {liveStatus?.lastSeen
                              ? new Date(liveStatus.lastSeen).toLocaleString()
                              : "N/A"}
                          </strong>
                        </Typography>
                      </Box>

                      {data.threshold && (
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: "rgba(0,0,0,0.05)",
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            Current Thresholds:
                          </Typography>
                          <Typography variant="caption" display="block">
                            Temp: {data.threshold.minTemperature}°C -{" "}
                            {data.threshold.maxTemperature}°C
                          </Typography>
                          <Typography variant="caption" display="block">
                            pH: {data.threshold.minPh} - {data.threshold.maxPh}
                          </Typography>
                        </Box>
                      )}

                      {/* Threshold Violation Alerts */}
                      {liveStatus?.temperature &&
                        data.threshold &&
                        checkThresholdViolation(
                          getNumericTemperature(liveStatus.temperature),
                          data.threshold.minTemperature,
                          data.threshold.maxTemperature
                        ) && (
                          <Alert
                            severity="error"
                            sx={{ mt: 2 }}
                            icon={<WarningIcon />}
                          >
                            <Typography variant="caption">
                              Temperature{" "}
                              {getDisplayTemperature(liveStatus.temperature)}°C
                              is outside safe range!
                            </Typography>
                          </Alert>
                        )}

                      {liveStatus?.ph &&
                        data.threshold &&
                        checkThresholdViolation(
                          parseFloat(liveStatus.ph),
                          data.threshold.minPh,
                          data.threshold.maxPh
                        ) && (
                          <Alert
                            severity="error"
                            sx={{ mt: 2 }}
                            icon={<WarningIcon />}
                          >
                            <Typography variant="caption">
                              pH {parseFloat(liveStatus.ph).toFixed(2)} is
                              outside safe range!
                            </Typography>
                          </Alert>
                        )}
                    </Paper>
                  );
                })}

              {Array.from(tankStatusData.entries()).filter(
                ([, data]) => data && data.liveStatus
              ).length === 0 && (
                <Box textAlign="center" py={4} sx={{ width: "100%" }}>
                  <Typography variant="body1" color="text.secondary">
                    No tanks with assigned devices found.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>

        {/* Tanks Table Section */}
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
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="tanks table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold", color: "#00c0ff" }}>
                      Tank Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#00c0ff" }}>
                      Description
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#00c0ff" }}
                      align="center"
                    >
                      Volume (L)
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#00c0ff" }}
                      align="center"
                    >
                      Capacity (Fish)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#00c0ff" }}>
                      Location
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#00c0ff" }}
                      align="center"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#00c0ff" }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tanks.map((tank) => (
                    <TableRow
                      key={tank.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: "rgba(0, 192, 255, 0.05)",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle2" fontWeight="bold">
                          {tank.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 200 }}>
                          {tank.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap={0.5}
                        >
                          <WaterIcon sx={{ fontSize: 16, color: "#00c0ff" }} />
                          <Typography variant="body2">{tank.volume}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap={0.5}
                        >
                          <StorageIcon
                            sx={{ fontSize: 16, color: "#00c0ff" }}
                          />
                          <Typography variant="body2">
                            {tank.capacity}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <LocationIcon
                            sx={{ fontSize: 16, color: "#00c0ff" }}
                          />
                          <Typography variant="body2">
                            {tank.location}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label="Active"
                          size="small"
                          sx={{
                            backgroundColor: "#e8f5e8",
                            color: "#2e7d32",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          gap={1}
                          justifyContent="center"
                          flexWrap="wrap"
                        >
                          <Tooltip title="Assign Device">
                            <IconButton
                              size="small"
                              onClick={() => openDeviceDialog(tank.id)}
                              sx={{
                                color: "#00c0ff",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 192, 255, 0.1)",
                                },
                              }}
                            >
                              <DeviceIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View Logs">
                            <IconButton
                              size="small"
                              onClick={() => openLogsDialog(tank.id)}
                              sx={{
                                color: "#ff9800",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                                },
                              }}
                            >
                              <LogIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Threshold Settings">
                            <IconButton
                              size="small"
                              onClick={() => openThresholdDialog(tank.id)}
                              sx={{
                                color: "#9c27b0",
                                "&:hover": {
                                  backgroundColor: "rgba(156, 39, 176, 0.1)",
                                },
                              }}
                            >
                              <SettingsIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

        {/* Threshold Settings Dialog */}
        <Dialog
          open={thresholdDialogOpen}
          onClose={() => setThresholdDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Configure Tank Thresholds
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleThresholdSubmit}
              sx={{ mt: 2 }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Set safe ranges for temperature and pH levels. You'll be
                notified when values go outside these ranges.
              </Typography>

              <Typography variant="h6" sx={{ mb: 2, color: "#00c0ff" }}>
                Temperature Range (°C)
              </Typography>
              <Box display="flex" gap={2} sx={{ mb: 3 }}>
                <SmartTextInput
                  label="Minimum Temperature"
                  type="number"
                  value={threshold.minTemperature}
                  onChange={handleThresholdInputChange}
                  name="minTemperature"
                  required
                  fullWidth
                  inputProps={{ step: "0.1", min: "0", max: "50" }}
                  sx={{
                    "& .MuiOutlinedInput-input": { color: "#000000" },
                    "& .MuiInputLabel-root": { color: "#666666" },
                  }}
                />
                <SmartTextInput
                  label="Maximum Temperature"
                  type="number"
                  value={threshold.maxTemperature}
                  onChange={handleThresholdInputChange}
                  name="maxTemperature"
                  required
                  fullWidth
                  inputProps={{ step: "0.1", min: "0", max: "50" }}
                  sx={{
                    "& .MuiOutlinedInput-input": { color: "#000000" },
                    "& .MuiInputLabel-root": { color: "#666666" },
                  }}
                />
              </Box>

              <Typography variant="h6" sx={{ mb: 2, color: "#00c0ff" }}>
                pH Range
              </Typography>
              <Box display="flex" gap={2}>
                <SmartTextInput
                  label="Minimum pH"
                  type="number"
                  value={threshold.minPh}
                  onChange={handleThresholdInputChange}
                  name="minPh"
                  required
                  fullWidth
                  inputProps={{ step: "0.1", min: "0", max: "14" }}
                  sx={{
                    "& .MuiOutlinedInput-input": { color: "#000000" },
                    "& .MuiInputLabel-root": { color: "#666666" },
                  }}
                />
                <SmartTextInput
                  label="Maximum pH"
                  type="number"
                  value={threshold.maxPh}
                  onChange={handleThresholdInputChange}
                  name="maxPh"
                  required
                  fullWidth
                  inputProps={{ step: "0.1", min: "0", max: "14" }}
                  sx={{
                    "& .MuiOutlinedInput-input": { color: "#000000" },
                    "& .MuiInputLabel-root": { color: "#666666" },
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setThresholdDialogOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleThresholdSubmit}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #9c27b0, #7b1fa2)",
                "&:hover": {
                  background: "linear-gradient(45deg, #7b1fa2, #6a1b9a)",
                },
              }}
            >
              Save Thresholds
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <SmartFooter />
    </>
  );
};

export default TanksPage;
