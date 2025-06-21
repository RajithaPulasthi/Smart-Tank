import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartAquariumSearchBar from "../../shared/components/organisms/smartAquariumSearchBar/SmartAquariumSearchBar";
import SmartFishCard from "../../shared/components/molecules/SmartFishCard/SmartFishCard";
import SmartStoreCard from "../../shared/components/molecules/SmartStoreCard/SmartStoreCard";
import SmartHorizontalScrollSection from "../../shared/components/organisms/smartHorizontalScrollSection/SmartHorizontalScrollSection";
import { fishProfiles } from "../../Data/fish.data";
import { aquariums } from "../../Data/aquarium.data";

const FindFish = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<typeof fishProfiles>([]);

  const handleSearch = () => {
    const filtered = fishProfiles.filter((fish) =>
      fish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <>
      <SmartNavbar />
      <Box sx={{ px: 4, pt: 5, pb: 3 }}>
        <SmartAquariumSearchBar
          placeholder="Enter a fish name"
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={handleSearch}
        />

        {/* Show results when searched */}
        {results.length > 0 && (
          <>
            <Typography sx={{ mt: 4, mb: 2 }} fontWeight={500}>
              {results.length} results for "{searchTerm}"
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
              {results.map((fish) => (
                <SmartFishCard
                  key={fish.id}
                  id={fish.id}
                  name={fish.name}
                  scientificName={fish.scientificName}
                  image={fish.image}
                />
              ))}
            </Box>
          </>
        )}

        {/* Static Scroll Sections */}
        <SmartHorizontalScrollSection<(typeof fishProfiles)[0]>
          title="Local Fish List"
          items={fishProfiles.slice(0, 5)}
          renderItem={(fish) => (
            <SmartFishCard
              key={fish.id}
              id={fish.id}
              name={fish.name}
              scientificName={fish.scientificName}
              image={fish.image}
            />
          )}
        />

        <SmartHorizontalScrollSection
          title="Most Popular Pet Fish"
          items={fishProfiles.slice(1, 6)}
          renderItem={(fish) => (
            <SmartFishCard
              key={fish.id}
              id={fish.id}
              name={fish.name}
              scientificName={fish.scientificName}
              image={fish.image}
            />
          )}
        />
      </Box>

      {/* Reuse Aquarium Scroll Section */}
      <SmartHorizontalScrollSection
        title="Featured Local Aquariums"
        items={aquariums.slice(0, 5)}
        renderItem={(store) => (
          <SmartStoreCard
            key={store.id}
            id={store.id}
            imageSrc={store.bannerImage}
            title={store.name}
            location={store.address}
          />
        )}
      />

      <SmartFooter />
    </>
  );
};

export default FindFish;
