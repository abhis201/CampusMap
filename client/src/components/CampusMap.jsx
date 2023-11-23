import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CampusMap = ({ markers }) => {

  const campusLat = import.meta.env.VITE_CENTER_LAT
  const campusLng = import.meta.env.VITE_CENTER_LNG
  // Center coordinates for your map
  const campusCoordinates = [
    campusLat, campusLng
  ];

  return (
    <MapContainer center={campusCoordinates} zoom={17} style={{ width: '100vw', height: '93vh', zIndex:0 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          eventHandlers={{
            click: () => marker.onClick(),
          }}
        >
          <Popup>{marker.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CampusMap;
