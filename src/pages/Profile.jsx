import React from "react";
import Profile from "../components/User/Profile";
import LoginErrorCatcher from "../utils/LoginErrorCatcherFunc";

const ProfilePage = () => {
    LoginErrorCatcher()
    return <Profile/>;
};

export default ProfilePage;
