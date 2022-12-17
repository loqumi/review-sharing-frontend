import React, { useEffect } from "react";
import FormEditReview from "../components/FormEditReview";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditReviewPage = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return <FormEditReview />;
};

export default EditReviewPage;
