import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { storage } from "../firebase";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Rating,
  Autocomplete,
  Chip,
} from "@mui/material/";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { intl } from "../utils/intl";
import { INTL } from "../constants/intl";

const FormEditReview = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [group, setGroup] = useState("");
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [titleImage, setTitleImage] = useState();
  const [process, setProcess] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getReviewById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setTitle(response.data.title);
        setProduct(response.data.product);
        setGroup(response.data.group);
        setValue(JSON.parse(response.data.tag));
        setText(response.data.text);
        setRating(response.data.rating);
      } catch (error) {}
    };
    getReviewById();
  }, [id]);

  const updateReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/reviews/${id}`, {
        titleImage,
        title,
        product,
        group,
        tag: value,
        text,
        rating,
      });
      await axios
        .post("http://localhost:5000/tags", {
          tag: value,
        })
        .then(navigate("/"));
    } catch (error) {}
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

  const handleUpload = useCallback((droppedFile) => {
    const file = droppedFile[0];
    uploadFiles(file);
  }, []);

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProcess(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setTitleImage(url)
        );
      }
    );
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      handleUpload(acceptedFiles);
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
          {intl(INTL.FORM_ADD_REVIEW.NEW_REVIEW)}
        </Typography>
        <Box component="form" onSubmit={updateReview} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display={"flex"} justifyContent="center">
              <Box {...getRootProps()}>
                <input {...getInputProps()} onDrop={handleUpload} />
                <p>{intl(INTL.FORM_ADD_REVIEW.DND)}</p>
              </Box>
              {process === 100 && (
                <IconButton
                  color="success"
                  aria-label="upload picture"
                  component="label"
                  readOnly
                >
                  <CheckCircleIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="title"
                fullWidth
                id="title"
                label={intl(INTL.FORM_ADD_REVIEW.TITLE)}
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
                label={intl(INTL.FORM_ADD_REVIEW.PRODUCT)}
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="group-select-label">
                  {intl(INTL.FORM_ADD_REVIEW.GROUP)}
                </InputLabel>
                <Select
                  labelId="group-select-label"
                  label={intl(INTL.FORM_ADD_REVIEW.GROUP)}
                  id="group-select"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <MenuItem value={"movie"}>
                    {intl(INTL.FORM_ADD_REVIEW.MOVIE)}
                  </MenuItem>
                  <MenuItem value={"game"}>
                    {intl(INTL.FORM_ADD_REVIEW.GAME)}
                  </MenuItem>
                  <MenuItem value={"book"}>
                    {intl(INTL.FORM_ADD_REVIEW.BOOK)}
                  </MenuItem>
                  <MenuItem value={"anime"}>
                    {intl(INTL.FORM_ADD_REVIEW.ANIME)}
                  </MenuItem>
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
                    label={intl(INTL.FORM_ADD_REVIEW.TAGS)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="text"
                label={intl(INTL.FORM_ADD_REVIEW.TEXT)}
                id="text"
                multiline
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Typography component="legend" variant="h5">
                {intl(INTL.FORM_ADD_REVIEW.RATING)}
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
            {intl(INTL.MANAGE_ACCOUNT.CONFIRM)}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormEditReview;
