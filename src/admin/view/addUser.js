import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

import BreadcrumbsPage from '../../components/BreadcrumbsPage';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';


const theme = createTheme();

export default function AddUser() {

    const [user, setUser] = useState({})
    const [item, setItem] = useState({})
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user.password !== confirmPassword) {
                alert('Your password is not match.');
                return;
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/register`, user);
                if (response) {
                    alert('สมัครสมาชิกสำเร็จ : Successfully applied for membership');
                    navigate(`/`);
                    window.location.reload();
                }
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            {/* <BreadcrumbsPage
        pages={[
          { title: "Sign up" },
        ]} /> */}
          <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Card sx={{bgcolor:'#bdbdbd', alignItems: 'center' }}>
                    <Container maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h6"
                                sx={{
                                    marginTop: 2,
                                }} >
                                Add User
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, mb: 5, }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="user_id"
                                            label="Student ID"
                                            autoFocus
                                            value={item ? item?.user_id : ""}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setItem({
                                                    ...item,
                                                    user_id: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="fname"
                                            label="First Name"
                                            value={item ? item?.fname : ""}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setItem({
                                                    ...item,
                                                    fname: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Last Name"
                                            name="lname"
                                            value={item ? item?.lname : ""}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setItem({
                                                    ...item,
                                                    lname: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            autoComplete="Email"
                                            value={item ? item?.email : ""}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setItem({
                                                    ...item,
                                                    email: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="username"
                                            label="Username"
                                            value={item ? item?.username : ""}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setItem({
                                                    ...item,
                                                    username: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="Password"
                                            value={item ? item?.password : ""}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setItem({
                                                    ...item,
                                                    password: e.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Confirm Password"
                                            type="password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: '8px' }}></Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#0487D9',
                                            color: '#FFFFFF',
                                            '&:hover': {
                                                bgcolor: '#0468BF',
                                            },
                                        }}
                                        disabled={
                                            item?.user_id === undefined ||
                                            item?.fname === undefined ||
                                            item?.lname === undefined ||
                                            item?.username === undefined ||
                                            item?.password === undefined
                                        }

                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Card>
            </Container>
        </ThemeProvider>
    );
}