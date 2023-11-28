import { Checkbox, Button } from "@mui/material";
import { useState } from "react";
import buildings from "../../../common/buiding.json";
import parking from "../../../common/parking.json";
import dept from "../../../common/dept.json";
import ModalView from "./ModalView";

export const FilterButtons = ({ showBlds, showDeps, showParks }) => {
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [isBldChecked, setIsBldChecked] = useState(false);
  const [isPrkChecked, setIsPrkChecked] = useState(false);
  const [isDepChecked, setIsDepChecked] = useState(false);

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
          capacity: item.capacity,
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

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 2,
        right: 30,
        top: 100,
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Checkbox checked={isBldChecked} onChange={addBlds}></Checkbox>
          <Button onClick={showModalB}>Buildings</Button>
        </div>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Checkbox checked={isDepChecked} onChange={addDepts}></Checkbox>
          <Button onClick={showModalD}>Departments</Button>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox checked={isPrkChecked} onChange={addPrks}></Checkbox>
          <Button onClick={showModalP}>Parking</Button>
        </div>
      </div>

      {modal && <ModalView itr={value} modal={modal} setModal={setModal} />}
    </div>
  );
};
