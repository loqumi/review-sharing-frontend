import React, { useEffect } from "react";
import Layout from "./Layout";
import Userlist from "../components/Userlist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <Userlist />
    </Layout>
  );
};

export default Users;
