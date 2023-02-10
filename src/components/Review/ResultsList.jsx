import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {reset} from "../../features/authSlice";
import axios from "axios";
import {
    CssBaseline,
    Grid,
    Typography,
    Container,
} from "@mui/material/";
import {intl} from "../../utils/intl";
import {INTL} from "../../constants/intl";
import {URL} from "../../constants/URL";
import ReviewCardModel from "./Model/ReviewCardModel";

const Results = () => {
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const no_image =
        "https://firebasestorage.googleapis.com/v0/b/cloud-storage-3201c.appspot.com/o/files%2Fno-image.png?alt=media&token=eeda5f87-0329-420e-863c-d0f9d3b41424";
    const search = useLocation().search;
    const query = new URLSearchParams(search).get("query");

    const logout = React.useCallback(() => {
        dispatch(reset());
        navigate("/");
    }, [dispatch, navigate]);

    const login = React.useCallback(
        (error) => error.response.status === 401 && logout(),
        [logout]
    );

    const getReviews = React.useCallback(async () => {
        const response = await axios
            .get(`${URL}/reviews/search/?searchSTR=${query}`)
            .catch(login);
        setReviews(response.data);
    }, [login, query]);

    useEffect(() => {
        getReviews();
    }, [getReviews]);

    return (
        <Container sx={{py: 9}} component="main">
            <CssBaseline/>
            {reviews.length !== 0 && (
                <div>
                    <Typography variant="h2"> {intl(INTL.REVIEWS_LIST.ALL)}</Typography>
                    <Grid container spacing={4} sx={{marginTop: 0}}>
                        {reviews.map((review) => (
                            <ReviewCardModel review={review} no_image={no_image} key={review.uuid}/>
                        ))}
                    </Grid>
                </div>
            )}
        </Container>
    );
};

export default Results;
