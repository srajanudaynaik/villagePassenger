import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FindingDrivers.css";

export default function FindingDrivers() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/driver-list"), 20000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="finding-drivers-container">
      <div className="center-box">
        {/* spinning car */}
        <div className="car-spinner"></div>

        {/* main text */}
        <p className="finding-text">Looking for your Auto driver</p>

        {/* pulsing dot */}
        <div className="pulse-dot"></div>

        {/* extra hint */}
        <p className="trip-hint">Trip Details • Flat 50% OFF on next 3 rides</p>
      </div>
    </div>
  );
}