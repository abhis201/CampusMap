import { Checkbox } from "@mui/material"


export const FilterButtons = () => {
    return(
        <div style={{display:"flex", flexDirection:"column", left:1,top:20}}>
            <div style={{display: 'flex'}}>
                <Checkbox></Checkbox>
                <button>Buildings</button>
            </div>
            <div style={{display:"flex"}}>
                <Checkbox></Checkbox>
                <button>Buildings</button>
            </div>
            <div style={{display: "flex"}}>
                <Checkbox></Checkbox>
                <button>Buildings</button>
            </div>
        </div>
    )
}