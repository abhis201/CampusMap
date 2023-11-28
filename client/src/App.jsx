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
import Sideload from "./components/Sideload.jsx";
import { FilterButtons } from "./components/FilterButtons.jsx";
import Navigate from "./components/Navigate.jsx";

function App() {
  const [marker, setMarker] = useState(null);

  //For testing /sideload
  let testdata = {
    name: "Student Union Library",
    position: { "lat": 41.580631125122395, "lng": -87.46984039271041 },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt odit, totam a saepe doloremque adipisci, quam sapiente in incidunt id inventore necessitatibus tempore? Animi, minus nemo! Consectetur doloremque error ducimus?",
    image:
      "https://www.pnw.edu/facilities/wp-content/uploads/sites/70/2023/08/22018-ASG_Purdue_Persp02-7_dc_750x500.jpg",
    floor_count: 3,
    location: "41.58486994522156, -87.47332743172757",
  };

  const handleSearchItemClick = (item) => {
    setMarker({
      "id": item.Name,
      "position": item.location,
      "sideload": {
        'name': item.Name,
        'description': item.description,
        'image': item.image,
        'floor_count': item.floor_count,
        "latitude": item.location.lat,
        "longitude": item.location.lng
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
            <Route
              path={"/sideload"}
              element={<Sideload data={testdata} />}
            />
            <Route path={"/filters"} element={<FilterButtons />} />
            <Route path={"/navigate"} element={<Navigate  dest={testdata.position}/>} />
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
