import React, { useEffect } from "react";
import FormAddReviewID from "../components/FormAddReviewID";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddReviewPageID = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);
  return <FormAddReviewID />;
};

export default AddReviewPageID;
