import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Link,
  Badge,
} from "@mui/material";
import {   Adb,   Person2Outlined,   WorkOutlineOutlined, } from "@mui/icons-material";
import { setIsLoggedIn, setUserState } from "../../redux/productSlice";
import logo from "../../assets/logo.png";
import { BoxContainer, IconbuttonCom, adb, appBarContainer, box, boxCont, button, menu } from "./styled";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const counter = useSelector((state) => state.productslice.productCartCounter);
  const isLoggedIn = useSelector((state) => state.productslice.isLoggedIn);
  const userState = useSelector((state) => state.productslice.userState);
  const pages = [{title:"Products",link:'products'}, {title:"Owner", link:'owner'}];

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      dispatch(setIsLoggedIn(true));
      setUser(email);
    }else {
      setUser('');
      dispatch(setIsLoggedIn(false));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      dispatch(setUserState('Logout'));
    }else {
      dispatch(setUserState('LogIn'))
    }
  }, [user]);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      padding: "0 4px",
    },
  }));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const settings = [
    {
      icon: <Person2Outlined fontSize="small" />,
      title: userState,
      link: "/login",
    },
    {
      icon: (
        <StyledBadge badgeContent={counter} color="secondary">
          <WorkOutlineOutlined fontSize="small" />
        </StyledBadge>
      ),
      title: "Bag",
      link: "/cart",
    },
  ];
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logOutHandler = (title)=>{
    if (title ==='Logout'){
      dispatch(setUserState('LogIn'));
      dispatch(setIsLoggedIn(false))
      localStorage.clear();
    }else {
      navigate('/login')
    }
  }
  return (
    <>
      <AppBar
        position="sticky"
        sx={appBarContainer}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link component={RouterLink} to="/">
              <img src={logo} alt="logo" height="40px" />
            </Link>
            <Box sx={BoxContainer}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {/* <MenuIcon /> */}
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
                sx={menu}
              >
                {pages.map((page) => (
                  <Link component={RouterLink} to={`${page.link}`} key={page}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Adb sx={adb} />
            <Box sx={box}>
              {pages.map((page) => {
                return (
                  <Fragment key={page.title}>
                    <Link component={RouterLink} to={`${page.link}`}>
                      <Button
                        key={page.title}
                        onClick={handleCloseNavMenu}
                        sx={button}
                      >
                        {page.title}
                      </Button>
                    </Link>
                  </Fragment>
                );
              })}
            </Box>
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              {settings.map((page, index) => (
                <Link
                  component={RouterLink}
                  to={page.link}
                  sx={{ textDecoration: "none" }}
                >
                  <Box
                    key={index}
                    sx={boxCont}
                  >
                    <IconButton
                      aria-label="delete"
                      sx={IconbuttonCom}
                      disableRipple
                    >
                      {page.icon}
                      <Typography variant="subtitle2" onClick={()=>{logOutHandler(page.title)}}>{page.title }</Typography>
                    </IconButton>
                  </Box>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
