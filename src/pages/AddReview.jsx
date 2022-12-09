import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddReview from "../components/FormAddReview";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <FormAddReview />
    </Layout>
  );
};

export default AddReview;
