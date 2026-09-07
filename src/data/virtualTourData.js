/**
 * 360° Virtual Tour & Panorama Dataset
 * Provides equirectangular 360° scenes, interactive architectural hotspots, and Street View coordinates.
 */

export const VIRTUAL_TOUR_SCENES = {
  "jaipur-city-palace": {
    title: "Jaipur City Palace & Mor Chowk",
    subtitle: "Central Royal Courtyard & The Peacock Gate",
    panoramaUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2000&q=80",
    hfov: 110,
    pitch: 0,
    yaw: 0,
    hotspots: [
      {
        id: "peacock-gate",
        pitch: -2,
        yaw: -45,
        title: "The Peacock Gate (Mor Chowk)",
        category: "Architectural Marvel",
        description: "Studded with intricate high-relief glass mosaics of vibrant turquoise and cobalt peacocks, dedicated to Lord Vishnu and the autumn season."
      },
      {
        id: "chandra-mahal",
        pitch: 12,
        yaw: 40,
        title: "Chandra Mahal Spire",
        category: "Royal Residence",
        description: "A commanding seven-tiered palace where the royal flag is hoisted whenever the titular Maharaja is residing inside."
      },
      {
        id: "silver-gangajali",
        pitch: -15,
        yaw: 120,
        title: "Guinness Record Silver Urns",
        category: "Historical Treasure",
        description: "Certified as the world's largest sterling silver vessels, melted from 14,000 silver coins to carry Ganges water to England in 1902."
      }
    ]
  },

  "mysore-palace": {
    title: "Mysore Palace (Amba Vilas)",
    subtitle: "Grand Illuminated Courtyard & Indo-Saracenic Facade",
    panoramaUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b794?w=2000&q=80",
    hfov: 110,
    pitch: 0,
    yaw: 0,
    hotspots: [
      {
        id: "durbar-pillars",
        pitch: 5,
        yaw: -30,
        title: "Acoustic Durbar Hall",
        category: "Acoustic Architecture",
        description: "Featuring grand sculpted pillars painted in gold leaf and turquoise, engineered so the King's voice reverberated clearly across thousands."
      },
      {
        id: "kalyana-mantapa",
        pitch: -8,
        yaw: 60,
        title: "Kalyana Mantapa Stained Glass",
        category: "Royal Pavillion",
        description: "An octagonal marriage hall featuring imported Glasgow stained-glass ceilings and Italian peacock floor mosaics."
      },
      {
        id: "golden-howdah",
        pitch: -12,
        yaw: -110,
        title: "Dasara Golden Howdah",
        category: "State Regalia",
        description: "The 750 kg pure-gold throne carrier mounted on royal elephants during the world-famous Mysore Dasara procession."
      }
    ]
  },

  "taj-mahal": {
    title: "Taj Mahal Complex",
    subtitle: "Yamuna Riverfront & White Marble Mausoleum",
    panoramaUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=2000&q=80",
    hfov: 110,
    pitch: 0,
    yaw: 0,
    hotspots: [
      {
        id: "central-dome",
        pitch: 18,
        yaw: 0,
        title: "The 35-Meter Marble Onion Dome",
        category: "Monumental Engineering",
        description: "Crafted out of pure Makrana white marble, engineered with double-shell acoustics that sustain sound echoes for up to 28 seconds."
      },
      {
        id: "minarets-tilt",
        pitch: 10,
        yaw: -65,
        title: "Earthquake-Resistant Minarets",
        category: "Structural Genius",
        description: "The four outer 40-meter minarets lean outward by 2 degrees so that during an earthquake they collapse outward away from the sacred tomb."
      },
      {
        id: "pietra-dura",
        pitch: -10,
        yaw: 45,
        title: "Pietra Dura Gem Inlay",
        category: "Artisanal Craft",
        description: "Thousands of semi-precious stones (lapis lazuli, jade, crystal, carnelian) inlaid directly into the marble in floral Arabesque patterns."
      }
    ]
  },

  "hampi": {
    title: "Hampi Vittala Temple Complex",
    subtitle: "Vijayanagara Stone Chariot & Monolithic Boulder Hills",
    panoramaUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b794?w=2000&q=80",
    hfov: 110,
    pitch: 0,
    yaw: 0,
    hotspots: [
      {
        id: "stone-chariot",
        pitch: -4,
        yaw: 15,
        title: "The Monolithic Stone Chariot",
        category: "UNESCO Wonder",
        description: "A ceremonial victory shrine built out of carved granite blocks designed to represent Garuda's celestial chariot."
      },
      {
        id: "musical-pillars",
        pitch: 2,
        yaw: -70,
        title: "Musical Pillars of Ranga Mantapa",
        category: "Acoustic Wonder",
        description: "Fifty-six slender monolithic granite pillars tuned to resonate seven pure classical Indian musical notes (Sa Re Ga Ma) when tapped."
      },
      {
        id: "matanga-hill",
        pitch: 14,
        yaw: 115,
        title: "Ancient Kishkindha Boulders",
        category: "Mythological Setting",
        description: "The mythical monkey kingdom from the Ramayana where Lord Rama forged his bond with Hanuman and Sugriva."
      }
    ]
  },

  "coorg": {
    title: "Coorg (Madikeri) Panorama",
    subtitle: "Raja's Seat & The Misty Western Ghats",
    panoramaUrl: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=2000&q=80",
    hfov: 110,
    pitch: 0,
    yaw: 0,
    hotspots: [
      {
        id: "rajas-seat",
        pitch: -6,
        yaw: -20,
        title: "Raja's Seat Sunset Viewpoint",
        category: "Royal Heritage",
        description: "The favorite vantage point of the Haleri Kings of Kodagu, who spent twilight evenings watching the sunset across foggy valleys."
      },
      {
        id: "coffee-estates",
        pitch: -15,
        yaw: 75,
        title: "Shaded Arabica Plantations",
        category: "Natural Landscape",
        description: "Lush coffee estates canopying pepper vines and silver oak trees, giving Coorg its celebrated fresh mountain aroma."
      },
      {
        id: "cauvery-origin",
        pitch: 10,
        yaw: -120,
        title: "Talakaveri Sacred Range",
        category: "Sacred Geography",
        description: "The sacred birthplace of South India's life-giving River Cauvery atop the Brahmagiri hill range."
      }
    ]
  }
};

/**
 * Category-based fallback 360 panoramic images for admin/newly added places
 */
export const CATEGORY_360_FALLBACKS = {
  Beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=80",
  Mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80",
  Hillstation: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=2000&q=80",
  Historical: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2000&q=80",
  Temple: "https://images.unsplash.com/photo-1600100397608-f010f443b794?w=2000&q=80",
  Nature: "https://images.unsplash.com/photo-1511497584788-87676104235f?w=2000&q=80",
  Waterfall: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=2000&q=80"
};

/**
 * Helper to match or dynamically construct virtual tour scene for any destination
 */
export function getVirtualTourData(place) {
  if (!place) return null;

  const slug = (place.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  let tour = VIRTUAL_TOUR_SCENES[slug];
  if (!tour) {
    if (slug.includes("jaipur") || slug.includes("city-palace")) tour = VIRTUAL_TOUR_SCENES["jaipur-city-palace"];
    else if (slug.includes("mysore") || slug.includes("mysuru")) tour = VIRTUAL_TOUR_SCENES["mysore-palace"];
    else if (slug.includes("taj") || slug.includes("mahal")) tour = VIRTUAL_TOUR_SCENES["taj-mahal"];
    else if (slug.includes("hampi")) tour = VIRTUAL_TOUR_SCENES["hampi"];
    else if (slug.includes("coorg") || slug.includes("madikeri") || slug.includes("kodagu")) tour = VIRTUAL_TOUR_SCENES["coorg"];
  }

  if (tour) {
    return {
      ...tour,
      isCurated: true,
      latitude: place.latitude,
      longitude: place.longitude
    };
  }

  // Dynamic fallback for any other or admin-added destination
  const cat = place.category || "Historical";
  const fallbackUrl = CATEGORY_360_FALLBACKS[cat] || place.image || CATEGORY_360_FALLBACKS["Historical"];

  return {
    title: `${place.name} 360° Panorama`,
    subtitle: `${place.city || "Destination"}, ${place.state || "India"} • ${cat} Exploration`,
    panoramaUrl: fallbackUrl,
    hfov: 110,
    pitch: 0,
    yaw: 0,
    isCurated: false,
    latitude: place.latitude,
    longitude: place.longitude,
    hotspots: [
      {
        id: "main-highlight",
        pitch: 0,
        yaw: 0,
        title: place.name,
        category: cat,
        description: place.description || `Experience the panoramic atmosphere and stunning vista of ${place.name}.`
      },
      {
        id: "best-time-spot",
        pitch: -10,
        yaw: 60,
        title: "Ideal Season",
        category: "Travel Advisory",
        description: `Recommended to explore during ${place.bestTime || "pleasant weather months"} for clear panoramic visibility.`
      }
    ]
  };
}
