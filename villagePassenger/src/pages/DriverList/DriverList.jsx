import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import drivers from "../../data/drivers.json";
import "./DriverList.css";

const defaultMsgs = [
  "Hi, where are you?",
  "I am at the pickup point.",
  "ETA?",
  "Please hurry up.",
  "Thank you!",
  "See you soon.",
];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push("★");
    else if (i === full && half) stars.push("★");
    else stars.push("☆");
  }
  return (
    <span className="driverlist__stars">
      {stars.map((s, idx) => (
        <span key={idx} className={s === "★" ? "driverlist__filled" : ""}>
          {s}
        </span>
      ))}
    </span>
  );
};

export default function DriverList() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [msgText, setMsgText] = useState("");

  const openMsgDrawer = (driver) => {
    setSelectedDriver(driver);
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setMsgText("");
  };
  const sendMsg = () => {
    if (!msgText.trim()) return;
    alert(`Sending "${msgText}" to ${selectedDriver.name}`);
    setMsgText("");
  };

  return (
    <div className="driverlist__page">
      {/* header with new back icon + clickable title */}
      <header className="driverlist__header">
        <button className="driverlist__back" onClick={() => navigate(-1)}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
            alt="back"
            className="icon24"
          />
        </button>
        <h1
          className="driverlist__title"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/driver-details")}
        >
          Nearby Drivers
        </h1>
      </header>

      {/* scrollable cards */}
      <main className="driverlist__cards">
        {drivers.map((d) => (
          <div key={d.id} className="driverlist__card">
            <img src={d.image} alt={d.name} className="driverlist__img" />

            <div className="driverlist__info">
              <h2 className="driverlist__name">{d.name}</h2>
              <p className="driverlist__plate">{d.vehicle}</p>
              <div className="driverlist__rating">
                <StarRating rating={d.rating} />
                <span> {d.rating}</span>
              </div>
            </div>

            <div className="driverlist__actions">
              <a href={`tel:${d.phone}`} className="driverlist__call">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/483/483947.png"
                  alt="call"
                />
              </a>
              <button
                className="driverlist__msg"
                onClick={() => openMsgDrawer(d)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/17866/17866398.png"
                  alt="msg"
                />
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* message drawer */}
      {drawerOpen && (
        <>
          <div className="driverlist__blur" onClick={closeDrawer} />
          <div className="driverlist__drawer">
            <div className="driverlist__drawerHeader">
              <span>Message {selectedDriver?.name}</span>
              <button onClick={closeDrawer}>×</button>
            </div>
            <ul className="driverlist__quickMsgs">
              {defaultMsgs.map((m, i) => (
                <li key={i} onClick={() => setMsgText(m)}>
                  {m}
                </li>
              ))}
            </ul>
            <div className="driverlist__compose">
              <input
                type="text"
                placeholder="Type message…"
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
              />
              <button onClick={sendMsg} disabled={!msgText.trim()}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M2 21L21 12 2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}