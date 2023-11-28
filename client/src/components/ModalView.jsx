import { Tooltip, Button, Box, Typography, Modal } from "@mui/material";
import buildings from "../../../common/buiding.json";
import parking from "../../../common/parking.json";
import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalView({ itr, modal, setModal }) {
  const heading =
    itr == buildings ? "Buildings" : itr == parking ? "Parking" : "Departments";

  const handleClose = () => { setModal(false) }
  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby={heading}
        aria-describedby={"View all " + heading}
      >
        <Box sx={style}>
          <Typography id={heading} variant="h6" component="h2" textAlign={"center"}>
            {heading}
          </Typography>
          <hr />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {itr.map((obj) => (
              <Tooltip title={(heading=="Parking")?obj.capacity:obj.name}>
                <Button
                  key={obj.name}
                  onClick={() => console.log(`Button ${obj.name} clicked`)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {obj.abbr}
                </Button>
              </Tooltip>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
