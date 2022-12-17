import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CssBaseline, Container, Box, Typography } from "@mui/material/";

const Review = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getReviewById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
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
          {name}
        </Typography>
        <Typography component="h1" variant="h4">
          {price}
        </Typography>
      </Box>
    </Container>
  );
};

export default Review;
