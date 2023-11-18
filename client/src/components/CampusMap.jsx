// import React, {useEffect} from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const CampusMap = () => {
//   const campusCoordinates = [41.585118752281346, -87.47408630819197];

//   const campusBounds = [
//     [41.58836071141424, -87.4761462447435], // Upper-left corner
//     [41.579406773210884, -87.4708062352973]  // Lower-right corner
//   ];

//   const libraryCoordinates = [41.584508860590695, -87.47228386375852];

//   return (
//     <div className="map-container" >
//       <MapContainer center={campusCoordinates} zoom={18} style={{ height: '100vh', width: '100%' }} bounds={campusBounds}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={libraryCoordinates}>
//           <Popup>
//             Purdue Univeristy Northwest
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default CampusMap;

import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const GoogleMapsComponent = () => {
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

  // Coordinates for the marker
  const libraryCoordinates = { lat: 41.584508860590695, lng: -87.47228386375852 };

  return (
    <LoadScript googleMapsApiKey={apiKey} id='mapComp'>
      <GoogleMap
        center={campusCoordinates}
        zoom={16}
        mapContainerStyle={{ width: '100vw', height: '93vh' }}
        restrictedRegion={campusBounds}
      >
        <MarkerF position={libraryCoordinates} onClick={() => alert("Library Marker Clicked")} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComponent;
