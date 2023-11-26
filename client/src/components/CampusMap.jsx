import React from 'react';
import { MapContainer, Polygon, FeatureGroup, TileLayer, LayersControl, useMapEvent,  Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CampusMap = ({ markers }) => {

  const campusLat = import.meta.env.VITE_CENTER_LAT
  const campusLng = import.meta.env.VITE_CENTER_LNG
  // Center coordinates for your map
  const campusCoordinates = [
    campusLat, campusLng
  ];

  const campus_region  = [
    [ 41.5884388,-87.4761925],
    [41.5810719,-87.4762354],
    [41.581104,-87.4731241],
    [41.5847635,-87.4732099],
    [41.5847635,-87.4713431],
    [41.5884388,-87.4713645],
    [41.5884388,-87.4761925],
];

  const placeColor = { color: "#2596be"};

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
      <Polygon pathOptions={placeColor} positions={campus_region} />
    </MapContainer>
  );
};

export default CampusMap;