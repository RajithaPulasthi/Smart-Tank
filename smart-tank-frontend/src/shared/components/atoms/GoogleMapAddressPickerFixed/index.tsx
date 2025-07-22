/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useCallback, useState } from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";

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

interface GoogleMapAddressPickerProps {
  onAddressSelect?: (location: LocationData) => void;
  apiKey: string;
  label?: string;
}

const GoogleMapAddressPicker: React.FC<GoogleMapAddressPickerProps> = ({
  onAddressSelect,
  apiKey,
  label = "Select Store Location in Sri Lanka",
}) => {
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if Google Maps API is loaded
  const isGoogleMapsLoaded = useCallback(() => {
    return !!(window.google?.maps?.Map && window.google?.maps?.places?.Autocomplete);
  }, []);

  // Reverse geocode function to get address from coordinates
  const reverseGeocode = useCallback((location: { lat: number; lng: number }) => {
    if (!geocoderRef.current) {
      try {
        geocoderRef.current = new window.google.maps.Geocoder();
      } catch (error) {
        console.error("Error creating Geocoder:", error);
        return;
      }
    }

    const geocodeOptions = {
      location: location,
      componentRestrictions: { country: "LK" },
      language: 'en',
      region: 'LK'
    };

    geocoderRef.current.geocode(geocodeOptions, (results: any[], status: any) => {
      console.log("Reverse geocode status:", status);
      console.log("Reverse geocode results:", results);

      if (status === "OK" && results && results.length > 0) {
        const place = results[0];
        
        // Update the input field with the formatted address
        if (inputRef.current) {
          inputRef.current.value = place.formatted_address;
        }

        // Extract address components
        let streetNumber = "";
        let route = "";
        let locality = "";
        let adminLevel1 = "";
        let postalCode = "";
        let country = "";

        if (place.address_components) {
          place.address_components.forEach((component: any) => {
            const types = component.types;
            if (types.includes("street_number")) {
              streetNumber = component.long_name;
            }
            if (types.includes("route")) {
              route = component.long_name;
            }
            if (types.includes("locality")) {
              locality = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
              adminLevel1 = component.long_name;
            }
            if (types.includes("postal_code")) {
              postalCode = component.long_name;
            }
            if (types.includes("country")) {
              country = component.long_name;
            }
          });
        }

        // Create location data for callback
        const locationData: LocationData = {
          lat: location.lat(),
          lng: location.lng(),
          address: place.formatted_address,
          city: locality,
          province: adminLevel1,
          postalCode: postalCode,
          addressComponents: {
            street_number: streetNumber,
            route: route,
            locality: locality,
            administrative_area_level_1: adminLevel1,
            postal_code: postalCode,
            country: country,
          },
        };

        console.log("✅ Reverse geocode - Calling onAddressSelect with:", locationData);

        if (onAddressSelect) {
          onAddressSelect(locationData);
        }
      } else {
        console.error("Reverse geocoding failed:", status);
      }
    });
  }, [onAddressSelect]);

  useEffect(() => {
    const initializeGoogleMaps = () => {
      console.log("Initializing Google Maps...");

      // Comprehensive API availability check
      if (typeof window === 'undefined') {
        console.error("Window object not available");
        return;
      }

      if (!window.google?.maps?.places) {
        console.error("Google Maps API not fully loaded");
        return;
      }

      try {
        // Initialize map with error handling
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 7.8731, lng: 80.7718 }, // Center of Sri Lanka
            zoom: 8,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            gestureHandling: 'greedy',
            zoomControl: true,
          });

          console.log("✅ Map initialized successfully");

          // Initialize marker
          markerRef.current = new window.google.maps.Marker({
            map: mapInstanceRef.current,
            draggable: true,
          });

          console.log("✅ Marker initialized successfully");

          // Add map click listener
          mapInstanceRef.current.addListener("click", (event: any) => {
            try {
              const location = event.latLng;
              console.log("Map clicked at:", location.lat(), location.lng());
              
              // Update marker position
              if (markerRef.current) {
                markerRef.current.setPosition(location);
              }
              
              // Reverse geocode the clicked location
              reverseGeocode(location);
            } catch (clickError) {
              console.error("Error handling map click:", clickError);
            }
          });

          // Add marker drag listener
          markerRef.current.addListener("dragend", (event: any) => {
            try {
              const location = event.latLng;
              console.log("Marker dragged to:", location.lat(), location.lng());
              
              // Reverse geocode the dragged location
              reverseGeocode(location);
            } catch (dragError) {
              console.error("Error handling marker drag:", dragError);
            }
          });

          console.log("✅ Map and marker event listeners added successfully");
        }

        // Initialize autocomplete
        if (inputRef.current && !autocompleteRef.current) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
              types: ["establishment", "geocode"],
              componentRestrictions: { country: "LK" },
              fields: [
                "place_id",
                "geometry",
                "name",
                "formatted_address",
                "address_components",
              ],
            }
          );

          // Add place changed listener
          autocompleteRef.current.addListener("place_changed", () => {
            try {
              const place = autocompleteRef.current.getPlace();
              console.log("Place selected:", place);

              if (!place || !place.geometry || !place.geometry.location) {
                console.log("Invalid place selected");
                return;
              }

              // Update map and marker
              const location = place.geometry.location;
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setCenter(location);
                mapInstanceRef.current.setZoom(15);
              }
              if (markerRef.current) {
                markerRef.current.setPosition(location);
              }

              // Extract address components
              let streetNumber = "";
              let route = "";
              let locality = "";
              let adminLevel1 = "";
              let postalCode = "";
              let country = "";

              if (place.address_components) {
                place.address_components.forEach((component: any) => {
                  const types = component.types;
                  if (types.includes("street_number")) {
                    streetNumber = component.long_name;
                  }
                  if (types.includes("route")) {
                    route = component.long_name;
                  }
                  if (types.includes("locality")) {
                    locality = component.long_name;
                  }
                  if (types.includes("administrative_area_level_1")) {
                    adminLevel1 = component.long_name;
                  }
                  if (types.includes("postal_code")) {
                    postalCode = component.long_name;
                  }
                  if (types.includes("country")) {
                    country = component.long_name;
                  }
                });
              }

              // Create location data for callback
              const locationData: LocationData = {
                lat: location.lat(),
                lng: location.lng(),
                address: place.formatted_address || `${streetNumber} ${route}`.trim(),
                city: locality,
                province: adminLevel1,
                postalCode: postalCode,
                addressComponents: {
                  street_number: streetNumber,
                  route: route,
                  locality: locality,
                  administrative_area_level_1: adminLevel1,
                  postal_code: postalCode,
                  country: country,
                },
              };

              console.log("✅ Autocomplete - Calling onAddressSelect with:", locationData);

              if (onAddressSelect) {
                onAddressSelect(locationData);
              }
            } catch (placeError) {
              console.error("Error handling place selection:", placeError);
            }
          });

          console.log("✅ Autocomplete initialized successfully");
        }
      } catch (error) {
        console.error("Error during Google Maps initialization:", error);
      }
    };

    const loadGoogleMapsScript = () => {
      if (window.google?.maps?.places) {
        initializeGoogleMaps();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleMaps;
      script.onerror = (error) => {
        console.error("Failed to load Google Maps API:", error);
      };
      document.head.appendChild(script);
    };

    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(loadGoogleMapsScript, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      
      if (autocompleteRef.current && window.google?.maps?.event) {
        try {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        } catch (error) {
          console.error("Error cleaning up autocomplete listeners:", error);
        }
      }
      
      if (mapInstanceRef.current && window.google?.maps?.event) {
        try {
          window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        } catch (error) {
          console.error("Error cleaning up map listeners:", error);
        }
      }
      
      if (markerRef.current && window.google?.maps?.event) {
        try {
          window.google.maps.event.clearInstanceListeners(markerRef.current);
        } catch (error) {
          console.error("Error cleaning up marker listeners:", error);
        }
      }
    };
  }, [apiKey, onAddressSelect, reverseGeocode]);

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
            Search and select your store address on the map
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          placeholder="Search for your store address in Sri Lanka..."
          variant="outlined"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <LocationIcon sx={{ mr: 1, color: "action.active" }} />
            ),
          }}
        />

        {/* Map Container */}
        <Box
          ref={mapRef}
          sx={{
            height: 400,
            width: "100%",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
        />

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "text.secondary",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Search in the address field above OR click anywhere on the map to select your location. 
          You can also drag the marker to fine-tune your position.
        </Typography>
      </Box>
    </Paper>
  );
};

export default GoogleMapAddressPicker;

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

interface GoogleMapAddressPickerProps {
  onAddressSelect?: (location: LocationData) => void;
  apiKey: string;
  label?: string;
}

const GoogleMapAddressPicker: React.FC<GoogleMapAddressPickerProps> = ({
  onAddressSelect,
  apiKey,
  label = "Select Store Location in Sri Lanka",
}) => {
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);

  // Reverse geocode function to get address from coordinates
  const reverseGeocode = useCallback((location: any) => {
    if (!geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }

    // Use multiple reverse geocoding strategies for better results
    const geocodeOptions = [
      { 
        location: location,
        language: 'en',
        region: 'LK'
      },
      { 
        location: location,
        componentRestrictions: { country: "LK" }
      }
    ];

    // Try the first geocoding option
    geocoderRef.current.geocode(geocodeOptions[0], (results: any[], status: any) => {
      console.log("Reverse geocode status:", status);
      console.log("Reverse geocode results:", results);

      if (status === "OK" && results && results.length > 0) {
        // Try to find the most detailed result
        let bestResult = results[0];
        
        // Look for a result with more address components
        for (const result of results) {
          if (result.address_components && result.address_components.length > bestResult.address_components?.length) {
            bestResult = result;
          }
        }

        console.log("Selected best result:", bestResult);
        
        // Update the input field with the formatted address
        if (inputRef.current) {
          inputRef.current.value = bestResult.formatted_address;
        }

        // Extract address components with more detailed parsing
        let streetNumber = "";
        let route = "";
        let locality = "";
        let sublocality = "";
        let adminLevel1 = "";
        let adminLevel2 = "";
        let postalCode = "";
        let country = "";

        if (bestResult.address_components) {
          bestResult.address_components.forEach((component: any) => {
            const types = component.types;
            
            // More comprehensive address component extraction
            if (types.includes("street_number")) {
              streetNumber = component.long_name;
            }
            if (types.includes("route")) {
              route = component.long_name;
            }
            if (types.includes("locality")) {
              locality = component.long_name;
            }
            if (types.includes("sublocality") || types.includes("sublocality_level_1")) {
              sublocality = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
              adminLevel1 = component.long_name;
            }
            if (types.includes("administrative_area_level_2")) {
              adminLevel2 = component.long_name;
            }
            if (types.includes("postal_code")) {
              postalCode = component.long_name;
            }
            if (types.includes("country")) {
              country = component.long_name;
            }
          });
        }

        // Fallback: if we don't have good locality data, use sublocality or admin level 2
        const cityName = locality || sublocality || adminLevel2 || "";
        const provinceName = adminLevel1 || "";

        // Create a more detailed address if components are available
        let detailedAddress = bestResult.formatted_address;
        if (streetNumber && route && !detailedAddress.includes(streetNumber)) {
          detailedAddress = `${streetNumber} ${route}, ${locality || sublocality || adminLevel2 || ''}, ${adminLevel1 || 'Sri Lanka'}`.replace(/, ,/g, ',').replace(/^, |, $/g, '');
        }

        // Create location data for callback
        const locationData: LocationData = {
          lat: location.lat(),
          lng: location.lng(),
          address: detailedAddress,
          city: cityName,
          province: provinceName,
          postalCode: postalCode,
          addressComponents: {
            street_number: streetNumber,
            route: route,
            locality: locality || sublocality,
            administrative_area_level_1: adminLevel1,
            administrative_area_level_2: adminLevel2,
            postal_code: postalCode,
            country: country,
          },
        };

        console.log("✅ Reverse geocode - Calling onAddressSelect with:", locationData);

        if (onAddressSelect) {
          onAddressSelect(locationData);
        }
      } else {
        console.error("Reverse geocoding failed:", status);
        
        // Try the fallback method if the first one fails
        geocoderRef.current.geocode(geocodeOptions[1], (fallbackResults: any[], fallbackStatus: any) => {
          if (fallbackStatus === "OK" && fallbackResults && fallbackResults.length > 0) {
            console.log("Fallback geocoding succeeded:", fallbackResults[0]);
            
            const fallbackResult = fallbackResults[0];
            if (inputRef.current) {
              inputRef.current.value = fallbackResult.formatted_address;
            }
            
            // Create basic location data from fallback
            const locationData: LocationData = {
              lat: location.lat(),
              lng: location.lng(),
              address: fallbackResult.formatted_address,
              city: "",
              province: "Sri Lanka",
              postalCode: "",
            };
            
            if (onAddressSelect) {
              onAddressSelect(locationData);
            }
          } else {
            // If both methods fail, create a basic coordinate-based address
            const coordinateAddress = `Location: ${location.lat().toFixed(6)}, ${location.lng().toFixed(6)}, Sri Lanka`;
            
            if (inputRef.current) {
              inputRef.current.value = coordinateAddress;
            }
            
            const locationData: LocationData = {
              lat: location.lat(),
              lng: location.lng(),
              address: coordinateAddress,
              city: "",
              province: "Sri Lanka",
              postalCode: "",
            };
            
            if (onAddressSelect) {
              onAddressSelect(locationData);
            }
          }
        });
      }
    });
  }, [onAddressSelect]);

  useEffect(() => {
    const initializeGoogleMaps = () => {
      console.log("Initializing Google Maps...");

      // More thorough API availability check
      if (typeof window === 'undefined') {
        console.error("Window object not available");
        return;
      }

      if (!window.google) {
        console.error("Google Maps API not loaded - window.google is undefined");
        return;
      }

      if (!window.google.maps) {
        console.error("Google Maps API not loaded - google.maps is undefined");
        return;
      }

      if (!window.google.maps.places) {
        console.error("Google Places API not loaded - google.maps.places is undefined");
        return;
      }

      if (!window.google.maps.Map) {
        console.error("Google Maps Map constructor not available");
        return;
      }

      if (!window.google.maps.Marker) {
        console.error("Google Maps Marker constructor not available");
        return;
      }

      try {
        // Initialize map with error handling
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 7.8731, lng: 80.7718 }, // Center of Sri Lanka
            zoom: 8,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            // Additional options for better geocoding
            gestureHandling: 'greedy',
            zoomControl: true,
          } as any);

          console.log("✅ Map initialized successfully");

          // Initialize marker with error handling
          markerRef.current = new window.google.maps.Marker({
            map: mapInstanceRef.current,
            draggable: true,
          });

          console.log("✅ Marker initialized successfully");

          // Add map click listener with error handling
          try {
            mapInstanceRef.current.addListener("click", (event: any) => {
              const location = event.latLng;
              console.log("Map clicked at:", location.lat(), location.lng());
              
              // Update marker position
              if (markerRef.current) {
                markerRef.current.setPosition(location);
              }
              
              // Reverse geocode the clicked location
              reverseGeocode(location);
            });

            console.log("✅ Map click listener added successfully");
          } catch (clickError) {
            console.error("Error adding map click listener:", clickError);
          }

          // Add marker drag listener with error handling
          try {
            markerRef.current.addListener("dragend", (event: any) => {
              const location = event.latLng;
              console.log("Marker dragged to:", location.lat(), location.lng());
              
              // Reverse geocode the dragged location
              reverseGeocode(location);
            });

            console.log("✅ Marker drag listener added successfully");
          } catch (dragError) {
            console.error("Error adding marker drag listener:", dragError);
          }
        }
      } catch (mapError) {
        console.error("Error initializing Google Maps:", mapError);
        return;
      }

      try {
        // Initialize autocomplete with error handling
        if (inputRef.current && !autocompleteRef.current) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
              types: ["establishment", "geocode"],
              componentRestrictions: { country: "LK" }, // Restrict to Sri Lanka
              fields: [
                "place_id",
                "geometry",
                "name",
                "formatted_address",
                "address_components",
              ],
            } as any
          );

          console.log("✅ Autocomplete initialized successfully");

          // Add place changed listener with error handling
          try {
            autocompleteRef.current.addListener("place_changed", () => {
              const place = autocompleteRef.current.getPlace();
              console.log("Place selected:", place);

              if (!place || !place.geometry || !place.geometry.location) {
                console.log("Invalid place selected");
                return;
              }

              // Update map and marker
              const location = place.geometry.location;
              if (mapInstanceRef.current) {
                mapInstanceRef.current.setCenter(location);
                mapInstanceRef.current.setZoom(15);
              }
              if (markerRef.current) {
                markerRef.current.setPosition(location);
              }
          reverseGeocode(location);
        });

        // Add marker drag listener
        markerRef.current.addListener("dragend", (event: any) => {
          const location = event.latLng;
          console.log("Marker dragged to:", location.lat(), location.lng());
          
          // Reverse geocode the dragged location
          reverseGeocode(location);
        });
      }

      // Initialize autocomplete
      if (inputRef.current && !autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["establishment", "geocode", "address"],
            componentRestrictions: { country: "LK" }, // Restrict to Sri Lanka
            fields: [
              "place_id",
              "geometry",
              "name",
              "formatted_address",
              "address_components",
              "types",
            ],
          } as any
        );

        // Add place changed listener
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          console.log("Place selected:", place);

          if (!place || !place.geometry || !place.geometry.location) {
            console.log("Invalid place selected");
            return;
          }

          // Update map and marker
          const location = place.geometry.location;
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(location);
            mapInstanceRef.current.setZoom(15);
          }
          if (markerRef.current) {
            markerRef.current.setPosition(location);
          }

          // Extract address components with improved parsing
          let streetNumber = "";
          let route = "";
          let locality = "";
          let sublocality = "";
          let adminLevel1 = "";
          let adminLevel2 = "";
          let postalCode = "";
          let country = "";

          if (place.address_components) {
            place.address_components.forEach((component: any) => {
              const types = component.types;
              
              // More comprehensive address component extraction
              if (types.includes("street_number")) {
                streetNumber = component.long_name;
              }
              if (types.includes("route")) {
                route = component.long_name;
              }
              if (types.includes("locality")) {
                locality = component.long_name;
              }
              if (types.includes("sublocality") || types.includes("sublocality_level_1")) {
                sublocality = component.long_name;
              }
              if (types.includes("administrative_area_level_1")) {
                adminLevel1 = component.long_name;
              }
              if (types.includes("administrative_area_level_2")) {
                adminLevel2 = component.long_name;
              }
              if (types.includes("postal_code")) {
                postalCode = component.long_name;
              }
              if (types.includes("country")) {
                country = component.long_name;
              }
            });
          }

          // Use the best available city name
          const cityName = locality || sublocality || adminLevel2 || "";
          const provinceName = adminLevel1 || "";

          // Create location data for callback
          const locationData: LocationData = {
            lat: location.lat(),
            lng: location.lng(),
            address:
              place.formatted_address || `${streetNumber} ${route}`.trim(),
            city: cityName,
            province: provinceName,
            postalCode: postalCode,
            addressComponents: {
              street_number: streetNumber,
              route: route,
              locality: locality || sublocality,
              administrative_area_level_1: adminLevel1,
              administrative_area_level_2: adminLevel2,
              postal_code: postalCode,
              country: country,
            },
          };

          console.log("✅ Calling onAddressSelect with:", locationData);

          if (onAddressSelect) {
            onAddressSelect(locationData);
          }
        });

        console.log("✅ Autocomplete initialized successfully");
      }
    };

    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        initializeGoogleMaps();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleMaps;
      script.onerror = () => console.error("Failed to load Google Maps API");
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

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
  }, [apiKey, onAddressSelect, reverseGeocode]);

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
            Search and select your store address on the map
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          placeholder="Search for your store address in Sri Lanka..."
          variant="outlined"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <LocationIcon sx={{ mr: 1, color: "action.active" }} />
            ),
          }}
        />

        {/* Map Container */}
        <Box
          ref={mapRef}
          sx={{
            height: 400,
            width: "100%",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
        />

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "text.secondary",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          🔍 Search for an address in the field above OR click/tap anywhere on the map to select your location. 
          You can also drag the red marker to fine-tune your position. The address will be automatically detected and filled.
        </Typography>
      </Box>
    </Paper>
  );
};

export default GoogleMapAddressPicker;
