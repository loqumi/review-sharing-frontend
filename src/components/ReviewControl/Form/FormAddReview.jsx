import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {
    Stack,
    Typography,
    Container,
} from "@mui/material/";
import {intl} from "../../../utils/intl";
import {INTL} from "../../../constants/intl";
import {URL} from "../../../constants/URL"
import FormModel from "./Model/FormModel";

const FormAddReview = () => {
    const [review, setReview] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            await axios.post(`${URL}/reviews/`,
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
                <Typography component="h1" variant="h3" mt={12}>
                    {intl(INTL.FORM_ADD_REVIEW.NEW_REVIEW)}
                </Typography>
                <FormModel onSubmit={handleSubmit} review={review}/>
            </Stack>
        </Container>
    );
};

export default FormAddReview;