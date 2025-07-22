/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import { loadGoogleMapsAPI, onGoogleMapsReady, getGoogleMapsState } from "../../../utils/googleMapsLoader";

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
        console.log("Initializing Google Places Autocomplete...");
        
        if (!window.google?.maps?.places?.Autocomplete) {
          console.error("Google Maps Places API not available");
          setError("Google Maps Places API not available - ensure API key has Places API enabled");
          setIsLoading(false);
          return;
        }

        if (!inputRef.current) {
          console.error("Input element not available");
          return;
        }

        console.log("Creating Autocomplete instance...");
        
        // Create autocomplete instance restricted to Sri Lanka
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["establishment", "geocode"],
            componentRestrictions: { country: "lk" }, // Restrict to Sri Lanka (LK country code)
          } as any
        );

        // Set the fields after creating the instance (more reliable)
        autocompleteRef.current.setFields([
          "place_id",
          "geometry", 
          "name",
          "formatted_address",
          "address_components",
        ]);

        // Add place changed listener
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          console.log("Place selected:", place);

          if (!place) {
            console.log("No place object returned");
            return;
          }

          if (!place.geometry) {
            console.log("Place has no geometry:", place.name || place.formatted_address);
            return;
          }

          if (!place.geometry.location) {
            console.log("Place geometry has no location:", place.name || place.formatted_address);
            return;
          }

          console.log("Valid place selected, extracting data...");

          // Validate required fields
          if (!place.formatted_address) {
            console.warn("Place missing formatted_address, using name as fallback");
          }

          if (!place.address_components || place.address_components.length === 0) {
            console.warn("Place missing address_components");
          }

          // Extract address components with better error handling
          const addressComponents: AddressComponents = {};
          if (place.address_components && Array.isArray(place.address_components)) {
            console.log("Processing address components:", place.address_components.length, "components");
            place.address_components.forEach((component: any) => {
              if (component && component.types && Array.isArray(component.types)) {
                const types = component.types;
                if (types.includes("street_number")) {
                  addressComponents.street_number = component.long_name || component.short_name;
                }
                if (types.includes("route")) {
                  addressComponents.route = component.long_name || component.short_name;
                }
                if (types.includes("locality")) {
                  addressComponents.locality = component.long_name || component.short_name;
                }
                if (types.includes("administrative_area_level_1")) {
                  addressComponents.administrative_area_level_1 = component.long_name || component.short_name;
                }
                if (types.includes("administrative_area_level_2")) {
                  addressComponents.administrative_area_level_2 = component.long_name || component.short_name;
                }
                if (types.includes("postal_code")) {
                  addressComponents.postal_code = component.long_name || component.short_name;
                }
                if (types.includes("country")) {
                  addressComponents.country = component.long_name || component.short_name;
                }
              }
            });
          } else {
            console.warn("Place has no valid address_components");
          }

          // Create location data with Sri Lankan address format considerations
          const locationData: LocationData = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address || place.name || "Address not available",
            city: addressComponents.locality || addressComponents.administrative_area_level_2,
            province: addressComponents.administrative_area_level_1,
            postalCode: addressComponents.postal_code,
            addressComponents,
          };

          console.log("Final location data:", locationData);

          // Validate the location data before sending
          if (!locationData.address || locationData.address === "Address not available") {
            console.warn("Address information may be incomplete");
          }

          if (!locationData.city && !locationData.province) {
            console.warn("Location may be outside Sri Lanka or missing administrative data");
          }

          console.log("Address selected:", locationData);

          // Call callback with location data
          if (onAddressSelect) {
            onAddressSelect(locationData);
          }
        });

        setIsLoading(false);
        setError(null);
        console.log("Google Places Autocomplete initialized successfully");
      } catch (err) {
        console.error("Error initializing autocomplete:", err);
        setError(`Failed to initialize address picker: ${err instanceof Error ? err.message : String(err)}`);
        setIsLoading(false);
      }
    };

    // Use centralized Google Maps API loader to prevent duplicate loading
    const state = getGoogleMapsState();
    
    if (state.isAvailable) {
      console.log("Google Maps API already available, initializing...");
      initializeAutocomplete();
      return;
    }

    // Load Google Maps API using centralized loader
    console.log("Loading Google Maps API using centralized loader...");
    loadGoogleMapsAPI(apiKey)
      .then(() => {
        console.log("Google Maps API ready, initializing autocomplete...");
        onGoogleMapsReady(initializeAutocomplete);
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
        setError(`Failed to load Google Maps API: ${error.message}`);
        setIsLoading(false);
      });

      // Cleanup function
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else {
      // Google object exists but places might not be loaded yet
      const checkPlaces = () => {
        if (window.google.maps?.places?.Autocomplete) {
          initializeAutocomplete();
        } else {
          setTimeout(checkPlaces, 100);
        }
      };
      checkPlaces();
    }

    // Cleanup
    return () => {
      if (autocompleteRef.current && window.google?.maps) {
        try {
          if ((window.google as any).maps.event) {
            (window.google as any).maps.event.clearInstanceListeners(autocompleteRef.current);
          }
        } catch (err) {
          console.error("Error cleaning up autocomplete:", err);
        }
      }
    };
  }, [apiKey, onAddressSelect]);

  if (error) {
    return (
      <Paper elevation={1} sx={{ p: 3 }}>
        <Alert severity="error">
          <Typography variant="body2">
            <strong>Error:</strong> {error}
          </Typography>
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 3 }} ref={containerRef}>
      <Box>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            color: "primary.main",
          }}
        >
          <LocationIcon />
          {label}
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading Google Maps...
            </Typography>
          </Box>
        )}

        <input
          ref={inputRef}
          type="text"
          placeholder="Type to search for an address in Sri Lanka"
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            fontSize: "16px",
            fontFamily: "inherit",
            outline: "none",
            marginBottom: "8px",
            opacity: isLoading ? 0.5 : 1,
            pointerEvents: isLoading ? "none" : "auto",
          }}
          disabled={isLoading || !!error}
        />

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
            fontStyle: "italic",
          }}
        >
          🌍 Search restricted to Sri Lanka. Start typing to find your store location.
        </Typography>
      </Box>
    </Paper>
  );
};

export default GoogleAddressPicker;
