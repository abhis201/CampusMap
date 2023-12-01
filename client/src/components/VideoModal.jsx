import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import ReactPlayer from 'react-player/youtube'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 2,
};

const VideoModal = ({ video, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  console.log("Video Link:" + video);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Visitor Guide"
        aria-describedby="PNW Visitor Guide"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            PNW Visitors Guide
          </Typography><br/>
          <ReactPlayer url={video}/>
        </Box>
      </Modal>
    </div>
  );
};


export default VideoModal;