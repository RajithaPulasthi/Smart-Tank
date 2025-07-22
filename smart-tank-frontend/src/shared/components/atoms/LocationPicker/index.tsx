import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Chip,
  InputAdornment,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  MyLocation as MyLocationIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData) => void;
  apiKey: string;
  defaultLocation?: { lat: number; lng: number };
  label?: string;
}

// Note: This component requires Google Maps JavaScript API to be loaded
// Add this to your index.html: <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&loading=async"></script>

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  apiKey,
  defaultLocation = { lat: 7.8731, lng: 80.7718 }, // Sri Lanka center
  label = "Select Store Location",
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load Google Maps script dynamically if not already loaded
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Add callback function to window
    (window as any).initMap = () => {
      console.log("Google Maps API loaded successfully");
      setIsScriptLoaded(true);
    };

    script.onload = () => {
      console.log("Google Maps script loaded");
    };

    script.onerror = (error) => {
      console.error("Failed to load Google Maps API:", error);
      setError(
        "Failed to load Google Maps API. Please check your API key and internet connection."
      );
    };

    document.head.appendChild(script);

    return () => {
      // Clean up
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      delete (window as any).initMap;
    };
  }, [apiKey]);

  // Handle location change and geocoding
  const handleLocationChange = useCallback(
    (lat: number, lng: number) => {
      setLoading(true);
      setError(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geocoder = new (window as any).google.maps.Geocoder();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoder.geocode(
        { location: { lat, lng } },
        (results: any[], status: string) => {
          setLoading(false);

          if (
            status === "OK" &&
            results &&
            Array.isArray(results) &&
            results[0]
          ) {
            const result = results[0];
            const addressComponents = result.address_components;

            let city = "";
            let province = "";
            let postalCode = "";

            addressComponents?.forEach(
              (component: { types: string[]; long_name: string }) => {
                const types = component.types;
                if (types.includes("locality")) {
                  city = component.long_name;
                } else if (types.includes("administrative_area_level_1")) {
                  province = component.long_name;
                } else if (types.includes("postal_code")) {
                  postalCode = component.long_name;
                }
              }
            );

            const locationData: LocationData = {
              lat,
              lng,
              address: result.formatted_address,
              city,
              province,
              postalCode,
            };

            setSelectedLocation(locationData);
            onLocationSelect(locationData);
          } else {
            setError("Unable to get address for this location");
          }
        }
      );
    },
    [onLocationSelect]
  );

  // Initialize map when script is loaded
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    try {
      console.log("Initializing Google Maps...");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const google = (window as any).google;

      if (!google || !google.maps) {
        setError("Google Maps API not available");
        return;
      }

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 15,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      const markerInstance = new google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        draggable: true,
        title: "Store Location",
        animation: google.maps.Animation.DROP,
      });

      // Handle marker drag
      markerInstance.addListener("dragend", () => {
        const position = markerInstance.getPosition();
        if (position) {
          handleLocationChange(position.lat(), position.lng());
        }
      });

      // Handle map click
      mapInstance.addListener("click", (event: any) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          markerInstance.setPosition({ lat, lng });
          handleLocationChange(lat, lng);
        }
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      // Initialize autocomplete for search
      if (searchInputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          searchInputRef.current,
          {
            types: ["establishment", "geocode"],
            componentRestrictions: { country: "lk" }, // Restrict to Sri Lanka
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            mapInstance.setCenter({ lat, lng });
            markerInstance.setPosition({ lat, lng });
            handleLocationChange(lat, lng);
            setSearchValue(place.formatted_address || "");
          }
        });

        autocompleteRef.current = autocomplete;
      }

      // Set initial location
      handleLocationChange(defaultLocation.lat, defaultLocation.lng);
      console.log("Google Maps initialized successfully");
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      setError(
        "Failed to initialize Google Maps. Please refresh the page and try again."
      );
    }
  }, [isScriptLoaded, defaultLocation, handleLocationChange]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (map && marker) {
          map.setCenter({ lat, lng });
          marker.setPosition({ lat, lng });
          handleLocationChange(lat, lng);
        }
      },
      (error) => {
        setLoading(false);
        setError("Unable to get your current location");
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  if (!isScriptLoaded) {
    return (
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>Loading Google Maps...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box
        sx={{
          background: "linear-gradient(90deg, #4CAF50 0%, #45a049 100%)",
          color: "white",
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <LocationIcon sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {label}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Click on the map or search for your location
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Search Box */}
        <Box sx={{ mb: 3 }}>
          <TextField
            ref={searchInputRef}
            fullWidth
            placeholder="Search for your location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    startIcon={
                      loading ? (
                        <CircularProgress size={16} />
                      ) : (
                        <MyLocationIcon />
                      )
                    }
                    onClick={getCurrentLocation}
                    disabled={loading}
                    sx={{ minWidth: "auto" }}
                  >
                    Current
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Map Container */}
        <Box
          ref={mapRef}
          sx={{
            height: 300,
            width: "100%",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            mb: 2,
          }}
        />

        {/* Selected Location Display */}
        {selectedLocation && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Selected Location:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
              <Chip
                icon={<LocationIcon />}
                label={`${selectedLocation.lat.toFixed(
                  6
                )}, ${selectedLocation.lng.toFixed(6)}`}
                size="small"
                variant="outlined"
              />
              {selectedLocation.city && (
                <Chip
                  label={selectedLocation.city}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
              {selectedLocation.province && (
                <Chip
                  label={selectedLocation.province}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {selectedLocation.address}
            </Typography>
          </Box>
        )}

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Instructions */}
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Instructions:</strong> Click anywhere on the map to set your
            store location, or drag the marker to adjust the position. You can
            also search for a specific address.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;
