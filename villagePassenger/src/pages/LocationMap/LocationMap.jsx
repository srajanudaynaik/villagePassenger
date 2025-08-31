import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./LocationMap.css";

const MAP_CENTER = [12.934533, 77.626579]; // Bengaluru-ish

// *** MOCK 2-km radius ***
const mockNearby = [
  { name: "Kumta",         lat: 12.935,  lng: 77.625,  address: "Karnataka, India" },
  { name: "Kumta Beach",   lat: 12.94,   lng: 77.62,   address: "Karnataka, India" },
  { name: "Railway Stn",   lat: 12.945,  lng: 77.615,  address: "Karnataka, India" },
  { name: "Airport",       lat: 12.955,  lng: 77.605,  address: "Karnataka, India" },
  { name: "MG Road",       lat: 12.965,  lng: 77.595,  address: "Karnataka, India" },
];

const icon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickMarker({ locations, setLocations }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const place = mockNearby.find(
        (p) =>
          Math.abs(p.lat - lat) < 0.005 && Math.abs(p.lng - lng) < 0.005
      ) || { name: "Dropped pin", lat, lng, address: "Custom" };
      // prompt which field to update
      const field = prompt(
        "Set as:\n1 Pickup\n2 Drop\n3 Stop (enter stop index)"
      );
      if (!field) return;
      if (field === "1") setLocations((l) => ({ ...l, pickup: place }));
      else if (field === "2") setLocations((l) => ({ ...l, drop: place }));
      else if (field === "3") {
        const idx = prompt("Stop index (0-based)", l.stops.length);
        if (idx === null) return;
        const stops = [...l.stops];
        stops[idx] ? (stops[idx] = place) : stops.push(place);
        setLocations((l) => ({ ...l, stops }));
      }
    },
  });
  return null;
}

export default function LocationMap() {
  const navigate = useNavigate();
  const { state } = useLocation(); // comes from SearchLocation
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState({
    pickup: state?.pickup || "Current Location",
    stops: [],
    drop: state?.drop || "",
  });

  /* add stop helper */
  const addStop = () =>
    setLocations((l) => ({ ...l, stops: [...l.stops, null] }));

  /* remove stop */
  const removeStop = (idx) =>
    setLocations((l) => ({
      ...l,
      stops: l.stops.filter((_, i) => i !== idx),
    }));

  /* filter nearby 2-km mock */
  const searchResults = mockNearby.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    // send back updated object
    navigate("/search-location", {
      state: { pickup: locations.pickup, stops: locations.stops, drop: locations.drop },
    });
  };

  return (
    <div className="locationmap__page">
      {/* Header */}
      <header className="locationmap__header">
        <button onClick={() => navigate(-1)}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
            alt="back"
            className="locationmap__back"
          />
        </button>
        <input
          className="locationmap__search"
          placeholder="Search nearby (mock 2 km)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* Map */}
      <MapContainer
        center={[12.934533, 77.626579]}
        zoom={14}
        className="locationmap__map"
        zoomControl={false}
        dragging={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {searchResults.map((p) => (
          <Marker
            key={p.name}
            position={[p.lat, p.lng]}
            icon={icon}
            eventHandlers={{
              click: () => {
                const field = prompt("Set as:\n1 Pickup\n2 Drop\n3 Stop");
                if (!field) return;
                if (field === "1") setLocations((l) => ({ ...l, pickup: p }));
                else if (field === "2") setLocations((l) => ({ ...l, drop: p }));
                else {
                  const idx = prompt("Stop index", locations.stops.length);
                  if (idx === null) return;
                  const stops = [...locations.stops];
                  stops[idx] ? (stops[idx] = p) : stops.push(p);
                  setLocations((l) => ({ ...l, stops }));
                }
              },
            }}
          />
        ))}
        <ClickMarker locations={locations} setLocations={setLocations} />
      </MapContainer>

      {/* Location cards */}
      <div className="locationmap__cards">
        <div className="locationmap__card">
          <label>Pickup</label>
          <input
            value={locations.pickup.name || locations.pickup}
            readOnly
            onClick={() => alert("Click map to change")}
          />
        </div>

        {locations.stops.map((stop, idx) => (
          <div className="locationmap__card" key={idx}>
            <label>Stop {idx + 1}</label>
            <input
              value={stop?.name || "Tap map to add"}
              readOnly
            />
            <button onClick={() => removeStop(idx)}>✖</button>
          </div>
        ))}

        <div className="locationmap__card">
          <label>Drop</label>
          <input
            value={locations.drop.name || locations.drop}
            readOnly
            onClick={() => alert("Click map to change")}
          />
        </div>

        <button className="locationmap__addstop" onClick={addStop}>
          + Add Stop
        </button>

        <button className="locationmap__save" onClick={handleSave}>
          Save Locations
        </button>
      </div>
    </div>
  );
}