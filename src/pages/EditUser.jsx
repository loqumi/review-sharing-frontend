import React, { useEffect } from "react";
import FormEditUser from "../components/FormEditUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  return <FormEditUser />;
};

export default EditUserPage;
