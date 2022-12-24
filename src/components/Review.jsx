import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [group, setGroup] = useState("");
  const [tag, setTag] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [liked, setLiked] = useState([]);
  const { id } = useParams();

  const getReviewById = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reviews/${id}`);
      setTitle(response.data.title);
      setProduct(response.data.product);
      setGroup(response.data.group);
      setUserName(response.data.user.name);
      setTag(JSON.parse(response.data.tag).map((review) => review + " "));
      setText(response.data.text);
      setRating(response.data.rating);
      setReviewId(response.data.id);
      setLiked(JSON.parse(response.data.liked));
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

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/comments", {
          comment,
          reviewId: reviewId,
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
    }, 5000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    getReviewById();
    getComments();
  }, [getComments, getReviewById]);

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
          Author {userName}
        </Typography>
        <Typography component="h1" variant="h4">
          {title}
        </Typography>
        <Typography component="h1" variant="h4">
          {product}
        </Typography>
        <Typography component="h1" variant="h4">
          {group}
        </Typography>
        <Typography component="h1" variant="h4">
          {tag}
        </Typography>
        <Typography component="h1" variant="h4">
          {text}
        </Typography>
        <Rating value={Number(rating)} readOnly max={10} size="large" />
        <IconButton onClick={setLike}>
          <FavoriteIcon />
        </IconButton>
        <Typography component="h1" variant="h4">
          {liked?.length}
        </Typography>
        {user && (
          <Box component="form" onSubmit={sendComment} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
