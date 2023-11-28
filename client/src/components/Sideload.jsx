import { Button, Modal, Typography,Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useEffect } from "react";

const StyledImage = styled("img")({
    maxWidth: "100%",
    height: "300px",
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 2
  };

const showModal = (name, floor, floor_plan, open, setOpen) => {
  const handleClose = () => setOpen(false);

  console.log({floor_plan})
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Floor Plan"
      >
        <Box sx={style}>
          <Typography id={name} variant="h6" component="h2">
            Floor {floor} Plan for {name}
          </Typography>
          <StyledImage src={floor_plan}></StyledImage>
        </Box>
      </Modal>
    </div>
  );
}

const Sideload = ({ data }) => {
    if (!data) {
        console.log("no Sideload data");
        return null; // Render nothing if sideload data is not available
    }

    const [sourceCoords, setSourceCoords] = useState(null);
    const [open, setOpen] = React.useState(true);

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
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: 10,
                position: "absolute",
                zIndex: 1,
                justifyContent: 'space-between'
            }}
        >
            <div>
                <div style={{ textAlign: "right" }}>
                    <Button
                        style={{ color: "red" }}
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Close
                    </Button>
                </div>
                <div>
                    <center>
                    <StyledImage src={data.image}></StyledImage>
                    </center>
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
                            onClick={()=>{
                                if(data.floor_plans[index]){
                                    showModal(data.name,index+1, data.floor_plans[index], open, setOpen)
                                }
                            }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
                <div>
                    <Typography style={{ textAlign: "center", color: 'gray' }}>Click to</Typography>
                    <Button style={{ backgroundColor: "green", color: "white" }} onClick={() => {
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
