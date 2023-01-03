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
  Card,
  CardContent,
  CardMedia,
} from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { intl } from "../utils/intl";
import { INTL } from "../constants/intl";

const URL = "https://webapp-backend-production.up.railway.app";

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
    } catch (error) {}
  }, [id, user?.uuid]);

  const getUserLikes = React.useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/user/rating/?reviewId=${id}`);
      setLikes(response.data);
    } catch (error) {}
  }, [id]);

  const getComments = React.useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/comments/?reviewId=${id}`);
      setComments(response.data);
    } catch (error) {}
  }, [id]);

  const setLike = async () => {
    try {
      const response = await axios.get(`${URL}/reviews/like/${id}`);
      setLiked(response.data);
    } catch (error) {}
  };

  const sendRating = async (rating) => {
    if (!rating) return;
    try {
      const response = await axios.post(`${URL}/reviews/product/rating/${id}`, {
        rating,
      });
      setRating(response.data[user?.uuid]);
    } catch (error) {}
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
    } catch (error) {}
    setComment("");
  };

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
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {review.titleImage === null && (
            <CardMedia
              component="img"
              image={no_image}
              alt="titleImage"
              sx={{
                width: "50%",
              }}
            />
          )}
          {review.titleImage !== null && (
            <CardMedia
              component="img"
              image={review.titleImage}
              alt="titleImage"
              sx={{
                width: "50%",
              }}
            />
          )}
          <CardContent sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} display={"flex"} justifyContent="center">
                <Typography component="h1" variant="h3">
                  {review.title}
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent="left">
                <Typography component="h1" variant="h5">
                  {intl(INTL.FORM_ADD_REVIEW.PRODUCT)}: {review.product}
                </Typography>
              </Grid>
              {commonRating.length > 0 && (
                <Grid item xs={12} display={"flex"} justifyContent="left">
                  <Typography component="h1" variant="h5">
                    {commonRating.reduce((a, b) => Number(a) + Number(b)) /
                      commonRating.length}
                  </Typography>
                  <Rating value={1} max={1} readOnly size="large" />
                </Grid>
              )}
              <Grid item xs={12} display={"flex"} justifyContent="left">
                {review.group === "movie" && (
                  <Typography component="h1" variant="h5">
                    {intl(INTL.FORM_ADD_REVIEW.GROUP)}:
                    {intl(INTL.FORM_ADD_REVIEW.MOVIE)}
                  </Typography>
                )}
                {review.group === "anime" && (
                  <Typography component="h1" variant="h5">
                    {intl(INTL.FORM_ADD_REVIEW.GROUP)}:
                    {intl(INTL.FORM_ADD_REVIEW.ANIME)}
                  </Typography>
                )}
                {review.group === "book" && (
                  <Typography component="h1" variant="h5">
                    {intl(INTL.FORM_ADD_REVIEW.GROUP)}:
                    {intl(INTL.FORM_ADD_REVIEW.BOOK)}
                  </Typography>
                )}
                {review.group === "game" && (
                  <Typography component="h1" variant="h5">
                    {intl(INTL.FORM_ADD_REVIEW.GROUP)}:
                    {intl(INTL.FORM_ADD_REVIEW.GAME)}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent="left">
                <Typography component="h1" variant="h5">
                  {intl(INTL.FORM_ADD_REVIEW.TAGS)}: {tag}
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent="center">
                <Typography component="h1" variant="h4">
                  <ReactMarkdown>{review.text}</ReactMarkdown>
                </Typography>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent="left">
                <Typography component="h1" variant="h5">
                  {intl(INTL.FORM_ADD_REVIEW.RATING)} {intl(INTL.REVIEW.AUTHOR)}
                  :
                  <Rating
                    value={Number(review.rating)}
                    readOnly
                    max={10}
                    size="large"
                  />
                </Typography>
              </Grid>
              <Grid item xs={6} display={"flex"} justifyContent="left">
                <Typography component="h1" variant="h5">
                  {intl(INTL.REVIEW.AUTHOR)}: {username} <FavoriteIcon />
                  {likes}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {user && (
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
                xs={3}
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
                xs={3}
                display={"flex"}
                justifyContent="left"
                marginTop={2}
              >
                <Typography component="h1" variant="h5">
                  {intl(INTL.REVIEW.LIKES)}:
                </Typography>
                <IconButton onClick={setLike}>
                  <FavoriteIcon />
                </IconButton>
                <Typography component="h1" variant="h5">
                  {liked?.length}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                display={"flex"}
                justifyContent="left"
                marginTop={2}
              >
                <Typography component="h1" variant="h5">
                  {intl(INTL.FORM_ADD_REVIEW.RATING)}:
                </Typography>
                <Rating
                  onClick={(e) => sendRating(e.target.value)}
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
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
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
            <Card
              key={comments.uuid}
              sx={{
                marginTop: 1,
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} display={"flex"} justifyContent="left">
                    <Typography component="h1" variant="h5">
                      {comments.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} display={"flex"} justifyContent="left">
                    <Typography component="h1" variant="h5">
                      {comments.name}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Review;
