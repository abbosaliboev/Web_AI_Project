// src/layout/MainLayout.jsx
import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ isAuthenticated, isDarkMode, setIsDarkMode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  // 🔁 Refresh key
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefreshMain = () => setRefreshKey((prev) => prev + 1);

  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`layout-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
      {!isLoginPage && (
        <>
          <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
            <Sidebar toggleSidebar={setSidebarOpen} setActivePage={setActivePage} />
          </div>
          {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
        </>
      )}

      <div className="main-area">
        {!isLoginPage && (
          <Navbar
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onRefreshMain={handleRefreshMain} // 🔁
            activePage={activePage}
          />
        )}
        <div className="content-scrollable">
          <Outlet context={{ refreshKey }} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;