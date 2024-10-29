// src/components/FilterControls.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const FilterControls = ({
  selectedType,
  setSelectedType,
  selectedDate,
  setSelectedDate,
  maxDistance,
  setMaxDistance,
  clearFilters,
  toggleFilters,
  showFilters,
  selectedWeather,
  setSelectedWeather,
}) => (
  <>
    {/* <button
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
      <FontAwesomeIcon
        icon={faFilter}
        style={{ fontSize: "20px", color: "#000" }}
      />
    </button> */}

    {/*  I don't like that we have to make it 100% to use the grid layout. width used to be 20% in case we wanna revert.*/}
    {showFilters && (
      <div
        style={{ width: "100%", padding: "10px", backgroundColor: "#808080" }}
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
        <select
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
        >
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
          <option value="50">50 miles</option>
          <option value="100">100 miles</option>
        </select>

        <label>Forecasted Weather:</label>
        <select
          value={selectedWeather}
          onChange={(e) => setSelectedWeather(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Sunny">Sunny</option>
          <option value="Rainy">Rainy</option>
          <option value="Cloudy">Cloudy</option>
          <option value="Windy">Windy</option>
        </select>

        <button onClick={clearFilters} style={{ marginTop: "10px" }}>
          Clear Filters
        </button>
      </div>
    )}
  </>
);

export default FilterControls;
