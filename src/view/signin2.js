import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Paper, Stack } from '@mui/material';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInn() {
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
        Username: username,
        Password: password
      });
      console.log(response.statusText);

      if (response.status === 200 && response.statusText === "success") {
        alert("เข้าสู่ระบบสำเร็จ");
        console.log(response.data);
        localStorage.setItem('token', response.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        navigate(`/home-member`);
        window.location.reload();
      } else if (response.status === 200 && response.statusText === "Invalid username/password") {
        alert("Invalid username/password");
        window.location.reload();
      } else {
        alert('Invalid username/password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', mt: 10 }}>
        <Box sx={{ width: "90%", }}>
          <Paper elevation={3} sx={{ bgcolor: "#FFC95F", borderRadius: 5}}>
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Paper elevation={3} sx={{ bgcolor: "#FFFFFF", borderRadius: 5, m: 4 }}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 3
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">
                      Tanawin Buffet
                    </Typography>
                    <Typography variant="h6" sx={{ p: 2 }}>
                      ยินดีต้อนรับ
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Stack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ marginTop: 20, marginBottom: 10 , width: 100 , height: 50, backgroundColor:"#FFC95F" }}
                        >
                          ยืนยัน
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </Container>
              </Paper>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </div>
  );
}