import * as React from "react";
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
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import SignUpForm from "../Forms/SignUpForm";

const Header = () => {
  const navigate = useNavigate();

  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showSignUp, setShowSignUp] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignUpOpen = () => {
    setShowSignUp(true);
  };
    
  const handleCloseForms = () => {
    setShowSignUp(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleHome = () => {
    navigate("/");
    handleCloseNavMenu();
  };

  const handleIntroduce = () => {
    navigate("/introduce");
    handleCloseNavMenu();
  };

  const handleNews = () => {
    navigate("/news");
    handleCloseNavMenu();
  };

  const handlePrice = () => {
    navigate("/price");
    handleCloseNavMenu();
  };

  const handlePromotion = () => {
    navigate("/promotion");
    handleCloseNavMenu();
  };

  const handleShowtimes = () => {
    navigate("/showtimes");
    handleCloseNavMenu();
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75"
            alt="logo"
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
              <MenuItem onClick={handleHome}>Trang chủ</MenuItem>
              <MenuItem onClick={handleShowtimes}>Lịch chiếu</MenuItem>
              <MenuItem onClick={handleNews}>Tin tức</MenuItem>
              <MenuItem onClick={handlePrice}>Giá vé</MenuItem>
              <MenuItem onClick={handlePromotion}>Khuyến mại</MenuItem>
              <MenuItem onClick={handleIntroduce}>Giới thiệu</MenuItem>
            </Menu>
          </Box>

          {/* full screen */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ButtonGroup variant="text" aria-label="Basic button group">
              <Button
                onClick={() => handleHome()}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Trang chủ
              </Button>
              <Button
                onClick={() => handleShowtimes()}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Lịch chiếu
              </Button>
              <Button
                onClick={() => handleNews()}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Tin tức
              </Button>
              <Button
                onClick={() => handlePrice()}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Giá vé
              </Button>
              <Button
                onClick={() => handlePromotion()}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Khuyến mãi
              </Button>
              <Button
                onClick={() => handleIntroduce()}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Giới thiệu
              </Button>
            </ButtonGroup>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleSignUpOpen}>
              Đăng ký
            </Button>
            <SignUpForm open={showSignUp} onClose={handleCloseForms} />

            <Button
              sx={{
                borderRadius: "40px",
                backgroundColor: "#dc1313f0",
                textTransform: "none",
              }}
              variant="contained"
              href="#outlined-buttons"
            >
              Đăng nhập
            </Button>
          </Stack>
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
