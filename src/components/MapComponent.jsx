// src/MapComponent.jsx
import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import seedData from "./../data/seed.json";
import { calculateDistance } from "../utils";
// import SetView from "./SetView";
import FilterControls from "./FilterControls";
import { currentLocationIcon } from "../mapIcons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

const MapComponent = () => {
  // default position in London
  const position = [51.505, -0.09];
  // states to rerender map on filter change
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);

  // this interacts with SetView component to set zoom level based on max distance
  useEffect(() => {
    if (maxDistance <= 5) setZoomLevel(15);
    else if (maxDistance <= 10) setZoomLevel(11);
    else if (maxDistance <= 25) setZoomLevel(9);
    else if (maxDistance <= 50) setZoomLevel(8);
    else setZoomLevel(5);
  }, [maxDistance]);

  const toggleFilters = () => setShowFilters((prev) => !prev);
  // remove all filters
  const clearFilters = () => {
    setSelectedType("All");
    setSelectedDate("");
    setMaxDistance(10);
    setZoomLevel(11);
  };

  // filter dataset
  const filteredEvents = seedData.filter((event) => {
    if (selectedType !== "All" && event.eventType !== selectedType)
      return false;
    if (
      selectedDate &&
      new Date(event.startTime).toDateString() !==
        new Date(selectedDate).toDateString()
    )
      return false;

    // find haversine distance between current location and event location
    const distance = calculateDistance(
      position[0],
      position[1],
      event.coordinates[0],
      event.coordinates[1]
    );
    return distance <= maxDistance;
  });

  // marker cluster using pure leaflet
  // NOTE: since we're using pure leaflet, we don't need to use the SetView component hook anymore. We can set the zoom level directly in the useEffect hook.
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView(position, zoomLevel);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Create a marker cluster group
    const markers = L.markerClusterGroup();

    // Add filtered events as markers
    filteredEvents.forEach((event) => {
      const marker = L.marker(event.coordinates).bindPopup(`
          <strong>${event.eventName}</strong><br>
          Type: ${event.eventType}<br>
          Description: ${event.description}<br>
          Start: ${new Date(event.startTime).toLocaleString()}<br>
          End: ${new Date(event.endTime).toLocaleString()}<br>
          Weather: ${event.weather}<br>
          Distance: ${calculateDistance(
            position[0],
            position[1],
            event.coordinates[0],
            event.coordinates[1]
          ).toFixed(2)} miles
        `);
      markers.addLayer(marker);
    });

    // Add marker cluster to the map
    map.addLayer(markers);

    // add current user location
    L.marker(position, { icon: currentLocationIcon })
      .addTo(map)
      .bindPopup("Current Location");

    // Clean up the map on component unmount
    return () => {
      map.remove();
    };
  }, [filteredEvents, zoomLevel]);

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <FilterControls
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        clearFilters={clearFilters}
        toggleFilters={toggleFilters}
        showFilters={showFilters}
      />
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};

export default MapComponent;