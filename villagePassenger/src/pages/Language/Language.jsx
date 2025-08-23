import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Language.css";

const languages = [
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
  { code: "en", native: "English", english: "English" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "ta", native: "தமிழ்", english: "Tamil" },
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "ml", native: "മലയാളം", english: "Malayalam" },
];

export default function Language() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleContinue = () => {
    console.log("Language selected:", selectedLanguage);
    navigate("/home");
  };

  return (
    <div className="language-container">
      {/* FIXED HEADER */}
      <div className="language-header">
        <button className="language-back" onClick={() => navigate(-1)}>
          ←
        </button>

        <div className="language-progress-container">
          <div className="language-progress-bar">
            <div className="language-progress-step"></div>
            <div className="language-progress-step"></div>
            <div className="language-progress-step"></div>
          </div>
        </div>

        <span className="language-step-text">Step 3/3</span>
      </div>

      {/* FIXED HEADING */}
      <div className="language-fixed-heading">
        <h2 className="language-heading">Just a bit more to go!</h2>
        <p className="language-subheading">Select your preferred language</p>
      </div>

      {/* SCROLLABLE LANGUAGE LIST */}
      <div className="language-scroll">
        <div className="language-list">
          {languages.map((item) => {
            const isSelected = selectedLanguage === item.code;
            return (
              <div
                key={item.code}
                className={`language-item ${
                  isSelected ? "language-item-selected" : ""
                }`}
                onClick={() => setSelectedLanguage(item.code)}
              >
                <div className="language-radio">
                  {isSelected && <div className="language-radio-selected" />}
                </div>
                <div>
                  <p className="language-native">{item.native}</p>
                  <p className="language-english">{item.english}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FIXED FOOTER */}
      <div className="language-footer">
        <button
          className={`language-continue-btn ${
            !selectedLanguage ? "language-continue-btn-disabled" : ""
          }`}
          onClick={handleContinue}
          disabled={!selectedLanguage}
        >
          Continue
        </button>
      </div>
    </div>
  );
}