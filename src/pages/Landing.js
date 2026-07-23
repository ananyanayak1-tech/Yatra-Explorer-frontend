import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import planetEarth from "../assets/planet-earth.png";

function Landing() {
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

  useEffect(() => {
    if (currentUser) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/home");
      }
    }
  }, [currentUser, role, navigate]);

  return (
    <div className="landing-container">
      <div className="landing-card animate-fade-in">
        <div className="landing-header">
          <img src={planetEarth} alt="logo" className="landing-logo" />
          <h1>Tourist Places Explorer</h1>
          <p className="landing-tagline">
            Your gateway to discovering India's most breathtaking, cultural, and scenic tourist destinations.
          </p>
        </div>

        <div className="role-selection-grid">
          <div className="role-card" onClick={() => navigate("/user/login")}>
            <div className="role-icon">🌍</div>
            <h3>Continue as User</h3>
            <p>Explore places, read reviews, calculate budgets, and build your favorites wishlist.</p>
            <button className="role-btn user-btn">User Portal →</button>
          </div>

          <div className="role-card" onClick={() => navigate("/admin/login")}>
            <div className="role-icon">🛠️</div>
            <h3>Continue as Admin</h3>
            <p>Manage destinations, edit descriptions, adjust details, and monitor reviews.</p>
            <button className="role-btn admin-btn">Admin Portal →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
