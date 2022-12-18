import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CssBaseline, Container, Box, Typography } from "@mui/material/";

const Review = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [group, setGroup] = useState("");
  const [tag, setTag] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const getReviewById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setTitle(response.data.title);
        setProduct(response.data.product);
        setGroup(response.data.group);
        setTag(response.data.tag);
        setText(response.data.text);
        setRating(response.data.rating);
      } catch (error) {}
    };
    getReviewById();
  }, [id]);

  return (
    <Container component="main" maxWidth="xs">
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
          {title}
        </Typography>
        <Typography component="h1" variant="h4">
          {product}
        </Typography>
      </Box>
    </Container>
  );
};

export default Review;
