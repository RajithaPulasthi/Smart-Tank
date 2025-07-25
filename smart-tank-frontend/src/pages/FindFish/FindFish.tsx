import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartAquariumSearchBar from "../../shared/components/organisms/smartAquariumSearchBar/SmartAquariumSearchBar";
import SmartFishCard from "../../shared/components/molecules/SmartFishCard/SmartFishCard";
import SmartHorizontalScrollSection from "../../shared/components/organisms/smartHorizontalScrollSection/SmartHorizontalScrollSection";
import FishService, { type FishListItem } from "../../services/fishService";

const FindFish = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFish, setAllFish] = useState<FishListItem[]>([]);
  const [results, setResults] = useState<FishListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  // Load all fish on component mount
  useEffect(() => {
    const loadAllFish = async () => {
      try {
        setLoading(true);
        setError(null);
        const fishData = await FishService.getAllFish();
        setAllFish(fishData);
      } catch (err) {
        console.error("Error loading fish:", err);
        setError("Failed to load fish data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadAllFish();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      setSearching(true);
      const searchResults = await FishService.searchFish(searchTerm);
      setResults(searchResults);
    } catch (err) {
      console.error("Error searching fish:", err);
      setError("Failed to search fish. Please try again.");
    } finally {
      setSearching(false);
    }
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

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : (
          <>
            <SmartAquariumSearchBar
              placeholder="Enter a fish name"
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearch}
            />

            {/* Show search results */}
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
                      temp={fish.temp}
                      ph={fish.ph}
                      gh={fish.gh}
                      kh={fish.kh}
                      nitrate={fish.nitrate}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Show no results message */}
            {searchTerm && !searching && results.length === 0 && (
              <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h6" sx={{ color: "white", opacity: 0.8 }}>
                  No fish found for "{searchTerm}"
                </Typography>
              </Box>
            )}

            {/* Featured Fish Section */}
            {allFish.length > 0 && (
              <SmartHorizontalScrollSection<FishListItem>
                title="Featured Fish"
                items={allFish.slice(0, 8)}
                renderItem={(fish) => (
                  <SmartFishCard
                    key={fish.id}
                    id={fish.id}
                    name={fish.name}
                    temp={fish.temp}
                    ph={fish.ph}
                    gh={fish.gh}
                    kh={fish.kh}
                    nitrate={fish.nitrate}
                  />
                )}
              />
            )}

            {/* Most Popular Choices */}
            {allFish.length > 1 && (
              <SmartHorizontalScrollSection<FishListItem>
                title="Most Popular Choices"
                items={allFish.slice(1, 9)}
                renderItem={(fish) => (
                  <SmartFishCard
                    key={fish.id}
                    id={fish.id}
                    name={fish.name}
                    temp={fish.temp}
                    ph={fish.ph}
                    gh={fish.gh}
                    kh={fish.kh}
                    nitrate={fish.nitrate}
                  />
                )}
              />
            )}

            {/* Featured Local Aquariums */}
            {/* Featured Local Aquariums - Coming Soon */}
            {/*
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
            */}
          </>
        )}
      </Container>
      <SmartFooter />
    </Box>
  );
};

export default FindFish;
