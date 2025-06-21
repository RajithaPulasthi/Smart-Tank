import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fishProfiles } from "../../Data/fish.data";
import { aquariums } from "../../Data/aquarium.data";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartStoreCard from "../../shared/components/molecules/SmartStoreCard/SmartStoreCard";

const FishDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fish = fishProfiles.find((f) => f.id === id);

  if (!fish) {
    return <Typography>Fish not found.</Typography>;
  }

  return (
    <>
      <SmartNavbar />

      <Box sx={{ px: 4, pt: 4 }}>
        {/* Back + Name */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" sx={{ ml: 1 }}>
            {fish.name}
          </Typography>
        </Box>

        {/* Fish Info */}
        <Box
          sx={{
            backgroundColor: "#004aad",
            color: "#fff",
            p: 4,
            borderRadius: 2,
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={fish.image}
            alt={fish.name}
            sx={{
              width: 240,
              height: 240,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <Box sx={{ minWidth: 260 }}>
            <Typography>Scientific name – {fish.scientificName}</Typography>
            <Typography>Relative PH of the water – {fish.ph}</Typography>
            <Typography>
              Hardness of water (dKH, dGH) – {fish.hardness}
            </Typography>
            <Typography>
              Temperature in degrees (°C) – {fish.temperature}
            </Typography>
            <Typography>Maximum length (cm) – {fish.maxLengthCm}</Typography>
            <Typography>Feeding habits – {fish.feedingHabits}</Typography>
            <Typography>Reproduction – {fish.reproduction}</Typography>
            <Typography>Temperament – {fish.temperament}</Typography>
          </Box>
        </Box>

        {/* Nearby Aquariums */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Aquariums Near You
              </Typography>
              <Typography variant="body2">
                Aquariums near you where you can buy “{fish.name}”
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {aquariums.slice(0, 5).map((store) => (
              <Grid item key={store.id}>
                <SmartStoreCard
                  id={store.id}
                  imageSrc={store.bannerImage}
                  title={store.name}
                  location={store.address}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <SmartFooter />
    </>
  );
};

export default FishDetailsPage;
