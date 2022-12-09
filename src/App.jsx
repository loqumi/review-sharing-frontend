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

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/add" element={<AddReview />} />
        <Route path="/reviews/edit/:id" element={<EditReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
