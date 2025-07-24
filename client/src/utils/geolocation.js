// Utility function to get user's current location
export const getLocation = async (setter) => {
    // Check if Geolocation is supported by the browser
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Extract latitude and longitude from the position object
                const { latitude, longitude } = position.coords;
                setter({ latitude, longitude });

                return { latitude, longitude };
            },
            (error) => {
                console.error('Error getting location:', error.message);
            }
        );
    } else {
        console.error('Geolocation is not supported by your browser.');
    }
};
