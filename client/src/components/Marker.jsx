import React, { useState } from 'react';
import { MarkerF, InfoWindow } from '@react-google-maps/api';

const MarkerF = ({ position, infoWindowData, onClick }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
    onClick(); // Invoke the onClick function passed from the parent
  };

  return (
    <>
      <MarkerF position={position} onClick={handleMarkerClick} />
      {infoWindowOpen && (
        <InfoWindow
          position={position}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          <div>
            <h3>{infoWindowData.name}</h3>
            <p>{infoWindowData.description}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerF;
