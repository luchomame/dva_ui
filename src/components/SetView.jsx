// src/components/SetView.jsx
// DEPRECIATED FOR NOW!!!!!!!!!!!!!!
// SETTING THE ZOOM DIRECTLY IN MAPCOMPONENT.JSX USING pure leaflet
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const SetView = ({ zoomLevel, position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, zoomLevel); // Update map view when zoomLevel or position changes
  }, [zoomLevel, position, map]);

  return null;
};

export default SetView;

/*
// new component to set view based on zoom level and position. need this AND the useEffect in MapComponent
// also need to use useMap hook from react-leaflet
const SetView = ({ zoomLevel, position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, zoomLevel); // Update map view when zoomLevel or position changes
  }, [zoomLevel, position, map]);

  return null;
};

*/
