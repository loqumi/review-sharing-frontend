import React from "react";
import ReactMarkdown from "react-markdown";
import {
    Typography,
    Grid,
    Rating,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {intl} from "../../../utils/intl";
import {INTL} from "../../../constants/intl";

const ReviewModel = ({review, tag, commonRating, username, no_image, likes}) => {
    const calculatedValue = commonRating.length === 0 ? 0 : commonRating.reduce((a, b) => Number(a) + Number(b)) / commonRating.length
    return (
        <Card
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <CardMedia
                component="img"
                image={review.titleImage ? review.titleImage : no_image}
                alt="titleImage"
                sx={{
                    width: "50%",
                }}
            />
            <CardContent sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} display={"flex"} justifyContent="center">
                        <Typography component="h1" variant="h3">
                            {review.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {intl(INTL.FORM_ADD_REVIEW.PRODUCT)}: {review.product}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {calculatedValue}
                        </Typography>
                        <Rating value={1} max={1} readOnly size="large"/>
                    </Grid>
                    <Grid item xs={12} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {intl(INTL.FORM_ADD_REVIEW.GROUP)}:
                            {intl(INTL.FORM_ADD_REVIEW[String(review.group).toUpperCase()])}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {intl(INTL.FORM_ADD_REVIEW.TAGS)}: {tag}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display={"flex"} justifyContent="center">
                        <Typography component="h1" variant="h4">
                            <ReactMarkdown>{review.text}</ReactMarkdown>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {intl(INTL.FORM_ADD_REVIEW.RATING)} {intl(INTL.REVIEW.AUTHOR)}
                            :
                            <Rating
                                value={Number(review.rating)}
                                readOnly
                                max={10}
                                size="large"
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={6} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {intl(INTL.REVIEW.AUTHOR)}: {username} <FavoriteIcon/>
                            {likes}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    );
};

export default ReviewModel;
