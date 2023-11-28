import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navigate = ({ dest }) => {
    const [directions, setDirections] = useState(null);

    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        // Check if Geolocation is supported by the browser
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Extract latitude and longitude from the position object
                    const { latitude, longitude } = position.coords;
                    setCoordinates({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }, []);

    const handleGetDirections = async () => {
        try {
            // Replace with your actual coordinates
            const origin = coordinates // Start Location
            console.log(origin)
            const destination = {
                latitude: dest.lat,
                longitude: dest.lng
            }; // Destination

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${import.meta.env.VITE_GMAP_API_KEY}`
            );

            setDirections(response.data);
        } catch (error) {
            console.error('Error fetching directions:', error);
        }
    };

    return (
        <div>
            <button onClick={handleGetDirections}>Get Directions</button>

            {directions && (
                <div>
                    {/* Display the directions information as needed */}
                    <pre>{JSON.stringify(directions, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Navigate;
