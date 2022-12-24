import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
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
} from "@mui/material/";
import { styled, useTheme } from "@mui/material/styles";
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

const Navbar = ({ onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const drawerWidth = 240;

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
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
                        Profile
                      </ListItemButton>
                    </ListItem>
                    <ListItem onClick={handleChange}>
                      <ListItemButton>
                        <ListItemIcon>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        Manage Acc
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
                        Users
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
                    Reviews
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
                        Add Review
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
                        Logout
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
                  Reviews
                </Button>
                {user && (
                  <Button
                    onClick={() => navigate("/reviews/add")}
                    color="inherit"
                  >
                    Add Review
                  </Button>
                )}
                {user !== null && user.role === "admin" && (
                  <Button onClick={() => navigate("/users")} color="inherit">
                    Users
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
              label="Search in"
              id="outlined-size-small"
              size="small"
            />
            {!user && (
              <Button color="inherit" onClick={logout}>
                Login
              </Button>
            )}
            {user && (
              <Box display={"flex"}>
                <Button color={"success"} align="center">
                  Rating {user.rating}
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
                      <MenuItem onClick={handleProfile}>Profile</MenuItem>
                      <MenuItem onClick={handleChange}>My account</MenuItem>
                      <MenuItem onClick={logout}>Logout</MenuItem>
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
