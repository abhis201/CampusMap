import { Checkbox, Tooltip } from "@mui/material"
// import zIndex from "@mui/material/styles/zIndex"
// import { Modal } from '@mui/base/Modal';
import { useState } from "react"
import './Modal.css'
import buildings from '../../../common/buiding.json';
import parking from '../../../common/parking.json'


const Modal = ({itr}) => {
    const reload = () => {
        // setModal(false);
        window.location.reload();
    }
    const heading = itr==buildings?"Buildings":itr==parking?"Parking":"Departments";
    return (
        
        <div>
            <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <button
                            onClick={reload}
                            className="btn-modal">
                            X
                        </button>
                    
                        <h2>{heading}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {/* Abbr */}
        
         {
            
         itr.map((obj) => (
        <Tooltip title={obj.Name}>
        <button
          key={obj.Name}
          onClick={() => console.log(`Button ${obj.Name} clicked`)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
       

          {obj.Abbr}
        </button>
        </Tooltip>
      ))}
      
    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const FilterButtons = () => {
    const[value,setValue]= useState("")
    const [modal, setModal] = useState(false);
    const showModalB = () => {
        setModal(true)
        setValue(buildings)
    }
    const showModalP = () => {
        setModal(true)
        setValue(parking)
    }
    const showModalD = () => {
        setModal(true)
        setValue(dept)
    }
    
    return (
        <div>
            <div style={{ position: "absolute", right: 30 }}>
                <div style={{ display: "flex", flexDirection: "column", left: 1, top: 20, zIndex: 2, marginTop: 100, }}>
                    <div style={{ display: 'flex' }}>
                        <Checkbox></Checkbox>
                        <button onClick={showModalB}>
                            Buildings</button>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Checkbox></Checkbox>
                        <button onClick={showModalD}>Offices</button>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Checkbox></Checkbox>
                        <button onClick={showModalP}>Parking</button>
                    </div>
                </div>
                <div style={{ zIndex: 0 }}>

                </div>
            </div>
            {
                modal && <Modal itr={value} />
            }
        </div>
    )
}