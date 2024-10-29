// // src/MapComponent.jsx
// import React, { useState, useEffect } from "react";
// import ReactDOMServer from "react-dom/server";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import seedData from "./data/seed.json";
// import L from "leaflet"; // needed for custom icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbtack, faFilter } from "@fortawesome/free-solid-svg-icons";

// // Haversine formula to calculate distance between two coordinates
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 3958.8; // radius of Earth in kilometers. Use 3958.8 for miles. Use 6371 for km
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) * // convert to radians
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // angular distance in radians
//   return R * c; // convert angle to distance
// }

// // new component to set view based on zoom level and position. need this AND the useEffect in MapComponent
// // also need to use useMap hook from react-leaflet
// const SetView = ({ zoomLevel, position }) => {
//   const map = useMap();

//   useEffect(() => {
//     map.setView(position, zoomLevel); // Update map view when zoomLevel or position changes
//   }, [zoomLevel, position, map]);

//   return null;
// };

// // use font awesome icon as custom marker for current location
// const currentLocationIcon = L.divIcon({
//   html: ReactDOMServer.renderToString(
//     <FontAwesomeIcon
//       icon={faThumbtack}
//       style={{ color: "red", fontSize: "30px" }}
//     />
//   ),
//   iconSize: [30, 30],
//   className: "custom-marker-icon", // Optional custom class for additional styling
// });

// const MapComponent = () => {
//   // initial center and zoom level
//   const position = [51.505, -0.09]; // default to London for now
//   /*
//         TileLayer:
//             {s}: subdomain for loading tiles. lets you load tiles from multiple subdomains to improve loading speed
//             {z}: zoom level
//             {x}: x-coordinate of the tile
//             {y}: y-coordinate of the tile
//     */

//   // State for filters
//   const [selectedType, setSelectedType] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [maxDistance, setMaxDistance] = useState(10); // in miles or km as preferred
//   const [showFilters, setShowFilters] = useState(false); // for filters
//   const [zoomLevel, setZoomLevel] = useState(13); // for zoom level

//   // Update zoom level based on maxDistance
//   useEffect(() => {
//     if (maxDistance <= 5) setZoomLevel(15);
//     else if (maxDistance <= 10) setZoomLevel(13);
//     else if (maxDistance <= 25) setZoomLevel(11);
//     else if (maxDistance <= 50) setZoomLevel(9);
//     else setZoomLevel(8); // For 100 miles or more
//   }, [maxDistance]);

//   // clear filters
//   const clearFilters = () => {
//     setSelectedType("All");
//     setSelectedDate("");
//     setMaxDistance(10);
//   };

//   // toggle filter visibility
//   const toggleFilters = () => {
//     setShowFilters((prev) => !prev);
//   };

//   // Filtered event data based on filters
//   const filteredEvents = seedData.filter((event) => {
//     // Filter by event type
//     if (selectedType !== "All" && event.eventType !== selectedType) {
//       return false;
//     }
//     // Filter by date
//     if (
//       selectedDate &&
//       new Date(event.startTime).toDateString() !==
//         new Date(selectedDate).toDateString()
//     ) {
//       return false;
//     }
//     // filter by distance (simplified here replace with a distance calculation if needed)
//     // return true;
//     // Filter by distance
//     const distance = calculateDistance(
//       position[0], // User's latitude
//       position[1], // User's longitude
//       event.coordinates[0], // Event latitude
//       event.coordinates[1] // Event longitude
//     );
//     console.log(
//       "Event:",
//       event.eventName,
//       "| Distance:",
//       distance,
//       "| Max Distance:",
//       maxDistance
//     );

//     return distance <= maxDistance;
//   });

//   // console.log("Filtered Events:", filteredEvents); // Log the filtered events to see which ones pass

//   return (
//     <div style={{ display: "flex", position: "relative" }}>
//       {/* Filter toggle button in the top-left corner */}
//       <button
//         onClick={toggleFilters}
//         style={{
//           position: "absolute",
//           top: "100px",
//           left: "10px",
//           zIndex: 1000,
//           backgroundColor: "#fff",
//           border: "none",
//           padding: "10px",
//           borderRadius: "5px",
//           cursor: "pointer",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//         }}
//       >
//         <FontAwesomeIcon
//           icon={faFilter}
//           style={{ fontSize: "20px", color: "#000" }}
//         />
//       </button>
//       {/* Conditional rendering of filter panel */}
//       {showFilters && (
//         <div
//           style={{
//             width: "20%",
//             padding: "10px",
//             backgroundColor: "#fffff",
//           }}
//         >
//           <h3>Filter Events</h3>

//           <label>Event Type:</label>
//           <select
//             value={selectedType}
//             onChange={(e) => setSelectedType(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="Outdoor">Outdoor</option>
//             <option value="Indoor">Indoor</option>
//           </select>

//           <label>Date:</label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />

//           {/* WHY IS THIS SHIT NOT WORKING */}
//           <label>Max Distance (mi):</label>
//           <select
//             value={maxDistance}
//             onChange={(e) => {
//               const distance = Number(e.target.value);
//               setMaxDistance(distance);
//               console.log("Selected maxDistance:", distance); // Log the selected distance
//             }}
//           >
//             <option value="5">5 miles</option>
//             <option value="10">10 miles</option>
//             <option value="25">25 miles</option>
//             <option value="50">50 miles</option>
//             <option value="100">100 miles</option>
//           </select>

//           {/* Clear Filters Button */}
//           <button onClick={clearFilters} style={{ marginTop: "10px" }}>
//             Clear Filters
//           </button>
//         </div>
//       )}

//       {/* Map */}
//       <MapContainer
//         center={position}
//         style={{ height: "100vh", width: "100%" }}
//       >
//         <SetView zoomLevel={zoomLevel} position={position} />

//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* display filtered stuff */}
//         {filteredEvents.map((event, index) => (
//           <Marker key={index} position={event.coordinates}>
//             <Popup>
//               <strong>{event.eventName}</strong>
//               <br />
//               Type: {event.eventType}
//               <br />
//               Description: {event.description}
//               <br />
//               Start: {new Date(event.startTime).toLocaleString()}
//               <br />
//               End: {new Date(event.endTime).toLocaleString()}
//             </Popup>
//           </Marker>
//         ))}

//         <Marker position={position} icon={currentLocationIcon}>
//           <Popup>Current Location</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;
