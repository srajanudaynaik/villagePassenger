import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

// -------------------------------------------------
//  Leaflet CSS must be present BEFORE first render.
//  CRA / Vite / Webpack projects:
//    import "leaflet/dist/leaflet.css";
// -------------------------------------------------
import "leaflet/dist/leaflet.css";
import "./DriverDetails.css";

const DRIVER_PHONE = "+919876543210";
const driverStart  = [12.9252, 77.6345];
const pickupPoint  = [12.9716, 77.5946];

const routeCoords = [
  driverStart,
  [12.927, 77.632],
  [12.93, 77.63],
  [12.932, 77.628],
  [12.934, 77.626],
  [12.936, 77.624],
  [12.938, 77.622],
  [12.94, 77.62],
  [12.942, 77.618],
  [12.944, 77.616],
  [12.946, 77.614],
  [12.948, 77.612],
  [12.95, 77.61],
  [12.96, 77.604],
  pickupPoint,
];

const dummyTrip = {
  route: "MG Road → Airport",
  distance: "34 km",
  eta: "42 min",
  fare: "₹ 347",
};

const interpolate = (t) => {
  const len = routeCoords.length - 1;
  const idx = t * len;
  const i = Math.floor(idx);
  const local = idx - i;
  const [lat1, lng1] = routeCoords[i];
  const [lat2, lng2] = routeCoords[i + 1] || routeCoords[i];
  return [lat1 + local * (lat2 - lat1), lng1 + local * (lng2 - lng1)];
};

export default function DriverDetails() {
  const mapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  /* 15-second driver → pickup animation */
  useEffect(() => {
    let frame = 0;
    const total = 1500; // 150 * 100 ms = 15 s
    const timer = setInterval(() => {
      frame += 1;
      setProgress(frame / total);
      if (frame >= total) navigate("/Track-ride");
    }, 100);
    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    if (!mapRef.current) return;
    const bounds = L.latLngBounds(routeCoords);
    mapRef.current.fitBounds(bounds, { padding: [20, 20] });
  }, []);

  const driverPos = interpolate(progress);
  const openPhone = () => window.open(`tel:${DRIVER_PHONE}`);

  return (
    <div className="driverdetails__page">
      {/* ---------- Map container ---------- */}
      <MapContainer
        ref={mapRef}
        bounds={routeCoords}
        className="driverdetails__map"
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Pick-up marker */}
        <Marker
          position={pickupPoint}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconRetinaUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            shadowUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
        />

        {/* Animated driver marker */}
        <Marker
          position={driverPos}
          icon={L.divIcon({
            className: "driverdetails__car-icon",
            html: "🚗",
            iconSize: [28, 28],
          })}
        />

        {/* Route line */}
        <Polyline positions={routeCoords} color="#007AFF" weight={4} />
      </MapContainer>

      {/* ---------- Bottom card / drawer ---------- */}
      <div className="driverdetails__bottom">
        {drawerOpen ? (
          <div className="driverdetails__drawer">
            <h3>Trip Details</h3>
            <div className="driverdetails__detailRow">
              <span className="driverdetails__label">Route:</span>
              <span className="driverdetails__value">{dummyTrip.route}</span>
            </div>
            <div className="driverdetails__detailRow">
              <span className="driverdetails__label">Distance:</span>
              <span className="driverdetails__value">{dummyTrip.distance}</span>
            </div>
            <div className="driverdetails__detailRow">
              <span className="driverdetails__label">ETA:</span>
              <span className="driverdetails__value">{dummyTrip.eta}</span>
            </div>
            <div className="driverdetails__detailRow">
              <span className="driverdetails__label">Fare:</span>
              <span className="driverdetails__value">{dummyTrip.fare}</span>
            </div>
            <button
              className="driverdetails__closeBtn"
              onClick={() => setDrawerOpen(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="driverdetails__card">
            <div className="driverdetails__banner">
              <span>Captain on the way</span>
              <span className="driverdetails__eta">5 min</span>
            </div>

            <p>
              Start your ride with PIN <strong>1234</strong>
            </p>

            <div className="driverdetails__driver">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="driver"
                className="driverdetails__avatar"
              />
              <div>
                <strong>Mangal Singh</strong>
                <br />
                UP32PS5425 • Hero <br />
                <span className="driverdetails__stars">★★★★★ 4.8</span>
              </div>

              <div className="driverdetails__icons">
                <button onClick={openPhone}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/483/483947.png"
                    alt="call"
                  />
                </button>
                <button>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/17866/17866398.png"
                    alt="msg"
                  />
                </button>
              </div>
            </div>

            <p>Pickup from: MG Road, Bangalore</p>

            <button
              className="driverdetails__tripbtn"
              onClick={() => setDrawerOpen(true)}
            >
              Trip Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}