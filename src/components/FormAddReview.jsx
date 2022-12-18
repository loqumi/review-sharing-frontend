import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Rating,
} from "@mui/material/";

const FormAddReview = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [group, setGroup] = useState("");
  const [tag, setTag] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reviews", {
        title,
        product,
        group,
        tag,
        text,
        rating,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

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
          New Review Deploy
        </Typography>
        <Box component="form" onSubmit={saveReview} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Typography color="error" sx={{ m: "auto" }}>
              {msg}
            </Typography>
            <Grid item xs={6}>
              <TextField
                required
                name="title"
                fullWidth
                id="title"
                label="Title"
                placeholder="Title of your Review"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="Product"
                label="Product"
                placeholder="Harry Potter, DOOM or etc..."
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="group-select-label">Group</InputLabel>
                <Select
                  labelId="group-select-label"
                  label="Group"
                  id="group-select"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <MenuItem value={"movie"}>Movie</MenuItem>
                  <MenuItem value={"game"}>Game</MenuItem>
                  <MenuItem value={"book"}>Book</MenuItem>
                  <MenuItem value={"anime"}>Anime</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="text"
                label="Text"
                id="text"
                placeholder="Body text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="text"
                label="Text"
                id="text"
                multiline
                rows={4}
                placeholder="Body text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Typography component="legend" variant="h5">
                Your Rating
              </Typography>
              <Rating
                max={10}
                name="rating"
                value={Number(rating)}
                size="large"
                onChange={(e) => setRating(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormAddReview;
