import React, { useEffect } from "react";
import Review from "../components/Review";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return <Review />;
};

export default ReviewPage;
