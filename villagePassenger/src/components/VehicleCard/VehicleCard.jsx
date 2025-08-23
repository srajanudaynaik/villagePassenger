import "./VehicleCard.css";

export default function VehicleCard({ type, eta, fare, driver, onClick }) {
  return (
    <div className="vehicle-card" onClick={onClick}>
      <div className="vehicle-icon">🚗</div>

      <div className="vehicle-info">
        <p className="vehicle-type">{type}</p>
        {driver && <p className="vehicle-driver">{driver}</p>}
        <p className="vehicle-eta">{eta} min away</p>
      </div>

      <div className="vehicle-fare">₹{fare}</div>
    </div>
  );
}