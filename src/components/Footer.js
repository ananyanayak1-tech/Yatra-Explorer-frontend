import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuMail, LuPhone, LuHeart } from "react-icons/lu";
import planetEarth from "../assets/planet-earth.png";

function Footer() {
  const location = useLocation();
  const hideFooterRoutes = ["/admin/login", "/admin/signup", "/user/login", "/user/signup", "/login", "/signup"];

  if (hideFooterRoutes.includes(location.pathname)) {
    return null;
  }
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-column brand-column">
          <Link to="/" className="footer-logo">
            <img src={planetEarth} alt="logo" className="footer-logo-icon" />
            Tourist Explorer
          </Link>
          <p className="footer-tagline">Discover India's most beautiful and breathtaking destinations.</p>
          <div className="social-icons">
            <a href="#" className="social-icon-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><span>Home</span></li>
            <li><span>Favorites</span></li>
            <li><span>Admin Dashboard</span></li>
            <li><span>About Us</span></li>
          </ul>
        </div>

        {/* Explore Categories Column */}
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li><span>Beach</span></li>
            <li><span>Hill Station</span></li>
            <li><span>Temple</span></li>
            <li><span>City</span></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-column contact-column">
          <h4>Contact Us</h4>
          <ul>
            <li className="contact-item">
              <span className="contact-icon" style={{ display: "inline-flex", alignItems: "center" }}><LuMail /></span>
              <a href="mailto:contact@touristexplorer.com">contact@touristexplorer.com</a>
            </li>
            <li className="contact-item">
              <span className="contact-icon" style={{ display: "inline-flex", alignItems: "center" }}><LuPhone /></span>
              <span>+91 98765 43210</span>
            </li>
          </ul>
          <p className="traveler-note">Made with <LuHeart style={{ fill: "var(--danger)", color: "var(--danger)", verticalAlign: "middle" }} /> for passionate travelers.</p>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom-bar">
        <p className="copyright">© 2026 Tourist Places Explorer. All rights reserved.</p>
        <div className="footer-policy-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
