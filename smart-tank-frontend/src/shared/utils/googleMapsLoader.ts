let isGoogleMapsLoading = false;
let isGoogleMapsLoaded = false;
let googleMapsPromise: Promise<void> | null = null;

// Callbacks to execute when Google Maps API is loaded
const loadCallbacks: (() => void)[] = [];

// Check if Google Maps API is already available
const isGoogleMapsAvailable = (): boolean => {
  return !!(window.google?.maps?.places?.Autocomplete);
};

// Load Google Maps API only once
export const loadGoogleMapsAPI = (apiKey: string): Promise<void> => {
  // Return existing promise if already loading
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // If already loaded, return resolved promise
  if (isGoogleMapsAvailable()) {
    isGoogleMapsLoaded = true;
    return Promise.resolve();
  }

  // Check if script already exists in DOM
  const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  if (existingScript) {
    console.log("Google Maps script already exists, waiting for load...");
    
    googleMapsPromise = new Promise<void>((resolve, reject) => {
      const checkLoaded = () => {
        if (isGoogleMapsAvailable()) {
          isGoogleMapsLoaded = true;
          isGoogleMapsLoading = false;
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      
      // Set timeout to avoid infinite waiting
      setTimeout(() => {
        if (!isGoogleMapsLoaded) {
          reject(new Error("Google Maps API failed to load within timeout"));
        }
      }, 10000);
      
      checkLoaded();
    });
    
    return googleMapsPromise;
  }

  console.log("Loading Google Maps API for the first time...");
  isGoogleMapsLoading = true;

  googleMapsPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log("Google Maps API loaded successfully");
      
      // Wait a bit to ensure API is fully initialized
      setTimeout(() => {
        if (isGoogleMapsAvailable()) {
          isGoogleMapsLoaded = true;
          isGoogleMapsLoading = false;
          
          // Execute any pending callbacks
          loadCallbacks.forEach(callback => {
            try {
              callback();
            } catch (error) {
              console.error("Error executing Google Maps load callback:", error);
            }
          });
          loadCallbacks.length = 0; // Clear callbacks
          
          resolve();
        } else {
          reject(new Error("Google Maps API loaded but not available"));
        }
      }, 100);
    };

    script.onerror = (error) => {
      console.error("Failed to load Google Maps API:", error);
      isGoogleMapsLoading = false;
      googleMapsPromise = null; // Reset so we can try again
      reject(new Error("Failed to load Google Maps API script"));
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
};

// Execute callback when Google Maps API is ready
export const onGoogleMapsReady = (callback: () => void): void => {
  if (isGoogleMapsLoaded && isGoogleMapsAvailable()) {
    // API is already loaded, execute immediately
    try {
      callback();
    } catch (error) {
      console.error("Error executing Google Maps ready callback:", error);
    }
  } else {
    // Add to queue to execute when loaded
    loadCallbacks.push(callback);
  }
};

// Get the current loading state
export const getGoogleMapsState = () => ({
  isLoading: isGoogleMapsLoading,
  isLoaded: isGoogleMapsLoaded,
  isAvailable: isGoogleMapsAvailable(),
});

// Reset state (useful for testing or error recovery)
export const resetGoogleMapsState = () => {
  isGoogleMapsLoading = false;
  isGoogleMapsLoaded = false;
  googleMapsPromise = null;
  loadCallbacks.length = 0;
};
