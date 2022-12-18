import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../features/authSlice";
import { useDispatch } from "react-redux";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Rating,
} from "@mui/material/";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [reviews, setReviews] = useState([]);
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

  const getUserById = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {}
  }, [id]);

  const getReviews = React.useCallback(async () => {
    const response = await axios
      .get(`http://localhost:5000/reviews/?userId=${id}`)
      .catch(login);
    setReviews(response.data);
  }, [id, login]);

  const deleteReview = async (reviewId) => {
    await axios
      .delete(`http://localhost:5000/reviews/${reviewId}`)
      .catch(login);
    getReviews();
  };

  function renderRating(params) {
    return <Rating readOnly value={params.value / 2} precision={0.5} />;
  }

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "product", headerName: "Product", width: 130 },
    { field: "group", headerName: "Group", width: 90 },
    { field: "tag", headerName: "Tag", width: 130 },
    { field: "text", headerName: "Text", width: 250 },
    {
      field: "rating",
      headerName: "Rating",
      renderCell: renderRating,
      width: 150,
      type: "number",
    },
    { field: "createdAt", headerName: "Created At", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
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
  }, [getReviews, getUserById, id]);

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
          {name}
        </Typography>
        <Typography component="h1" variant="h4">
          {role}
        </Typography>
        {reviews.length !== 0 && (
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
