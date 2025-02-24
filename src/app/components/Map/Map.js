
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";  // Import Leaflet for custom icon
import "leaflet/dist/leaflet.css";
import './Map.css'; // Ensure you import the styles

const Map = ({ coordinates }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (coordinates.length > 0 && mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [coordinates]);

  return (
    <MapContainer
      center={[51.505, -0.09]} // Default center of the map
      zoom={2} // Initial zoom level
      style={{ width: "100%", height: "440px" }} // Set the height properly
    >
      {/* TileLayer from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {coordinates.map((coord, index) => {
        const balloonIcon = new L.DivIcon({
          className: 'balloon-icon', // The class for your custom marker
          html: `<div class="balloon-dot">${index + 1}</div>`, // Custom HTML content
          iconSize: [30, 30], // Size of the marker
          iconAnchor: [15, 15] // Center the icon at the middle
        });

        return (
          <Marker
            key={index}
            position={[coord[0], coord[1]]} // Latitude and Longitude
            icon={balloonIcon} // Use custom icon
          />
        );
      })}
    </MapContainer>
  );
};

export default Map;
