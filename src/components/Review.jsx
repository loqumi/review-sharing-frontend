import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Rating,
  IconButton,
} from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Review = () => {
  const { user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");
  const [tag, setTag] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commonRating, setCommonRating] = useState([]);
  const [liked, setLiked] = useState([]);
  const [likes, setLikes] = useState("");

  const { id } = useParams();

  const getReviewById = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reviews/${id}`);
      setReview(response.data);
      setUsername(response.data.user.name);
      setTag(JSON.parse(response.data.tag).map((review) => review + " "));
      setLiked(JSON.parse(response.data.liked));
      setRating(JSON.parse(response.data.productRating)[user?.uuid]);
      setCommonRating(Object.values(JSON.parse(response.data.productRating)));
    } catch (error) {}
  }, [id, user?.uuid]);

  const getUserLikes = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/rating/?reviewId=${id}`
      );
      setLikes(response.data);
    } catch (error) {}
  }, [id]);

  const getComments = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/comments/?reviewId=${id}`
      );
      setComments(response.data);
    } catch (error) {}
  }, [id]);

  const setLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/reviews/like/${id}`
      );
      setLiked(response.data);
    } catch (error) {}
  };

  const sendRating = async (rating) => {
    if (!rating) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/reviews/product/rating/${id}`,
        { rating }
      );
      setRating(response.data[user?.uuid]);
    } catch (error) {}
  };

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/comments", {
          comment,
          reviewId: review.id,
        })
        .then((res) => setComments((prev) => [...prev, res.data]));
    } catch (error) {}
  };

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const res = await axios.get(
          `http://localhost:5000/comments/?reviewId=${id}`
        );
        setComments(res.data);
      })();
    }, 445000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    getReviewById();
    getComments();
    getUserLikes();
  }, [getComments, getReviewById, getUserLikes]);

  return (
    <Container component="main" xs={"xl"}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Author {username} rating {likes}
        </Typography>
        <Typography component="h1" variant="h4">
          {review.title}
        </Typography>
        {commonRating.length > 0 && (
          <Typography component="h1" variant="h4">
            {review.product} user rating{" "}
            {commonRating.reduce((a, b) => Number(a) + Number(b)) /
              commonRating.length}
          </Typography>
        )}
        <Typography component="h1" variant="h4">
          {review.group}
        </Typography>
        <Typography component="h1" variant="h4">
          {tag}
        </Typography>
        <Typography component="h1" variant="h4">
          <ReactMarkdown>{review.text}</ReactMarkdown>
        </Typography>
        <Rating value={Number(review.rating)} readOnly max={10} size="large" />
        <IconButton onClick={setLike}>
          <FavoriteIcon />
        </IconButton>
        <Typography component="h1" variant="h4">
          {liked?.length}
        </Typography>
        {user && (
          <Box component="form" onSubmit={sendComment} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Rating
                onClick={(e) => sendRating(e.target.value)}
                size="large"
                value={Number(rating)}
              />
              <Grid item xs={12}>
                <TextField
                  name="comment"
                  fullWidth
                  id="comment"
                  label="Comment"
                  autoFocus
                  placeholder="Write something"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {comments.map((comments) => (
          <Grid item key={comments.uuid} xs={12} sm={6} md={4}>
            <Typography>{comments.title}</Typography>
            <Typography>{comments.name}</Typography>
          </Grid>
        ))}
      </Box>
    </Container>
  );
};

export default Review;
