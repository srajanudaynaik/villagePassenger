import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPhone.css";

const INDIA = { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" };

export default function Phone() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    const trimmed = phone.trim();
    if (!/^\d{10}$/.test(trimmed)) {
      alert("Enter a valid 10-digit Indian number");
      return;
    }
    navigate("/otp", { state: { phone: INDIA.dialCode + trimmed } });
  };

  return (
    <div className="phone-container">
      {/* Header */}
      <div className="phone-header">
        {/* <button onClick={() => navigate(-1)} className="phone-back">
          ←
        </button> */}

        <div className="phone-progress-container">
          <div className="phone-progress-bar">
            <div className="phone-progress-step"></div>
            <div className="phone-progress-step-inactive"></div>
            <div className="phone-progress-step-inactive"></div>
          </div>
        </div>

        <span className="phone-step-text">Step 1/3</span>
      </div>

      {/* Content */}
      <div className="phone-content">
        <h2 className="phone-heading">Let's get you trip-ready!</h2>
        <p className="phone-subheading">Enter your Mobile Number</p>

        <div className="phone-input-container">
          <div className="phone-country-code">
            <span className="phone-flag">{INDIA.flag}</span>
            <span className="phone-code">{INDIA.dialCode}</span>
          </div>

          <input
            type="tel"
            placeholder="Enter 10-digit phone"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="phone-input"
          />
        </div>

        <p className="phone-terms">
          By clicking Continue, you agree to our{" "}
          <span className="phone-terms-link">T&Cs</span>
        </p>

        <button className="phone-continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
