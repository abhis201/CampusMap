import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import logo from '../assets/pnw-logo.png';
const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('');

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

  const menuItems = ['Park', 'Navigate', 'Emergency', 'Live Events', 'Locate Class', 'Quick Tour'];

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="PNW Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div">
            Purdue University Northwest
          </Typography>
        </div>

        <Tooltip title="19% Change of Precipitation">
        <Typography component="div">Cloudy - 60°F / 16°C</Typography>
        </Tooltip>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search Location"
              inputProps={{ 'aria-label': 'search' }}
              style={{ color: "white" }}
            />
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
            <AccountCircle />
          </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;