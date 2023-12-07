import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import user_data from "../../../common/users.json"
import Signup from './Signup.jsx';

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);

    return (
        <div style={{ position: 'relative', backgroundImage: '' }}>
            <div style={{ display: 'absolute', zIndex: 2, top: 0, left: 0 }}>
                <div style={{
                    justifyContent: "center", display: "flex", paddingTop: 100,
                    marginBottom: 100,
                }}>
                    <Typography variant={"h5"}>Welcome to the PNW Map</Typography>
                </div>
                <Grid container spacing={2} style={{
                    justifyContent: "center"
                }}>
                    <Grid md={6} lg={6}>
                        <div style={{
                            display: "flex",
                            marginBottom: 10,
                            justifyContent: "center"
                        }}>
                            <Typography variant={"h6"}>
                                Sign in below
                            </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
                                <TextField
                                    onChange={(evant11) => {
                                        let elemt = evant11.target;
                                        setEmail(elemt.value);
                                    }}
                                    fullWidth={true}
                                    label="Email"
                                    variant="outlined"
                                />
                                <br /><br />
                                <TextField
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    fullWidth={true}
                                    label="Password"
                                    variant="outlined"
                                    type={"password"}
                                />
                                <br /><br />

                                <Button
                                    size={"large"}
                                    variant="contained"
                                    onClick={async () => {
                                        const user = user_data.filter((u) => u.email === email && u.password === password);
                                        if (user.length > 0) {
                                            setUser(user[0]);
                                        } else {
                                            console.log("Wrong Credentials! or User Not Present!");
                                        }
                                        navigate("/")
                                    }}> Sign in</Button>
                            </Card>
                        </div>
                    </Grid>
                    <Grid md={6} lg={6}>
                        <Signup></Signup>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Signin;