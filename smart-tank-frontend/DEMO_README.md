# Smart Tank Frontend - Demo Version

This is the demo version of the Smart Tank Frontend application with all API connections replaced by dummy data for hosting purposes.

## 🌟 Demo Features

- **No Backend Required**: All data is simulated with realistic dummy data
- **Complete Functionality**: All features work without real API connections
- **Instant Response**: No network delays except simulated ones for realism
- **Ready to Deploy**: Can be hosted on any static hosting service

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🔑 Demo Credentials

Use these credentials to test the login functionality:

- **Username**: `johnsmith` / **Password**: `demo123`
- **Username**: `sarahjohnson` / **Password**: `demo123`
- **Username**: `mikedavis` / **Password**: `demo123`
- **Username**: `demo` / **Password**: `demo`

## 📱 Demo Data Included

### User Profiles
- 3 sample users with complete profiles
- Authentication simulation with JWT-like tokens

### Aquarium Data
- 4 sample aquariums with different configurations
- Water condition monitoring data
- Location information with coordinates

### Fish Database
- Comprehensive fish profiles with care parameters
- Compatibility checking
- Fish prediction AI simulation

### Device Management
- IoT sensor simulation
- Real-time water monitoring (simulated)
- Device assignment and management

### Order History
- Sample purchase history
- Payment processing simulation
- Order status tracking

## 🛠️ Technology Stack

- **React** 19.1.0 - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Material-UI** - Modern component library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing

## 🎯 Key Pages

- **Home** (`/`) - Landing page with navigation
- **Aquariums** (`/aquariums`) - View and manage aquariums
- **Find Fish** (`/find-fish`) - Fish database and compatibility
- **Water Condition** (`/water-condition`) - Sensor readings
- **Smart Sensor** (`/smart-sensor`) - Device management
- **Profile** (`/profile`) - User account management
- **Sign In/Up** - Authentication (use demo credentials)

## 🔧 Demo Implementation Details

### Services Replaced
- ✅ `authService.ts` - User authentication with dummy users
- ✅ `aquariumService.ts` - Aquarium management (already using dummy data)
- ✅ `deviceService.ts` - IoT device simulation
- ✅ `fishService.ts` - Fish database management
- ✅ `tankService.ts` - Tank management
- ✅ `predictionService.ts` - Fish prediction AI (already using dummy data)

### Pages with API Calls Fixed
- ✅ `RegisterAquarium.tsx` - Registration simulation
- ✅ `OrderSensor.tsx` - Payment processing simulation
- ✅ `OrderHistory.tsx` - Order history with dummy data

### Dummy Data Files Created
- ✅ `dummyAuth.ts` - User authentication data
- ✅ `dummyFishPredictions.ts` - AI fish prediction responses
- ✅ Existing dummy files enhanced for realism

## 🌐 Deployment Ready

This demo version can be deployed to:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repo
- **GitHub Pages**: Enable Pages in repository settings
- **Firebase Hosting**: Use `firebase deploy`
- **Any Static Hosting Service**

## 🎮 Testing the Demo

1. **Start the Application**
   ```bash
   npm run dev
   ```

2. **Test Authentication**
   - Go to `/signin`
   - Use any of the demo credentials
   - Explore authenticated features

3. **Test Features**
   - Register a new aquarium (simulation)
   - View fish profiles and compatibility
   - Check water conditions
   - Place sensor orders (simulation)
   - View order history

4. **Test Responsiveness**
   - Resize browser window
   - Test on mobile devices
   - All Material-UI components are responsive

## 📝 Notes

- All API calls have been replaced with simulated delays
- Data is not persisted between sessions
- Perfect for demonstrations and testing
- No external dependencies required
- Ready for production deployment

## 🚧 Development

If you need to add more dummy data or modify simulations:

1. **Add Users**: Edit `src/Data/dummyAuth.ts`
2. **Add Fish**: Edit `src/Data/fish.data.ts`
3. **Add Devices**: Edit `src/Data/dummyDevices.ts`
4. **Add Aquariums**: Edit `src/Data/dummyAquariums.ts`

All services automatically use the dummy data and simulate realistic API responses.
