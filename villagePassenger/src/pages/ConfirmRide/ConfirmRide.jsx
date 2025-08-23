import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ConfirmRide.css";

const mockNearby = [
  { id: 1, name: "Koramangala", address: "Bengaluru, Karnataka, India" },
  { id: 2, name: "Domlur", address: "Bengaluru, Karnataka, India" },
  { id: 3, name: "HSR Layout", address: "Bengaluru, Karnataka, India" },
];

export default function ConfirmPickup() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(mockNearby[0]);

  return (
    <div className="confirm-pickup-container">
      {/* Header */}
      <header className="cp-header">
        <button className="cp-back" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className="cp-title">Check your pickup point</h1>
      </header>

      {/* Map (same structure) */}
      <section className="cp-map-wrapper">
        <MapContainer
          center={[12.9352, 77.6245]}
          zoom={15}
          className="cp-map"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[12.9352, 77.6245]} />
        </MapContainer>
      </section>

      {/* Nearby list */}
      <section className="cp-nearby">
        <h2>Select a nearby point for easier pickup</h2>
        {mockNearby.map((p) => (
          <div
            key={p.id}
            className={`cp-item ${selected.id === p.id ? "active" : ""}`}
            onClick={() => setSelected(p)}
          >
            <strong>{p.name}</strong>
            <span>{p.address}</span>
          </div>
        ))}
      </section>

      {/* Confirm button */}
      <footer className="cp-footer">
        <button className="cp-confirm" onClick={() => navigate("/track-ride")}>
          Confirm Pickup
        </button>
      </footer>
    </div>
  );
}