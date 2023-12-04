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
import logo from '../../public/images/pnw-logo.png';
import buildings from '../../../common/buiding.json';
import WeatherIcon from '../../public/images/snow.png'

const Navbar = ({ onSearchItemClick, menuOperation }) => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearchItemClick = (item) => {
    onSearchItemClick(item); // Call the callback function to add a marker
  };

  const handleMenuClick = async (item) => {
    menuOperation(item)
  }

  const menuItems = [
    { "name": 'Park', "desc": "Shows 5 parking spots with high capacity" },
    { "name": 'Emergency', "desc": "Emergency Services" },
    { "name": 'Live Events', "desc": "Shows information about Live Events in the campus" },
    { "name": 'Locate Class', "desc": "Displays location of your classes" },
    { "name": 'Visitor Tour', "desc": "See a tour guide for new visitors" }
  ];

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
            <Tooltip title={item.desc} key={item.name}>
              <Button
                variant='outlined'
                style={{ display: "flex", flexDirection: 'column', marginRight: 10 }}
                color='inherit'
                onClick={async () => await handleMenuClick(item.name)}
              >
                {item.name}
              </Button>
            </Tooltip>
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