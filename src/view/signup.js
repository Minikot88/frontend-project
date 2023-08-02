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


import photo from '../photo/add-friend.png'
import Appbar from '../component/app-bar';
import BreadcrumbsPage from '../component/BreadcrumbsPage';

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

export default function SignUp() {

  const [user, setUser] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      if (user.password !== confirmPassword) {
        alert('Your password is not match.')
        window.location.reload()
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/register`, user)
        if (response) {
          alert('Data added sucessfully!')
          window.location.reload()
        }
      }
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Appbar></Appbar>

      <BreadcrumbsPage
        pages={[
          { title: "Sign up" },
        ]} />

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

          <img src={photo} width="80" height="80" />

          <Typography
            component="h1"
            variant="h6"
            sx={{
              marginTop: 2,
            }} >
            Sign Up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Member_id"
                  id="Member_id"
                  label="Member ID"
                  autoFocus
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="Fname"
                  id="Fname"
                  label="First Name"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Lname"
                  label="Last Name"
                  name="Lname"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="Email"
                  autoComplete="Email"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Username"
                  id="Username"
                  label="Username"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="Password"
                  id="Password"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Confirm Password"
                  type="password"
                  id="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="ตกลงการสมัครสมาชิก"
                />
              </Grid>

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, bgcolor: '#AA00FF' }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>

              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}