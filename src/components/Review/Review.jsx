import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ReviewModel from "./Model/ReviewModel";
import {
    CssBaseline,
    Container,
    Box,
    Typography,
} from "@mui/material/";
import {intl} from "../../utils/intl";
import {INTL} from "../../constants/intl";
import {URL} from "../../constants/URL";
import Controls from "./UserControls/Controls";
import Comments from "./UserControls/Comments";

const Review = () => {
    const {user} = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [review, setReview] = useState("");
    const [tag, setTag] = useState("");
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);
    const [commonRating, setCommonRating] = useState([]);
    const [liked, setLiked] = useState([]);
    const [likes, setLikes] = useState("");
    const {id} = useParams();
    const no_image =
        "https://firebasestorage.googleapis.com/v0/b/cloud-storage-3201c.appspot.com/o/files%2Fno-image.png?alt=media&token=eeda5f87-0329-420e-863c-d0f9d3b41424";

    const getReviewById = React.useCallback(async () => {
        try {
            const response = await axios.get(`${URL}/reviews/${id}`);
            setReview(response.data);
            setUsername(response.data.user.name);
            setTag(JSON.parse(response.data.tag).map((review) => review + " "));
            setLiked(JSON.parse(response.data.liked));
            setRating(JSON.parse(response.data.productRating)[user?.uuid]);
            setCommonRating(Object.values(JSON.parse(response.data.productRating)));
        } catch (error) {
        }
    }, [id, user?.uuid]);

    const getUserLikes = React.useCallback(async () => {
        try {
            const response = await axios.get(`${URL}/user/rating/?reviewId=${id}`);
            setLikes(response.data);
        } catch (error) {
        }
    }, [id]);

    const getComments = React.useCallback(async () => {
        try {
            const response = await axios.get(`${URL}/comments/?reviewId=${id}`);
            setComments(response.data);
        } catch (error) {
        }
    }, [id]);

    useEffect(() => {
        const interval = setInterval(() => {
            (async () => {
                const res = await axios.get(`${URL}/comments/?reviewId=${id}`);
                setComments(res.data);
            })();
        }, 5000);
        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        getReviewById();
        getComments();
        getUserLikes();
    }, [getComments, getReviewById, getUserLikes]);
    return (
        <Container component="main">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ReviewModel review={review} username={username} tag={tag} commonRating={commonRating} likes={likes}
                             no_image={no_image}/>

                {user && (
                    <Controls user={user} review={review} rating={rating} liked={liked} setRating={setRating}
                              setLiked={setLiked}/>
                )}
                <Box
                    sx={{
                        marginTop: 3,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                    }}
                >
                    {comments.length > 0 && (
                        <Typography component="h1" variant="h3">
                            {intl(INTL.REVIEW.COMMENTS)}
                        </Typography>
                    )}
                    {comments.map((comments) => (
                        <Comments comments={comments}/>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default Review;
