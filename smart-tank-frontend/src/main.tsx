import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Aquariums from "./pages/Aquariums/Aquariums";
import FindFish from "./pages/FindFish/FindFish";
import WaterCondition from "./pages/WaterCondition/WaterCondition";
import ContactUs from "./pages/ContactUs/ContactUs";
import AquariumSinglePage from "./pages/AquariumSinglePage/AquariumSinglePage";
// import TestAquariumPage from "./pages/AquariumSinglePage/TestAquariumPage";
import FishDetailsPage from "./pages/FishDetailsPage/FishDetailsPage";
import RegisterAquarium from "./pages/RegisterAquarium/RegisterAquarium";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import SmartSensor from "./pages/SmartSensor/SmartSensor";
import OrderSensor from "./pages/OrderSensor/OrderSensor";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import TanksPage from "./pages/Tanks/Tanks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aquariums" element={<Aquariums />} />
        <Route path="/find-fish" element={<FindFish />} />
        <Route path="/water-condition" element={<WaterCondition />} />
        <Route path="/smart-sensor" element={<SmartSensor />} />
        <Route path="/order-sensor" element={<OrderSensor />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aquarium/:id" element={<AquariumSinglePage />} />
        <Route path="/fish/:id" element={<FishDetailsPage />} />
        <Route path="/RegisterAquarium" element={<RegisterAquarium />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tanks" element={<TanksPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
