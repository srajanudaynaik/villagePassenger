import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Otp.css";

export default function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
    if (otp.length === 4) {
      navigate("/language"); // Step 3
    } else {
      alert("Enter a valid 4-digit OTP");
    }
  };

  return (
    <div className="otp-container">
      {/* Header */}
      <div className="otp-header">
        <button className="otp-back" onClick={() => navigate(-1)}>
          ←
        </button>

        <div className="otp-progress-container">
          <div className="otp-progress-bar">
            <div className="otp-progress-step"></div>
            <div className="otp-progress-step"></div>
            <div className="otp-progress-step-inactive"></div>
          </div>
        </div>

        <span className="otp-step-text">Step 2/3</span>
      </div>

      {/* Main Content */}
      <div className="otp-content">
        <h2 className="otp-heading">Got an OTP?</h2>
        <p className="otp-subheading">
          Login using the OTP sent to +918951787715
        </p>

        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter 4 digit OTP"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="otp-input"
        />

        {/* Resend Timer */}
        <p className="otp-resend">Resend in 28 s</p>

        {/* Toast Message */}
        <div className="otp-toast">
          <div className="otp-toast-icon">✔</div>
          <span className="otp-toast-text">OTP Sent via SMS</span>
        </div>

        {/* Continue Button */}
        <button className="otp-continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
