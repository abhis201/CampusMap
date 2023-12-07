import React, { useState, useEffect } from "react";
import { MapContainer, Polygon, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Sideload from "./Sideload";
import { FilterButtons } from "./FilterButtons";
import L from "leaflet";
import { Button, Tooltip } from "@mui/material";
import { getLocation } from "./Sideload";
import VideoModal from "./VideoModal";
import { useNavigate } from "react-router-dom";


const CampusMap = ({ marker, park, vtour, emergency, liveEvents, classes }) => {
  const [sideload, setSideload] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [depts, setDepts] = useState([]);
  const [parkings, setParking] = useState([]);

  const [currLoc, setCurrLoc] = useState(null);

  const markerClick = (markerData) => {
    console.log(markerData)
    setSideload(markerData);
  };

  useEffect(()=>{
    getLocation(setCurrLoc)
  },[])

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

  const emergency_icon = new L.Icon({
    iconUrl: '/images/emergency_icon.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

  const parking_icon = new L.Icon({
    iconUrl: '/images/parking.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

  const events_marker = new L.Icon({
    iconUrl: '/images/events.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

  const class_marker = new L.Icon({
    iconUrl: '/images/classes.png',
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon anchor to the bottom center
  });

  // const { flyTo } = useMap();

  // useEffect(() => {
  //   if (marker) {
  //     flyTo(marker.position, zoom, {
  //       duration: 2, // Animation duration in seconds
  //       easeLinearity: 0.5, // Animation easing, 0.5 is the default
  //     });
  //   }
  // }, [marker, flyTo]);

  return (
    <div>
      <MapContainer
        id="mapRef"
        center={campusCoordinates}
        zoom={zoom}
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

        {/* {console.log(depts)} */}
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
            <Popup>{prk.abbr}: Remaining Capacity: {prk.capacity}<br/><br/>
                <Button variant="contained"
                  style={{ height: 20, fontSize: 12, width:'100%' }} onClick={async () => {
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

        {/* {console.log(park)} */}
        {park.map((prk) => {
          return (
            <Marker
              key={prk.name}
              position={prk.location}
              icon={parking_icon}
              eventHandlers={{
                click: () => {
                  console.log("Parking Marker Clicked for: " + prk.name);
                },
              }}
            >
              <Popup>
                {prk.abbr}: Remaining Capacity: {prk.capacity}<br/><br/>
                <Button variant="contained"
                  style={{ height: 20, fontSize: 12, width:'100%' }}
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

        {/* {console.log(emergency)} */}
        {emergency.map((e) => {
          return (
            <Marker
              key={e.name}
              position={e.location}
              icon={emergency_icon}
              eventHandlers={{
                click: () => {
                  console.log("Emergency Marker Clicked for: " + e.name);
                },
              }}
            >
              <Popup>
                Emergency Service: {e.abbr}<br/><br/>
                <Button variant="contained"
                  style={{ height: 20, fontSize: 12, width:'100%' }}
                  onClick={async () => {
                    await getLocation(setCurrLoc);
                    if (currLoc) {
                      const url = `https://www.google.com/maps/dir/?api=1&origin=${currLoc.latitude},${currLoc.longitude}&destination=${e.location.lat},${e.location.lng}`;
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

        {/* {console.log(liveEvents)} */}
        {liveEvents.map((e) => {
          return (
            <Marker
              key={e.name}
              position={e.location}
              icon={events_marker}
              eventHandlers={{
                click: () => {
                  console.log("Live Events marker clicked for: " + e.name);
                },
              }}
            >
              <Popup>
                <ul style={{padding:0, margin: 0, marginBottom:10}}>
                  {e.live_events.map((item) => {
                    return (<li>{item}</li>)
                  })}
                </ul>
                <Button
                 variant="contained"
                  style={{ height: 20, fontSize: 12, width:'100%' }}
                  onClick={async () => {
                    await getLocation(setCurrLoc);
                      if (currLoc) {
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${currLoc.latitude},${currLoc.longitude}&destination=${e.location.lat},${e.location.lng}`;
                        window.open(url, '_blank');
                      } else {
                        alert("Finding Current Location. Please Wait!");
                      }
                  }}
                >
                  Navigate
                </Button>
              </Popup>
            </Marker>
          );
        })}

        {/* {console.log(classes)} */}
        {classes && classes.map((e) => {
          return (
            <Marker
              key={e.class_name}
              position={e.location}
              icon={class_marker}
              eventHandlers={{
                click: () => {
                  console.log("Class marker clicked for: " + e.class_name);
                },
              }}
            >
              <Popup>
                {e.class_name}<br/>{e.timing}<br/><br/>
                <Button
                 variant="contained"
                  style={{ height: 20, fontSize: 12, width:'100%' }}
                  onClick={async () => {
                    await getLocation(setCurrLoc);
                      if (currLoc) {
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${currLoc.latitude},${currLoc.longitude}&destination=${e.location.lat},${e.location.lng}`;
                        window.open(url, '_blank');
                      } else {
                        alert("Finding Current Location. Please Wait!");
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
      <ThreeDButton />
      <SpaceButton location={'http://www.purdue.edu/spacemanagement'} />
      <FilterButtons showBlds={showBuildingMarkers} showDeps={showDeptMarkers} showParks={showParkMarkers} />
      {vtour.open && <VideoModal video={vtour.link} open={vtour.open} setOpen={vtour.setOpen} />}
    </div>
  );
};

export default CampusMap;

const SpaceButton = ({ location }) => {
  const url = location;
  return <div style={{
    position: "absolute",
    zIndex: 2,
    right: 30,
    bottom: 225,
  }}>
    <Tooltip title="Jump to the space management segment">
      <Button variant="contained" onClick={() => { window.open(url, "_blank_") }}>Space Management</Button>
    </Tooltip>
  </div>
}

const ThreeDButton = () => {
  const navigate = useNavigate()
  return <div
      style={{
        position: "absolute",
        zIndex: 1,
        left: 30,
        bottom: 20,
      }}
    >
      <Tooltip title="View a 3d version of the Map">
        <Button
          variant="contained"
          style={{
            backgroundColor: 'black',
            color: 'orange',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            padding: '0',
          }}
          onClick={() => { navigate("/3d")}}
        >
          3D
        </Button>
      </Tooltip>
    </div>
}