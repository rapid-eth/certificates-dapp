import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import Link from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";
export const mainListItems = (
  <div>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component="a" href="/deploy">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Deploy Token" />
    </ListItem>
    <ListItem button component="a" href="/token">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Token Finder" href="/token" />
    </ListItem>
  </div>
);
