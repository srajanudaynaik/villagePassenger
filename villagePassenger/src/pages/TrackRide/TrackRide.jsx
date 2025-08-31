import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Confetti from "react-confetti";
import "./TrackRide.css";

const routeCoords = [
  [12.934533, 77.626579],
  [12.935, 77.625],
  [12.94, 77.62],
  [12.945, 77.615],
  [12.955, 77.605],
  [12.965, 77.595],
  [12.98, 77.58],
  [13.0, 77.55],
  [13.02, 77.52],
  [13.04, 77.49],
  [13.06, 77.45],
  [13.08, 77.4],
  [13.09, 77.35],
  [13.098, 77.3],
  [13.1019, 77.1124],
];

const pickup = routeCoords[0];
const drop   = routeCoords[routeCoords.length - 1];

const interpolate = (t) => {
  const len = routeCoords.length - 1;
  const idx = t * len;
  const i = Math.floor(idx);
  const local = idx - i;
  const [lat1, lng1] = routeCoords[i];
  const [lat2, lng2] = routeCoords[i + 1] || routeCoords[i];
  return [lat1 + local * (lat2 - lat1), lng1 + local * (lng2 - lng1)];
};

export default function TrackRide() {
  const mapRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 → 1
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  /* 20-second ride */
  useEffect(() => {
    let frame = 0;
    const total = 200; // 200 * 100 ms = 20 s
    const timer = setInterval(() => {
      frame += 1;
      setProgress(frame / total);
      if (frame >= total) {
        clearInterval(timer);
        setShowConfetti(true);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  /* 10-second confetti + auto-navigate */
  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => navigate("/Rating"), 10000);
    return () => clearTimeout(t);
  }, [showConfetti, navigate]);

  /* double-tap handler */
  const lastTapRef = useRef(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      navigate("/Rating");
    }
    lastTapRef.current = now;
  };

  const carPos = interpolate(progress);

  useEffect(() => {
    if (!mapRef.current) return;
    const bounds = L.latLngBounds(routeCoords);
    mapRef.current.fitBounds(bounds, { padding: [20, 20] });
  }, []);

  return (
    <div className="trackride__page" onDoubleClick={handleDoubleTap}>
      {/* Map */}
      <MapContainer
        ref={mapRef}
        bounds={routeCoords}
        className="trackride__map"
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* pickup (green) */}
        <Marker
          position={pickup}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />

        {/* drop (red) */}
        <Marker
          position={drop}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />

        {/* animated car */}
        <Marker
          position={carPos}
          icon={L.divIcon({
            className: "trackride__car-icon",
            html: "🚗",
            iconSize: [32, 32],
          })}
        />

        <Polyline positions={routeCoords} color="#007AFF" weight={4} />
      </MapContainer>

      {/* Overlay */}
      <div className="trackride__overlay">
        <p>ETA: {Math.round((1 - progress) * 20)} s</p>
      </div>

      {/* Confetti on completion */}
      {showConfetti && (
        <div className="trackride__confetti" onDoubleClick={handleDoubleTap}>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <span style={{ fontSize: 80 }}>🎉</span>
          <h2>Ride completed!</h2>
          <p>Double-tap anywhere to rate (or wait 10 s)</p>
        </div>
      )}
    </div>
  );
}