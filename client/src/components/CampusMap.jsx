import React, {useState} from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const CampusMap = ({ markers }) => {

   // Set your Google Maps API key here
  const apiKey = 'AIzaSyDcwsBTuzqUTjhN03jD2_LqCqH0nDYCZ6U';

  // Coordinates for your campus boundaries
  const campusBounds = {
    north: 31.5865,
    south: 51.584,
    west: -97.476,
    east: -77.470,
  };

  // Center coordinates for your map
  const campusCoordinates = { lat: 41.585118752281346, lng: -87.47408630819197 };

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
