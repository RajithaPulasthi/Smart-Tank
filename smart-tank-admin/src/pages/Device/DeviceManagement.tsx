import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { getAllDevices, registerDevice } from "../../services/deviceService";
import type { Device } from "../../types/Device";
import DeviceTable from "../../components/device/DeviceTable";
import DeviceFormDialog from "../../components/device/DeviceFormDialog";

const DeviceManagement = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(
    () => () => {}
  );
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const fetchDevices = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. User might not be authenticated.");
      return;
    }

    try {
      const data = await getAllDevices(token);
      setDevices(data);
    } catch (err) {
      console.error("Failed to fetch devices:", err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleOpenForm = (device?: Device | null) => {
    setSelectedDevice(device ?? null);
    setOpenForm(true);
  };

  const handleSaveDevice = (device: Device) => {
    setConfirmationMessage("Are you sure you want to save this device?");
    setConfirmAction(() => async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await registerDevice(device, token);
        fetchDevices();
        setOpenForm(false);
      } catch (err) {
        console.error("Error saving device", err);
      }
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Device Management</Typography>
        <IconButton
          color="primary"
          onClick={() =>
            handleOpenForm({
              id: 0,
              type: "",
              serialNumber: "",
              password: "",
              status: "Active",
            })
          }
        >
          <AddIcon />
        </IconButton>
      </Box>

      <DeviceTable devices={devices} />

      <DeviceFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        device={selectedDevice}
        onSave={handleSaveDevice}
      />

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>{confirmationMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button onClick={confirmAction} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeviceManagement;
