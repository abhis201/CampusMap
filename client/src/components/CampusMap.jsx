import React, {useState} from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const CampusMap = ({ markers }) => {

  // Set your Google Maps API key here
  const apiKey = import.meta.env.VITE_GMAP_API_KEY;

  // Coordinates for your campus boundaries
  const campusBounds = {
    north: Number(import.meta.env.VITE_NORTH),
    south: Number(import.meta.env.VITE_SOUTH),
    west: Number(import.meta.env.VITE_WEST),
    east: Number(import.meta.env.VITE_EAST),
  };

  // Center coordinates for your map
  const campusCoordinates = { 
    lat: Number(import.meta.env.VITE_CENTER_LAT), 
    lng: Number(import.meta.env.VITE_CENTER_LNG)
  };

  return (
    <LoadScript id='mapComp' googleMapsApiKey={apiKey}>
      <GoogleMap
        center={campusCoordinates}
        zoom={16}
        mapContainerStyle={{ width: '100vw', height: '93vh' }}
        onBoundsChanged={campusBounds}
      >
        {markers.map((marker) => (
          <MarkerF
          key={marker.id}
          position={marker.position}
          onClick={marker.onClick}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default CampusMap;
