import React from "react";
import { useNavigate } from "react-router-dom";

function ExploreMoreCard({ totalCount }) {
  const navigate = useNavigate();
  const subtext = "See other destinations";

  return (
    <div className="explore-more-card" onClick={() => navigate("/destinations")}>
      {/* Travel Path Dotted Background decoration */}
      <svg className="explore-card-bg-decoration" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        <path d="M-10,30 Q30,60 50,20 T110,80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3"></path>
        <path d="M-5,80 Q40,40 60,90 T105,30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3"></path>
        <circle cx="50" cy="20" r="1" fill="rgba(251, 191, 36, 0.4)"></circle>
        <circle cx="60" cy="90" r="1" fill="rgba(251, 191, 36, 0.4)"></circle>
        <circle cx="30" cy="45" r="0.8" fill="rgba(255,255,255,0.25)"></circle>
      </svg>

      <div className="explore-more-content">
        <div className="explore-more-icon-container">
          {/* Compass SVG Icon */}
          <svg className="explore-compass-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"></circle>
            <polygon points="12,4 15,12 12,20 9,12" fill="var(--accent)" stroke="var(--accent)"></polygon>
            <circle cx="12" cy="12" r="1.5" fill="#0f172a"></circle>
            <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5"></line>
            <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" strokeWidth="1.5"></line>
            <line x1="1.5" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
            <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
          </svg>
        </div>
        <span className="explore-more-text">Explore More Destinations</span>
        <span className="explore-more-subtext">{subtext}</span>
      </div>
    </div>
  );
}

export default ExploreMoreCard;
