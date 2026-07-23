import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import starIcon from "../assets/star.png";
import { useToast } from "../ToastContext";
import { useAuth } from "../AuthContext";
import { LuMapPin, LuMap, LuSun, LuCloudSun, LuCloudFog, LuCloudRain, LuSnowflake, LuCloudDrizzle, LuCloudLightning, LuThermometer } from "react-icons/lu";

function PlaceDetails({ places, refetchPlaces }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const location = useLocation();

  const [place, setPlace] = useState(null);
  const [loadingPlace, setLoadingPlace] = useState(true);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const getWeatherDetails = (code) => {
    if (code === 0) return { label: "Clear Sky", icon: LuSun };
    if (code >= 1 && code <= 3) return { label: "Partly Cloudy", icon: LuCloudSun };
    if (code >= 45 && code <= 48) return { label: "Foggy", icon: LuCloudFog };
    if (code >= 51 && code <= 67) return { label: "Rainy", icon: LuCloudRain };
    if (code >= 71 && code <= 77) return { label: "Snowy", icon: LuSnowflake };
    if (code >= 80 && code <= 82) return { label: "Showers", icon: LuCloudDrizzle };
    if (code >= 95 && code <= 99) return { label: "Thunderstorm", icon: LuCloudLightning };
    return { label: "Moderate", icon: LuThermometer };
  };

  // Fetch current weather data from Open-Meteo
  useEffect(() => {
    if (place && place.latitude && place.longitude) {
      const fetchWeather = async () => {
        setLoadingWeather(true);
        try {
          const res = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code`
          );
          setWeather(res.data.current);
        } catch (err) {
          console.error("Error fetching weather data:", err);
        } finally {
          setLoadingWeather(false);
        }
      };
      fetchWeather();
    } else {
      setWeather(null);
    }
  }, [place]);

  // Fetch full details of the place from backend (includes coordinates)
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setLoadingPlace(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/places/${id}`);
        setPlace(res.data);
      } catch (err) {
        console.error("Error fetching place details in PlaceDetails:", err);
        // Fallback to local places list if backend call fails
        const localPlace = places.find((p) => p._id === id);
        setPlace(localPlace);
      } finally {
        setLoadingPlace(false);
      }
    };
    fetchPlaceDetails();
  }, [id, places]);
  const [isFav, setIsFav] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [nameInitialized, setNameInitialized] = useState(false);

  useEffect(() => {
    if (currentUser && !nameInitialized) {
      const defaultName = currentUser.displayName || currentUser.email.split("@")[0];
      setNewReview((prev) => ({ ...prev, name: defaultName }));
      setNameInitialized(true);
    }
  }, [currentUser, nameInitialized]);

  // Sync favorites from localStorage
  useEffect(() => {
    if (place) {
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
    }
  }, [place, currentUser]);

  // Load reviews for this place from backend API
  const fetchReviews = async () => {
    if (place) {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${place._id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [place]);

  useEffect(() => {
    if (place) {
      const savedComment = localStorage.getItem(`pending-review-${place._id}`);
      const savedRating = localStorage.getItem(`pending-review-rating-${place._id}`);
      const savedName = localStorage.getItem(`pending-review-name-${place._id}`);
      if (savedComment || savedRating || savedName) {
        setNewReview((prev) => ({
          ...prev,
          comment: savedComment || prev.comment,
          rating: savedRating ? Number(savedRating) : prev.rating,
          name: savedName || prev.name,
        }));
        localStorage.removeItem(`pending-review-${place._id}`);
        localStorage.removeItem(`pending-review-rating-${place._id}`);
        localStorage.removeItem(`pending-review-name-${place._id}`);
      }
    }
  }, [place]);

  const toggleFavorite = () => {
    if (!place) return;
    if (!currentUser) {
      navigate(`/user/login?redirect=${encodeURIComponent(location.pathname)}`);
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
      favIds = favIds.filter((fid) => fid !== place._id);
      setIsFav(false);
      showToast("Removed from Favorites", "info");
    } else {
      favIds.push(place._id);
      setIsFav(true);
      showToast("Added to Favorites", "success");
    }
    localStorage.setItem(key, JSON.stringify(favIds));
    window.dispatchEvent(new Event("storage"));
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleStarClick = (ratingVal) => {
    setNewReview({ ...newReview, rating: ratingVal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      localStorage.setItem(`pending-review-${place._id}`, newReview.comment);
      localStorage.setItem(`pending-review-rating-${place._id}`, newReview.rating);
      localStorage.setItem(`pending-review-name-${place._id}`, newReview.name);
      navigate(`/user/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    const errors = {};
    if (!newReview.name.trim()) errors.name = "Name is required";
    if (newReview.rating === 0) errors.rating = "Rating is required";
    if (!newReview.comment.trim()) errors.comment = "Review comment is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        placeId: place._id,
        name: newReview.name.trim(),
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        reviewerEmail: currentUser ? currentUser.email : "",
      });

      await fetchReviews();
      if (refetchPlaces) {
        await refetchPlaces();
      }

      const defaultName = currentUser ? (currentUser.displayName || currentUser.email.split("@")[0]) : "";
      setNewReview({ name: defaultName, rating: 0, comment: "" });
      setHoverRating(0);
      setFormErrors({});
      showToast("Review submitted successfully!", "success");
    } catch (err) {
      console.error("Error submitting review:", err);
      showToast("Failed to submit review.", "warning");
    }
  };

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    checkInDate: "",
    numberOfDays: 1,
    numberOfTravelers: 1,
  });
  const [bookingError, setBookingError] = useState("");
  const [bookingSubmitLoading, setBookingSubmitLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const checkIfBooked = async () => {
    if (!currentUser || !place) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/user/${currentUser.email}`);
      const alreadyBooked = res.data.some((b) => b.placeId === place._id);
      setIsBooked(alreadyBooked);
    } catch (err) {
      console.error("Error checking booking status:", err);
    }
  };

  useEffect(() => {
    checkIfBooked();
  }, [place, currentUser]);

  const handleBookingToggle = () => {
    if (!currentUser) {
      navigate(`/user/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setShowBookingForm(!showBookingForm);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate(`/user/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (!bookingForm.checkInDate) {
      setBookingError("Check-in date is required");
      return;
    }
    if (bookingForm.numberOfDays < 1) {
      setBookingError("Number of days must be at least 1");
      return;
    }
    if (bookingForm.numberOfTravelers < 1) {
      setBookingError("Number of travelers must be at least 1");
      return;
    }

    try {
      setBookingError("");
      setBookingSubmitLoading(true);
      
      const payload = {
        placeId: place._id,
        placeName: place.name,
        userEmail: currentUser.email,
        checkInDate: bookingForm.checkInDate,
        numberOfDays: Number(bookingForm.numberOfDays),
        numberOfTravelers: Number(bookingForm.numberOfTravelers)
      };

      await axios.post("http://localhost:5000/api/bookings", payload);
      showToast("Booking confirmed!", "success");
      setIsBooked(true);
      setBookingForm({ checkInDate: "", numberOfDays: 1, numberOfTravelers: 1 });
      setShowBookingForm(false);
    } catch (err) {
      console.error("Booking submission error:", err);
      setBookingError(err.response?.data?.message || "Failed to confirm booking.");
      showToast("Failed to confirm booking.", "warning");
    } finally {
      setBookingSubmitLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard!", "success");
  };

  if (loadingPlace) {
    return (
      <div>
        <Navbar />
        <div className="details-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div>
        <Navbar />
        <div className="details-container">
          <p className="no-results">Tourist Place Not Found</p>
        </div>
      </div>
    );
  }

  // Get rating directly from place object
  const displayRating = Number(place.rating || 0);

  return (
    <div>
      <Navbar />
      <div className="details-container animate-fade-in">
        <button className="back-btn" onClick={() => navigate(location.state?.from || "/home")}>
          ← Go Back
        </button>

        <div className="details-card">
          <img src={place.image} alt={place.name} className="details-image" />

          <div className="details-info">
            <div className="details-header-row">
              <h1>{place.name}</h1>
              <div className="details-action-buttons">
                <button 
                  className={`details-heart-btn ${isFav ? "is-favorite" : ""}`}
                  onClick={toggleFavorite}
                >
                  <svg viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  {isFav ? "Remove" : "Favorite"}
                </button>
                <button className="details-share-btn" onClick={handleShare}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="share-icon" style={{width: "18px", height: "18px"}}>
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  Share
                </button>
              </div>
            </div>

            <div className="details-row">
              <span className="details-label">State:</span>
              <span>{place.state}</span>
            </div>
            <div className="details-row">
              <span className="details-label">City:</span>
              <span>{place.city}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Category:</span>
              <span>{place.category || "Beach"}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Best Time:</span>
              <span>{place.bestTime}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Entry Fee:</span>
              <span>₹{place.entryFee}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Rating:</span>
              {displayRating === 0 ? (
                <span className="details-no-rating">No ratings yet</span>
              ) : (
                <span className="details-rating">
                  {displayRating.toFixed(1)}
                  <img src={starIcon} alt="rating" className="star-icon" />
                  <span className="details-reviews-count">
                    ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </span>
              )}
            </div>

            <div className="details-row">
              <span className="details-label">Location:</span>
              <span>{place.location}</span>
            </div>

            <div className="details-row">
              <span className="details-label">Current Weather:</span>
              {loadingWeather ? (
                <span className="details-weather-loading" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading weather...</span>
              ) : weather ? (
                <span className="details-weather-info" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {(() => {
                    const WeatherIcon = getWeatherDetails(weather.weather_code).icon;
                    return <WeatherIcon style={{ fontSize: "1.2rem", color: "var(--primary-light)" }} />;
                  })()}
                  <strong>{Math.round(weather.temperature_2m)}°C</strong> ({getWeatherDetails(weather.weather_code).label})
                </span>
              ) : (
                <span className="details-weather-na" style={{ color: "var(--text-muted)" }}>N/A (No coordinates)</span>
              )}
            </div>

            <p className="details-description">{place.description}</p>
          </div>
        </div>

        {/* Map Section */}
        {place.latitude && place.longitude && (
          <div className="map-section animate-fade-in">
            <h2><LuMap style={{ marginRight: "8px", verticalAlign: "middle" }} /> Location Map</h2>
            <div className="map-card">
              <iframe
                title="destination-map"
                width="100%"
                height="350"
                style={{ border: "none", width: "100%", height: "350px", display: "block" }}
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                    <style>
                      body, html, #map { margin: 0; padding: 0; width: 100%; height: 100%; background: #f8fafc; }
                      .leaflet-control-attribution { font-size: 9px !important; }
                    </style>
                  </head>
                  <body>
                    <div id="map"></div>
                    <script>
                      const map = L.map('map', {
                        zoomControl: true,
                        scrollWheelZoom: false
                      }).setView([${place.latitude}, ${place.longitude}], 13);
                      
                      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                      }).addTo(map);
                      
                      L.marker([${place.latitude}, ${place.longitude}]).addTo(map);
                    </script>
                  </body>
                  </html>
                `}
              ></iframe>
              <div className="map-footer-row">
                <span className="coordinate-badge" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <LuMapPin style={{ color: "var(--primary-light)" }} /> Latitude: {place.latitude}
                </span>
                <span className="coordinate-badge" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <LuMapPin style={{ color: "var(--primary-light)" }} /> Longitude: {place.longitude}
                </span>
                <a 
                  href={`https://www.openstreetmap.org/?mlat=${place.latitude}&mlon=${place.longitude}#map=15/${place.latitude}/${place.longitude}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="osm-link-btn"
                >
                  View Large Map ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Booking Section */}
        <div className="booking-section animate-fade-in">
          <div className="booking-header-row">
            <h2>Book This Destination</h2>
            <button 
              className={`booking-toggle-btn add-btn ${isBooked ? "booked-btn" : ""}`}
              onClick={handleBookingToggle}
              disabled={isBooked}
            >
              {isBooked ? "Booked" : (showBookingForm ? "Close Form" : "Book Now")}
            </button>
          </div>

          {showBookingForm && (
            <div className="booking-form-card animate-slide-up">
              <form onSubmit={handleBookingSubmit} className="booking-form">
                {bookingError && <div className="booking-error-banner">{bookingError}</div>}
                
                <div className="booking-form-grid">
                  <div className="form-group">
                    <label>Check-in Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingForm.checkInDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkInDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Number of Days</label>
                    <input
                      type="number"
                      min="1"
                      value={bookingForm.numberOfDays}
                      onChange={(e) => setBookingForm({ ...bookingForm, numberOfDays: parseInt(e.target.value) || "" })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Number of Travelers</label>
                    <input
                      type="number"
                      min="1"
                      value={bookingForm.numberOfTravelers}
                      onChange={(e) => setBookingForm({ ...bookingForm, numberOfTravelers: parseInt(e.target.value) || "" })}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn booking-submit-btn" 
                  disabled={bookingSubmitLoading}
                >
                  {bookingSubmitLoading ? "Confirming Booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Reviews & Ratings</h2>
          
          <div className="reviews-summary-card">
            <div className="summary-left">
              {displayRating === 0 ? (
                <div className="summary-avg-row">
                  <span className="summary-avg" style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--text-muted)" }}>No ratings yet</span>
                </div>
              ) : (
                <>
                  <div className="summary-avg-row">
                    <span className="summary-avg">{displayRating.toFixed(1)}</span>
                    <img src={starIcon} alt="star" className="star-icon summary-avg-star" />
                  </div>
                  <div className="summary-stars">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <img
                        key={starNum}
                        src={starIcon}
                        alt="star"
                        className="star-icon"
                        style={{
                          opacity: starNum <= Math.round(displayRating) ? 1 : 0.2,
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
              <span className="summary-count">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
            
            <div className="summary-right">
              <p>Ratings are calculated based on traveler reviews submitted below.</p>
            </div>
          </div>

          <div className="reviews-list-container">
            <h3>Traveler Feedback</h3>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((rev, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <span className="reviewer-name">{rev.name}</span>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <div className="reviewer-rating">
                        {[1, 2, 3, 4, 5].map((starNum) => (
                          <img
                            key={starNum}
                            src={starIcon}
                            alt="star"
                            className="star-icon"
                            style={{ opacity: starNum <= rev.rating ? 1 : 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-reviews-placeholder">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div className="add-review-card">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={newReview.name}
                  onChange={handleReviewChange}
                  placeholder="Enter your name"
                />
                {formErrors.name && <p className="error-text">{formErrors.name}</p>}
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="interactive-star-selector">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <img
                      key={starNum}
                      src={starIcon}
                      alt={`${starNum} Stars`}
                      className={`star-select-icon ${
                        starNum <= (hoverRating || newReview.rating) ? "selected" : ""
                      }`}
                      onMouseEnter={() => setHoverRating(starNum)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleStarClick(starNum)}
                      style={{ cursor: "pointer", marginRight: "8px" }}
                    />
                  ))}
                  <span className="rating-explanation">
                    {newReview.rating > 0 ? `${newReview.rating} out of 5 stars` : "Click to rate"}
                  </span>
                </div>
                {formErrors.rating && <p className="error-text">{formErrors.rating}</p>}
              </div>

              <div className="form-group">
                <label>Review Comment</label>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  placeholder="Share details of your experience at this destination..."
                  rows="4"
                />
                {formErrors.comment && <p className="error-text">{formErrors.comment}</p>}
              </div>

              <button type="submit" className="submit-btn review-submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;