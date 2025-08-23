import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchLocation.css";

const mockPlaces = [
  { id: "1", name: "Kumta", address: "Karnataka, India", distance: "11 km" },
  { id: "2", name: "Kumta Beach", address: "Karnataka, India", distance: "12 km" },
  { id: "3", name: "Kumta Railway Station", address: "Karnataka, India", distance: "10 km" },
];

export default function SearchLocation() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("Current Location");
  const [drop, setDrop] = useState("");
  const [stops, setStops] = useState([]);
  const [forMe, setForMe] = useState(true);
  const [showSheet, setShowSheet] = useState(false);

  const handleSelect = (place) => {
    setDrop(place.name);
    navigate("/confirm-ride");
  };

  const results = drop.trim()
    ? mockPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(drop.toLowerCase()) ||
          p.address.toLowerCase().includes(drop.toLowerCase())
      )
    : [];

  return (
    <div className="search-location-container">
      {/* Header */}
      <header className="sl-header">
        <button className="sl-back" onClick={() => navigate(-1)}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/545/545680.png"
            alt="back"
            className="icon24"
          />
        </button>
        <h1 className="sl-title">Search location</h1>
        <button className="sl-forMeBtn" onClick={() => setShowSheet(true)}>
          For me
          <img
            src="https://cdn-icons-png.flaticon.com/128/2985/2985150.png"
            alt="chevron"
            className="icon12"
          />
        </button>
      </header>

      {/* Pickup / Drop */}
      <section className="sl-location-box">
        <div className="sl-dot-line">
          <span className="sl-dot sl-green"></span>
          <div className="sl-line"></div>
          <span className="sl-dot sl-orange"></span>
        </div>
        <div className="sl-inputs">
          <input
            type="text"
            value={pickup}
            readOnly
            placeholder="Pickup location"
            className="sl-input"
          />
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            placeholder="Drop location"
            className="sl-input"
          />
        </div>
      </section>

      {/* Action buttons */}
      <section className="sl-actions">
        <button className="sl-btn" onClick={() => alert("Open map picker")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/592/592245.png"
            alt="map"
            className="icon16"
          />
          Select on map
        </button>
        <button className="sl-btn" onClick={() => alert("Add stops")}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2997/2997933.png"
            alt="add"
            className="icon16"
          />
          Add stops
        </button>
      </section>

      {/* Stops list */}
      {stops.length > 0 && (
        <ul className="sl-stops">
          {stops.map((s, i) => (
            <li key={i}>Stop {i + 1}: {s}</li>
          ))}
        </ul>
      )}

      {/* Results */}
      {drop.trim() && (
        <ul className="sl-results">
          {results.map((p) => (
            <li key={p.id} onClick={() => handleSelect(p)}>
              <strong>{p.name}</strong>
              <span>{p.address}</span>
              <span className="sl-distance">{p.distance}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Bottom sheet mimic */}
      {showSheet && (
        <div className="sl-overlay" onClick={() => setShowSheet(false)}>
          <div className="sl-sheet" onClick={(e) => e.stopPropagation()}>
            <header>
              <button onClick={() => setShowSheet(false)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/545/545680.png"
                  alt="back"
                  className="icon24"
                />
              </button>
              <span>Booking ride for</span>
            </header>

            <button
              className={`sl-sheet-btn ${forMe ? "active" : ""}`}
              onClick={() => setForMe(true)}
            >
              Myself
            </button>

            <button
              className={`sl-sheet-btn ${!forMe ? "active" : ""}`}
              onClick={() => setForMe(false)}
            >
              Add new rider
            </button>

            <p className="sl-info">
              Contact name won’t be shared with captain
            </p>

            <button className="sl-done" onClick={() => setShowSheet(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}