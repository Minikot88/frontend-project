import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Appbar from '../components/app-bar';
import Photo from '../image/forgot-password.png'
import BreadcrumbsPage from '../components/BreadcrumbsPage';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {' Minikot '}
            <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function ForgotPassword() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>

            <BreadcrumbsPage
                pages={[
                    { title: "Sign in" },
                ]} />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={Photo} width="80" height="80" />

                    <Typography
                        component="h1"
                        variant="h6"
                        sx={{
                            marginTop: 2,
                        }} >

                        Forgot Password
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate sx={{ mt: 2 }}>
                        <TextField
                            autoComplete="given-name"
                            name="Username"
                            required
                            fullWidth
                            id="Username"
                            label="Username"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, bgcolor: '#AA00FF' }}
                        >
                            Send
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 25, }} />
            </Container>
        </ThemeProvider >
    );
}