import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Map from "../../components/Map/Map";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import "./Home.css";

const vehicles = [
  { id: 1, type: "Mini", eta: 3, fare: 75 },
  { id: 2, type: "Prime Sedan", eta: 5, fare: 110 },
  { id: 3, type: "Prime SUV", eta: 7, fare: 150 },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Reusable header */}
      <Header title="Home" showBack={false} />

      {/* Map placeholder */}
      <div className="home-map">
        <Map />
      </div>

      {/* Vehicle list */}
      <div className="home-vehicles">
        <h3 className="home-section-title">Available rides</h3>
        <div className="home-vehicle-scroll">
          {vehicles.map((v) => (
            <VehicleCard
              key={v.id}
              type={v.type}
              eta={v.eta}
              fare={v.fare}
              onClick={() => navigate("/confirm-ride", { state: v })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}