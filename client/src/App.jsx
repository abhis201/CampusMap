import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import { userState } from "./store/atoms/user.js";
import CampusMap from "./components/CampusMap.jsx";
import Navbar from "./components/Navbar.jsx";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { BASE_URL } from "./config.js";
import { useEffect, useState } from "react";
import { FilterButtons } from "./components/FilterButtons.jsx";
import Navigate from "./components/Navigate.jsx";

function App() {
  const [marker, setMarker] = useState(null);

  const handleSearchItemClick = (item) => {
    console.log(item)
    setMarker({
      "id": item.name,
      "position": item.location,
      "sideload": {
        name: item.name,
        description: item.description,
        image: item.image,
        floor_count: item.floor_count,
        latitude: item.location.lat,
        longitude: item.location.lng,
        floor_plans: item.floor_plans
      },
    });

  };

  return (
    <RecoilRoot>
      <div
        style={{
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
            <Route path={"/"} element={<CampusMap marker={marker} />} />
            <Route path={"/filters"} element={<FilterButtons />} />
            <Route path={"/navigate"} element={<Navigate  dest={{ "lat": 41.58767900887252, "lng": -87.47547760162504 }}/>} />
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
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
