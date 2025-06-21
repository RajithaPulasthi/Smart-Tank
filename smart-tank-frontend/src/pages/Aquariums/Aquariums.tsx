import React, { useState } from "react";
import SmartStoreCard from "../../shared/components/molecules/SmartStoreCard/SmartStoreCard";
import { Box, Typography } from "@mui/material";
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
    <>
      <SmartNavbar />
      <Box sx={{ px: 4 }}>
        <SmartAquariumSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={handleSearch}
        />

        {/* Show search results if any */}
        {searchResults.length > 0 && (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {searchResults.length} results for "{searchTerm}"
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
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
          </>
        )}

        {/* Featured Section */}
        <SmartAquariumScrollSection title="Featured Local Aquariums" />
      </Box>
      <SmartFooter />
    </>
  );
};

export default AquariumPage;
