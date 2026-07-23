import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PlaceCard from "../components/PlaceCard";
import ExploreMoreCard from "../components/ExploreMoreCard";
import Spinner from "../components/Spinner";
import ChatWidget from "../components/ChatWidget";

import { LuSparkles, LuStar, LuCalendar } from "react-icons/lu";

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    title: "Explore the Wonders of India",
    tagline: "Discover palaces, historical ruins, beaches, and hill stations."
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?auto=format&fit=crop&w=1600&q=80",
    title: "Vibrant Culture & Heritage",
    tagline: "Experience the rich history and architectures of the royal cities."
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    title: "Serene Nature & Escapes",
    tagline: "Relax at pristine beaches and peaceful misty hill stations."
  }
];

function Home({ places }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedCategory = searchParams.get("category") || "All";
  const selectedState = searchParams.get("state") || "All";
  const selectedBudget = searchParams.get("budget") || "All";
  const sortBy = searchParams.get("sortBy") || "Default";

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);



  // States for backend-driven filtering on the main grid
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loadingFiltered, setLoadingFiltered] = useState(false);

  // Refs and column counts for grids
  const mainGridRef = useRef(null);
  const topRatedGridRef = useRef(null);
  const recentlyAddedGridRef = useRef(null);
  const [mainGridColumns, setMainGridColumns] = useState(4);
  const [topRatedColumns, setTopRatedColumns] = useState(4);
  const [recentlyAddedColumns, setRecentlyAddedColumns] = useState(4);

  const setSelectedCategory = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val === "All") {
      params.delete("category");
    } else {
      params.set("category", val);
    }
    setSearchParams(params, { replace: true });
  };

  const setSelectedState = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val === "All") {
      params.delete("state");
    } else {
      params.set("state", val);
    }
    setSearchParams(params, { replace: true });
  };

  const setSelectedBudget = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val === "All") {
      params.delete("budget");
    } else {
      params.set("budget", val);
    }
    setSearchParams(params, { replace: true });
  };

  const setSortBy = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val === "Default") {
      params.delete("sortBy");
    } else {
      params.set("sortBy", val);
    }
    setSearchParams(params, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSearchParams({}, { replace: true });
  };



  // Sync category state with query parameters is handled directly from URL params

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Cycle carousel slides
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Hook/Listener to calculate grid columns on screen resize
  useEffect(() => {
    const updateColumns = () => {
      const gap = 32;
      const minColWidth = 280;

      if (mainGridRef.current) {
        const W = mainGridRef.current.offsetWidth;
        const cols = Math.floor((W + gap) / (minColWidth + gap)) || 1;
        setMainGridColumns(cols);
      }
      if (topRatedGridRef.current) {
        const W = topRatedGridRef.current.offsetWidth;
        const cols = Math.floor((W + gap) / (minColWidth + gap)) || 1;
        setTopRatedColumns(cols);
      }
      if (recentlyAddedGridRef.current) {
        const W = recentlyAddedGridRef.current.offsetWidth;
        const cols = Math.floor((W + gap) / (minColWidth + gap)) || 1;
        setRecentlyAddedColumns(cols);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [places]);

  // Fetch filtered places directly from backend
  useEffect(() => {
    const filterArray = (arr) => {
      let result = [...arr];
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        result = result.filter(
          (p) =>
            (p.name && p.name.toLowerCase().includes(term)) ||
            (p.state && p.state.toLowerCase().includes(term)) ||
            (p.city && p.city.toLowerCase().includes(term)) ||
            (p.description && p.description.toLowerCase().includes(term))
        );
      }
      if (selectedState !== "All") {
        result = result.filter((p) => p.state === selectedState);
      }
      if (selectedCategory !== "All") {
        result = result.filter((p) => p.category === selectedCategory);
      }
      if (selectedBudget !== "All") {
        result = result.filter((p) => p.budget === selectedBudget);
      }
      return result;
    };

    const fetchFilteredPlaces = async () => {
      setLoadingFiltered(true);
      try {
        const params = {};
        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }
        if (selectedState !== "All") {
          params.state = selectedState;
        }
        if (selectedCategory !== "All") {
          params.category = selectedCategory;
        }
        if (selectedBudget !== "All") {
          params.budget = selectedBudget;
        }
        if (sortBy !== "Default") {
          params.sortBy = sortBy;
        }
        const res = await axios.get("http://localhost:5000/api/places", { params });
        
        let data = [];
        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (res.data) {
          data = res.data.places || res.data.data || [];
        }

        // Apply client-side filtering on top of backend data to ensure correctness
        const finalData = data.length > 0 ? data : places;
        setFilteredPlaces(filterArray(finalData));
      } catch (err) {
        console.error("Error fetching filtered places, falling back to client-side filter:", err);
        setFilteredPlaces(filterArray(places));
      } finally {
        setLoadingFiltered(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFilteredPlaces();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedState, selectedCategory, selectedBudget, sortBy, places]);

  const sortedFilteredPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortBy === "Rating") {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      if (ratingA === 0 && ratingB > 0) return 1;
      if (ratingB === 0 && ratingA > 0) return -1;
      return ratingB - ratingA; // Descending (highest rated first)
    }
    if (sortBy === "Name") {
      const nameA = String(a.name || "").trim();
      const nameB = String(b.name || "").trim();
      return nameA.localeCompare(nameB); // Ascending (A-Z)
    }
    return 0;
  });

  // Get top 4 highest rated destinations (rating > 0 sorted first, then highest first)
  const topRatedPlaces = [...places]
    .sort((a, b) => {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      if (ratingA === 0 && ratingB > 0) return 1;
      if (ratingB === 0 && ratingA > 0) return -1;
      return ratingB - ratingA;
    })
    .slice(0, 4);

  // Get featured place of the day (highest rated place, or first place if none have ratings)
  const featuredPlace = [...places]
    .sort((a, b) => {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      if (ratingA === 0 && ratingB > 0) return 1;
      if (ratingB === 0 && ratingA > 0) return -1;
      return ratingB - ratingA;
    })[0];

  // Get recently added places
  const recentlyAddedPlaces = [...places]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  // Show ExploreMoreCard if the grid row has leftover space (items.length % columns !== 0)
  const showExploreMoreTop = topRatedColumns > 0 && topRatedPlaces.length % topRatedColumns !== 0;
  const showExploreMoreRecent = recentlyAddedColumns > 0 && recentlyAddedPlaces.length % recentlyAddedColumns !== 0;

  // Helper to determine if we are showing default recommendations
  const isDefaultFilter = 
    searchTerm.trim() === "" && 
    selectedState === "All" && 
    selectedCategory === "All" && 
    selectedBudget === "All";

  const isAnyFilterActive = 
    searchTerm.trim() !== "" || 
    selectedState !== "All" || 
    selectedCategory !== "All" || 
    selectedBudget !== "All" || 
    sortBy !== "Default";

  // Limit main grid to exactly 3 rows, replacing the last slot with ExploreMoreCard if there are more places
  const totalAllowedMain = 3 * mainGridColumns;
  const hasMoreMain = !isAnyFilterActive && sortedFilteredPlaces.length > totalAllowedMain;
  const mainPlacesToShow = hasMoreMain
    ? sortedFilteredPlaces.slice(0, totalAllowedMain - 1)
    : sortedFilteredPlaces;

  const showExploreMoreMain = !isAnyFilterActive && (hasMoreMain || (sortedFilteredPlaces.length > 0 && sortedFilteredPlaces.length % mainGridColumns !== 0));

  return (
    <div>
      <Navbar />

      {/* Carousel Banner Section */}
      <div className="hero-banner carousel-container">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.tagline}</p>
            </div>
          </div>
        ))}
        {/* Indicators */}
        <div className="carousel-indicators">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              onMouseEnter={() => {
                setCurrentSlide(index);
                setIsPaused(true);
              }}
              onMouseLeave={() => setIsPaused(false)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isAnyFilterActive && (
        <div className="active-filters-bar animate-fade-in">
          <button className="text-clear-filters-btn" onClick={clearAllFilters}>
            ✕ Clear Filters
          </button>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Featured Place of the Day (Only visible when not searching/filtering) */}
          {isDefaultFilter && featuredPlace && (
            <div className="featured-day-section animate-fade-in">
              <h2 className="section-title">
                <LuSparkles style={{ marginRight: "8px", color: "var(--accent)", verticalAlign: "middle" }} />
                Featured Destination of the Day
              </h2>
              <div className="featured-day-card" onClick={() => navigate(`/place/${featuredPlace._id}`)}>
                <img src={featuredPlace.image} alt={featuredPlace.name} className="featured-day-image" />
                <div className="featured-day-content">
                  <span className="featured-day-badge">MUST VISIT</span>
                  <h3>{featuredPlace.name}</h3>
                  <p className="featured-day-loc">{featuredPlace.city}, {featuredPlace.state}</p>
                  <p className="featured-day-desc">{featuredPlace.description}</p>
                  <button className="explore-btn" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/place/${featuredPlace._id}`);
                  }}>
                    Explore Destination →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top Rated Destinations Grid Section */}
          {isDefaultFilter && (
            <div className="top-rated-section animate-fade-in">
              <h2 className="section-title">
                <LuStar style={{ marginRight: "8px", color: "var(--accent)", verticalAlign: "middle" }} />
                Top Rated Destinations
              </h2>
              <div className="places-grid" ref={topRatedGridRef}>
                {topRatedPlaces.map((place) => (
                  <PlaceCard key={`top-${place._id}`} place={place} />
                ))}
                {showExploreMoreTop && <ExploreMoreCard totalCount={places.length} />}
              </div>
            </div>
          )}

          {/* Recently Added Section (Newest first) */}
          {isDefaultFilter && (
            <div className="recently-added-section animate-fade-in">
              <h2 className="section-title">
                <LuCalendar style={{ marginRight: "8px", color: "var(--primary-light)", verticalAlign: "middle" }} />
                Recently Added Places
              </h2>
              <div className="places-grid" ref={recentlyAddedGridRef}>
                {recentlyAddedPlaces.map((place) => (
                  <PlaceCard key={`recent-${place._id}`} place={place} />
                ))}
                {showExploreMoreRecent && <ExploreMoreCard totalCount={places.length} />}
              </div>
            </div>
          )}

          {/* Main Destinations Grid */}
          <div className="main-grid-section animate-fade-in">
            <div className="grid-header-row">
              <h2 className="section-title">
                {!isDefaultFilter ? "Search Results" : "All Destinations"}
              </h2>
            </div>

            <div className="places-grid" ref={mainGridRef}>
              {loadingFiltered ? (
                <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", padding: "40px 0" }}>
                  <Spinner />
                </div>
              ) : sortedFilteredPlaces.length > 0 ? (
                <>
                  {mainPlacesToShow.map((place) => (
                    <PlaceCard key={place._id} place={place} />
                  ))}
                  {showExploreMoreMain && <ExploreMoreCard totalCount={places.length} />}
                </>
              ) : (
                <div className="empty-state">
                  <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <h3>No Destinations Found</h3>
                  <p>We couldn't find any places matching your current search filters. Try selecting different criteria or clearing search term!</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <ChatWidget />
    </div>
  );
}
export default Home;