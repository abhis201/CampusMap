import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Polygon, FeatureGroup, TileLayer, LayersControl, useMapEvent,  Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Sideload from "./Sideload";
import L from "leaflet";

const CampusMap = ({ marker }) => {
  const [sideload, setSideload] = useState(null);

  const markerClick = (markerData) => {
    console.log(markerData)
    setSideload(markerData);
  };

  const campus_region  = [
    [41.5884388,-87.4761925],
    [41.5810719,-87.4762354],
    [41.577635130571736, -87.47553747827811],
    [41.57939902340338, -87.46829973614871],
    [41.58119961430525, -87.46837342356804],
    [41.581327458890264, -87.47329812900237],
    [41.5847635,-87.4732099],
    [41.5847635,-87.4713431],
    [41.5884388,-87.4713645],
    [41.5884388,-87.4761925],
];

  const placeColor = { color: "#2596be"};

  // //Shift map focus
  // const [mapKey, setMapKey] = useState(0); // Add state for the map key
  // const mapRef = useRef(null);

  // useEffect(() => {
  //   setMapKey((prevKey) => prevKey + 1);
  //   // Shift the center to the marker with animation
  //   if (mapRef.current && marker && marker.position) {
  //     mapRef.current.flyTo(marker.position, 18, {
  //       duration: 1, // Animation duration in seconds
  //     });
  //   }
  // }, [marker]);

  const campusLat = import.meta.env.VITE_CENTER_LAT;
  const campusLng = import.meta.env.VITE_CENTER_LNG;

  // Center coordinates for your map
  let campusCoordinates = [campusLat, campusLng];

  let zoom = 16;

  // const customIcon = new L.Icon({
  //   iconUrl: 'https://www.designi.com.br/images/preview/10433428.jpg',
  //   iconSize: [32, 32], // Adjust the size of the icon as needed
  //   iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  // });

  return (
    <div>
      <MapContainer
        id="mapRef"
        center={campusCoordinates}
        zoom={zoom}
        // whenCreated={(map) => (mapRef.current = map)} // Save map reference to mapRef
        // key={mapKey}
        style={{ width: "100vw", height: "93vh", zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {marker && (
          <Marker
            key={marker.id}
            position={marker.position}
            // icon={customIcon}
            eventHandlers={{
              click: () => {
                // alert(marker.id + " marker clicked!");
                markerClick(marker.sideload);
              },
            }}
          >
            <Popup>{marker.id}</Popup>
          </Marker>
        )}
          <Polygon pathOptions={placeColor} positions={campus_region} />

      </MapContainer>
      
      {sideload && <Sideload data={sideload} />}
    </div>
  );
};

export default CampusMap;
