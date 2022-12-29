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
} from "@mui/material/";
import { Autocomplete, Chip, TextField } from "@mui/material";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [popularReviews, setPopularReviews] = useState([]);
  const [recentlyReviews, setRecentlyReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const response = await axios
      .get("http://localhost:5000/reviews/popular")
      .catch(login);
    setPopularReviews(response.data);
  }, [login]);

  const getRecentlyReviews = React.useCallback(async () => {
    const response = await axios
      .get("http://localhost:5000/reviews/recently")
      .catch(login);
    setRecentlyReviews(response.data);
  }, [login]);

  const getReviews = React.useCallback(async () => {
    const response = await axios
      .get("http://localhost:5000/reviews")
      .catch(login);
    setReviews(response.data);
  }, [login]);

  const getTags = React.useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/tags");
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
            Used tags
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
          <Typography variant="h2">Popular Reviews</Typography>
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
                  <CardMedia
                    component="img"
                    image={review.titleImage}
                    alt="titleImage"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review.title}{" "}
                      {Object.values(JSON.parse(review.productRating)).length >
                        0 && (
                        <div>
                          {Object.values(
                            JSON.parse(review.productRating)
                          ).reduce((a, b) => Number(a) + Number(b)) /
                            Object.values(JSON.parse(review.productRating))
                              .length}
                        </div>
                      )}
                    </Typography>
                    <Typography>{review.group}</Typography>
                    <Typography>
                      {JSON.parse(review.tag).map((review) => review + " ")}
                    </Typography>
                    <Typography>{JSON.parse(review.liked).length}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/reviews/${review.uuid}`);
                      }}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h2">Recently Reviews</Typography>
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
                  <CardMedia
                    component="img"
                    image={review.titleImage}
                    alt="titleImage"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review.title}
                      {Object.values(JSON.parse(review.productRating)).length >
                        0 && (
                        <div>
                          {Object.values(
                            JSON.parse(review.productRating)
                          ).reduce((a, b) => Number(a) + Number(b)) /
                            Object.values(JSON.parse(review.productRating))
                              .length}
                        </div>
                      )}
                    </Typography>
                    <Typography>{review.group}</Typography>
                    <Typography>
                      {JSON.parse(review.tag).map((review) => review + " ")}
                    </Typography>
                    <Typography>{JSON.parse(review.liked).length}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/reviews/${review.uuid}`);
                      }}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h2">All Reviews</Typography>
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
                  <CardMedia
                    component="img"
                    image={review.titleImage}
                    alt="titleImage"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review.title}{" "}
                      {Object.values(JSON.parse(review.productRating)).length >
                        0 && (
                        <div>
                          {Object.values(
                            JSON.parse(review.productRating)
                          ).reduce((a, b) => Number(a) + Number(b)) /
                            Object.values(JSON.parse(review.productRating))
                              .length}
                        </div>
                      )}
                    </Typography>
                    <Typography>{review.group}</Typography>
                    <Typography>
                      {JSON.parse(review.tag).map((review) => review + " ")}
                    </Typography>
                    <Typography>{JSON.parse(review.liked).length}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/reviews/${review.uuid}`);
                      }}
                    >
                      View
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
