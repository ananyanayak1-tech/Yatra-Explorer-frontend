import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import bannerLogo from "../assets/banner.png";
import homeIcon from "../assets/home (1).png";

function Navbar() {
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    setImgError(false);
  }, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const handleNavClick = (e, targetPath) => {
    if (window.location.pathname === targetPath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const logoTarget = role === "admin" ? "/admin" : "/";

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <Link 
        to={logoTarget} 
        className="navbar-logo"
        onClick={(e) => handleNavClick(e, logoTarget)}
      >
        <img src={bannerLogo} alt="Tourist Places Explorer" className="navbar-logo-img" />
      </Link>
      <div className="navbar-links">
        {/* Guest Navigation Links */}
        {!currentUser && (
          <>
            {location.pathname !== "/" && (
              <Link 
                to="/" 
                className={`navbar-link ${location.pathname === "/" ? "active-nav" : ""}`}
                onClick={(e) => handleNavClick(e, "/")}
              >
                <img src={homeIcon} alt="home" className="navbar-icon" />
                Home
              </Link>
            )}
            {location.pathname !== "/admin/login" && location.pathname !== "/admin/signup" && (
              <Link 
                to="/user/login" 
                className={`navbar-link ${location.pathname === "/user/login" ? "active-nav" : ""}`}
              >
                Login
              </Link>
            )}
          </>
        )}

        {/* User Navigation Links */}
        {currentUser && role === "user" && (
          <>
            {location.pathname !== "/" && (
              <Link 
                to="/" 
                className={`navbar-link ${location.pathname === "/" ? "active-nav" : ""}`}
                onClick={(e) => handleNavClick(e, "/")}
              >
                <img src={homeIcon} alt="home" className="navbar-icon" />
                Home
              </Link>
            )}
            <Link 
              to="/favorites" 
              className={`navbar-link ${location.pathname === "/favorites" ? "active-nav" : ""}`}
            >
              User Dashboard
            </Link>
            <div className="navbar-divider"></div>
          </>
        )}

        {/* Admin Navigation Links */}
        {role === "admin" && location.pathname !== "/admin" && (
          <Link 
            to="/admin" 
            className="navbar-admin-badge"
            onClick={(e) => handleNavClick(e, "/admin")}
          >
            Admin Dashboard
          </Link>
        )}

        {/* User/Admin Profiles & Logout */}
        {currentUser && (
          <div className="navbar-admin-section">
            <div className="navbar-admin-profile">
              {currentUser.photoURL && !imgError ? (
                <img 
                  src={currentUser.photoURL} 
                  alt="profile" 
                  className="navbar-profile-img" 
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="navbar-profile-initial">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : (currentUser.email ? currentUser.email[0].toUpperCase() : "U")}
                </div>
              )}
              <span className="navbar-admin-name">
                {currentUser.displayName || currentUser.email.split("@")[0]}
              </span>
            </div>
            <button className="navbar-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}



        <button className="theme-toggle-btn" onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          {darkMode ? (
            <svg viewBox="0 0 24 24" className="theme-icon sun-icon" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="theme-icon moon-icon" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
export default Navbar;