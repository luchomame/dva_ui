// src/mapIcons.js
import React from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

export const currentLocationIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    React.createElement(FontAwesomeIcon, {
      icon: faThumbtack,
      style: { color: "red", fontSize: "30px" },
    })
  ),
  iconSize: [30, 30],
  className: "custom-marker-icon",
});

// // use font awesome icon as custom marker for current location
// const currentLocationIcon = L.divIcon({
//     html: ReactDOMServer.renderToString(
//       <FontAwesomeIcon
//         icon={faThumbtack}
//         style={{ color: "red", fontSize: "30px" }}
//       />
//     ),
//     iconSize: [30, 30],
//     className: "custom-marker-icon", // Optional custom class for additional styling
//   });
