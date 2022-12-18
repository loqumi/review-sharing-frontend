import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import {
  AppBar,
  TextField,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Menu,
} from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ onClick, Language }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = () => {
    navigate(`/users/edit/${user.uuid}`);
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(`/profile/${user.uuid}`);
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button onClick={() => navigate("/")} color="inherit">
              Reviews
            </Button>
            {user !== null && (
              <Button onClick={() => navigate("/reviews/add")} color="inherit">
                Add Review
              </Button>
            )}
            {user !== null && user.role === "admin" && (
              <Button onClick={() => navigate("/users")} color="inherit">
                Users
              </Button>
            )}
          </Typography>
          <TextField
            sx={{ ml: 1, flex: 1 }}
            label="Search in"
            id="outlined-size-small"
            size="small"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
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
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {user.name}
              </Button>
              <Menu
                id="menu-appbar"
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
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
