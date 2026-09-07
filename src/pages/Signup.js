import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { signupWithEmail, logout, currentUser, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && role === "admin") {
      navigate("/admin");
    }
  }, [currentUser, role, navigate]);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return setError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      setError("");
      setLoading(true);
      await signupWithEmail(email, password, name);
      await logout();
      setSuccessMsg("Account registered successfully! An administrator must grant you admin privileges server-side before you can log in.");
    } catch (err) {
      console.error(err);
      setError("Failed to create an account. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Admin Register</h2>
          <p className="auth-tagline">Create an administrator account to manage places details.</p>

          {error && <div className="auth-error">{error}</div>}
          {successMsg && (
            <div className="auth-success" style={{ padding: "12px 16px", background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", borderRadius: "8px", marginBottom: "16px", fontSize: "0.95rem" }}>
              {successMsg}
              <div style={{ marginTop: "10px" }}>
                <Link to="/admin/login" style={{ color: "#15803d", fontWeight: "600", textDecoration: "underline" }}>
                  Go to Admin Login →
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn auth-btn" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up with Email"}
            </button>
          </form>

          <p className="auth-footer" style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9rem" }}>
            Already have an account? <Link to="/admin/login">Log In</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
