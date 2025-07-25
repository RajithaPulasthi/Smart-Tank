import React, { useState, useEffect, useCallback } from "react";
import { createTank, getTanksByUserId } from "../../services/tankService";
import { Tank } from "../../types/Tank";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  Box,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { StoreUser } from "../../types/Store";

const TankPage: React.FC = () => {
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [newTank, setNewTank] = useState({
    name: "",
    description: "",
    volume: 0,
    capacity: 0,
    location: "",
  });
  const [user, setUser] = useState<StoreUser | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchTanks = useCallback(
    async (userId: number) => {
      try {
        const userTanks = await getTanksByUserId(userId);
        setTanks(userTanks);
      } catch (error) {
        console.error("Error fetching tanks:", error);
        enqueueSnackbar("Error fetching tanks", { variant: "error" });
      }
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    const storeAdmin = localStorage.getItem("storeAdmin");
    if (storeAdmin) {
      const parsedUser = JSON.parse(storeAdmin) as StoreUser;
      setUser(parsedUser);
      fetchTanks(parsedUser.id);
    }
  }, [fetchTanks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTank((prev) => ({
      ...prev,
      [name]: name === "volume" || name === "capacity" ? Number(value) : value,
    }));
  };

  const handleAddTank = async () => {
    if (!user) {
      enqueueSnackbar("You must be logged in to add a tank.", {
        variant: "warning",
      });
      return;
    }
    try {
      await createTank({ ...newTank, userId: user.id });
      setNewTank({
        name: "",
        description: "",
        volume: 0,
        capacity: 0,
        location: "",
      });
      fetchTanks(user.id);
      enqueueSnackbar("Tank added successfully", { variant: "success" });
      handleClose();
    } catch (error) {
      console.error("Error creating tank:", error);
      enqueueSnackbar("Error creating tank", { variant: "error" });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Tanks
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New Tank
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Tank</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={newTank.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                value={newTank.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="volume"
                label="Volume (L)"
                type="number"
                fullWidth
                value={newTank.volume}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="capacity"
                label="Capacity (L)"
                type="number"
                fullWidth
                value={newTank.capacity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location"
                label="Location"
                fullWidth
                value={newTank.location}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTank} color="primary" variant="contained">
            Add Tank
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Your Tanks" />
            <CardContent>
              <List>
                {tanks.map((tank) => (
                  <ListItem key={tank.id} divider>
                    <ListItemText
                      primary={tank.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {tank.description}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Volume: {tank.volume}L | Capacity: {tank.capacity}L
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Location: {tank.location}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TankPage;
