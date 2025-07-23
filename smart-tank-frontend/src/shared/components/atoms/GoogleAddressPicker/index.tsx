/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";

// Extend the global Window interface to include Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

interface AddressComponents {
  street_number?: string;
  route?: string;
  locality?: string;
  administrative_area_level_1?: string;
  administrative_area_level_2?: string;
  postal_code?: string;
  country?: string;
}

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  city?: string;
  province?: string;
  postalCode?: string;
  addressComponents?: AddressComponents;
}

interface GoogleAddressPickerProps {
  onAddressSelect?: (location: LocationData) => void;
  apiKey: string;
  label?: string;
}

const GoogleAddressPicker: React.FC<GoogleAddressPickerProps> = ({
  onAddressSelect,
  apiKey,
  label = "Select Store Location",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if API key is provided
    if (!apiKey) {
      setError("Google Maps API key is required");
      setIsLoading(false);
      return;
    }

    const initializeAutocomplete = () => {
      try {
        if (!window.google?.maps?.places?.Autocomplete) {
          console.error("Google Maps Places API not available");
          setError("Google Maps Places API not available");
          setIsLoading(false);
          return;
        }

        if (!inputRef.current) {
          console.error("Input element not available");
          return;
        }

        // Create autocomplete instance restricted to Sri Lanka
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["establishment", "geocode"],
            componentRestrictions: { country: "lk" }, // Restrict to Sri Lanka (LK country code)
            fields: [
              "place_id",
              "geometry",
              "name",
              "formatted_address",
              "address_components",
            ],
          } as any
        );

        // Add place changed listener
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();

          if (!place || !place.geometry || !place.geometry.location) {
            console.log(
              "No details available for input: " + (place?.name || "")
            );
            return;
          }

          // Extract address components
          const addressComponents: AddressComponents = {};
          if (place.address_components) {
            place.address_components.forEach((component: any) => {
              const types = component.types;
              if (types.includes("street_number")) {
                addressComponents.street_number = component.long_name;
              }
              if (types.includes("route")) {
                addressComponents.route = component.long_name;
              }
              if (types.includes("locality")) {
                addressComponents.locality = component.long_name;
              }
              if (types.includes("administrative_area_level_1")) {
                addressComponents.administrative_area_level_1 =
                  component.long_name;
              }
              if (types.includes("administrative_area_level_2")) {
                addressComponents.administrative_area_level_2 =
                  component.long_name;
              }
              if (types.includes("postal_code")) {
                addressComponents.postal_code = component.long_name;
              }
              if (types.includes("country")) {
                addressComponents.country = component.long_name;
              }
            });
          }

          // Create location data with Sri Lankan address format considerations
          const locationData: LocationData = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address || "",
            city:
              addressComponents.locality ||
              addressComponents.administrative_area_level_2,
            // In Sri Lanka, administrative_area_level_1 represents districts/provinces
            province: addressComponents.administrative_area_level_1,
            postalCode: addressComponents.postal_code,
            addressComponents,
          };

          console.log("Selected place:", place);
          console.log("Location data:", locationData);

          if (onAddressSelect) {
            onAddressSelect(locationData);
          }
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing autocomplete:", err);
        setError("Failed to initialize address picker");
        setIsLoading(false);
      }
    };

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoading(false);
        initializeAutocomplete();
      };
      script.onerror = () => {
        console.error("Failed to load Google Maps API");
        setError("Failed to load Google Maps API");
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      initializeAutocomplete();
    }

    // Cleanup
    return () => {
      if (
        autocompleteRef.current &&
        window.google &&
        (window.google as any).maps.event
      ) {
        (window.google as any).maps.event.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, [apiKey, onAddressSelect]);

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(90deg, #f44336 0%, #d32f2f 100%)",
            color: "white",
            p: 3,
          }}
        >
          <Alert
            severity="error"
            sx={{ color: "white", backgroundColor: "transparent" }}
          >
            <Typography variant="h6">Error Loading Address Picker</Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 4,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(90deg, #FF5722 0%, #D84315 100%)",
          color: "white",
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <LocationIcon sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {label}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Search and select your store address
          </Typography>
        </Box>
        {isLoading && (
          <Box sx={{ ml: "auto" }}>
            <CircularProgress size={24} sx={{ color: "white" }} />
          </Box>
        )}
      </Box>
      <Box ref={containerRef} sx={{ p: 4 }}>
        <input
          ref={inputRef}
          type="text"
          placeholder={
            isLoading
              ? "Loading Google Maps..."
              : "Enter your store address in Sri Lanka..."
          }
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "16px 20px",
            fontSize: "16px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            outline: "none",
            transition: "border-color 0.3s ease",
            fontFamily: "inherit",
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? "not-allowed" : "text",
          }}
          onFocus={(e) => {
            if (!isLoading) {
              e.target.style.borderColor = "#1976d2";
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e0e0e0";
          }}
        />
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          {isLoading
            ? "Loading Google Maps API..."
            : "Start typing to search for your store address in Sri Lanka. Select from the dropdown suggestions."}
        </Typography>
      </Box>
    </Paper>
  );
};

export default GoogleAddressPicker;
