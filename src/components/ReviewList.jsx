import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/authSlice";
import axios from "axios";
import {
  Button,
  Card,
  CssBaseline,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Rating,
} from "@mui/material/";
import TagIcon from "@mui/icons-material/Tag";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { intl } from "../utils/intl";
import { INTL } from "../constants/intl";

const URL = "https://webapp-backend-production.up.railway.app";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [popularReviews, setPopularReviews] = useState([]);
  const [recentlyReviews, setRecentlyReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const no_image =
    "https://firebasestorage.googleapis.com/v0/b/cloud-storage-3201c.appspot.com/o/files%2Fno-image.png?alt=media&token=eeda5f87-0329-420e-863c-d0f9d3b41424";

  if (user && user.name === "") navigate(`/users/edit/${user.uuid}`);

  const logout = React.useCallback(() => {
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);

  const login = React.useCallback(
    (error) => error.response.status === 401 && logout(),
    [logout]
  );

  const getPopularReviews = React.useCallback(async () => {
    const response = await axios.get(`${URL}/reviews/popular`).catch(login);
    setPopularReviews(response.data);
  }, [login]);

  const getRecentlyReviews = React.useCallback(async () => {
    const response = await axios.get(`${URL}/reviews/recently`).catch(login);
    setRecentlyReviews(response.data);
  }, [login]);

  const getReviews = React.useCallback(async () => {
    const response = await axios.get(`${URL}/reviews`).catch(login);
    setReviews(response.data);
  }, [login]);

  const getTags = React.useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/tags`);
      setTags(response.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getPopularReviews();
    getRecentlyReviews();
    getReviews();
    getTags();
  }, [getPopularReviews, getRecentlyReviews, getReviews, getTags]);

  return (
    <Container sx={{ py: 9 }} component="main">
      <CssBaseline />
      {reviews.length !== 0 && (
        <div>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {intl(INTL.REVIEWS_LIST.USED_TAGS)}
          </Typography>
          <Autocomplete
            multiple
            id="tags-filled"
            options={tags}
            value={tags.map((tag) => tag.title)}
            freeSolo
            disabled
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => <TextField {...params} />}
          ></Autocomplete>
          <Typography variant="h2">
            {intl(INTL.REVIEWS_LIST.POPULAR)}
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: 0 }}>
            {popularReviews.map((review) => (
              <Grid item key={review.uuid} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {review.titleImage === null && (
                    <CardMedia
                      component="img"
                      image={no_image}
                      alt="titleImage"
                    />
                  )}
                  {review.titleImage !== null && (
                    <CardMedia
                      component="img"
                      image={review.titleImage}
                      alt="titleImage"
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review.title}
                    </Typography>
                    {Object.values(JSON.parse(review.productRating)).length ===
                      0 && <Rating readOnly value={0} />}
                    {Object.values(JSON.parse(review.productRating)) > 0 && (
                      <Rating
                        readOnly
                        value={
                          Object.values(
                            JSON.parse(review.productRating)
                          ).reduce((a, b) => Number(a) + Number(b)) /
                          Object.values(JSON.parse(review.productRating)).length
                        }
                      />
                    )}
                    <Typography display={"flex"}>
                      <BookmarkIcon />
                      {review.group}
                    </Typography>
                    <Typography display={"flex"}>
                      <TagIcon />
                      {JSON.parse(review.tag).map((review) => review + " ")}
                    </Typography>
                    <Typography display={"flex"}>
                      <FavoriteBorderIcon />
                      {JSON.parse(review.liked).length}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/reviews/${review.uuid}`);
                      }}
                    >
                      {intl(INTL.REVIEWS_LIST.VIEW)}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h2">
            {" "}
            {intl(INTL.REVIEWS_LIST.RECENTLY)}
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: 0 }}>
            {recentlyReviews.map((review) => (
              <Grid item key={review.uuid} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {review.titleImage === null && (
                    <CardMedia
                      component="img"
                      image={no_image}
                      alt="titleImage"
                    />
                  )}
                  {review.titleImage !== null && (
                    <CardMedia
                      component="img"
                      image={review.titleImage}
                      alt="titleImage"
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review.title}
                    </Typography>
                    {Object.values(JSON.parse(review.productRating)).length ===
                      0 && <Rating readOnly value={0} />}
                    {Object.values(JSON.parse(review.productRating)) > 0 && (
                      <Rating
                        readOnly
                        value={
                          Object.values(
                            JSON.parse(review.productRating)
                          ).reduce((a, b) => Number(a) + Number(b)) /
                          Object.values(JSON.parse(review.productRating)).length
                        }
                      />
                    )}
                    <Typography display={"flex"}>
                      <BookmarkIcon />
                      {review.group}
                    </Typography>
                    <Typography display={"flex"}>
                      <TagIcon />
                      {JSON.parse(review.tag).map((review) => review + " ")}
                    </Typography>
                    <Typography display={"flex"}>
                      <FavoriteBorderIcon />
                      {JSON.parse(review.liked).length}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/reviews/${review.uuid}`);
                      }}
                    >
                      {intl(INTL.REVIEWS_LIST.VIEW)}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h2"> {intl(INTL.REVIEWS_LIST.ALL)}</Typography>
          <Grid container spacing={4} sx={{ marginTop: 0 }}>
            {reviews.map((review) => (
              <Grid item key={review.uuid} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {review.titleImage === null && (
                    <CardMedia
                      component="img"
                      image={no_image}
                      alt="titleImage"
                    />
                  )}
                  {review.titleImage !== null && (
                    <CardMedia
                      component="img"
                      image={review.titleImage}
                      alt="titleImage"
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review.title}{" "}
                    </Typography>
                    {Object.values(JSON.parse(review.productRating)).length ===
                      0 && <Rating readOnly value={0} />}
                    {Object.values(JSON.parse(review.productRating)) > 0 && (
                      <Rating
                        readOnly
                        value={
                          Object.values(
                            JSON.parse(review.productRating)
                          ).reduce((a, b) => Number(a) + Number(b)) /
                          Object.values(JSON.parse(review.productRating)).length
                        }
                      />
                    )}
                    <Typography display={"flex"}>
                      <BookmarkIcon />
                      {review.group}
                    </Typography>
                    <Typography display={"flex"}>
                      <TagIcon />
                      {JSON.parse(review.tag).map((review) => review + " ")}
                    </Typography>
                    <Typography display={"flex"}>
                      <FavoriteBorderIcon />
                      {JSON.parse(review.liked).length}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/reviews/${review.uuid}`);
                      }}
                    >
                      {intl(INTL.REVIEWS_LIST.VIEW)}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default ReviewList;
