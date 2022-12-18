import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/authSlice";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
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

  const getReviews = React.useCallback(async () => {
    const response = await axios
      .get("http://localhost:5000/reviews")
      .catch(login);
    setReviews(response.data);
  }, [login]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  const deleteReview = async (reviewId) => {
    await axios
      .delete(`http://localhost:5000/reviews/${reviewId}`)
      .catch(login);
    getReviews();
  };
  return (
    <Container sx={{ py: 8 }} component="main" maxWidth="md">
      <CssBaseline />
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
                  {review.user.name}
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
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
