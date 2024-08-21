import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogoutRedux } from "../SignIn/redux/actions/userAction";
import "./Header.scss";
import Signup from "../SignUp/SignUp";
import Signin from "../SignIn/Signin";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const user = useSelector((state) => state.user.account);

  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  const switchToSignUp = () => {
    handleSignInClose();
    handleSignUpOpen();
  };

  const switchToSignIn = () => {
    handleSignUpClose();
    handleSignInOpen();
  };

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    toast.success("Đăng xuất thành công!");
  };

  useEffect(() => {
    if (user && user.auth === null) {
      handleNavigation("/", 1);
    } else if (user.auth === true) {
      if (decoded.role !== "user") {
        handleNavigation("/dashboard", 11);
      }
      handleSignInClose();
    } else if (user.auth === false) {
      handleNavigation("/", 1);
    }
  }, [user.auth]);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (router, index) => {
    handleClick(index);
    navigate(router);
    handleCloseNavMenu();
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="logo"
            style={{ cursor: "pointer", width: "40px", height: "auto" }}
            onClick={() => handleNavigation("/", 1)}
          ></img>
          {/* small screen */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => handleNavigation("/", 1)}>
                Trang chủ
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/movies", 2)}>
                Lịch chiếu
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/news", 3)}>
                Tin tức
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/price", 4)}>
                Giá vé
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/promotions", 5)}>
                Khuyến mãi
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/about", 6)}>
                Giới thiệu
              </MenuItem>
              {user.auth && decoded.role !== "user" && (
                <div>
                  <MenuItem onClick={() => handleNavigation("/dashboard", 11)}>
                    Thống kê
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigation("/manage", 10)}>
                    Quản lý
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>

          {/* full screen */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ButtonGroup variant="text" aria-label="Basic button group">
              {user.auth && decoded.role !== "user" && (
                <span className="flex flex-row">
                  <Button
                    onClick={() => handleNavigation("/dashboard", 11)}
                    sx={{
                      my: 2,
                      color: clickedIndex === 11 ? "red" : "white",
                      "&:hover": {
                        color: "red",
                      },
                      display: "block",
                      textTransform: "none",
                    }}
                  >
                    Thống kê
                  </Button>
                  <Button
                    onClick={() => handleNavigation("/manage", 10)}
                    sx={{
                      my: 2,
                      color: clickedIndex === 10 ? "red" : "white",
                      "&:hover": {
                        color: "red",
                      },
                      display: "block",
                      textTransform: "none",
                    }}
                  >
                    Quản lý
                  </Button>
                </span>
              )}

              <Button
                onClick={() => handleNavigation("/", 1)}
                sx={{
                  my: 2,
                  color: clickedIndex === 1 ? "red" : "white",
                  "&:hover": {
                    color: "red",
                  },
                  display: "block",
                  textTransform: "none",
                }}
              >
                Trang chủ
              </Button>
              <Button
                onClick={() => handleNavigation("/movies", 2)}
                sx={{
                  my: 2,
                  color: clickedIndex === 2 ? "red" : "white",
                  "&:hover": {
                    color: "red",
                  },
                  display: "block",
                  textTransform: "none",
                }}
              >
                Lịch chiếu
              </Button>
              <Button
                onClick={() => handleNavigation("/news", 3)}
                sx={{
                  my: 2,
                  color: clickedIndex === 3 ? "red" : "white",
                  "&:hover": {
                    color: "red",
                  },
                  display: "block",
                  textTransform: "none",
                }}
              >
                Tin tức
              </Button>
              <Button
                onClick={() => handleNavigation("/price", 4)}
                sx={{
                  my: 2,
                  color: clickedIndex === 4 ? "red" : "white",
                  "&:hover": {
                    color: "red",
                  },
                  display: "block",
                  textTransform: "none",
                }}
              >
                Giá vé
              </Button>
              <Button
                onClick={() => handleNavigation("/promotions", 5)}
                sx={{
                  my: 2,
                  color: clickedIndex === 5 ? "red" : "white",
                  "&:hover": {
                    color: "red",
                  },
                  display: "block",
                  textTransform: "none",
                }}
              >
                Khuyến mãi
              </Button>
              <Button
                onClick={() => handleNavigation("/about", 6)}
                sx={{
                  my: 2,
                  color: clickedIndex === 6 ? "red" : "white",
                  "&:hover": {
                    color: "red",
                  },
                  display: "block",
                  textTransform: "none",
                }}
              >
                Giới thiệu
              </Button>
            </ButtonGroup>
          </Box>

          {user.auth !== true && (
            <Stack direction="row" spacing={2}>
              <Signup
                isOpen={isSignUpOpen}
                handleOpen={handleSignUpOpen}
                handleClose={handleSignUpClose}
                switchToSignIn={switchToSignIn}
              />
              <Signin
                isOpen={isSignInOpen}
                handleOpen={handleSignInOpen}
                handleClose={handleSignInClose}
                switchToSignUp={switchToSignUp}
              />
            </Stack>
          )}

          {user.auth === true && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={localStorage.getItem("email")}>
                <div onClick={handleOpenUserMenu}>
                  <IconButton>
                    <Avatar src="/broken-image.jpg" />
                  </IconButton>
                  <span>
                    <ArrowDropDownIcon />
                  </span>
                </div>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleNavigation("/account", 100)}>
                  Tài khoản
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
