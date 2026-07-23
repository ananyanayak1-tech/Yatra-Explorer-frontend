import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useToast } from "../ToastContext";

function AddPlace({ addPlace }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [categories, setCategories] = useState(["Beach", "Hill Station", "Temple", "City"]);

  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    image: "",
    description: "",
    bestTime: "",
    entryFee: "",
    location: "",
    category: "",
    budget: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        let loaded = [];
        if (Array.isArray(res.data)) {
          loaded = res.data.map(c => typeof c === 'object' ? c.name : c);
        }
        if (loaded.length > 0) {
          setCategories(loaded);
        }
      } catch (err) {
        console.error("Error loading categories in AddPlace:", err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Place Name is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.bestTime.trim()) newErrors.bestTime = "Best Time is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.budget) newErrors.budget = "Budget Range is required";

    if (formData.entryFee === "" || Number(formData.entryFee) < 0)
      newErrors.entryFee = "Entry Fee cannot be negative";

    if (formData.latitude !== "") {
      const lat = Number(formData.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = "Latitude must be a number between -90 and 90";
      }
    }

    if (formData.longitude !== "") {
      const lng = Number(formData.longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.longitude = "Longitude must be a number between -180 and 180";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    addPlace({
      ...formData,
      entryFee: Number(formData.entryFee),
      latitude: formData.latitude !== "" ? Number(formData.latitude) : undefined,
      longitude: formData.longitude !== "" ? Number(formData.longitude) : undefined,
      rating: 0, // default placeholder rating
    });

    showToast("✅ Place added successfully!", "success");
    navigate("/admin");
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>Add Tourist Place</h1>

        <form onSubmit={handleSubmit} className="place-form">
          <div className="form-group">
            <label>Place Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>State</label>
            <input name="state" value={formData.state} onChange={handleChange} />
            {errors.state && <p className="error-text">{errors.state}</p>}
          </div>

          <div className="form-group">
            <label>City</label>
            <input name="city" value={formData.city} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="" disabled>Enter the category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          <div className="form-group">
            <label>Budget Range</label>
            <select name="budget" value={formData.budget} onChange={handleChange}>
              <option value="" disabled>Enter the budget range</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Luxury">Luxury</option>
            </select>
            {errors.budget && <p className="error-text">{errors.budget}</p>}
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input name="image" value={formData.image} onChange={handleChange} />
            {errors.image && <p className="error-text">{errors.image}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="error-text">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label>Best Time to Visit</label>
            <input
              name="bestTime"
              value={formData.bestTime}
              onChange={handleChange}
            />
            {errors.bestTime && <p className="error-text">{errors.bestTime}</p>}
          </div>

          <div className="form-group">
            <label>Entry Fee (₹)</label>
            <input
              type="number"
              name="entryFee"
              value={formData.entryFee}
              onChange={handleChange}
            />
            {errors.entryFee && <p className="error-text">{errors.entryFee}</p>}
          </div>



          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Latitude (Optional)</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g. 12.9716"
            />
            {errors.latitude && <p className="error-text">{errors.latitude}</p>}
          </div>

          <div className="form-group">
            <label>Longitude (Optional)</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g. 77.5946"
            />
            {errors.longitude && <p className="error-text">{errors.longitude}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPlace;