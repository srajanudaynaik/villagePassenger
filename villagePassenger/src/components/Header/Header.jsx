import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({
  title,
  showBack = true,
  progressSteps = 0,
}) {
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "ml", label: "മലയാളം" },
  ];

  return (
    <header className="header">
      {/* back button / spacer */}
      {showBack ? (
        <button className="header-back" onClick={() => navigate(-1)}>
          ←
        </button>
      ) : (
        <div className="header-spacer" />
      )}

      {/* progress dots */}
      {progressSteps > 0 && (
        <div className="header-progress">
          {[...Array(3)].map((_, idx) => (
            <span
              key={idx}
              className={`header-dot ${idx < progressSteps ? "filled" : ""}`}
            />
          ))}
        </div>
      )}

      {/* search bar with PNG icon inside */}
      <div className="header-search" onClick={() => navigate("/search-location")}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/622/622669.png"
          alt="search"
          className="header-search-icon"
        />
        <span className="header-search-placeholder">Where are you going?</span>
      </div>

      {/* language icon + dropdown */}
      <div className="header-lang-wrapper">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2115/2115307.png"
          alt="Language"
          className="header-lang-icon"
          onClick={() => setLangOpen(!langOpen)}
        />
        {langOpen && (
          <div className="header-lang-dropdown">
            {languages.map((l) => (
              <div
                key={l.code}
                className="header-lang-option"
                onClick={() => {
                  /* TODO: save selected language */
                  setLangOpen(false);
                }}
              >
                {l.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}