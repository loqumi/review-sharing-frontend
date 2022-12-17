import React, { useEffect } from "react";
import FormAddReview from "../components/FormAddReview";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddReviewPage = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  return <FormAddReview />;
};

export default AddReviewPage;
