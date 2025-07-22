# Google Maps Integration Setup Guide

## Overview
The RegisterAquarium form now includes Google Maps integration that allows users to:
- Search for their store location
- Click on the map to select location
- Drag markers to adjust position
- Auto-populate address fields
- Get current GPS location

**Important**: The components now use the recommended `loading=async` parameter for optimal performance, following Google Maps JavaScript API best practices. A centralized loader prevents duplicate script loading and "gmp-internal-google-attribution" errors.

## Setup Instructions

### 1. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create an API key in "Credentials"
5. Restrict the API key to your domain for security

### 2. Configure the API Key
Replace the placeholder API key in `RegisterAquarium.tsx`:

```typescript
const GOOGLE_MAPS_API_KEY = "YOUR_ACTUAL_API_KEY_HERE";
```

### 3. Environment Variable (Optional)
Create a `.env` file in the project root:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Then update the code to use:
```typescript
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
```

### 4. Features Included

#### Location Picker Component
- **Interactive Map**: Click anywhere to set location
- **Search Functionality**: Search for addresses
- **Current Location**: GPS location detection
- **Drag & Drop**: Drag marker to adjust position
- **Address Parsing**: Extracts city, province, postal code
- **Visual Feedback**: Loading states and error handling

#### Auto-Population
- Address Line 1: Full formatted address from Google
- Province: Auto-filled from selected location
- Postal Code: Auto-filled from selected location

### 5. Customization Options

#### Default Location
Currently set to Sri Lanka center (7.8731, 80.7718). You can change this in the LocationPicker component:

```typescript
defaultLocation={{ lat: YOUR_LAT, lng: YOUR_LNG }}
```

#### Country Restrictions
The autocomplete is restricted to Sri Lanka. To change this, update:

```typescript
componentRestrictions: { country: 'your_country_code' }
```

#### Accepted File Types
The location picker restricts searches to establishments and geocoded addresses. You can modify the `types` array in the AutocompleteOptions.

### 6. Error Handling
- API loading failures
- Network connectivity issues
- Geolocation permission denied
- Invalid locations
- Geocoding failures

### 7. Testing
1. Load the registration form
2. Navigate to the location picker
3. Try different interactions:
   - Click on map
   - Search for locations
   - Use current location button
   - Drag the marker

### 8. Production Considerations
- Set up proper API key restrictions
- Monitor API usage and billing
- Implement proper error logging
- Consider caching geocoding results
- Add loading indicators for better UX

### 9. API Limits
- Google Maps has usage limits and billing
- Free tier includes limited requests
- Monitor usage in Google Cloud Console
- Consider implementing client-side caching

## Troubleshooting

### Common Issues:
1. **API Key Error**: Ensure API key is valid and has required permissions
2. **Loading Issues**: Check network connectivity and CORS settings
3. **Permission Denied**: User may have blocked location access
4. **Search Not Working**: Verify Places API is enabled

### Browser Console:
Check for errors related to:
- Google Maps script loading
- API authentication
- Network requests
- Permission prompts
