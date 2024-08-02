import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Grid, useMediaQuery, Box, Drawer, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../../public/images/pnw-logo.png";
import buildings from "../../../common/buiding.json";
import WeatherIcon from "../../public/images/snow.png";
import { userNameState } from "../store/selectors/userName";
import { useRecoilValue } from "recoil";
import MenuIcon from "@mui/icons-material/Menu";

const StyledButton = styled(Button)({
  display: "flex",
  flexDirection: "column",
  marginRight: 10,
  whiteSpace: "nowrap",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const Navbar = ({ onSearchItemClick, menuOperation }) => {
  const [searchItem, setSearchItem] = useState("");
  const userName = useRecoilValue(userNameState) || null;
  const isMediumOrSmaller = useMediaQuery("(max-width:960px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearchItemClick = (item) => {
    onSearchItemClick(item); // Call the callback function to add a marker
  };

  const handleMenuClick = async (item) => {
    menuOperation(item);
  };

  const menuItems = [
    { name: "Park", desc: "Shows 5 parking spots with high capacity" },
    { name: "Emergency", desc: "Emergency Services" },
    {
      name: "Live Events",
      desc: "Shows information about Live Events in the campus",
    },
    { name: "Locate Class", desc: "Displays location of your classes" },
    { name: "Visitor Tour", desc: "See a tour guide for new visitors" },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <Tooltip title={item.desc} key={item.name}>
        <StyledButton
          variant="outlined"
          color="inherit"
          onClick={async () => await handleMenuClick(item.name)}
        >
          {item.name}
        </StyledButton>
      </Tooltip>
    ));

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" flexShrink={1}>
          <img
            src={logo}
            alt="PNW Logo"
            onClick={() => {
              window.location = "/";
            }}
            style={{ height: "40px" }}
          />
          {/* <Tooltip title={"Go back to Map"}>
            <Typography
              variant="h6"
              component="div"
              onClick={() => {
                window.location = "/";
              }}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
                flexShrink: 1,
                fontSize: "calc(1rem + 0.25vw)", // Adjusts font size based on viewport width
              }}
            >
              Purdue University Northwest
            </Typography>
          </Tooltip> */}
        </Box>

        <Tooltip title="Cloudy - 40°F / 4°C - 0% Chance of Snowing">
          <img src={WeatherIcon} width={45} alt="Weather Icon" style={{ marginRight: "10px" }} />
        </Tooltip>

        {isMediumOrSmaller ? (
          <Box>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem button key={item.name} onClick={async () => await handleMenuClick(item.name)}>
                    <ListItemText primary={item.name} secondary={item.desc} />
                  </ListItem>
                ))}
                <ListItem>
                  <Grid container spacing={2} style={{ marginLeft: 10, marginTop: 1 }}>
                    <InputBase
                      placeholder="Search Location"
                      inputProps={{ "aria-label": "search" }}
                      style={{ color: "black", width: "100%" }}
                      value={searchItem}
                      onChange={(item) => {
                        setSearchItem(item.target.value);
                      }}
                    />
                    {searchItem && (
                      <ul
                        style={{
                          listStyleType: "none",
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          background: "black",
                          zIndex: 1,
                          padding: "10px",
                          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                          width: "100%",
                        }}
                      >
                        {buildings
                          .filter((item) => {
                            return searchItem.toLowerCase() === ""
                              ? item
                              : item.name
                                .toLowerCase()
                                .includes(searchItem.toLowerCase());
                          })
                          .map((item) => (
                            <li
                              key={item.name}
                              onClick={() => handleSearchItemClick(item)}
                            >
                              <button
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "white",
                                }}
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                      </ul>
                    )}
                  </Grid>
                </ListItem>
              </List>
            </Drawer>
          </Box>
        ) : (
          <Box display="flex" alignItems="center">
            {renderMenuItems()}
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              marginLeft="10px"
            >
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <Grid container spacing={2} style={{ marginLeft: 10, marginTop: 1 }}>
                <InputBase
                  placeholder="Search Location"
                  inputProps={{ "aria-label": "search" }}
                  style={{ color: "white" }}
                  value={searchItem}
                  onChange={(item) => {
                    setSearchItem(item.target.value);
                  }}
                />
                {searchItem && (
                  <ul
                    style={{
                      listStyleType: "none",
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "black",
                      zIndex: 1,
                      padding: "10px",
                      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                    }}
                  >
                    {buildings
                      .filter((item) => {
                        return searchItem.toLowerCase() === ""
                          ? item
                          : item.name
                            .toLowerCase()
                            .includes(searchItem.toLowerCase());
                      })
                      .map((item) => (
                        <li
                          key={item.name}
                          onClick={() => handleSearchItemClick(item)}
                        >
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: "white",
                            }}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </Grid>
            </Box>
            {!userName && (
              <Tooltip title="Click to Sign In">
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                >
                  <AccountCircle
                    onClick={() => {
                      window.location = "/signin";
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {userName && (
              <img
                src="/images/profile-abhishek.png"
                alt="User Icon"
                style={{ cursor: "pointer", width: 30 }}
                onClick={() => {
                  window.location = "/signin";
                }}
              />
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
