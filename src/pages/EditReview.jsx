import React from "react";
import FormEditReview from "../components/ReviewControl/Form/FormEditReview";
import LoginErrorCatcher from "../utils/LoginErrorCatcherFunc";

const EditReviewPage = () => {
    LoginErrorCatcher()
    return <FormEditReview/>;
};

export default EditReviewPage;
