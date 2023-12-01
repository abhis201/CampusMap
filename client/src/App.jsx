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
import Sideload from "./components/Sideload.jsx";
import building_data from "../../common/buiding.json";
import parking_data from "../../common/parking.json";
import VideoModal from './components/VideoModal.jsx'

function App() {
  const [marker, setMarker] = useState(null);

  const handleSearchItemClick = (item) => {
    console.log("Search Item Clicked!");
    console.log(item);

    setMarker({
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
        departments: item.departments,
      },
    });
  };

  const videoId = 'https://youtu.be/EhYk54W9kYM?si=t1-YUceRFzBo83du';
  const [vtour, setVtour] = useState(false);

  const video = {
    link: videoId,
    open: vtour,
    setOpen: setVtour
  }

  const [parkData, setParkData] = useState([]);

  const handleMenuOperation = async (item) => {
    if (item === "Visitor Tour") {
      setVtour(true);
      console.log("vtor set to " + vtour)
    } else if (item === "Park") {
      if (parkData.length > 0) {
        setParkData([]);
      } else {
        const filteredParkData = parking_data
          .sort((a, b) => parseInt(b.capacity) - parseInt(a.capacity))
          .slice(0, 5);
        setParkData(filteredParkData);
      }
    }
  };

  const loadData = {
    name: "Anderson Building",
    latitude: 41.58767900887252,
    longitude: -87.47547760162504,
    floor_count: 3,
    floor_plans: ["../assets/FloorPlans/Anderson Floor Plan.png", ""],
    image:
      "https://media.graphassets.com/resize=fit:crop,height:650,width:908/output=format:webp/if1L8jSxRmKYooXYPFVV",
    description:
      "The Edward D. Anderson Building (ANDR) is located in the northwest corner of the Hammond campus, east of Woodmar Ave. and just south of 169th St. ANDR is at the northern end of the Peregrine Path, just north of the Classroom Office Building, and northwest of 169th Street Parking. There is a circle drive that extends off of Woodmar Ave. to the southwest entrance",
    departments: [
      "Computer and Information Technology",
      "Industrial Technology",
      "Graphical Technology",
    ],
    abbr: "Ande",
  };

  return (
    <RecoilRoot>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#eeeeee",
        }}
      >
        <Router>
          <Navbar
            onSearchItemClick={handleSearchItemClick}
            menuOperation={handleMenuOperation}
          />
          <InitUser />
          <Routes>
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route
              path={"/"}
              element={
                <CampusMap marker={marker} park={parkData} vtour={video} />
              }
            />
            <Route path={"/filters"} element={<FilterButtons />} />
            <Route path={"/sideload"} element={<Sideload data={loadData} />} />
            <Route path={"/ytube"} element={<VideoModal video='https://www.youtube.com/embed/EhYk54W9kYM' open={vtour} setOpen={setVtour} />} />
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
