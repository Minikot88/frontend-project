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

import photo from '../photo/add-file.png'
import Appbar from '../component/app-bar';

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

export default function EditAdmin() {

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
            <Appbar></Appbar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={photo} width="60" height="60" />

                    <Typography component="h1" variant="h6">
                        แก้ไขรายวิชา
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-flexible"
                                    label="รหัสวิชา"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="ชื่อวิชาภษาไทย"
                                    rows={2}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="ชื่อวิชาภษาอังกฤษ"
                                    rows={2}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="จำนวนตอน"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="ตอนที่"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="หน่วยกิต"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="ห้องเรียน"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="วัน"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="เวลา"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="จำนวนการรับ"
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="outlined-multiline-static"
                                    label="อาจารย์ผู้สอน"
                                    rows={2}
                                />
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 2,
                                bgcolor: '#AA00FF',
                                '&:hover': {
                                    bgcolor: '#8800CC',
                                },
                            }}
                        >
                            <img src={photo} width="30" height="30" />
                            บันทึก
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}