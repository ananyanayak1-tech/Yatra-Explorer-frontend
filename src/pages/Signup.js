import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signupWithEmail, setRole, currentUser, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/home");
      }
    }
  }, [currentUser, role, navigate]);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !inviteCode.trim()) {
      return setError("Please fill in all fields.");
    }

    const expectedCode = process.env.REACT_APP_ADMIN_INVITE_CODE || "ADMIN123";
    if (inviteCode.trim() !== expectedCode) {
      return setError("Invalid admin invite code");
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
      const result = await signupWithEmail(email, password, name);
      
      const adminEmails = JSON.parse(localStorage.getItem("registered-admin-emails") || "[]");
      if (result.user.email && !adminEmails.includes(result.user.email)) {
        adminEmails.push(result.user.email);
        localStorage.setItem("registered-admin-emails", JSON.stringify(adminEmails));
      }

      localStorage.setItem("user-role", "admin");
      setRole("admin");
      navigate("/admin");
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
            <div className="form-group">
              <label>Admin Invite Code</label>
              <input
                type="text"
                placeholder="Enter invite code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn auth-btn" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up with Email"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Signup;
