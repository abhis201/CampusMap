import { Checkbox, Button, useMediaQuery, useTheme, Fab, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import buildings from "../../../common/buiding.json";
import parking from "../../../common/parking.json";
import dept from "../../../common/dept.json";
import ModalView from "./ModalView";

export const FilterButtons = ({ showBlds, showDeps, showParks }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [isBldChecked, setIsBldChecked] = useState(false);
  const [isPrkChecked, setIsPrkChecked] = useState(false);
  const [isDepChecked, setIsDepChecked] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const showModalB = () => {
    setModal(true);
    setValue(buildings);
  };
  const showModalP = () => {
    setModal(true);
    setValue(parking);
  };
  const showModalD = () => {
    setModal(true);
    setValue(dept);
  };

  const addBlds = () => {
    setIsBldChecked((prev) => !prev);

    const blddata = [];

    if (!isBldChecked && buildings) {
      buildings.map((item) => {
        blddata.push({
          id: item.name,
          position: item.location,
          sideload: {
            name: item.name,
            description: item.description,
            image: item.image,
            floor_count: item.floor_count,
            latitude: item.location.lat,
            longitude: item.location.lng,
            floor_plans: item.floor_plans,
            departments: item.departments
          },
        });
      });
    }
    showBlds(blddata);
    
  };

  const addPrks = () => {
    setIsPrkChecked((prev) => !prev);
    const prkData = []
    if (!isPrkChecked && parking) {
      parking.map((item) => {
        prkData.push ({
          id: item.name,
          position: item.location,
          capacity: item.capacity+"%",
          abbr: item.abbr
        });
      });
    }
    showParks(prkData)
  };

  const addDepts = () => {
    setIsDepChecked((prev) => !prev);
    const deptData = []
    if (!isDepChecked && dept) {
      dept.map((item) => {
        deptData.push ({
          id: item.name,
          position: item.location,
        });
      });
    }
    showDeps(deptData)
  };

  const actions = [
    { 
      icon: <Checkbox checked={isBldChecked} />, 
      name: 'Buildings', 
      action: () => { addBlds(); showModalB(); }
    },
    { 
      icon: <Checkbox checked={isDepChecked} />, 
      name: 'Departments', 
      action: () => { addDepts(); showModalD(); }
    },
    { 
      icon: <Checkbox checked={isPrkChecked} />, 
      name: 'Parking', 
      action: () => { addPrks(); showModalP(); }
    },
  ];

  if (isMobile) {
    return (
      <>
        <SpeedDial
          ariaLabel="Filter Options"
          sx={{ 
            position: 'absolute', 
            bottom: 16, 
            right: 16,
            '& .MuiSpeedDial-fab': {
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }
          }}
          icon={<FilterListIcon />}
          open={speedDialOpen}
          onClose={() => setSpeedDialOpen(false)}
          onOpen={() => setSpeedDialOpen(true)}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                action.action();
                setSpeedDialOpen(false);
              }}
            />
          ))}
        </SpeedDial>
        {modal && <ModalView itr={value} modal={modal} setModal={setModal} />}
      </>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 2,
        right: 30,
        bottom: 50,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
          <Checkbox checked={isBldChecked} onChange={addBlds}></Checkbox>
          <Button 
            onClick={showModalB}
            sx={{ 
              fontSize: '0.875rem',
              textTransform: 'none',
              minWidth: 'auto'
            }}
          >
            Buildings
          </Button>
        </div>
        <div style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
          <Checkbox checked={isDepChecked} onChange={addDepts}></Checkbox>
          <Button 
            onClick={showModalD}
            sx={{ 
              fontSize: '0.875rem',
              textTransform: 'none',
              minWidth: 'auto'
            }}
          >
            Departments
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox checked={isPrkChecked} onChange={addPrks}></Checkbox>
          <Button 
            onClick={showModalP}
            sx={{ 
              fontSize: '0.875rem',
              textTransform: 'none',
              minWidth: 'auto'
            }}
          >
            Parking
          </Button>
        </div>
      </div>

      {modal && <ModalView itr={value} modal={modal} setModal={setModal} />}
    </div>
  );
};
