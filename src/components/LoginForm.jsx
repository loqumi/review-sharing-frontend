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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FaDiscord } from "react-icons/fa";
import { intl } from "../utils/intl";
import { INTL } from "../constants/intl";

const URL = "https://webapp-backend-production.up.railway.app";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
      navigate(0);
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  const google = () => {
    window.open(`${URL}/google`, "_self");
  };

  const github = () => {
    window.open(`${URL}/github`, "_self");
  };

  const discord = () => {
    window.open(`${URL}/discord`, "_self");
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
          {intl(INTL.LOGIN.SIGN_IN)}
        </Typography>
        <Box component="form" onSubmit={Auth} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={intl(INTL.LOGIN.EMAIL)}
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
            label={intl(INTL.LOGIN.PASSWORD)}
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
            {isLoading ? "Loading..." : intl(INTL.LOGIN.SIGN_IN)}
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
                edge="start"
                color="inherit"
                onClick={github}
                aria-label="open drawer"
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                edge="start"
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
                {intl(INTL.LOGIN.SIGN_IN_WITHOUT)}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/reg" variant="body2">
                {intl(INTL.LOGIN.REGISTER)}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
