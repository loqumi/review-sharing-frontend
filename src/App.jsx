import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getMe } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Reviews from "./pages/Reviews";
import AddReview from "./pages/AddReview";
import EditReview from "./pages/EditReview";
import EditUser from "./pages/EditUser";
import Review from "./pages/Review";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true");
    dispatch(getMe());
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleClick = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", String(!darkMode));
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar onClick={handleClick} />
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/reviews/edit/:id" element={<EditReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/" element={<Reviews />} />
          <Route path="/reviews/:id" element={<Review />} />
          <Route path="/reviews/add" element={<AddReview />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
