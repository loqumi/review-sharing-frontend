import React from "react";
import FormAddReviewID from "../components/ReviewControl/Form/FormAddReviewID";
import LoginErrorCatcher from "../utils/LoginErrorCatcherFunc";

const AddReviewPageID = () => {
  LoginErrorCatcher()
  return <FormAddReviewID />;
};

export default AddReviewPageID;
