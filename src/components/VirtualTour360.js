import React, { useState } from "react";
import { 
  LuCompass, 
  LuMaximize2, 
  LuExternalLink 
} from "react-icons/lu";

function VirtualTour360({ place }) {
  const [showLargeModal, setShowLargeModal] = useState(false);

  if (!place || !place.latitude || !place.longitude) {
    return null;
  }

  const lat = Number(place.latitude);
  const lng = Number(place.longitude);

  /**
   * High-detail Satellite Aerial embed URL
   */
  const streetViewEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="virtual-tour-card animate-fade-in">
      {/* Header */}
      <div className="virtual-tour-header">
        <div className="virtual-tour-title-block">
          <div>
            <h3 className="card-header-title">
              <LuCompass className="card-header-icon tour-compass-icon" />
              Aerial View
            </h3>
            <p className="virtual-tour-sub">
              {place.name}, {place.city}, {place.state} • Satellite Aerial Exploration
            </p>
          </div>
        </div>
      </div>

      {/* Main Aerial Viewport */}
      <div className="virtual-tour-viewport-wrap">
        <iframe
          title="aerial-view"
          className="virtual-tour-iframe"
          src={streetViewEmbedUrl}
        />

        {/* Overlay Action Bar */}
        <div className="tour-viewport-toolbar">
          <a
            href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tour-tool-btn external-streetview-btn"
            title="Open Full Google Street View 360° in new tab"
          >
            <LuExternalLink style={{ marginRight: "6px" }} /> Street View 360°
          </a>

          <button
            type="button"
            className="tour-tool-btn fullscreen-btn"
            onClick={() => setShowLargeModal(true)}
            title="Expand Fullscreen Aerial View"
          >
            <LuMaximize2 style={{ marginRight: "6px" }} /> Fullscreen
          </button>
        </div>

        {/* Drag Hint Watermark */}
        <div className="tour-drag-hint">
          <span>🖐️ Drag and zoom to explore aerial terrain</span>
        </div>
      </div>

      {/* Large Fullscreen Aerial Modal */}
      {showLargeModal && (
        <div className="large-map-modal-overlay" onClick={() => setShowLargeModal(false)}>
          <div className="large-map-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="large-map-modal-header">
              <div className="large-map-header-left">
                <span className="large-map-kicker">Fullscreen Aerial View</span>
                <h3>{place.name}</h3>
                <p>{place.city}, {place.state} • Satellite aerial view</p>
              </div>
              <div className="large-map-header-actions">
                <a
                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-maps-direct-btn"
                >
                  <LuExternalLink style={{ marginRight: "6px" }} /> Google 360° View
                </a>
                <button
                  type="button"
                  className="large-map-close-btn"
                  onClick={() => setShowLargeModal(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="large-map-frame-wrap" style={{ height: "560px" }}>
              <iframe
                title="large-aerial-view"
                width="100%"
                height="560"
                style={{ border: "none", width: "100%", height: "560px", display: "block" }}
                src={streetViewEmbedUrl}
              />
            </div>

            <div className="large-map-footer">
              <span className="coordinate-badge">
                <LuCompass style={{ color: "var(--primary-light)", marginRight: "6px" }} />
                Aerial Satellite View • GPS: {lat}, {lng}
              </span>
              <button
                type="button"
                className="large-map-done-btn"
                onClick={() => setShowLargeModal(false)}
              >
                Close Aerial View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VirtualTour360;
