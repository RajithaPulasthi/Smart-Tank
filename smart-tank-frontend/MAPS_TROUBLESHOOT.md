# 🚨 Google Maps Loading Issues - Quick Fix Guide

## Current Issue
Your Google Maps is showing: **"This page can't load Google Maps correctly"**

## 🔧 Immediate Steps to Fix

### 1. Check Google Cloud Console
Go to: https://console.cloud.google.com/

**Required Actions:**
- [ ] Enable **Maps JavaScript API**
- [ ] Enable **Places API** 
- [ ] Enable **Geocoding API**
- [ ] Set up **Billing Account** (Required even for free tier)

### 2. API Key Configuration
Your API Key: `AIzaSyACtGulA-trMli7qt1FRgu16ODuqD572Po`

**Check these settings:**
- [ ] API key is not restricted to specific domains (for testing)
- [ ] All required APIs are enabled for this key
- [ ] Billing is properly set up

### 3. Quick Test Commands

Open your browser console and run:
```javascript
// Test if Google Maps API loads
fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Colombo&key=AIzaSyACtGulA-trMli7qt1FRgu16ODuqD572Po')
  .then(r => r.json())
  .then(console.log)
```

### 4. Common Error Messages & Fixes

**"RefererNotAllowedMapError"**
- Remove domain restrictions temporarily
- Add `localhost:5173` to allowed referrers

**"RequestDeniedMapError"** 
- API key missing required permissions
- Enable Maps JavaScript API

**"QuotaExceededError"**
- Check usage limits in Google Cloud Console
- Increase quotas or wait for reset

**"BillingNotEnabledMapError"**
- Set up billing in Google Cloud Console
- Even free usage requires billing setup

### 5. Temporary Workaround

If you need to test other features while fixing the API:

1. **Comment out the LocationPicker** in RegisterAquarium.tsx:
```tsx
{/* <LocationPicker
  apiKey={GOOGLE_MAPS_API_KEY}
  onLocationSelect={handleLocationSelect}
  label="Store Location"
/> */}
```

2. **Add simple text inputs instead**:
```tsx
<Card elevation={3} sx={{ mb: 4 }}>
  <CardContent>
    <Typography variant="h6" gutterBottom>Store Location</Typography>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField label="Latitude" fullWidth />
      <TextField label="Longitude" fullWidth />
    </Box>
  </CardContent>
</Card>
```

### 6. Enable Required APIs Step-by-Step

1. **Go to Google Cloud Console**
2. **Select your project**
3. **Navigate to "APIs & Services" → "Library"**
4. **Search and enable each:**
   - Maps JavaScript API
   - Places API
   - Geocoding API

### 7. Set Up Billing (Required)

1. **Go to "Billing" in Google Cloud Console**
2. **Link a payment method**
3. **Set up budget alerts**
4. **Enable billing for your project**

## 🚀 After Fixing

1. **Refresh the page**
2. **Check the diagnostic component** (added temporarily)
3. **Test the location picker features**
4. **Remove the ApiDiagnostics component** once working

## ⚡ Quick Status Check

Run the diagnostic tool I added to your form to see exactly what's failing:
1. Navigate to `/RegisterAquarium`
2. Click "Run Diagnostics" 
3. Review the status of each API component

The diagnostic will show you exactly which APIs are missing or misconfigured! 🔍
