import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material/";
import {intl} from "../../utils/intl";
import {INTL} from "../../constants/intl";
import {URL} from "../../constants/URL";

const FormEditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const {id} = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${URL}/users/${id}`);
                setName(response.data.name);
                setEmail(!response.data.email ? "" : response.data.email);
                setRole(response.data.role);
            } catch (error) {
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${URL}/users/${id}`, {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            navigate("/");
            navigate(0);
        } catch (error) {
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h4">
                    {intl(INTL.MANAGE_ACCOUNT.ACCOUNT_DET)}
                </Typography>
                <Box component="form" onSubmit={updateUser} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                autoComplete="given-name"
                                name="firstName"
                                fullWidth
                                id="firstName"
                                label={intl(INTL.REGISTRATION.FIRST_NAME)}
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                type="email"
                                label={intl(INTL.LOGIN.EMAIL)}
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label={intl(INTL.LOGIN.PASSWORD)}
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="confpassword"
                                label={intl(INTL.REGISTRATION.CONF_PASSWORD)}
                                type="password"
                                id="confpassword"
                                autoComplete="new-password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                            />
                        </Grid>
                        {user !== null && user.role === "admin" && (
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="role-select-label">
                                        {intl(INTL.MANAGE_ACCOUNT.ROLE)}
                                    </InputLabel>
                                    <Select
                                        labelId="role-select-label"
                                        label="Role"
                                        id="role-select"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value={"user"}>
                                            {intl(INTL.MANAGE_ACCOUNT.USER)}
                                        </MenuItem>
                                        <MenuItem value={"admin"}>
                                            {intl(INTL.MANAGE_ACCOUNT.ADMIN)}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{mt: 3, mb: 2}}
                    >
                        {intl(INTL.MANAGE_ACCOUNT.CONFIRM)}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
export default FormEditUser;
