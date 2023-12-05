import React, { useState, useEffect } from "react";
import { MapContainer, Polygon, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Sideload from "./Sideload";
import { FilterButtons } from "./FilterButtons";
import L from "leaflet";
import { Button } from "@mui/material";
import { getLocation } from "./Sideload";
import VideoModal from "./VideoModal";


const CampusMap = ({ marker, park, vtour }) => {
  const [sideload, setSideload] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [depts, setDepts] = useState([]);
  const [parkings, setParking] = useState([]);

  const [currLoc, setCurrLoc] = useState(null);

  const markerClick = (markerData) => {
    console.log(markerData)
    setSideload(markerData);
  };

  const campus_region = [
    [41.5884388, -87.4761925],
    [41.5810719, -87.4762354],
    [41.577635130571736, -87.47553747827811],
    [41.57939902340338, -87.46829973614871],
    [41.58119961430525, -87.46837342356804],
    [41.581327458890264, -87.47329812900237],
    [41.5847635, -87.4732099],
    [41.5847635, -87.4713431],
    [41.5884388, -87.4713645],
    [41.5884388, -87.4761925],
  ];

  const showBuildingMarkers = (data) => {
    if (data) {
      setBuildings(data);
      console.log("building Data")
      console.log(buildings)
    }
    else {
      setBuildings(null);
    }
  }

  const showParkMarkers = (data) => {
    if (data) {
      setParking(data);
    }
    else {
      setParking(null);
    }
  }

  const showDeptMarkers = (data) => {
    if (data) {
      setDepts(data);
    }
    else {
      setDepts(null);
    }
  }

  const placeColor = { color: "#2596be" };

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

  const redIcon = new L.Icon({
    iconUrl: '/images/pin.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

  const greenIcon = new L.Icon({
    iconUrl: '/images/green.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

  const blueIcon = new L.Icon({
    iconUrl: '/images/location.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

  const yellowIcon = new L.Icon({
    iconUrl: '/images/yellow.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

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

        {buildings.map((bld) => (
          <Marker
            key={bld.id}
            position={bld.position}
            icon={redIcon}
            eventHandlers={{
              click: () => {
                // alert(marker.id + " marker clicked!");
                markerClick(bld.sideload);
              },
            }}
          >
            <Popup>{bld.id}</Popup>
          </Marker>
        ))}

        {depts.map((bld) => (
          <Marker
            key={bld.id}
            position={bld.position}
            icon={greenIcon}
            eventHandlers={{
              click: () => {
                console.log("Department Marker clicked for: " + bld.id)
              },
            }}
          >
            <Popup>{bld.id}</Popup>
          </Marker>
        ))}

        {parkings.map((prk) => (
          <Marker
            key={prk.id}
            position={prk.position}
            icon={yellowIcon}
            eventHandlers={{
              click: () => {
                console.log("Parking Marker Clicked for: " + prk.id)
              },
            }}
          >
            <Popup>{prk.abbr}: Remaining Capacity: {prk.capacity}
              <Button style={{ height: 12, fontSize: 12 }} onClick={async () => {
                await getLocation(setCurrLoc)
                if (currLoc) {
                  const url = `https://www.google.com/maps/dir/?api=1&origin=${currLoc.latitude},${currLoc.longitude}&destination=${prk.position.lat},${prk.position.lng}`
                  window.open(url, '_blank');
                }
                else {
                  alert("Finding Current Location Please Wait!")
                }
              }}>Navigate</Button>
            </Popup>
          </Marker>
        ))}

        {console.log(park)}
        {park.map((prk) => {
          return (
            <Marker
              key={prk.name}
              position={prk.location}
              icon={yellowIcon}
              eventHandlers={{
                click: () => {
                  console.log("Parking Marker Clicked for: " + prk.name);
                },
              }}
            >
              <Popup>
                {prk.abbr}: Remaining Capacity: {prk.capacity}
                <Button
                  style={{ height: 12, fontSize: 12 }}
                  onClick={async () => {
                    await getLocation(setCurrLoc);
                    if (currLoc) {
                      const url = `https://www.google.com/maps/dir/?api=1&origin=${currLoc.latitude},${currLoc.longitude}&destination=${prk.location.lat},${prk.location.lng}`;
                      window.open(url, '_blank');
                    }
                    else {
                      alert("Finding Current Location Please Wait!")
                    }
                  }}
                >
                  Navigate
                </Button>
              </Popup>
            </Marker>
          );
        })}



        {marker && (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={blueIcon}
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
      <FilterButtons showBlds={showBuildingMarkers} showDeps={showDeptMarkers} showParks={showParkMarkers} />
      {vtour.open && <VideoModal video={vtour.link} open={vtour.open} setOpen={vtour.setOpen} />}
    </div>
  );
};

export default CampusMap;