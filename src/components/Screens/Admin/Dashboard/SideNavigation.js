import React from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PieChart from "@mui/icons-material/PieChart";
import SmsIcon from "@mui/icons-material/Sms";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogoutRedux } from "../../../Common/SignIn/redux/actions/userAction";
import { DrawerHeader, drawerWidth } from "../Manage/utils";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CircularProgress from "@mui/joy/CircularProgress";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

export default function SideNavigation({ open, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    navigate("/");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth - 50,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth - 50,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton sx={{ color: "#fff" }} onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ backgroundColor: "grey" }} />
      <ListItem disablePadding>
        <ListItemButton
          // selected
          // variant="soft"
          onClick={() => navigate("/dashboard")}
        >
          <ListItemIcon>
            <PieChart sx={{ color: "#fff" }} />
          </ListItemIcon>
          Dashboard
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/manage")}>
          <ListItemIcon>
            <SmsIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          Quản lý
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <PersonIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          Giao diện khách hàng
        </ListItemButton>
      </ListItem>
      <Divider sx={{ backgroundColor: "grey" }} />
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/account");
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          Tài khoản
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          Đăng xuất
        </ListItemButton>
      </ListItem>
      <Card
        variant="soft"
        orientation="horizontal"
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          borderRadius: "sm",
          marginTop: "auto",
          marginBottom: "20px",
          width: "90%",
          background: "linear-gradient(to bottom, #262C36, #1B1E24)",
        }}
      >
        <CircularProgress
          value={35}
          determinate
          thickness={8}
          size="lg"
          sx={{ color: "#fff" }}
        >
          35%
        </CircularProgress>
        <CardContent sx={{ ml: 2 }}>
          <Chip
            size="sm"
            variant="outlined"
            sx={{ alignSelf: "flex-start", mb: 1 }}
          >
            Hoạt động
          </Chip>
          <Typography fontSize="xs" sx={{ color: "#fff" }}>
            Cập nhật lần cuối: 29/08/2024
          </Typography>
        </CardContent>
      </Card>
    </Drawer>
  );
}
