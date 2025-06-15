// src/WelcomePage/WelcomeLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Home/NavBar/NavBar";
import "./WelcomePage.css"; 

const WelcomeLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default WelcomeLayout;