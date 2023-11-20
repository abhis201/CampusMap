import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem, Button, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import logo from '../assets/pnw-logo.png';
import buildings from '../../../common/buiding.json';

const Navbar = ({ onSearchItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [searchItem, setSearchItem] = useState('');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemSelect = (item) => {
    setSelectedMenuItem(item);
    handleMenuClose();
  };

  const handleSearchItemClick = (item) => {
    onSearchItemClick(item); // Call the callback function to add a marker
  };

  const menuItems = ['Park', 'Navigate', 'Emergency', 'Live Events', 'Locate Class', 'Quick Tour'];

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="PNW Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" onClick={()=>{window.location = "/"}}>
            Purdue University Northwest
          </Typography>
        </div>

        <Tooltip title="19% Change of Precipitation">
          <Typography component="div">Cloudy - 60°F / 16°C</Typography>
        </Tooltip>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <IconButton color="inherit">
              <SearchIcon/>
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
                    return searchItem.toLowerCase() === '' ? item : item.Name.toLowerCase().includes(searchItem.toLowerCase())
                  }).map((item) => (
                    <li
                      key={item.Name}
                      onClick={() => handleSearchItemClick(item)}
                    >
                      <button
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'white' }}
                      >
                        {item.Name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Grid>
          </div>

          <Button
            color="inherit"
            onClick={handleMenuClick}
            startIcon={<MenuIcon />}
          >
            Features
          </Button>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} value={item} onClick={() => handleMenuItemSelect(item)}>
                {item}
              </MenuItem>
            ))}
          </Menu>

          <Tooltip title="Click to Sign Out">
            <IconButton
              color="inherit"
              aria-haspopup="true"
              aria-controls="menu-appbar"
            >
              <AccountCircle onClick={()=>{window.location = "/Signin"}}/>
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;