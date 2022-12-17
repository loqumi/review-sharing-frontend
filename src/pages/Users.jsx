import React, { useEffect } from "react";
import Userlist from "../components/Userlist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  return <Userlist />;
};

export default UsersPage;
