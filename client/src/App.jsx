import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import CampusMap from "./components/CampusMap.jsx";
import Navbar from "./components/Navbar.jsx";
import { RecoilRoot, useRecoilValue } from "recoil";
import {useState } from "react";
import { FilterButtons } from "./components/FilterButtons.jsx";
import Sideload from "./components/Sideload.jsx";
import building_data from "../../common/buiding.json";
import parking_data from "../../common/parking.json";
import VideoModal from './components/VideoModal.jsx'
import emergency_data from "../../common/emergency.json"
import {userClassesState} from "../src/store/selectors/userClasses.js"
import { ThreeDMap } from "./components/ThreeDMap.jsx";

function App() {
  const [marker, setMarker] = useState(null);
  const [classUser, setClassUser] = useState([]);

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
  const [emergencyData, setEmergencyData] = useState([])
  const [liveEvents, setLiveEvents] = useState([])
  const [locateUserClasses, setLocateUserClasses] = useState([])

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
    else if (item === "Emergency") {
      if (emergencyData.length > 0) {
        setEmergencyData([]);
      }
      else {
        const filteredEmergencyData = emergency_data
        setEmergencyData(filteredEmergencyData);
      }
    }
    else if (item === "Live Events") {
      if (liveEvents.length > 0) {
        setLiveEvents([]);
      }
      else {
        const live_events = building_data
          .filter((item) => item.live_events.length > 0)
          .map((item) => {
            return {
              live_events: item.live_events,
              location: item.location,
              name: item.name,
            };
          });

        setLiveEvents(live_events);
      }
    }
    else if(item === "Locate Class"){
      if(locateUserClasses && locateUserClasses.length > 0){
        setLocateUserClasses([])
      }
      else{
        setLocateUserClasses(classUser)
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

  const setUserClasses = (userClasses) => {
    setClassUser(userClasses)
  }

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
          <InitUser setClassesForUser={setUserClasses}/>
          <Routes>
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route
              path={"/"}
              element={
                <CampusMap marker={marker} park={parkData} vtour={video} emergency={emergencyData} liveEvents={liveEvents} classes={locateUserClasses} />
              }
            />
            <Route path={"/3d"} element={<ThreeDMap scale="40" modelPath={"/final2.glb"}/>} />
            <Route path={"/filters"} element={<FilterButtons />} />
            <Route path={"/sideload"} element={<Sideload data={loadData} />} />
            <Route path={"/ytube"} element={<VideoModal video='https://www.youtube.com/embed/EhYk54W9kYM' open={vtour} setOpen={setVtour} />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser({setClassesForUser}) {
  const classes = useRecoilValue(userClassesState)

  if(classes){
  console.log("Init User Classes")
  console.log(classes)
  }

  setClassesForUser(classes);

  return <></>;
}

export default App;
