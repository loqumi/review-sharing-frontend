import React from "react";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Rating,
} from "@mui/material/";
import TagIcon from "@mui/icons-material/Tag";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {intl} from "../../../utils/intl";
import {INTL} from "../../../constants/intl";

const ReviewCardModel = ({review, no_image}) => {
    const productRating = Object.values(JSON.parse(review.productRating));
    const calculatedValue = (productRating.length === 0 ? 0 : productRating.reduce((a, b) => Number(a) + Number(b)) /
        productRating.length)
    const tags = JSON.parse(review.tag).map((review) => review + " ")
    const likesCount = JSON.parse(review.liked).length
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/reviews/${review.uuid}`);
    }
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardMedia
                    component="img"
                    image={review.titleImage ? review.titleImage : no_image}
                    alt="titleImage"
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {review.title}
                    </Typography>
                    <Rating
                        readOnly
                        value={calculatedValue}
                    />
                    <Typography display={"flex"}>
                        <BookmarkIcon/>
                        {review.group}
                    </Typography>
                    <Typography display={"flex"}>
                        <TagIcon/>
                        {tags}
                    </Typography>
                    <Typography display={"flex"}>
                        <FavoriteBorderIcon/>
                        {likesCount}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={handleClick}
                    >
                        {intl(INTL.REVIEWS_LIST.VIEW)}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ReviewCardModel;
