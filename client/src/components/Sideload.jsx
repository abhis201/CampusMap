import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";

const StyledImage = styled("img")({
    maxWidth: "100%",
    height: "auto",
});

const Sideload = ({ data }) => {
    if (!data) {
        console.log("no Sideload data");
        return null; // Render nothing if sideload data is not available
    }

    const [sourceCoords, setSourceCoords] = useState(null);

    useEffect(() => {
        // Check if Geolocation is supported by the browser
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Extract latitude and longitude from the position object
                    const { latitude, longitude } = position.coords;
                    setSourceCoords({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                top: 64,
                left: 0,
                width: "30vw",
                height: "91vh",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 10,
                position: "absolute",
                zIndex: 1,
                justifyContent: 'space-between'
            }}
        >
            <div>
                <div style={{ textAlign: "right" }}>
                    <Button
                        style={{ color: "red"}}
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Close
                    </Button>
                </div>
                <div>
                    <StyledImage src={data.image}></StyledImage>
                    <br />
                    <br />
                    <Typography variant="h4" color={"gold"}>
                        {data.name}
                    </Typography>
                    <hr />
                    <br />
                    <Typography color={"white"}>{data.description}</Typography>
                    <br />
                    <hr />
                    <Typography color={"white"}>{data.longitude}, {data.latitude}</Typography>
                    <br /> <br />
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Typography style={{ textAlign: "center", color: 'gray' }}>Floor Plan</Typography>
                    {Array.from({ length: data.floor_count }, (_, index) => (
                        <Button
                            key={index}
                            style={{
                                marginRight: 5,
                                backgroundColor: 'coral',
                                color: "white",
                            }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
                <div>
                    <Typography style={{ textAlign: "center", color: 'gray' }}>Click to</Typography>
                    <Button style={{ backgroundColor: "green", color: "white" }} onClick={()=>{
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceCoords.latitude},${sourceCoords.longitude}&destination=${data.latitude},${data.longitude}`
                        window.open(url, '_blank');
                    }}>
                        Navigate
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sideload;
