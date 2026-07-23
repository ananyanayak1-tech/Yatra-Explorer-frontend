import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import Admin from "./pages/Admin";
import AddPlace from "./pages/AddPlace";
import EditPlace from "./pages/EditPlace";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Destinations from "./pages/Destinations";
import Footer from "./components/Footer";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./ToastContext";
import "./App.css";



function App() {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/places");
      let data = [];
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data) {
        data = res.data.places || res.data.data || [];
      }
      
      if (data.length > 0) {
        setPlaces(data);
        return;
      }
      
      throw new Error("Empty data returned from /api/places");
    } catch (err) {
      console.warn("Primary places endpoint failed/returned empty, attempting /api/places/all fallback...", err);
      try {
        const resAll = await axios.get("http://localhost:5000/api/places/all");
        let dataAll = [];
        if (Array.isArray(resAll.data)) {
          dataAll = resAll.data;
        } else if (resAll.data) {
          dataAll = resAll.data.places || resAll.data.data || [];
        }
        setPlaces(dataAll);
      } catch (errAll) {
        console.error("All places endpoints failed:", errAll);
      }
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // Add a new place
  const addPlace = async (newPlace) => {
    try {
      const { rating, ...payload } = newPlace;
      await axios.post("http://localhost:5000/api/places", payload);
      await fetchPlaces();
    } catch (err) {
      console.error("Error adding place:", err);
    }
  };

  // Update an existing place
  const updatePlace = async (id, updatedData) => {
    try {
      const { rating, ...payload } = updatedData;
      await axios.put(`http://localhost:5000/api/places/${id}`, payload);
      await fetchPlaces();
    } catch (err) {
      console.error("Error updating place:", err);
    }
  };

  // Delete a place
  const deletePlace = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/places/${id}`);
      await fetchPlaces();
    } catch (err) {
      console.error("Error deleting place:", err);
    }
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="app-container">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home places={places} />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/place/:id" element={<PlaceDetails places={places} refetchPlaces={fetchPlaces} />} />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute requiredRole="user">
                      <Favorites places={places} refetchPlaces={fetchPlaces} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/signup" element={<UserSignup />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Admin places={places} deletePlace={deletePlace} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AddPlace addPlace={addPlace} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/edit/:id"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <EditPlace places={places} updatePlace={updatePlace} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;