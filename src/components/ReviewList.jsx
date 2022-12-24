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

  const deleteReview = async (reviewId) => {
    await axios
      .delete(`http://localhost:5000/reviews/${reviewId}`)
      .catch(login);
    getReviews();
  };
  return (
    <Container sx={{ py: 9 }} component="main">
      <CssBaseline />
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
                image="https://source.unsplash.com/random"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {review.title}
                </Typography>
                <Typography>{review.group}</Typography>
                <Typography>
                  {JSON.parse(review.tag).map((review) => review + " ")}
                </Typography>
                <Typography>{review.liked?.length}</Typography>
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
                {user !== null && (
                  <div>
                    {(review.user.name === user.name ||
                      user.role === "admin") && (
                      <div>
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/reviews/edit/${review.uuid}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteReview(review.uuid)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                )}
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
                image="https://source.unsplash.com/random"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {review.title}
                </Typography>
                <Typography>{review.group}</Typography>
                <Typography>
                  {JSON.parse(review.tag).map((review) => review + " ")}
                </Typography>
                <Typography>{Number(review?.liked)}</Typography>
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
                {user !== null && (
                  <div>
                    {(review.user.name === user.name ||
                      user.role === "admin") && (
                      <div>
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/reviews/edit/${review.uuid}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteReview(review.uuid)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                )}
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
                image="https://source.unsplash.com/random"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {review.title}
                </Typography>
                <Typography>{review.group}</Typography>
                <Typography>
                  {JSON.parse(review.tag).map((review) => review + " ")}
                </Typography>
                <Typography>{Number(review?.liked)}</Typography>
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
                {user !== null && (
                  <div>
                    {(review.user.name === user.name ||
                      user.role === "admin") && (
                      <div>
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/reviews/edit/${review.uuid}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteReview(review.uuid)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReviewList;
