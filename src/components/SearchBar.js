import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../ToastContext";

const states = ["All", "Karnataka", "Kerala", "Tamil Nadu", "Goa", "Maharashtra"];
const budgets = ["All", "Low", "Medium", "Luxury"];

function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  selectedState, 
  setSelectedState,
  selectedBudget,
  setSelectedBudget,
  selectedCategory,
  setSelectedCategory
}) {
  const [categoriesList, setCategoriesList] = useState(["All", "Beach", "Hill Station", "Temple", "City"]);
  const [isListening, setIsListening] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        let loaded = [];
        if (Array.isArray(res.data)) {
          loaded = res.data.map(c => typeof c === 'object' ? c.name : c);
        }
        if (loaded.length > 0) {
          setCategoriesList(["All", ...loaded]);
        }
      } catch (err) {
        console.error("Error loading categories in SearchBar:", err);
      }
    };
    loadCategories();
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("❌ Voice search is not supported in this browser.", "danger");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        showToast("⚠️ Microphone permission not granted. Please allow microphone access to use voice search.", "warning");
      } else {
        showToast(`❌ Voice search error: ${event.error}`, "danger");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.start();
  };

  return (
    <div className="searchbar-container animate-fade-in">
      {/* Search Input Wrapper */}
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search tourist places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          type="button"
          className={`voice-search-btn ${isListening ? "listening" : ""}`}
          onClick={startListening}
          title={isListening ? "Listening..." : "Search with your voice"}
        >
          <svg className="mic-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </button>
      </div>

      {/* State Filter */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="state-dropdown filter-select"
      >
        {states.map((state) => (
          <option key={state} value={state}>
            State: {state}
          </option>
        ))}
      </select>

      {/* Budget Filter */}
      <select
        value={selectedBudget}
        onChange={(e) => setSelectedBudget(e.target.value)}
        className="budget-dropdown filter-select"
      >
        {budgets.map((b) => (
          <option key={b} value={b}>
            Budget: {b}
          </option>
        ))}
      </select>

      {/* Type/Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-dropdown filter-select"
      >
        {categoriesList.map((c) => (
          <option key={c} value={c}>
            Type: {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;