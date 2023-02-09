import React from "react";
import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

const Comments = ({comments}) => {
    return (
        <Card
            key={comments.uuid}
            sx={{
                marginTop: 1,
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {comments.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display={"flex"} justifyContent="left">
                        <Typography component="h1" variant="h5">
                            {comments.name}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Comments;
