import { Button, Typography } from "@mui/material"


export const Sideload = ({name, location, description, floors, image}) => {
    return <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "100%", height: "100vh"}}>
        <div style={{display: "flex", justifyContent: "right"}}>
            <Button>Close</Button>
        </div>
        <hr></hr>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Image src={image}></Image>
            <br/><br/>
            <Typography variant="h4">{name}</Typography>
            <br/><br/>
            <Typography variant="h6">{description}</Typography>
        </div>
    </div>
}