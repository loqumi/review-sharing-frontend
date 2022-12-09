import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditReview from "../components/FormEditReview";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditReview = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <FormEditReview />
    </Layout>
  );
};

export default EditReview;
