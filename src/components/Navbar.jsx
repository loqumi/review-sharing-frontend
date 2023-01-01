import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar,
  TextField,
  Box,
  Toolbar,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  FormControl,
  Select,
} from "@mui/material/";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ReviewsIcon from "@mui/icons-material/Reviews";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { intl } from "../utils/intl";
import { INTL } from "../constants/intl";

const Navbar = ({ onClick, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [language, setLanguage] = useState("en");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const drawerWidth = 240;

  const getUserLikes = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/rating/?userId=${user.uuid}`
      );
      setLikes(response.data);
    } catch (error) {}
  }, [user]);

  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate(`/profile/${user.uuid}`);
    setOpen(false);
    setAnchorEl(null);
  };

  const handleChange = () => {
    navigate(`/users/edit/${user.uuid}`);
    setOpen(false);
    setAnchorEl(null);
  };

  const handleUsers = () => {
    navigate("/users");
    setOpen(false);
    setAnchorEl(null);
  };

  const handleAddReview = () => {
    navigate("/reviews/add");
    setOpen(false);
  };

  const handleReviews = () => {
    navigate("/");
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    setOpen(false);
    navigate("/login");
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const handleChangeLang = (e) => {
    const value = e.target.value;
    onChange(value);
    setLanguage(value);
  };

  useEffect(() => {
    getUserLikes();
    const lang = localStorage.getItem("lang") || "en";
    setLanguage(lang);
  }, [getUserLikes]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <FormControl>
            <Select value={language} onChange={handleChangeLang}>
              <MenuItem value={"en"}>en</MenuItem>
              <MenuItem value={"ru"}>ru</MenuItem>
            </Select>
          </FormControl>
          {isMobile && (
            <Box display={"flex"}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ ml: 1, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ ...(!open && { display: "none" }) }}>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              {user && (
                <div>
                  <Divider />
                  <List>
                    <ListItem onClick={handleProfile}>
                      <ListItemButton>
                        <ListItemIcon>
                          <AccountBoxIcon />
                        </ListItemIcon>
                        {intl(INTL.NAV.PROFILE)}
                      </ListItemButton>
                    </ListItem>
                    <ListItem onClick={handleChange}>
                      <ListItemButton>
                        <ListItemIcon>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        {intl(INTL.NAV.MANAGE_ACCOUNT)}
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              )}
              {user !== null && user.role === "admin" && (
                <div>
                  <Divider />
                  <List>
                    <ListItem onClick={handleUsers}>
                      <ListItemButton>
                        <ListItemIcon>
                          <GroupIcon />
                        </ListItemIcon>
                        {intl(INTL.NAV.USERS)}
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              )}
              <Divider />
              <List>
                <ListItem onClick={handleReviews}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ReviewsIcon />
                    </ListItemIcon>
                    {intl(INTL.NAV.REVIEWS)}
                  </ListItemButton>
                </ListItem>
              </List>
              {user && (
                <div>
                  <List>
                    <ListItem onClick={handleAddReview}>
                      <ListItemButton>
                        <ListItemIcon>
                          <RateReviewIcon />
                        </ListItemIcon>
                        {intl(INTL.NAV.ADD_REVIEW)}
                      </ListItemButton>
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem onClick={logout}>
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        {intl(INTL.NAV.LOGOUT)}
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              )}
            </Drawer>
          </Box>
          <Box display={"flex"} sx={{ flexGrow: 1 }}>
            {!isMobile && (
              <Box display={"flex"}>
                <Button onClick={() => navigate("/")} color="inherit">
                  {intl(INTL.NAV.REVIEWS)}
                </Button>
                {user && (
                  <Button
                    onClick={() => navigate("/reviews/add")}
                    color="inherit"
                  >
                    {intl(INTL.NAV.ADD_REVIEW)}
                  </Button>
                )}
                {user !== null && user.role === "admin" && (
                  <Button onClick={() => navigate("/users")} color="inherit">
                    {intl(INTL.NAV.USERS)}
                  </Button>
                )}
              </Box>
            )}
            <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <TextField
              sx={{ ml: 1, flex: 1 }}
              label={intl(INTL.NAV.SEARCH)}
              id="outlined-size-small"
              size="small"
            />
            {!user && (
              <Button color="inherit" onClick={logout}>
                {intl(INTL.NAV.LOGIN)}
              </Button>
            )}
            {user && (
              <Box display={"flex"}>
                <Button color={"success"} align="center">
                  {intl(INTL.NAV.USER_INFO)} {likes}
                </Button>
                {!isMobile && (
                  <div>
                    <Button size="large" color="inherit" onClick={handleMenu}>
                      {user.name}
                    </Button>
                    <Menu
                      id="account-bar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem onClick={handleProfile}>
                        {intl(INTL.NAV.PROFILE)}
                      </MenuItem>
                      <MenuItem onClick={handleChange}>
                        {intl(INTL.NAV.MANAGE_ACCOUNT)}
                      </MenuItem>
                      <MenuItem onClick={logout}>
                        {intl(INTL.NAV.LOGOUT)}
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
