import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./FindingDrivers.css";

// marker icon via CDN
const icon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function FindingDrivers() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false); // true after 3 s

  useEffect(() => {
    const blurLoaderTimer = setTimeout(() => setShow(true), 3000); // blur + loader
    const navTimer        = setTimeout(() => navigate("/driver-list"), 10000); // nav
    return () => {
      clearTimeout(blurLoaderTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`finding-drivers-container ${show ? "blur-map" : ""}`}>
      {/* Leaflet map */}
      <MapContainer
        center={[12.9352, 77.6245]}
        zoom={15}
        className="bg-map"
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[12.9352, 77.6245]} icon={icon} />
      </MapContainer>

      {/* loader appears only after 3 s */}
      {show && (
        <div className="center-box">
          <div className="car-spinner" />
          <p className="finding-text">Looking for your Auto driver</p>
          <div className="pulse-dot" />
          <p className="trip-hint">Trip Details • Flat 50% OFF on next 3 rides</p>
        </div>
      )}
    </div>
  );
}