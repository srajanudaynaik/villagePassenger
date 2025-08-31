import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchLocation.css";

/* 2-km mock places */
const mockPlaces = [
  { id: "1", name: "Kumta", address: "Karnataka, India", distance: "11 km" },
  { id: "2", name: "Kumta Beach", address: "Karnataka, India", distance: "12 km" },
  { id: "3", name: "Kumta Railway Station", address: "Karnataka, India", distance: "10 km" },
  { id: "4", name: "Airport", address: "Karnataka, India", distance: "15 km" },
  { id: "5", name: "MG Road", address: "Karnataka, India", distance: "9 km" },
];

export default function SearchLocation() {
  const navigate = useNavigate();
  const [pickup] = useState("Current Location");
  const [drop, setDrop] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forMe, setForMe] = useState(true);
  const [showSheet, setShowSheet] = useState(false);

  /* ---------- MOCK SEARCH ---------- */
  useEffect(() => {
    if (!drop.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const filtered = mockPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(drop.toLowerCase()) ||
          p.address.toLowerCase().includes(drop.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  }, [drop]);

  /* ---------- HANDLERS ---------- */
  const handleSelect = (place) => {
    setDrop(place.name);
    navigate("/confirm-ride");
  };

  const openMap = () =>
    navigate("/location-map", {
      state: { pickup, stops: [], drop },
    });

  const addStop = () =>
    navigate("/location-map", {
      state: { pickup, stops: [""], drop },
    });

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
          <span>For me</span>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2985/2985150.png"
            alt="chevron"
            className="icon12"
          />
        </button>
      </header>

      {/* Location card */}
      <section className="sl-location-box">
        <div className="sl-dot-line">
          <span className="sl-dot sl-green"></span>
          <span className="sl-line"></span>
          <span className="sl-dot sl-orange"></span>
        </div>
        <div className="sl-inputs">
          <input
            type="text"
            value={pickup}
            readOnly
            className="sl-input"
            placeholder="Pickup location"
          />
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="sl-input"
            placeholder="Drop location"
          />
        </div>
      </section>

      {/* Action buttons */}
      <section className="sl-actions">
        <button className="sl-btn" onClick={openMap}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/592/592245.png"
            alt="map"
            className="icon16"
          />
          <span>Select on map</span>
        </button>
        <button className="sl-btn" onClick={addStop}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2997/2997933.png"
            alt="plus"
            className="icon16"
          />
          <span>Add stops</span>
        </button>
      </section>

      {/* Results */}
      {loading && <div className="sl-loading">Searching…</div>}
      {!loading && drop.trim() && (
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

      {/* Bottom sheet */}
      {showSheet && (
        <div className="sl-overlay" onClick={() => setShowSheet(false)}>
          <div className="sl-sheet" onClick={(e) => e.stopPropagation()}>
            <header className="sl-sheet-header">
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