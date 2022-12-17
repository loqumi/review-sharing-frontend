import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../features/authSlice";
import { useDispatch } from "react-redux";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Card,
  CardActions,
  Button,
  Grid,
  CardContent,
} from "@mui/material/";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = React.useCallback(() => {
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);

  const login = React.useCallback(
    (error) => error.response.status === 401 && logout(),
    [logout]
  );

  const getUserById = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {}
  }, [id]);

  const getReviews = React.useCallback(async () => {
    const response = await axios
      .get("http://localhost:5000/reviews/")
      .catch(login);
    setReviews(response.data);
  }, [login]);

  const deleteReview = async (reviewId) => {
    await axios
      .delete(`http://localhost:5000/reviews/${reviewId}`)
      .catch(login);
    getReviews();
  };

  useEffect(() => {
    getUserById();
    getReviews();
  }, [getReviews, getUserById, id]);
  return (
    <Container component="main" maxWidth="md">
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
          {name}
        </Typography>
        <Typography component="h1" variant="h4">
          {email}
        </Typography>
        <Typography component="h1" variant="h4">
          {role}
        </Typography>
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {review.user.name}
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
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
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
