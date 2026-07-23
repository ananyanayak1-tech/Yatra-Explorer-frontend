import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  
  const isCodeValid = inviteCode.trim() === (process.env.REACT_APP_ADMIN_INVITE_CODE || "ADMIN123");
  const { loginWithGoogle, loginWithEmail, setRole, logout, currentUser, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (currentUser) {
      const redirect = searchParams.get("redirect") || (role === "admin" ? "/admin" : "/");
      navigate(redirect, { replace: true });
    }
  }, [currentUser, role, navigate, searchParams]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return setError("Please fill in all fields.");
    }
    try {
      setError("");
      setEmailLoading(true);
      await loginWithEmail(email, password);
      localStorage.setItem("user-role", "admin");
      setRole("admin");
      navigate(searchParams.get("redirect") || "/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const expectedCode = process.env.REACT_APP_ADMIN_INVITE_CODE || "ADMIN123";
    if (!inviteCode.trim()) {
      setError("Please enter the admin invite code first");
      return;
    }
    if (inviteCode.trim() !== expectedCode) {
      setError("Invalid admin invite code");
      return;
    }

    try {
      setError("");
      setGoogleLoading(true);
      const result = await loginWithGoogle();

      // Automatically register user email in registered-admin-emails if not present
      const adminEmails = JSON.parse(localStorage.getItem("registered-admin-emails") || "[]");
      if (result.user.email && !adminEmails.includes(result.user.email)) {
        adminEmails.push(result.user.email);
        localStorage.setItem("registered-admin-emails", JSON.stringify(adminEmails));
      }

      localStorage.setItem("user-role", "admin");
      setRole("admin");
      navigate(searchParams.get("redirect") || "/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Admin Login</h2>
          <p className="auth-tagline">Access the administrative dashboard to manage tourist places.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleEmailLogin} className="auth-form">
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn auth-btn" disabled={emailLoading || googleLoading}>
              {emailLoading ? "Signing in..." : "Sign In with Email"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label>Admin Invite Code (Required for Google Sign In)</label>
            <input
              type="text"
              placeholder="Enter invite code to sign in with Google"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>

          <button 
            onClick={handleGoogleLogin} 
            className={`google-btn ${!isCodeValid ? "google-btn-inactive" : ""}`}
            disabled={emailLoading || googleLoading}
          >
            <svg viewBox="0 0 24 24" className="google-icon">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.68 1.48 7.58l3.77 2.92C6.18 7.22 8.87 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.43c-.28 1.44-1.09 2.67-2.3 3.48l3.57 2.77c2.08-1.92 3.29-4.75 3.29-8.4z"
              />
              <path
                fill="#FBBC05"
                d="M5.25 14.78c-.25-.76-.39-1.57-.39-2.41s.14-1.65.39-2.41L1.48 7.04C.53 8.94 0 11.07 0 13.33s.53 4.39 1.48 6.29l3.77-2.92c-.25-.76-.39-1.57-.39-2.41z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.57-2.77c-.99.66-2.23 1.06-3.56 1.06-3.13 0-5.82-2.18-6.77-5.46L1.48 16.84C3.37 20.32 7.35 23 12 23z"
              />
            </svg>
            Sign In with Google
          </button>

          <p className="auth-footer">
            Need to register an admin account? <Link to="/admin/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
