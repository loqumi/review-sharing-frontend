import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  Autocomplete,
  Chip,
} from "@mui/material/";
const symbol = "---dhsjk-dashds---";
const FormEditReview = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [group, setGroup] = useState("");
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getReviewById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setTitle(response.data.title);
        setProduct(response.data.product);
        setGroup(response.data.group);
        setValue(response.data.tag.split(symbol));
        setText(response.data.text);
        setRating(response.data.rating);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getReviewById();
  }, [id]);

  const updateReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/reviews/${id}`, {
        title,
        product,
        group,
        tags,
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

  const getTags = React.useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/tags");
      setTags(response.data);
    } catch (error) {}
  }, []);

  const handleChange = (e, value) => {
    setValue(value);
  };

  useEffect(() => {
    getTags();
  }, [getTags]);

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
        <Box component="form" onSubmit={updateReview} sx={{ mt: 3 }}>
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
              <Autocomplete
                multiple
                id="tags-filled"
                options={tags.map((tag) => tag.title)}
                value={value.map((value) => value)}
                onChange={handleChange}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Write tags"
                  />
                )}
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

export default FormEditReview;
