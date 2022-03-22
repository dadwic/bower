import React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApiIcon from "@mui/icons-material/Api";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ExtensionIcon from "@mui/icons-material/Extension";
import ConstructionIcon from "@mui/icons-material/Construction";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ListItems() {
  return (
    <React.Fragment>
      <ListItemButton component="a" href="https://bower.io/" target="_blank">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={Link} to="/" selected>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItemButton>
      <ListItemButton
        component="a"
        href="https://bower.io/docs/creating-packages/"
        target="_blank"
      >
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Creating Packages" />
      </ListItemButton>
      <ListItemButton
        component="a"
        href="https://bower.io/docs/api/"
        target="_blank"
      >
        <ListItemIcon>
          <ApiIcon />
        </ListItemIcon>
        <ListItemText primary="API" />
      </ListItemButton>
      <ListItemButton
        component="a"
        href="https://bower.io/docs/config/"
        target="_blank"
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configuration" />
      </ListItemButton>
      <ListItemButton
        component="a"
        href="https://bower.io/docs/pluggable-resolvers/"
        target="_blank"
      >
        <ListItemIcon>
          <ExtensionIcon />
        </ListItemIcon>
        <ListItemText primary="Pluggable Resolvers" />
      </ListItemButton>
      <ListItemButton
        component="a"
        href="https://bower.io/docs/tools/"
        target="_blank"
      >
        <ListItemIcon>
          <ConstructionIcon />
        </ListItemIcon>
        <ListItemText primary="Tools" />
      </ListItemButton>
      <ListItemButton
        component="a"
        href="https://bower.io/docs/about/"
        target="_blank"
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </React.Fragment>
  );
}
