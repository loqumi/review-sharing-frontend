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
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4}>
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
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {review.title}{" "}
                    </Typography>
                    {Object.values(JSON.parse(review.productRating)).length ===
                        0 && <Rating readOnly value={0}/>}
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
                        <BookmarkIcon/>
                        {review.group}
                    </Typography>
                    <Typography display={"flex"}>
                        <TagIcon/>
                        {JSON.parse(review.tag).map((review) => review + " ")}
                    </Typography>
                    <Typography display={"flex"}>
                        <FavoriteBorderIcon/>
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
    );
};

export default ReviewCardModel;
