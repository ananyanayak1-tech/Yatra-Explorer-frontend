import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  auth, 
  googleProvider, 
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile
} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(() => localStorage.getItem("user-role") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure Google Identity Services script is available
    if (!document.getElementById("google-gsi-client")) {
      const script = document.createElement("script");
      script.id = "google-gsi-client";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const userRole = tokenResult.claims && tokenResult.claims.admin === true ? "admin" : "user";
          setRole(userRole);
          localStorage.setItem("user-role", userRole);
        } catch (err) {
          console.error("Error fetching token claims:", err);
          setRole("user");
          localStorage.setItem("user-role", "user");
        }
      } else {
        setRole(null);
        localStorage.removeItem("user-role");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const refreshRole = async () => {
    if (auth.currentUser) {
      try {
        const tokenResult = await auth.currentUser.getIdTokenResult(true);
        const userRole = tokenResult.claims && tokenResult.claims.admin === true ? "admin" : "user";
        setRole(userRole);
        localStorage.setItem("user-role", userRole);
        return userRole;
      } catch (err) {
        console.error("Error refreshing token claims:", err);
      }
    }
    return null;
  };

  const loginWithGoogle = () => {
    return new Promise((resolve, reject) => {
      const clientId =
        process.env.REACT_APP_GOOGLE_CLIENT_ID ||
        "668531061470-4tuo4pa38cgdq5q98jibq4k22qs0762b.apps.googleusercontent.com";

      if (window.google?.accounts?.oauth2) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: "email profile openid",
          prompt: "consent",
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              return reject(tokenResponse);
            }
            try {
              const credential = GoogleAuthProvider.credential(null, tokenResponse.access_token);
              const userCredential = await signInWithCredential(auth, credential);
              resolve(userCredential);
            } catch (err) {
              reject(err);
            }
          },
          error_callback: (err) => {
            reject(err);
          }
        });
        client.requestAccessToken({ prompt: "consent" });
      } else {
        signInWithPopup(auth, googleProvider).then(resolve).catch(reject);
      }
    });
  };

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signupWithEmail = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential;
  };

  const logout = async () => {
    localStorage.removeItem("user-role");
    setRole(null);
    return signOut(auth);
  };

  const value = {
    currentUser,
    role,
    setRole,
    refreshRole,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
