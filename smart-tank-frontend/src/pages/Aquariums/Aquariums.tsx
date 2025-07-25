import { useState, useEffect } from "react";
import SmartStoreCard from "../../shared/components/molecules/SmartStoreCard/SmartStoreCard";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import SmartNavbar from "../../shared/components/organisms/smartNavbar";
import SmartFooter from "../../shared/components/organisms/smartFooter/SmartFooter";
import SearchIcon from "@mui/icons-material/Search";
import aquariumService, {
  type AquariumListItem,
} from "../../services/aquariumService";

const AquariumPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allAquariums, setAllAquariums] = useState<AquariumListItem[]>([]);
  const [filteredAquariums, setFilteredAquariums] = useState<
    AquariumListItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAquariums = async () => {
      try {
        setLoading(true);
        setError(null);
        const aquariums = await aquariumService.getAllAquariums();
        const activeAquariums = aquariums.filter(
          (aquarium) => aquarium.status === "ACTIVE"
        );
        setAllAquariums(activeAquariums);
        setFilteredAquariums(activeAquariums);
      } catch (err) {
        console.error("Error loading aquariums:", err);
        setError("Failed to load aquariums. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAquariums();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAquariums(allAquariums);
    } else {
      const filtered = allAquariums.filter(
        (aquarium) =>
          aquarium.aquariumName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          aquarium.businessName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          aquarium.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          aquarium.province.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAquariums(filtered);
    }
  }, [searchTerm, allAquariums]);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        minHeight: "100vh",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: [
            "radial-gradient(circle at 20% 20%, rgba(0, 192, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(0, 119, 255, 0.05) 0%, transparent 50%)",
          ].join(", "),
          zIndex: 0,
        },
      }}
    >
      <SmartNavbar />
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            sx={{
              color: "white",
              textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
              mb: 2,
              background: "linear-gradient(45deg, #ffffff, #00c0ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Explore Local Aquarium Stores
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.8)",
              mt: 1,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Find the best places to get your fish and aquarium supplies. Connect
            with trusted local aquarium stores in your area.
          </Typography>
        </Box>

        {/* Modern Search Bar */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by store name, business, location, or province..."
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 600,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "1.1rem",
                "&:hover": {
                  borderColor: "rgba(0, 192, 255, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
                "&.Mui-focused": {
                  borderColor: "#00c0ff",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 0 0 3px rgba(0, 192, 255, 0.1)",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "16px 20px",
                color: "white",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.6)",
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 24 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress size={60} sx={{ color: "#00c0ff" }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              border: "1px solid rgba(244, 67, 54, 0.3)",
              borderRadius: 3,
              "& .MuiAlert-message": {
                color: "white",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Results Section */}
        {!loading && !error && (
          <>
            {searchTerm && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    color: "white",
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  {filteredAquariums.length}{" "}
                  {filteredAquariums.length === 1 ? "result" : "results"}
                  {searchTerm && ` for "${searchTerm}"`}
                </Typography>
              </Box>
            )}

            {/* Aquarium Cards Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 4,
                justifyItems: "center",
                mb: 6,
              }}
            >
              {filteredAquariums.map((aquarium) => (
                <SmartStoreCard
                  key={aquarium.id}
                  id={aquarium.id}
                  aquariumName={aquarium.aquariumName}
                />
              ))}
            </Box>

            {/* No Results */}
            {filteredAquariums.length === 0 && !loading && (
              <Box sx={{ textAlign: "center", my: 8 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    mb: 2,
                  }}
                >
                  {searchTerm
                    ? `No aquarium stores found for "${searchTerm}"`
                    : "No aquarium stores available"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Check back later for new stores"}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
      <SmartFooter />
    </Box>
  );
};

export default AquariumPage;
