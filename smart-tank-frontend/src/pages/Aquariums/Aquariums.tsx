import { useState } from "react";
import SmartStoreCard from "../../shared/components/molecules/SmartStoreCard/SmartStoreCard";
import { Box, Typography, Container } from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartAquariumSearchBar from "../../shared/components/organisms/smartAquariumSearchBar/SmartAquariumSearchBar";
import SmartAquariumScrollSection from "../../shared/components/organisms/smartAquariumScrollSection/SmartAquariumScrollSection";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import { aquariums } from "../../Data/aquarium.data";

const AquariumPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof aquariums>([]);

  const handleSearch = () => {
    const filtered = aquariums.filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #141e30, #243b55)",
        minHeight: "100vh",
      }}
    >
      <SmartNavbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{ color: "white", textShadow: "2px 2px 8px rgba(0,0,0,0.6)" }}
          >
            Explore Local Aquarium Stores
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}
          >
            Find the best places to get your fish and supplies.
          </Typography>
        </Box>

        <SmartAquariumSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={handleSearch}
          placeholder="Enter store name or location"
        />

        {/* Show search results if any */}
        {searchResults.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "white", mb: 2 }}
            >
              {searchResults.length} results for "{searchTerm}"
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {searchResults.map((store) => (
                <SmartStoreCard
                  key={store.id}
                  id={store.id}
                  imageSrc={store.bannerImage}
                  title={store.name}
                  location={store.address}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Featured Section */}
        <SmartAquariumScrollSection title="Featured Local Aquariums" />
      </Container>
      <SmartFooter />
    </Box>
  );
};

export default AquariumPage;
