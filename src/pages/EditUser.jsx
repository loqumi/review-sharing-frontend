import React from "react";
import FormEditUser from "../components/User/FormEditUser";
import LoginErrorCatcher from "../utils/LoginErrorCatcherFunc";

const EditUserPage = () => {
    LoginErrorCatcher()
    return <FormEditUser/>;
};

export default EditUserPage;
