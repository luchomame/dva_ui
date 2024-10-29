// src/MapComponent.jsx
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import seedData from "./data/seed.json";
import L from "leaflet"; // needed for custom icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faFilter } from "@fortawesome/free-solid-svg-icons";

// use font awesome icon as custom marker for current location
const currentLocationIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FontAwesomeIcon
      icon={faThumbtack}
      style={{ color: "red", fontSize: "30px" }}
    />
  ),
  iconSize: [30, 30],
  className: "custom-marker-icon", // Optional custom class for additional styling
});

const MapComponent = () => {
  // initial center and zoom level
  const position = [51.505, -0.09]; // default to London for now
  /*
        TileLayer:
            {s}: subdomain for loading tiles. lets you load tiles from multiple subdomains to improve loading speed
            {z}: zoom level
            {x}: x-coordinate of the tile
            {y}: y-coordinate of the tile
    */

  // State for filters
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [maxDistance, setMaxDistance] = useState(10); // in miles or km as preferred
  const [showFilters, setShowFilters] = useState(false); // for filters

  // clear filters
  const clearFilters = () => {
    setSelectedType("All");
    setSelectedDate("");
    setMaxDistance(10);
  };

  // toggle filter visibility
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  // Filtered event data based on filters
  const filteredEvents = seedData.filter((event) => {
    // Filter by event type
    if (selectedType !== "All" && event.eventType !== selectedType) {
      return false;
    }
    // Filter by date
    if (
      selectedDate &&
      new Date(event.startTime).toDateString() !==
        new Date(selectedDate).toDateString()
    ) {
      return false;
    }
    // filter by distance (simplified here replace with a distance calculation if needed)
    return true;
  });

  return (
    <div style={{ display: "flex", position: "relative" }}>
      {/* Filter toggle button in the top-left corner */}
      <button
        onClick={toggleFilters}
        style={{
          position: "absolute",
          top: "100px",
          left: "10px",
          zIndex: 1000,
          backgroundColor: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        <FontAwesomeIcon icon={faFilter} style={{ fontSize: "20px" }} />
      </button>
      {/* Conditional rendering of filter panel */}
      {showFilters && (
        <div
          style={{
            width: "20%",
            padding: "10px",
            backgroundColor: "#fffff",
          }}
        >
          <h3>Filter Events</h3>

          <label>Event Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
          </select>

          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <label>Max Distance (mi):</label>
          <input
            type="number"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
          />

          {/* Clear Filters Button */}
          <button onClick={clearFilters} style={{ marginTop: "10px" }}>
            Clear Filters
          </button>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* display filtered stuff */}
        {filteredEvents.map((event, index) => (
          <Marker key={index} position={event.coordinates}>
            <Popup>
              <strong>{event.eventName}</strong>
              <br />
              Type: {event.eventType}
              <br />
              Description: {event.description}
              <br />
              Start: {new Date(event.startTime).toLocaleString()}
              <br />
              End: {new Date(event.endTime).toLocaleString()}
            </Popup>
          </Marker>
        ))}

        <Marker position={position} icon={currentLocationIcon}>
          <Popup>Current Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
