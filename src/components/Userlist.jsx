import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import {
  Checkbox,
  Box,
  Button,
  IconButton,
  Typography,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectUser] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);

  const exit = useCallback(
    (error) => error.response.status === 406 && logout(),
    [logout]
  );

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:5000/users").catch(exit);
      setUsers(res.data);
    })();
  }, [exit]);

  const blockUsers = async () => {
    const data = selectedUsers.reduce((prev, curr) => {
      const user = users.find((user) => user.uuid === curr);
      if (!user) return prev;
      return [...prev, { ...user, status: true }];
    }, []);
    await axios
      .post(`http://localhost:5000/users/block`, data)
      .then(() => {
        if (selectedUsers.includes(user.uuid)) {
          logout();
        } else {
          setUsers((prev) =>
            prev.reduce((prev, curr) => {
              const user = data.find((user) => user.uuid === curr.uuid);
              if (!user) return [...prev, curr];
              return [...prev, user];
            }, [])
          );
        }
      })
      .catch(exit);
  };

  const unBlockUsers = async () => {
    const data = selectedUsers.reduce((prev, curr) => {
      const user = users.find((user) => user.uuid === curr);
      if (!user) return prev;
      return [...prev, { ...user, status: false }];
    }, []);
    await axios
      .post(`http://localhost:5000/users/unblock`, data)
      .then(() => {
        setUsers((prev) =>
          prev.reduce((prev, curr) => {
            const user = data.find((user) => user.uuid === curr.uuid);
            if (!user) return [...prev, curr];
            return [...prev, user];
          }, [])
        );
      })
      .catch(exit);
  };

  const deleteUsers = async () => {
    await axios
      .post(`http://localhost:5000/users/delete`, selectedUsers)
      .then(() => {
        if (selectedUsers.includes(user.uuid)) {
          logout();
        } else {
          setUsers((prev) =>
            prev.filter((item) => !selectedUsers.includes(item.uuid))
          );
        }
      })
      .catch(exit);
  };

  const handleSelectUser = (userId) => {
    setSelectUser((prev) =>
      prev.includes(userId)
        ? prev.filter((item) => item !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectUsers = (users) => {
    for (let i = 0; i < users.length; i++) {
      handleSelectUser(users[i].uuid);
    }
  };

  const isSelected = (name) => selectedUsers.indexOf(name) !== -1;

  return (
    <TableContainer component={Paper}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          alignItems: "right",
          flexDirection: "column",
          pl: 6,
        }}
      >
        <Typography component="h1" variant="h4">
          Toolbar
        </Typography>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            alignItems: "right",
          }}
        >
          <Button
            onClick={deleteUsers}
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button onClick={blockUsers} color="error" startIcon={<BlockIcon />}>
            Block
          </Button>
          <Button
            onClick={unBlockUsers}
            color="success"
            startIcon={<BlockIcon />}
          >
            Unblock
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          alignItems: "right",
          flexDirection: "column",
          pl: 6,
        }}
      >
        <Typography component="h1" variant="h4">
          Table of Users
        </Typography>
      </Box>
      <Table sx={{ minWidth: 650, marginTop: 2 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ p: 0 }} align="center">
              <Checkbox
                color="primary"
                onChange={() => handleSelectUsers(users)}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
            <TableCell align="right">USER NAME/LASTNAME</TableCell>
            <TableCell align="center">EMAIL</TableCell>
            <TableCell align="center">STATUS</TableCell>
            <TableCell align="center">ROLE</TableCell>
            <TableCell align="center">CREATED AT</TableCell>
            <TableCell align="center">LAST UPDATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isItemSelected = isSelected(user.uuid);
            return (
              <TableRow
                hover
                checked={selectedUsers.includes(user.uuid)}
                onClick={() => handleSelectUser(user.uuid)}
                key={user.uuid}
                selected={isItemSelected}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Checkbox checked={selectedUsers.includes(user.uuid)} />
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  <Button
                    variant="text"
                    align="right"
                    onClick={() => navigate(`/profile/${user.uuid}`)}
                  >
                    {user.name}
                  </Button>
                  <IconButton
                    variant="text"
                    onClick={() => navigate(`/users/edit/${user.uuid}`)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  {Number(user.status) ? "banned" : "unbanned"}
                </TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">{user.createdAt}</TableCell>
                <TableCell align="center">{user.updatedAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Userlist;
