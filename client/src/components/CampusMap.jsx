import React, {useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CampusMap = () => {
  const campusCoordinates = [41.585118752281346, -87.47408630819197];

  const campusBounds = [
    [41.58836071141424, -87.4761462447435], // Upper-left corner
    [41.579406773210884, -87.4708062352973]  // Lower-right corner
  ];

  const libraryCoordinates = [41.584508860590695, -87.47228386375852];

  return (
    <div className="map-container" >
      <MapContainer center={campusCoordinates} zoom={18} style={{ height: '100vh', width: '100%' }} bounds={campusBounds}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={libraryCoordinates}>
          <Popup>
            Purdue Univeristy Northwest
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CampusMap;
