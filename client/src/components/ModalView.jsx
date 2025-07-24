import { Tooltip, Button, Box, Typography, Modal, useMediaQuery, useTheme } from "@mui/material";
import buildings from "../../../common/buiding.json";
import parking from "../../../common/parking.json";
import * as React from "react";

const ModalView = ({ itr, modal, setModal }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const heading =
    itr == buildings ? "Buildings" : itr == parking ? "Parking" : "Departments";

  const handleClose = () => { setModal(false) }

  const getModalStyle = () => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? '95vw' : 400,
    maxWidth: isMobile ? '100%' : 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: isMobile ? 2 : 4,
    maxHeight: '90vh',
    overflow: 'auto',
  });

  const getGridColumns = () => {
    if (isSmallMobile) return "repeat(2, 1fr)";
    if (isMobile) return "repeat(3, 1fr)";
    return "repeat(4, 1fr)";
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby={heading}
        aria-describedby={"View all " + heading}
      >
        <Box sx={getModalStyle()}>
          <Typography 
            id={heading} 
            variant={isMobile ? "h6" : "h5"} 
            component="h2" 
            textAlign={"center"}
            sx={{ marginBottom: 2 }}
          >
            {heading}
          </Typography>
          <hr />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: getGridColumns(),
              gap: isMobile ? "8px" : "10px",
            }}
          >
            {itr.map((obj) => (
              <Tooltip 
                key={obj.name}
                title={(heading=="Parking") ? obj.capacity+"% Remaining" : obj.name}
              >
                <Button
                  onClick={() => console.log(`Button ${obj.name} clicked`)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "8px 4px" : "10px",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    minHeight: isMobile ? 44 : 40,
                    textTransform: "none",
                  }}
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                >
                  {obj.abbr || obj.name}
                </Button>
              </Tooltip>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalView;
