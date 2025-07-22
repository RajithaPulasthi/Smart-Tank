# Smart Tank Frontend - Profile Page Debugging Guide

## Issue: "Failed to load user details" Error

This error occurs when the Profile page cannot fetch user details from the backend API. Here's how to debug and resolve it:

## Debugging Steps

### 1. Start the Frontend Development Server
```bash
cd "d:\Education\NIBM\HND\Final Project\smart-tank-frontend"
npm run dev
```

### 2. Open Browser Developer Tools
- Open your browser and navigate to `http://localhost:5173/profile`
- Press F12 to open Developer Tools
- Go to the "Console" tab

### 3. Check the Console Logs
The Profile component now includes extensive logging. Look for:

```
Current user from localStorage: {...}
Full localStorage contents: {...}
User object keys: [...]
User ID type: number
User ID value: 1
Testing backend connection...
```

### 4. Common Issues and Solutions

#### A. No User Found (Redirects to Sign In)
**Symptoms:** Console shows "No user found, redirecting to signin"
**Solution:** You need to sign in first
- Navigate to `/signin`
- Sign in with valid credentials
- The profile page should now work

#### B. Backend Connection Failed
**Symptoms:** Console shows "Backend connection test failed"
**Solution:** The backend server is not running
- Start your Spring Boot backend server (should run on port 8080)
- Or, the page will show mock data for development

#### C. User ID Missing
**Symptoms:** Console shows "User ID is missing or invalid"
**Solution:** The user object in localStorage is malformed
- Clear localStorage: `localStorage.clear()`
- Sign in again

#### D. Network/API Errors
**Symptoms:** Console shows specific error messages from the API
**Solution:** Check backend server logs and API endpoints

### 5. Mock Data for Development
If the backend is not available, the Profile page will automatically show mock data with a warning message. This allows you to test the UI without a running backend.

### 6. Backend API Endpoints
The Profile page expects these endpoints:
- `GET /api/Users/{userId}` - Fetch user details
- `PUT /api/Users/{userId}` - Update user details

### 7. Authentication Requirements
- User must be signed in
- User must have `ROLE_AQUARIUM_CUSTOMER` authority
- Valid JWT token must be present in localStorage

## Quick Test
1. Open browser console
2. Check localStorage: `console.log(localStorage.getItem('user'))`
3. Check if user is authenticated: `console.log(localStorage.getItem('token'))`

## Reset Everything
If all else fails:
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

Then sign in again.
