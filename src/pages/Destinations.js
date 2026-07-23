import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PlaceCard from "../components/PlaceCard";
import Spinner from "../components/Spinner";

function Destinations() {
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 6; // 6 places per page

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        // Query the backend to get all places
        const res = await axios.get("http://localhost:5000/api/places/all", {
          params: { page: 1, limit: 100 }
        });
        
        let allPlaces = [];
        if (Array.isArray(res.data)) {
          allPlaces = res.data;
        } else if (res.data) {
          allPlaces = res.data.places || res.data.data || [];
        }

        // Show ONLY the remaining destinations (skip the first 11 places shown on Home page main grid)
        const remainingPlaces = allPlaces.slice(11);
        
        // Paginate remaining places on the client side
        const paginated = remainingPlaces.slice((page - 1) * limit, page * limit);
        const pagesCount = Math.ceil(remainingPlaces.length / limit);

        setPlaces(paginated);
        setTotalPages(pagesCount || 1);
      } catch (err) {
        console.error("Error fetching paginated destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [page]);

  return (
    <div>
      <Navbar />
      <div className="destinations-container animate-fade-in">
        <div className="destinations-header">
          <h1>Explore All Destinations</h1>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {places.length > 0 ? (
              <div className="places-grid">
                {places.map((place) => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <h3>No Destinations Found</h3>
                <p>No remaining destinations found to display.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  aria-label="Previous Page"
                >
                  ←
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === page;
                    return (
                      <button
                        key={pageNum}
                        className={`pagination-num-btn ${isActive ? "active" : ""}`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page >= totalPages}
                  aria-label="Next Page"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Destinations;
