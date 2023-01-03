import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Rating,
  Button,
} from "@mui/material/";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { intl } from "../utils/intl";
import { INTL } from "../constants/intl";

const URL = "https://webapp-backend-production.up.railway.app";

const Profile = () => {
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [likes, setLikes] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = React.useCallback(() => {
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);

  const login = React.useCallback(
    (error) => error.response.status === 401 && logout(),
    [logout]
  );

  const getUserLikes = React.useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/user/rating/?userId=${id}`);
      setLikes(response.data);
    } catch (error) {}
  }, [id]);

  const getUserById = React.useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/users/${id}`);
      setName(response.data.name);
    } catch (error) {}
  }, [id]);

  const getReviews = React.useCallback(async () => {
    const response = await axios
      .get(`${URL}/reviews/?userId=${id}`)
      .catch(login);
    setReviews(response.data);
  }, [id, login]);

  const deleteReview = async (reviewId) => {
    await axios.delete(`${URL}/reviews/${reviewId}`).catch(login);
    getReviews();
  };

  const createReview = (id) => {
    navigate(`/reviews/add/${id}`);
  };

  function renderRating(params) {
    return <Rating readOnly value={params.value / 2} precision={0.5} />;
  }
  function renderTags(params) {
    return `${JSON.parse(params.value)}`;
  }

  const columns = [
    {
      field: "title",
      headerName: intl(INTL.FORM_ADD_REVIEW.TITLE),
      width: 100,
    },
    {
      field: "product",
      headerName: intl(INTL.FORM_ADD_REVIEW.PRODUCT),
      width: 130,
    },
    { field: "group", headerName: intl(INTL.FORM_ADD_REVIEW.GROUP), width: 90 },
    {
      field: "tag",
      headerName: intl(INTL.FORM_ADD_REVIEW.TAGS),
      width: 130,
      renderCell: renderTags,
    },
    { field: "text", headerName: intl(INTL.FORM_ADD_REVIEW.TEXT), width: 250 },
    {
      field: "rating",
      headerName: intl(INTL.FORM_ADD_REVIEW.RATING),
      renderCell: renderRating,
      width: 150,
      type: "number",
    },
    {
      field: "createdAt",
      headerName: intl(INTL.USER_LIST.CREATED_AT),
      width: 130,
    },
    {
      field: "actions",
      type: "actions",
      headerName: intl(INTL.USER_LIST.TOOLBAR),
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Delete"
            onClick={() => navigate(`/reviews/${row.uuid}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/reviews/edit/${row.uuid}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteReview(row.uuid)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    getUserById();
    getReviews();
    getUserLikes();
  }, [getReviews, getUserById, getUserLikes, id]);

  return (
    <Container component="main">
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
          {name} {intl(INTL.NAV.USER_INFO)} {likes}
        </Typography>
        {user !== null && user.role === "admin" && (
          <Box display={"flex"} flexDirection={"column"} textAlign={"center"}>
            <Typography component="h1" variant="h4">
              {intl(INTL.MANAGE_ACCOUNT.ADMIN)}
            </Typography>
            <Button color="inherit" onClick={() => createReview(id)}>
              {intl(INTL.PROFILE.ADD_REVIEW)} {name}
            </Button>
          </Box>
        )}
        {reviews?.length !== 0 && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reviews}
              columns={columns}
              disableSelectionOnClick
            />
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
