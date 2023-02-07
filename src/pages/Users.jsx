import React from "react";
import Userlist from "../components/Admin/Userlist";
import LoginErrorCatcher from "../utils/LoginErrorCatcherFunc";

const UsersPage = () => {
  LoginErrorCatcher()
  return <Userlist />;
};

export default UsersPage;
