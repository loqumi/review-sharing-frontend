import React, {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {
    Stack,
    Typography,
    Container,
} from "@mui/material/";
import {intl} from "../../../utils/intl";
import {INTL} from "../../../constants/intl";
import {URL} from "../../../constants/URL"
import FormModel from "./Model/FormModel";

const FormAddReviewID = () => {
    const [review, setReview] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            await axios.post(`${URL}/reviews/add/${id}`,
                data
            );
            await axios
                .post(`${URL}/tags`, {
                    tag: data.tag,
                })
                .then(() => navigate("/"));
        } catch (error) {
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Stack alignItems={"center"}>
                <Typography component="h1" variant="h4" mt={12}>
                    {intl(INTL.FORM_ADD_REVIEW.NEW_REVIEW)}
                </Typography>
                <FormModel onSubmit={handleSubmit} review={review}/>
            </Stack>
        </Container>
    );
};

export default FormAddReviewID;