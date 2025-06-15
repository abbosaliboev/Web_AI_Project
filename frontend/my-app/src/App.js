// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CameraProvider } from "./context/CameraContext";
import "./assets/styles.scss";
import "./WelcomePage/WelcomePage.css";
// Layout
import MainLayout from "./layout/MainLayout";

// Dashboard Pages
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";
import Camera from "./pages/Camera";
import Summary from "./pages/Summary";
import TimelinePage from "./pages/TimelinePage";
import ReportPage from "./pages/ReportPage";
import InfoPage from "./pages/InfoPage";
import Login from "./pages/Login";

// Welcome Pages
import WelcomeHome from "./WelcomePage/Home/Home/Home";
import About from "./WelcomePage/Home/About/About";
import Pricing from "./WelcomePage/Home/Pricing/Pricing";
import Services from "./WelcomePage/Home/Services/Services";
import Contact from "./WelcomePage/Home/Contact/Contact";
import NavBar from "./WelcomePage/Home/NavBar/NavBar";

// Chart.js registratsiyasi
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // boshlanishda false
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
      <CameraProvider>
        <Routes>

          {/* === Welcome Page === */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <WelcomeHome />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* === Login Page === */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* === Dashboard Layout === */}
          <Route
            path="/dashboard"
            element={
              <MainLayout
                isAuthenticated={isAuthenticated}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="settings" element={<SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            <Route path="camera/:id" element={<Camera />} />
            <Route path="summary" element={<Summary />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="info" element={<InfoPage />} />
          </Route>

        </Routes>
      </CameraProvider>
    </Router>
  );
}

export default App;