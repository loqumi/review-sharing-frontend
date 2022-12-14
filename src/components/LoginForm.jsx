import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  IconButton,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FaDiscord } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  const google = () => {
    window.open("http://localhost:5000/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/github", "_self");
  };

  const discord = () => {
    window.open("http://localhost:5000/discord", "_self");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          borderRadius: 1,
          marginTop: 16,
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Box component="form" onSubmit={Auth} sx={{ mt: 1 }}>
          {isError && (
            <Alert variant="outlined" severity="error">
              {message}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
          <Grid
            container
            spacing={6}
            sx={{ mb: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={google}
              >
                <GoogleIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                edge="button"
                color="inherit"
                onClick={github}
                aria-label="open drawer"
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                edge="button"
                color="inherit"
                onClick={discord}
                aria-label="open drawer"
              >
                <FaDiscord />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                {"Continue without sign in"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/reg" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
