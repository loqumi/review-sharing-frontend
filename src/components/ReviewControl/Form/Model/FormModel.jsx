import React, {useCallback, useEffect, useState} from "react";
import {
    TextField,
    Grid,
    Box,
    Typography,
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
import {intl} from "../../../../utils/intl";
import {INTL} from "../../../../constants/intl";
import {useDropzone} from "react-dropzone";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";
import axios from "axios";
import {URL} from "../../../../constants/URL";
import {Button} from "@mui/material";

const FormModel = ({onSubmit, review}) => {
    const [disabled, setDisabled] = useState(false);
    const [process, setProcess] = useState(0);
    const [title, setTitle] = useState("");
    const [product, setProduct] = useState("");
    const [group, setGroup] = useState("");
    const [value, setValue] = useState([]);
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [titleImage, setTitleImage] = useState();
    const [tags, setTags] = useState([]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChangeProduct = (e) => {
        setProduct(e.target.value)
    }
    const handleChangeGroup = (e) => {
        setGroup(e.target.value)
    }
    const handleChangeTags = (e, value) => {
        setValue(value);
    };
    const handleChangeText = (e) => {
        setText(e.target.value)
    }
    const handleChangeRating = (e, value) => {
        setRating(value);
    };

    const handleSubmit = (e) => {
        setDisabled(true);
        e.preventDefault();
        onSubmit({
            titleImage,
            title,
            product,
            group,
            tag: value,
            text,
            rating
        });
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

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const getTags = React.useCallback(async () => {
        try {
            const response = await axios.get(`${URL}/tags`);
            setTags(response.data);
        } catch (error) {
        }
    }, []);

    useEffect(() => {
        getTags();
    }, [getTags]);

    useEffect(() => {
        if (!Object.keys(review).length) return
        setTitle(review.title)
        setValue(JSON.parse(review.tag))
        setGroup(review.group)
        setText(review.text)
        setRating(review.rating)
        setProduct(review.product)
    }, [review])

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12} display={"flex"} justifyContent="center">
                    <Box {...getRootProps()}>
                        <input {...getInputProps()} onDrop={handleUpload}/>
                        <p>{intl(INTL.FORM_ADD_REVIEW.DND)}</p>
                    </Box>
                    {process === 100 && (
                        <IconButton
                            color="success"
                            aria-label="upload picture"
                            component="label"
                            readOnly
                        >
                            <CheckCircleIcon/>
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
                        onChange={handleChangeTitle}
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
                        onChange={handleChangeProduct}
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
                            onChange={handleChangeGroup}
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
                        value={value}
                        onChange={handleChangeTags}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({index})}
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
                        onChange={handleChangeText}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="legend" variant="h5">
                        {intl(INTL.FORM_ADD_REVIEW.RATING)}
                    </Typography>
                    <Rating
                        max={10}
                        name="rating"
                        value={rating}
                        size="large"
                        onChange={handleChangeRating}
                    />
                </Grid>
            </Grid>
            <Button
                disabled={disabled}
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{mt: 3, mb: 2}}
            >
                {intl(INTL.MANAGE_ACCOUNT.CONFIRM)}
            </Button>
        </Box>
    );
};

export default FormModel;