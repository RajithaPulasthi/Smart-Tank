import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  Chip,
} from "@mui/material";
import { useState } from "react";

interface ApiDiagnosticsProps {
  apiKey: string;
}

const ApiDiagnostics = ({ apiKey }: ApiDiagnosticsProps) => {
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [testing, setTesting] = useState(false);

  type TestResults = {
    keyFormat: boolean | "";
    keyPresent: boolean;
    keyValue: string;
    windowGoogle: boolean;
    mapsApi: boolean;
    placesApi: boolean;
    autocompleteApi: boolean;
    geocoding?: {
      status: string;
      error?: string;
      working: boolean;
    };
  };

  // Define a type for window with google property
  type WindowWithGoogle = Window & {
    google?: {
      maps?: {
        places?: unknown;
      };
    };
  };

  const testApiKey = async () => {
    setTesting(true);
    const win = window as WindowWithGoogle;

    const results: TestResults = {
      keyFormat: apiKey && apiKey.startsWith("AIza") && apiKey.length > 30,
      keyPresent: !!apiKey,
      keyValue: apiKey ? `${apiKey.substring(0, 10)}...` : "Not provided",
      windowGoogle: !!win.google,
      mapsApi: !!win.google?.maps,
      placesApi: !!win.google?.maps?.places,
      autocompleteApi: !!win.google?.maps?.places?.Autocomplete,
    };

    // Test a simple geocoding request
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=Colombo,Sri Lanka&key=${apiKey}`
      );
      const data = await response.json();
      results.geocoding = {
        status: data.status,
        error: data.error_message,
        working: data.status === "OK",
      };
    } catch {
      results.geocoding = {
        status: "NETWORK_ERROR",
        error: "Network request failed",
        working: false,
      };
    }

    setTestResults(results);
    setTesting(false);
  };

  return (
    <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          🔍 Google Maps API Diagnostics
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            onClick={testApiKey}
            disabled={testing}
            size="small"
          >
            {testing ? "Testing..." : "Run Diagnostics"}
          </Button>
        </Box>

        {testResults && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              Google Maps API Status:
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: "120px" }}>
                API Key:
              </Typography>
              <Chip
                label={
                  testResults.keyPresent ? testResults.keyValue : "Missing"
                }
                color={testResults.keyFormat ? "success" : "error"}
                size="small"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: "120px" }}>
                Google Object:
              </Typography>
              <Chip
                label={testResults.windowGoogle ? "Available" : "Missing"}
                color={testResults.windowGoogle ? "success" : "error"}
                size="small"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: "120px" }}>
                Maps API:
              </Typography>
              <Chip
                label={testResults.mapsApi ? "Loaded" : "Not Loaded"}
                color={testResults.mapsApi ? "success" : "error"}
                size="small"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: "120px" }}>
                Places API:
              </Typography>
              <Chip
                label={testResults.placesApi ? "Available" : "Missing"}
                color={testResults.placesApi ? "success" : "error"}
                size="small"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: "120px" }}>
                Autocomplete:
              </Typography>
              <Chip
                label={testResults.autocompleteApi ? "Available" : "Missing"}
                color={testResults.autocompleteApi ? "success" : "error"}
                size="small"
              />
            </Box>

            {testResults.geocoding && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: "120px" }}>
                  Geocoding:
                </Typography>
                <Chip
                  label={testResults.geocoding.status}
                  color={testResults.geocoding.working ? "success" : "error"}
                  size="small"
                />
              </Box>
            )}
          </Box>
        )}

        {testResults?.geocoding?.error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>API Error:</strong> {testResults.geocoding.error}
            </Typography>
          </Alert>
        )}

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Common Issues:</strong>
            <br />
            • API key not enabled for Maps JavaScript API, Places API, or
            Geocoding API
            <br />
            • Billing not set up in Google Cloud Console
            <br />
            • Domain restrictions preventing localhost access
            <br />
            • API quotas exceeded
            <br />
            • Network connectivity issues
            <br />• <strong>Fields not properly defined:</strong> Use{" "}
            <code>setFields()</code> method instead of options
            <br />
            <strong>Quick Fix:</strong> Add <code>loading=async</code> to script
            URL for optimal performance
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ApiDiagnostics;
