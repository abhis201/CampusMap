import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import logo from '../assets/pnw-logo.png';
import buildings from '../../../common/buiding.json';
import WeatherIcon from '../assets/snow.png'
import YouTube from 'react-youtube';

const Navbar = ({ onSearchItemClick, menuOperation }) => {
  const [searchItem, setSearchItem] = useState('');
  const [videoId, setVideoId] = useState('https://youtu.be/EhYk54W9kYM?si=t1-YUceRFzBo83du');
  const [openVideo, setOpenVideo] = useState(false)


  const handleMenuItemSelect = (item) => {
    menuOperation(item)
  };

  const handleSearchItemClick = (item) => {
    onSearchItemClick(item); // Call the callback function to add a marker
  };

  const menuItems = ['Park', 'Emergency', 'Live Events', 'Locate Class', 'Visitor Tour'];

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="PNW Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" onClick={() => { window.location = "/" }}>
            Purdue University Northwest
          </Typography>
        </div>

        <Tooltip title="Rain - 40°F / 4°C - 80% Chance of Snowing">
          <img src={WeatherIcon} width={45}></img>
        </Tooltip>

        <div style={{ display: 'flex', alignItems: 'center' }}>


          {menuItems.map((item) => (
            <Button variant='outlined' key={item} style={{ display: "flex", flexDirection: 'column', marginRight:10}} color='inherit' onClick={() => handleMenuItemSelect(item)}>
              {item}
            </Button>
          ))}

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <Grid container spacing={2} style={{ marginLeft: 10, marginTop: 1 }}>
              <InputBase
                placeholder="Search Location"
                inputProps={{ 'aria-label': 'search' }}
                style={{ color: "white" }}
                value={searchItem}
                onChange={(item) => {
                  setSearchItem(item.target.value);
                }}
              />
              {searchItem && (
                <ul style={{ listStyleType: 'none', position: 'absolute', top: '100%', left: 0, background: 'black', zIndex: 1, padding: '10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
                  {buildings.filter(item => {
                    return searchItem.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchItem.toLowerCase())
                  }).map((item) => (
                    <li
                      key={item.name}
                      onClick={() => handleSearchItemClick(item)}
                    >
                      <button
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'white' }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Grid>
          </div>

          <Tooltip title="Click to Sign Out">
            <IconButton
              color="inherit"
              aria-haspopup="true"
              aria-controls="menu-appbar"
            >
              <AccountCircle onClick={() => { window.location = "/signin" }} />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 2
};

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

const VideoModal = ({ video, open, setOpen }) => {
  const handleClose = () => { setOpen(false) }

  return (
      <div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby={"Visitor Guide"}
              aria-describedby={"PNW Visitor Guide"}
          >
              <Box sx={style}>
                  <Typography id='vguide' variant="h6" component="h2">
                      PNW Visitors Guide
                  </Typography>
                  <YouTube videoId={video} opts={opts} />
              </Box>
          </Modal>
      </div>
  );
}