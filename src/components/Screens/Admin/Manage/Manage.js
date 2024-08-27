import { useState } from "react";
import AdminNavBar from "../../../Common/Header/AdminNavBar";
import SideNavigation from "../Dashboard/SideNavigation";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { AppBar, Body, DrawerHeader } from "./utils";

export const Manage = () => {
  const [open, setOpen] = useState(false);

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
        <div className="flex flex-row gap-5">
          <AdminNavBar />
        </div>
      </Body>
    </Box>
  );
};
