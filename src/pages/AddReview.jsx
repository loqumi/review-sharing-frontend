import React from "react";
import FormAddReview from "../components/ReviewControl/Form/FormAddReview";
import LoginErrorCatcher from "../utils/LoginErrorCatcherFunc";

const AddReviewPage = () => {
    LoginErrorCatcher()
    return <FormAddReview/>;
};

export default AddReviewPage;
