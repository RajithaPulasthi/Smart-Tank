import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Device } from "../../types/Device";

interface DeviceFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (device: Device) => void;
  device: Device | null;
}

const DeviceFormDialog = ({
  open,
  onClose,
  onSave,
  device,
}: DeviceFormDialogProps) => {
  const formik = useFormik({
    initialValues: {
      type: device?.type || "",
      serialNumber: device?.serialNumber || "",
      password: "",
      status: device?.status || "Active",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Type is required"),
      serialNumber: Yup.string().required("Serial number is required"),
      password: Yup.string().required("Password is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: (values) => {
      onSave({
        id: device?.id || 0,
        ...values,
      });
    },
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {device && device.id ? "Edit Device" : "Add Device"}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            id="type"
            name="type"
            label="Device Type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          />
          <TextField
            fullWidth
            margin="dense"
            id="serialNumber"
            name="serialNumber"
            label="Serial Number"
            value={formik.values.serialNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.serialNumber && Boolean(formik.errors.serialNumber)
            }
            helperText={
              formik.touched.serialNumber && formik.errors.serialNumber
            }
          />
          <TextField
            fullWidth
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            select
            margin="dense"
            id="status"
            name="status"
            label="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeviceFormDialog;
