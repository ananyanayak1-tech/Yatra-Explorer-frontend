import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PlaceCard from "../components/PlaceCard";
import { useAuth } from "../AuthContext";
import { useToast } from "../ToastContext";
import { LuHeart, LuFileText, LuCalendar } from "react-icons/lu";

function Favorites({ places, refetchPlaces }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [activeTab, setActiveTab] = useState("favorites");
  const [userReviews, setUserReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const favoritePlaces = places.filter((place) => favoriteIds.includes(place._id));

  // Load favorites from localStorage
  useEffect(() => {
    const syncFavs = () => {
      if (!currentUser) {
        setFavoriteIds([]);
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
          setFavoriteIds(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing favorites from localStorage", e);
        }
      } else {
        setFavoriteIds([]);
      }
    };

    syncFavs();
    window.addEventListener("storage", syncFavs);
    return () => window.removeEventListener("storage", syncFavs);
  }, [currentUser]);

  const loadUserReviews = async () => {
    if (!currentUser) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/user/${currentUser.email}`);
      const validReviews = res.data.filter((rev) => {
        const placeObj = typeof rev.placeId === "object" && rev.placeId !== null
          ? rev.placeId
          : places.find((p) => p._id === rev.placeId);
        return !!placeObj;
      });

      const mappedReviews = validReviews.map((rev) => {
        const placeObj = typeof rev.placeId === "object" && rev.placeId !== null
          ? rev.placeId
          : places.find((p) => p._id === rev.placeId);
        
        return {
          ...rev,
          placeName: placeObj.name,
          placeId: placeObj._id,
          date: rev.createdAt 
            ? new Date(rev.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Recent"
        };
      });
      setUserReviews(mappedReviews);
    } catch (err) {
      console.error("Error loading user reviews:", err);
    }
  };

  const loadUserBookings = async () => {
    if (!currentUser) return;
    try {
      setLoadingBookings(true);
      const res = await axios.get(`http://localhost:5000/api/bookings/user/${currentUser.email}`);
      const validBookings = res.data.filter((b) => places.some((p) => p._id === b.placeId));
      setBookings(validBookings);
    } catch (err) {
      console.error("Error loading user bookings:", err);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    loadUserReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places, currentUser]);

  useEffect(() => {
    if (activeTab === "bookings") {
      loadUserBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentUser]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`);
      showToast("Review deleted successfully!", "success");
      await loadUserReviews();
      if (refetchPlaces) {
        await refetchPlaces();
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      showToast("Failed to delete review.", "warning");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      showToast("Booking cancelled successfully!", "success");
      await loadUserBookings();
      if (refetchPlaces) {
        await refetchPlaces();
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      showToast("Failed to cancel booking.", "warning");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main-grid-section">
        <div className="favorites-header-row">
          <h2 className="section-title">
            {activeTab === "favorites" ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <LuHeart style={{ fill: "var(--danger)", color: "var(--danger)" }} /> My Wishlist / Favorites
              </span>
            ) : activeTab === "reviews" ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <LuFileText style={{ color: "var(--primary-light)" }} /> My Submitted Reviews
              </span>
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <LuCalendar style={{ color: "var(--primary-light)" }} /> My Bookings
              </span>
            )}
          </h2>
          
          <div className="favorites-tabs">
            <button 
              className={`fav-tab-btn ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              Wishlist
            </button>
            <button 
              className={`fav-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              My Reviews
            </button>
            <button 
              className={`fav-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              My Bookings
            </button>
          </div>
        </div>

        {activeTab === "favorites" ? (
          favoritePlaces.length > 0 ? (
            <div className="places-grid animate-fade-in">
              {favoritePlaces.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>
          ) : (
            <div className="empty-state animate-fade-in">
              <svg className="empty-state-icon favorite-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <h3>Your Wishlist is Empty</h3>
              <p>You haven't added any destinations to your favorites yet. Explore the home page and click the heart icon on any place card!</p>
              <button className="add-btn" onClick={() => window.location.href = "/"}>
                Browse Destinations
              </button>
            </div>
          )
        ) : activeTab === "reviews" ? (
          userReviews.length > 0 ? (
            <div className="user-reviews-list animate-fade-in">
              {userReviews.map((rev) => (
                <div key={rev._id} className="user-review-card">
                  <div className="user-review-header">
                    <h3>{rev.placeName}</h3>
                    <span className="user-review-date">{rev.date}</span>
                  </div>
                  <div className="user-review-rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span 
                        key={index} 
                        className={`star ${index < rev.rating ? "active-star" : "inactive-star"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="user-review-comment">"{rev.comment}"</p>
                  <button 
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(rev._id)}
                  >
                    Delete Review
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state animate-fade-in">
              <svg className="empty-state-icon favorite-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20h.01M4 20h.01M20 20h.01M12 4v12M12 4L8 8M12 4l4 4"></path>
              </svg>
              <h3>No Reviews Found</h3>
              <p>You haven't submitted any reviews yet! Visit any place details page to submit comments and ratings.</p>
            </div>
          )
        ) : (
          /* Bookings Tab */
          loadingBookings ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <div className="spinner"></div>
            </div>
          ) : bookings.length > 0 ? (
            <div className="bookings-grid animate-fade-in">
              {bookings.map((booking) => {
                const placeObj = places.find((p) => p._id === booking.placeId);
                const placeImage = placeObj ? placeObj.image : "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600";
                
                return (
                  <div key={booking._id} className="booking-card">
                    <div className="booking-card-image-wrapper">
                      <img src={placeImage} alt={booking.placeName} className="booking-card-image" />
                    </div>
                    <div className="booking-card-content">
                      <h3>{booking.placeName}</h3>
                      <div className="booking-card-details">
                        <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
                        <p><strong>Days:</strong> {booking.numberOfDays}</p>
                        <p><strong>Travelers:</strong> {booking.numberOfTravelers}</p>
                      </div>
                      <button 
                        className="delete-review-btn cancel-booking-btn"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state animate-fade-in">
              <svg className="empty-state-icon favorite-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18"></path>
              </svg>
              <h3>No Bookings Found</h3>
              <p>You haven't booked any trips yet! Browse our destinations and book a getaway today.</p>
              <button className="add-btn" onClick={() => window.location.href = "/"}>
                Explore Destinations
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Favorites;
