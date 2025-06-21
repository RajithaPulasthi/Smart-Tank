import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import { aquariums } from "../../Data/aquarium.data";

type Aquarium = {
  id: string;
  bannerImage: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  tabs: string[];
  description: string;
};

const AquariumSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const data = aquariums.find((item: Aquarium) => item.id === id);

  const [tabIndex, setTabIndex] = React.useState(0);

  if (!data) return <Typography>Aquarium not found.</Typography>;

  return (
    <>
      <SmartNavbar />
      <Box sx={{ px: 4, py: 4 }}>
        <Box
          component="img"
          src={data.bannerImage}
          alt={data.name}
          sx={{
            width: "100%",
            height: 280,
            objectFit: "cover",
            borderRadius: 2,
            mb: 3,
          }}
        />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.phone} | {data.email}
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          sx={{ mt: 4 }}
        >
          {data.tabs.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {tabIndex === 0 && <Typography>{data.description}</Typography>}
          {tabIndex === 1 && <Typography>Fish List Coming Soon</Typography>}
          {tabIndex === 2 && <Typography>Accessories Coming Soon</Typography>}
          {tabIndex === 3 && <Typography>Fish Food Details</Typography>}
          {tabIndex === 4 && <Typography>Fish Care Info</Typography>}
        </Box>
      </Box>
      <SmartFooter />
    </>
  );
};

export default AquariumSinglePage;
