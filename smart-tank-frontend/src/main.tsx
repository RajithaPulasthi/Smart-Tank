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
import FishDetailsPage from "./pages/FishDetailsPage/FishDetailsPage";
import RegisterAquarium from "./pages/RegisterAquarium/RegisterAquarium";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aquariums" element={<Aquariums />} />
        <Route path="/find-fish" element={<FindFish />} />
        <Route path="/water-condition" element={<WaterCondition />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/aquarium/:id" element={<AquariumSinglePage />} />
        <Route path="/fish/:id" element={<FishDetailsPage />} />
        <Route path="/RegisterAquarium" element={<RegisterAquarium />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
