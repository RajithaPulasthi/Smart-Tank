import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SmartAquariumSearchBar from "../../shared/components/organisms/smartAquariumSearchBar/SmartAquariumSearchBar";
import SmartFishCard from "../../shared/components/molecules/SmartFishCard/SmartFishCard";
import FishService, { type FishListItem } from "../../services/fishService";

const FindFish = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFish, setAllFish] = useState<FishListItem[]>([]);
  const [results, setResults] = useState<FishListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const FISH_PER_PAGE = 8;

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

  // Pagination functions
  const totalPages = Math.ceil(allFish.length / FISH_PER_PAGE);
  const startIndex = currentPage * FISH_PER_PAGE;
  const endIndex = startIndex + FISH_PER_PAGE;
  const currentFish = allFish.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          px: { xs: 2, sm: 3 },
          overflow: "hidden",
        }}
      >
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
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(auto-fit, minmax(300px, 1fr))",
                    },
                    gap: { xs: 2, sm: 2.5, md: 3 },
                    justifyItems: "center",
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  {results.map((fish) => (
                    <SmartFishCard
                      key={fish.id}
                      id={fish.id}
                      name={fish.name}
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

            {/* Fish List Grid - 4 columns, 2 rows */}
            {allFish.length > 0 && (
              <Box sx={{ my: 4 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr", // 1 column on mobile
                      sm: "repeat(2, 1fr)", // 2 columns on tablet
                      md: "repeat(3, 1fr)", // 3 columns on medium screens
                      lg: "repeat(4, 1fr)", // 4 columns on large screens
                    },
                    gap: { xs: 3, sm: 3.5, md: 4 },
                    justifyItems: "center",
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    px: { xs: 2, sm: 3 }, // Add padding to prevent edge overflow
                  }}
                >
                  {currentFish.length > 0 ? (
                    currentFish.map((fish) => (
                      <SmartFishCard
                        key={fish.id}
                        id={fish.id}
                        name={fish.name}
                      />
                    ))
                  ) : (
                    <Box
                      sx={{ gridColumn: "1 / -1", textAlign: "center", py: 4 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "white", opacity: 0.8 }}
                      >
                        No fish available on this page
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Pagination Controls at Bottom */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                  }}
                >
                  <IconButton
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    sx={{
                      color: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                      "&:disabled": { color: "rgba(255, 255, 255, 0.3)" },
                      mr: 2,
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", textAlign: "center", mx: 2 }}
                  >
                    {currentPage + 1} of {totalPages}
                  </Typography>
                  <IconButton
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                    sx={{
                      color: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                      "&:disabled": { color: "rgba(255, 255, 255, 0.3)" },
                      ml: 2,
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
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
