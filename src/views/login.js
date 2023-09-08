import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Photo from '../photos/hacker.png'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

export default function Login() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate(-1)
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/signIn`, {
                username: username,
                password: password
            });
            console.log(response?.statusText);
            console.log(password)

            if (response.status === 200 && response.statusText === "success") {
                alert("เข้าสู่ระบบสำเร็จ");
                console.log(response.data);
                localStorage.setItem('token', response.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                navigate(`/home-member`);
                window.location.reload();
            } else if (response.status === 200 && response.statusText === "Invalid username/password") {
                alert("Invalid");
                window.location.reload();
            } else {
                alert('Invalid username/password');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={Photo} width="65" height="65" />
                    <Typography
                        component="h1"
                        variant="h6"
                        sx={{
                            marginTop: 2,
                        }} >

                        Log In
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate sx={{ mt: 2 }}>
                        <TextField
                            autoComplete="given-name"
                            name="username"
                            required
                            fullWidth
                            label="Username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="Password"
                            autoComplete="current-Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: '#0487D9',
                                color: '#FFFFFF',
                                //fontFamily: 'monospace',
                                '&:hover': {
                                    bgcolor: '#0468BF',
                                },
                            }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}