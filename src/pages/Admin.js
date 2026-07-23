import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useToast } from "../ToastContext";
import { LuMap, LuFileText, LuStar, LuChartBar } from "react-icons/lu";

function Admin({ places, deletePlace }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null); // 'name' or 'state'
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewsList, setReviewsList] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showRatingsModal, setShowRatingsModal] = useState(false);
  const [selectedReviewCategory, setSelectedReviewCategory] = useState("All");

  const [categoriesList, setCategoriesList] = useState(["Beach", "Hill Station", "Temple", "City"]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [deleteConfirmState, setDeleteConfirmState] = useState({ show: false, placeId: null, placeName: "" });

  useEffect(() => {
    const fetchAllReviews = async () => {
      setLoadingReviews(true);
      try {
        const allReviewsData = await Promise.all(
          places.map(async (place) => {
            const res = await axios.get(`http://localhost:5000/api/reviews/${place._id}`);
            return (res.data || []).map((rev) => ({
              ...rev,
              placeName: place.name,
              placeImage: place.image,
              placeId: place._id,
              placeCategory: place.category || "Other"
            }));
          })
        );
        const flattened = allReviewsData.flat();
        flattened.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setReviewsList(flattened);
        setTotalReviews(flattened.length);
      } catch (err) {
        console.error("Error fetching all reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (places.length > 0) {
      fetchAllReviews();
    }
  }, [places]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        let loaded = [];
        if (Array.isArray(res.data)) {
          loaded = res.data.map(c => typeof c === 'object' ? c.name : c);
        }
        if (loaded.length > 0) {
          setCategoriesList(loaded);
        }
      } catch (err) {
        console.error("Error loading categories in Admin:", err);
      }
    };
    loadCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/categories", { name: newCategoryName.trim() });
      showToast("✅ Category added successfully!", "success");
      setNewCategoryName("");
      setShowAddCategory(false);
      // Reload categories list
      const res = await axios.get("http://localhost:5000/api/categories");
      let loaded = [];
      if (Array.isArray(res.data)) {
        loaded = res.data.map(c => typeof c === 'object' ? c.name : c);
      }
      if (loaded.length > 0) {
        setCategoriesList(loaded);
      }
    } catch (err) {
      console.error("Error adding category:", err);
      showToast("❌ Failed to add category", "danger");
    }
  };

  const triggerDeleteConfirm = (id, name) => {
    setDeleteConfirmState({ show: true, placeId: id, placeName: name });
  };

  const executeDelete = () => {
    deletePlace(deleteConfirmState.placeId);
    showToast(`✅ Deleted "${deleteConfirmState.placeName}" successfully!`, "success");
    setDeleteConfirmState({ show: false, placeId: null, placeName: "" });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Stats calculation
  const totalPlaces = places.length;
  let sumRating = 0;
  let countRated = 0;
  const categoryCounts = {};
  const categoryStats = {};

  // Initialize all categories in categoriesList with a count of 0
  categoriesList.forEach((cat) => {
    categoryCounts[cat] = 0;
    categoryStats[cat] = { totalPlaces: 0, sumRatings: 0, ratedCount: 0 };
  });

  places.forEach((place) => {
    // Categories count
    const cat = place.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

    if (!categoryStats[cat]) {
      categoryStats[cat] = { totalPlaces: 0, sumRatings: 0, ratedCount: 0 };
    }
    categoryStats[cat].totalPlaces += 1;

    // Rating averages
    const ratingVal = Number(place.rating || 0);
    if (ratingVal > 0) {
      sumRating += ratingVal;
      countRated++;
      categoryStats[cat].sumRatings += ratingVal;
      categoryStats[cat].ratedCount += 1;
    }
  });

  const avgRatingGlobal = countRated > 0 ? (sumRating / countRated).toFixed(1) : "No ratings yet";
  
  const categoryAverages = Object.entries(categoryStats).map(([cat, stats]) => {
    const avg = stats.ratedCount > 0 ? (stats.sumRatings / stats.ratedCount).toFixed(1) : "No ratings yet";
    return {
      category: cat,
      totalPlaces: stats.totalPlaces,
      averageRating: avg
    };
  });

  const categorySummaryString = Object.entries(categoryCounts)
    .map(([cat, count]) => `${cat}: ${count}`)
    .join(" | ");

  // Filter based on search input & category filter
  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || (place.category || "Other") === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort filtered places
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn].toLowerCase();
    const valB = b[sortColumn].toLowerCase();
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const reviewCategories = ["All", ...categoriesList];
  const filteredReviewsList = selectedReviewCategory === "All"
    ? reviewsList
    : reviewsList.filter((rev) => rev.placeCategory === selectedReviewCategory);

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <div className="admin-header-container animate-fade-in">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <button className="add-btn" onClick={() => navigate("/admin/add")}>
              + Add Tourist Place
            </button>
          </div>
        </div>

        {/* Dashboard Stats Row */}
        <div className="admin-stats-row animate-fade-in">
          <div className="admin-stat-card">
            <span className="stat-icon" style={{ display: "inline-flex", alignItems: "center" }}><LuMap /></span>
            <div className="stat-info">
              <h3>{totalPlaces}</h3>
              <p>Total Places</p>
            </div>
          </div>
          <div 
            className="admin-stat-card clickable-stat-card" 
            onClick={() => setShowReviewsModal(true)}
            title="Click to view all reviews details"
          >
            <span className="stat-icon" style={{ display: "inline-flex", alignItems: "center" }}><LuFileText /></span>
            <div className="stat-info">
              <h3>{totalReviews}</h3>
              <p>Total Reviews (Click to View)</p>
            </div>
          </div>
          <div 
            className="admin-stat-card clickable-stat-card" 
            onClick={() => setShowRatingsModal(true)}
            title="Click to view category-wise average ratings"
          >
            <span className="stat-icon" style={{ display: "inline-flex", alignItems: "center" }}><LuStar /></span>
            <div className="stat-info">
              <h3>{avgRatingGlobal}</h3>
              <p>Average Rating (Click to View)</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <span className="stat-icon" style={{ display: "inline-flex", alignItems: "center" }}><LuChartBar /></span>
            <div className="stat-info">
              <h3 className="category-stat-text" title={categorySummaryString}>
                {categoriesList.length}
              </h3>
              <p>Categories</p>
            </div>
          </div>
        </div>

        {/* Category Bonus Info Bar */}
        <div className="category-info-bar animate-fade-in">
          {totalPlaces > 0 ? (
            <>
              <strong>Category Distribution:</strong>
              <span className="category-distribution-list">
                {Object.entries(categoryCounts).map(([cat, count], idx) => {
                  const isActive = categoryFilter === cat;
                  return (
                    <span key={cat}>
                      {idx > 0 && <span className="category-sep">|</span>}
                      <button
                        className={`category-dist-btn ${isActive ? "active-cat-filter" : ""}`}
                        onClick={() => setCategoryFilter(cat)}
                        title={`Filter by ${cat}`}
                      >
                        {cat}: {count}
                      </button>
                    </span>
                  );
                })}
              </span>
              {categoryFilter && (
                <button 
                  className="clear-cat-filter-btn"
                  onClick={() => setCategoryFilter(null)}
                >
                  ✕ Clear filter
                </button>
              )}
            </>
          ) : (
            <strong>No categories with places yet.</strong>
          )}
          <button className="add-category-inline-btn" onClick={() => setShowAddCategory(true)}>
            + Add Category
          </button>
        </div>

        {/* Real-time Search input */}
        <div className="admin-search-wrapper animate-fade-in">
          <input
            type="text"
            className="admin-search-input"
            placeholder="🔍 Search places by name in table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="admin-search-clear-btn"
              onClick={() => setSearchTerm("")}
              title="Clear search"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th 
                  onClick={() => handleSort("name")}
                  className={`sortable-th ${sortColumn === "name" ? `sorted-${sortDirection}` : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  Name {sortColumn === "name" ? (sortDirection === "asc" ? "▲" : "▼") : "↕"}
                </th>
                <th 
                  onClick={() => handleSort("state")}
                  className={`sortable-th ${sortColumn === "state" ? `sorted-${sortDirection}` : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  State {sortColumn === "state" ? (sortDirection === "asc" ? "▲" : "▼") : "↕"}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlaces.length > 0 ? (
                sortedPlaces.map((place) => (
                  <tr key={place._id}>
                    <td>
                      <img src={place.image} alt={place.name} className="admin-thumb" />
                    </td>
                    <td className="place-name-td">{place.name}</td>
                    <td>{place.state}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/admin/edit/${place._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => triggerDeleteConfirm(place._id, place.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="admin-table-empty-cell">
                    <div className="admin-table-empty-state animate-fade-in">
                      <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                      <h3>No Places Found</h3>
                      <p>We couldn't find any tourist places matching your current search or category filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Overlay for All User Reviews */}
        {showReviewsModal && (
          <div className="admin-modal-backdrop" onClick={() => setShowReviewsModal(false)}>
            <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>All User Reviews</h2>
                <button className="close-modal-btn" onClick={() => setShowReviewsModal(false)}>✕</button>
              </div>
              
              <div className="modal-body">
                {/* Category tabs inside reviews modal */}
                {reviewsList.length > 0 && (
                  <div className="modal-category-filters">
                    {reviewCategories.map((cat) => (
                      <button
                        key={cat}
                        className={`modal-cat-pill ${selectedReviewCategory === cat ? "active" : ""}`}
                        onClick={() => setSelectedReviewCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {loadingReviews ? (
                  <div className="modal-loading">
                    <p>Loading user reviews...</p>
                  </div>
                ) : filteredReviewsList.length > 0 ? (
                  <div className="admin-reviews-list">
                    {filteredReviewsList.map((rev) => (
                      <div key={rev._id} className="admin-review-card">
                        <img src={rev.placeImage} alt={rev.placeName} className="admin-review-thumb" />
                        <div className="admin-review-details">
                          <div className="admin-review-meta">
                            <h4>{rev.placeName}</h4>
                            <span className="admin-review-rating" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <LuStar style={{ fill: "var(--accent)", color: "var(--accent)" }} /> {rev.rating || 0}
                            </span>
                          </div>
                          <p className="admin-review-text">"{rev.comment}"</p>
                          <div className="admin-review-user-info">
                            {(rev.userEmail || rev.username) && (
                              <span>Written by: <strong>{rev.userEmail || rev.username}</strong></span>
                            )}
                            {rev.createdAt && (
                              <span className="admin-review-date">
                                {new Date(rev.createdAt).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="modal-empty-state">
                    <p>
                      {reviewsList.length > 0
                        ? `No reviews found in the "${selectedReviewCategory}" category.`
                        : "No reviews have been written yet."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Overlay for Category-Wise Average Ratings */}
        {showRatingsModal && (
          <div className="admin-modal-backdrop" onClick={() => setShowRatingsModal(false)}>
            <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Category-Wise Average Ratings</h2>
                <button className="close-modal-btn" onClick={() => setShowRatingsModal(false)}>✕</button>
              </div>
              
              <div className="modal-body">
                <div className="admin-categories-ratings-list">
                  {categoryAverages.map((catStat) => (
                    <div key={catStat.category} className="admin-category-rating-card">
                      <div className="category-rating-info">
                        <h4>{catStat.category}</h4>
                        <p>{catStat.totalPlaces} {catStat.totalPlaces === 1 ? "destination" : "destinations"}</p>
                      </div>
                      <div className="category-rating-value">
                        {catStat.averageRating !== "No ratings yet" ? (
                          <>
                            <span className="rating-star" style={{ display: "inline-flex", alignItems: "center" }}>
                              <LuStar style={{ fill: "var(--accent)", color: "var(--accent)" }} />
                            </span>
                            <span className="rating-number">{catStat.averageRating}</span>
                          </>
                        ) : (
                          <span className="no-rating-text">No ratings yet</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Overlay for Creating New Category */}
        {showAddCategory && (
          <div className="admin-modal-backdrop" onClick={() => setShowAddCategory(false)}>
            <div className="admin-modal-content category-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create New Category</h2>
                <button className="close-modal-btn" onClick={() => setShowAddCategory(false)}>✕</button>
              </div>
              <form onSubmit={handleAddCategory} className="modal-form-body">
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Wildlife Sanctuary"
                    className="admin-modal-input"
                    autoFocus
                    required
                  />
                </div>
                <div className="modal-form-actions">
                  <button type="button" className="modal-cancel-btn" onClick={() => setShowAddCategory(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="modal-submit-btn">
                    Save Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Overlay for Confirm Delete */}
        {deleteConfirmState.show && (
          <div className="admin-modal-backdrop" onClick={() => setDeleteConfirmState({ show: false, placeId: null, placeName: "" })}>
            <div className="admin-modal-content category-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Confirm Delete</h2>
                <button className="close-modal-btn" onClick={() => setDeleteConfirmState({ show: false, placeId: null, placeName: "" })}>✕</button>
              </div>
              <div className="modal-body text-center" style={{ padding: "20px 0" }}>
                <p style={{ fontSize: "1.1rem", marginBottom: "24px", color: "var(--text-main)", textAlign: "center" }}>
                  Are you sure you want to delete <strong>"{deleteConfirmState.placeName}"</strong>?
                </p>
                <div className="modal-form-actions" style={{ justifyContent: "center", gap: "16px" }}>
                  <button type="button" className="modal-cancel-btn" style={{ padding: "10px 24px" }} onClick={() => setDeleteConfirmState({ show: false, placeId: null, placeName: "" })}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="modal-submit-btn" 
                    style={{ backgroundColor: "var(--danger)", color: "white", border: "none", padding: "10px 24px" }} 
                    onClick={executeDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;