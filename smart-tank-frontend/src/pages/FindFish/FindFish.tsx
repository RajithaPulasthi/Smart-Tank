import { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
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
    <Box
      sx={{
        background:
          "linear-gradient(to bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
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
            Find Your Next Aquatic Pet
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}
          >
            Search our extensive database of fish and local aquarium stores.
          </Typography>
        </Box>

        <SmartAquariumSearchBar
          placeholder="Enter a fish name"
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={handleSearch}
        />

        {/* Show results when searched */}
        {results.length > 0 && (
          <Box sx={{ my: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "white", mb: 2 }}
            >
              {results.length} results for "{searchTerm}"
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
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
          </Box>
        )}

        {/* Static Scroll Sections */}
        <SmartHorizontalScrollSection<(typeof fishProfiles)[0]>
          title="Featured Fish"
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
          title="Most Popular Choices"
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
      </Container>
      <SmartFooter />
    </Box>
  );
};

export default FindFish;
