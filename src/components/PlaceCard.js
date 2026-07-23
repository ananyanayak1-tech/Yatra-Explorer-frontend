import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import starIcon from "../assets/star.png";
import { useToast } from "../ToastContext";
import { useAuth } from "../AuthContext";

const getColorsForState = (stateName) => {
  const colors = [
    { bg: "#e0f2fe", text: "#0369a1" }, // Blue
    { bg: "#d1fae5", text: "#047857" }, // Green
    { bg: "#fef3c7", text: "#b45309" }, // Amber
    { bg: "#fee2e2", text: "#b91c1c" }, // Red
    { bg: "#f3e8ff", text: "#6b21a8" }, // Purple
    { bg: "#fae8ff", text: "#86198f" }, // Fuchsia
    { bg: "#ffe4e6", text: "#9f1239" }, // Rose
    { bg: "#ffedd5", text: "#9a3412" }, // Orange
    { bg: "#e0e7ff", text: "#3730a3" }, // Indigo
    { bg: "#ccfbf1", text: "#0f766e" }, // Teal
  ];
  let hash = 0;
  const name = stateName || "";
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

function PlaceCard({ place }) {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const chipStyle = getColorsForState(place.state);

  useEffect(() => {
    if (!currentUser) {
      setIsFav(false);
      return;
    }
    const key = `tourist-places-favorites-${currentUser.email}`;
    let saved = localStorage.getItem(key);
    if (!saved) {
      const oldSaved = localStorage.getItem("tourist-places-favorites");
      if (oldSaved) {
        saved = oldSaved;
        localStorage.setItem(key, oldSaved);
      }
    }
    if (saved) {
      try {
        const favIds = JSON.parse(saved);
        setIsFav(favIds.includes(place._id));
      } catch (e) {
        console.error(e);
      }
    } else {
      setIsFav(false);
    }
  }, [place._id, currentUser]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate(`/user/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    const key = `tourist-places-favorites-${currentUser.email}`;
    const saved = localStorage.getItem(key);
    let favIds = [];
    if (saved) {
      try {
        favIds = JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }
    if (favIds.includes(place._id)) {
      favIds = favIds.filter((id) => id !== place._id);
      setIsFav(false);
      showToast("Removed from Favorites", "info");
    } else {
      favIds.push(place._id);
      setIsFav(true);
      showToast("Added to Favorites", "success");
    }
    localStorage.setItem(key, JSON.stringify(favIds));
    // Trigger storage event to sync other pages
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="place-card" onClick={() => navigate(`/place/${place._id}`, { state: { from: window.location.pathname } })}>
      {/* 3D Tilt Zones */}
      <div className="tilt-zone tl"></div>
      <div className="tilt-zone tr"></div>
      <div className="tilt-zone bl"></div>
      <div className="tilt-zone br"></div>
      
      {/* Card Content Wrapper */}
      <div className="card-content">
        <div className="place-image-container">
          <img src={place.image} alt={place.name} className="place-image" />
          <div className="image-gradient-overlay"></div>
          <div className={`floating-rating ${Number(place.rating) === 0 ? "no-rating" : ""}`}>
            {Number(place.rating) === 0 ? (
              <span>No ratings yet</span>
            ) : (
              <>
                <img src={starIcon} alt="rating" className="star-icon" />
                {Number(place.rating).toFixed(1)}
              </>
            )}
          </div>
          <button 
            className={`floating-heart-btn ${isFav ? "is-favorite" : ""}`} 
            onClick={toggleFavorite}
            aria-label="Toggle Favorite"
          >
            <svg viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="place-info">
          <div className="place-header-row">
            <h3 className="place-name">{place.name}</h3>
            <span className="state-chip" style={{ backgroundColor: chipStyle.bg, color: chipStyle.text }}>
              {place.state}
            </span>
          </div>
          <div className="place-meta">
            <span className="place-time-label">Best Time:</span>
            <span className="place-time-val">{place.bestTime}</span>
          </div>
          <div className="explore-card-row">
            <span 
              className="explore-card-link" 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/place/${place._id}`, { state: { from: window.location.pathname } });
              }}
            >
              Explore →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;