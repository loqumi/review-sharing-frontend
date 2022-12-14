import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import Reviews from "./pages/Reviews";
import AddReview from "./pages/AddReview";
import EditReview from "./pages/EditReview";
import { getMe } from "./features/authSlice";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/profile/:id" element={<Dashboard />} />
        <Route path="/reviews/edit/:id" element={<EditReview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/" element={<Reviews />} />
        <Route path="/reviews/add" element={<AddReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
