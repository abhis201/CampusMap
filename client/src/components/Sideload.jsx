import { Button, Modal, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useEffect } from "react";

const StyledImage = styled("img")({
    maxWidth: "100%",
    height: "300px",
});

const FloorImage = styled("img")({
    maxWidth: "100%",
    height: "auto",
});

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
}

const Sideload = ({ data }) => {

    if (!data) {
        console.log("no Sideload data");
        return null; // Render nothing if sideload data is not available
    }

    const [sourceCoords, setSourceCoords] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [floor, setFloor] = useState(null);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                top: 64,
                left: 0,
                width: "30vw",
                height: "91vh",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: 10,
                position: "absolute",
                zIndex: 2,
                justifyContent: 'space-between'
            }}
        >
            <div>
                <div style={{ textAlign: "center" }}>
                    <Button
                        variant='outlined'
                        style={{ color: "white", width: '90%', height: 20, marginBottom: 5 }}
                        onClick={() => { window.location.reload() }}
                    >
                        Close
                    </Button>
                </div>
                <div>
                    <center>
                        <StyledImage src={data.image}></StyledImage>
                    </center>
                    <hr />
                    <Typography textAlign={"center"} variant="h4" color={"gold"}>
                        {data.name}
                    </Typography>
                    <hr />
                    <Typography style={{ fontSize: 14 }} color={"white"}>Coordinates: {data.longitude}, {data.latitude}</Typography> <br />
                    <Typography color={"white"}>{data.description}</Typography>
                    <br />
                    {data.departments.length > 0 && <Typography color={"white"}><u>Departments</u><br />{data.departments.join(', ')}</Typography>}
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Typography style={{ textAlign: "center", color: 'white' }}>Floor Plan</Typography>
                    {Array.from({ length: data.floor_count }, (_, index) => (
                        <Button
                            key={index}
                            style={{
                                marginRight: 5,
                                backgroundColor: 'coral',
                                color: "white",
                            }}
                            onClick={() => {
                                if (data.floor_plans[index]) {
                                    setOpen(true)
                                    setFloor({
                                        name: data.name,
                                        floor: index + 1,
                                        floor_plan: data.floor_plans[index]
                                    })
                                }
                            }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
                <div>
                    <Typography style={{ textAlign: "center", color: 'white' }}>Click to</Typography>
                    <Button style={{ backgroundColor: "green", color: "white" }} onClick={async () => {
                        await getLocation(setSourceCoords)
                        if (sourceCoords) {
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceCoords.latitude},${sourceCoords.longitude}&destination=${data.latitude},${data.longitude}`
                            window.open(url, '_blank');
                        }
                        else {
                            console.log("Current Location is not yet set")
                        }
                    }}>
                        Navigate
                    </Button>
                </div>
            </div>
            {open && <ShowModal floor={floor} open={open} setOpen={setOpen} />}
        </div>
    );
};

export default Sideload;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 2
};

const ShowModal = ({ floor, open, setOpen }) => {
    const handleClose = () => { setOpen(false) }

    console.log({ floor })
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby={"Floor Plan"}
                aria-describedby={"Floor Plan for " + floor.name}
            >
                <Box sx={style}>
                    <Typography id={floor.name} variant="h6" component="h2">
                        Floor {floor.floor} Plan for {floor.name}
                    </Typography>
                    <FloorImage src={floor.floor_plan}></FloorImage>
                </Box>
            </Modal>
        </div>
    );
}
