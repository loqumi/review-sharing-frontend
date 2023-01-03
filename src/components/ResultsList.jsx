import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { intl } from "../utils/intl";
import { INTL } from "../constants/intl";

const Results = () => {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const no_image =
    "https://firebasestorage.googleapis.com/v0/b/cloud-storage-3201c.appspot.com/o/files%2Fno-image.png?alt=media&token=eeda5f87-0329-420e-863c-d0f9d3b41424";
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("query");

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
      .get(
        `https://webapp-backend-production.up.railway.app/reviews/search/?searchSTR=${query}`
      )
      .catch(login);
    setReviews(response.data);
  }, [login, query]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <Container sx={{ py: 9 }} component="main">
      <CssBaseline />
      {reviews.length !== 0 && (
        <div>
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

export default Results;
