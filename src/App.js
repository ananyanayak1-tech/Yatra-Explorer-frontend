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

const initialPlaces = [
  {
    _id: "1",
    name: "Mysore Palace",
    state: "Karnataka",
    city: "Mysore",
    image: "https://images.unsplash.com/photo-1657856855186-7cf4909a4f78?w=600",
    description: "Historic royal palace of Mysore.",
    bestTime: "October - February",
    entryFee: 100,
    rating: 4.8,
    location: "Mysore, Karnataka",
    category: "City",
    budget: "Low",
    createdAt: "2026-07-01T08:00:00.000Z",
  },
  {
    _id: "2",
    name: "Hampi",
    state: "Karnataka",
    city: "Hampi",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
    description: "Ancient ruins and UNESCO World Heritage site.",
    bestTime: "November - February",
    entryFee: 40,
    rating: 4.7,
    location: "Hampi, Karnataka",
    category: "Temple",
    budget: "Low",
    createdAt: "2026-07-05T09:00:00.000Z",
  },
  {
    _id: "3",
    name: "Alleppey Backwaters",
    state: "Kerala",
    city: "Alappuzha",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
    description: "Scenic backwaters famous for houseboat cruises.",
    bestTime: "September - March",
    entryFee: 0,
    rating: 4.9,
    location: "Alappuzha, Kerala",
    category: "Beach",
    budget: "Luxury",
    createdAt: "2026-07-10T10:00:00.000Z",
  },
  {
    _id: "4",
    name: "Ooty",
    state: "Tamil Nadu",
    city: "Ooty",
    image: "https://plus.unsplash.com/premium_photo-1725408090963-49dd5bfc1baf?w=600",
    description: "Hill station known for tea gardens and cool climate.",
    bestTime: "October - June",
    entryFee: 0,
    rating: 4.5,
    location: "Ooty, Tamil Nadu",
    category: "Hill Station",
    budget: "Medium",
    createdAt: "2026-07-02T11:00:00.000Z",
  },
  {
    _id: "5",
    name: "Goa Beaches",
    state: "Goa",
    city: "Panaji",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
    description: "Popular beach destination with vibrant nightlife.",
    bestTime: "November - February",
    entryFee: 0,
    rating: 4.6,
    location: "Panaji, Goa",
    category: "Beach",
    budget: "Medium",
    createdAt: "2026-07-15T12:00:00.000Z",
  },
];

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