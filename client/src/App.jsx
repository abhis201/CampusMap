import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import { userState } from "./store/atoms/user.js";
import CampusMap from './components/CampusMap.jsx';
import Navbar from './components/Navbar.jsx';
import {
    RecoilRoot,
    useSetRecoilState
} from 'recoil';
import axios from "axios";
import { BASE_URL } from "./config.js";
import { useEffect, useState } from "react";

function App() {
    const [markers, setMarkers] = useState([]);

    const handleSearchItemClick = (item) => {
        const newMarker = {
            id: item.Name,
            position: item.location,
            onClick: () => {
                alert(item.Name + " Marker Clicked");
                window.location.reload();
            },
        };

        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };

    return (
        <RecoilRoot>
            <div style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#eeeeee"
            }}
            >
                <Router>
                    <Navbar onSearchItemClick={handleSearchItemClick} />
                    <InitUser />
                    <Routes>
                        <Route path={"/signin"} element={<Signin />} />
                        <Route path={"/signup"} element={<Signup />} />
                        <Route path={"/"} element={<CampusMap markers={markers} />} />
                    </Routes>
                </Router>
            </div>
        </RecoilRoot>
    );
}


function InitUser() {
    const setUser = useSetRecoilState(userState);
    const init = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/me`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}

export default App;