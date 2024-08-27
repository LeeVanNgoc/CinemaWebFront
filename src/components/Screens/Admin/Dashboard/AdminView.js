import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./Dashboard";
import { AppBar, Body, DrawerHeader } from "../Manage/utils";
import { Manage } from "../Manage/Manage";
import SideNavigation from "./SideNavigation";
import "./AdminView.scss";

export default function AdminView() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}></AppBar>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              mb: "auto",
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
      <SideNavigation open={open} handleDrawerClose={handleDrawerClose} />
      <Body open={open}>
        <DrawerHeader />
        {window.location.pathname === "/dashboard" ? (
          <Dashboard />
        ) : window.location.pathname === "/manage" ? (
          <Manage />
        ) : null}
      </Body>
    </Box>
  );
}
