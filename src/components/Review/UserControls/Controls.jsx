import React, {useState} from "react";
import {intl} from "../../../utils/intl";
import {INTL} from "../../../constants/intl";
import {Box, IconButton, Rating, TextField, Grid, Typography,} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import {URL} from "../../../constants/URL";
import {useParams} from "react-router-dom";

const Controls = ({user, review, rating, setRating, liked, setLiked}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const {id} = useParams();

    const handleClickRating = (e) => {
        sendRating(e.target.value)
    }
    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }
    const handleSetLike = async () => {
        try {
            const response = await axios.get(`${URL}/reviews/like/${id}`);
            setLiked(response.data);
        } catch (error) {
        }
    };

    const sendRating = async (rating) => {
        if (!rating) return;
        try {
            const response = await axios.post(`${URL}/reviews/product/rating/${id}`, {
                rating,
            });
            setRating(response.data[user?.uuid]);
        } catch (error) {
        }
    };

    const sendComment = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(`${URL}/comments`, {
                    comment,
                    reviewId: review.id,
                })
                .then((res) => setComments((prev) => [...prev, res.data]));
        } catch (error) {
        }
        setComment("");
    };

    return (
        <Box
            component="form"
            onSubmit={sendComment}
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Grid container spacing={2} marginTop={2}>
                <Grid
                    item
                    xs={6}
                    display={"flex"}
                    justifyContent="left"
                    marginTop={2}
                >
                    <Typography component="h1" variant="h4">
                        {intl(INTL.REVIEW.RATE)}:
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent="center"
                    marginTop={2}
                >
                    <Typography component="h1" variant="h5">
                        {intl(INTL.REVIEW.LIKES)}:
                    </Typography>
                    <IconButton onClick={handleSetLike}>
                        <FavoriteIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h5">
                        {liked?.length}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent="center"
                    marginTop={2}
                >
                    <Typography component="h1" variant="h5">
                        {intl(INTL.FORM_ADD_REVIEW.RATING)}:
                    </Typography>
                    <Rating
                        onClick={(e) => handleClickRating(e)}
                        size="large"
                        value={Number(rating)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="comment"
                        fullWidth
                        id="comment"
                        label={intl(INTL.REVIEW.COMMENT)}
                        autoFocus
                        value={comment}
                        onChange={(e) => handleChangeComment(e)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Controls;
