import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logout from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Appbar from '../../components/app-bar';
import { CardContent } from '@mui/material';
import CardMenuLayout from '../../components/card-menu-layout';

const theme = createTheme();

export default function HomeAdmin() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 5,
                    pb: 6,

                }}
            >

                <Container maxWidth="lg">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >

                        ADMIN
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        เปิดโปรรรรร
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        spacing={1.5}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ pt: 1 }}
                    >

                        <Grid item xs={3}>
                            <CardMenuLayout
                                path={`/archiveview`}
                                description="ค้นหารายวิชา"
                                icon={
                                    <DeleteIcon
                                        sx={{
                                            color: '#FF75A0',
                                            textDecoration: 'none',
                                        }}
                                        style={{ fontSize: "82px" }}
                                    />}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                href="/create-table"
                                sx={{
                                    width: '180px',
                                    height: '150px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                สร้างตารางเรียน
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                href="/schedule-me"
                                variant="contained"
                                size="large"
                                sx={{
                                    width: '180px',
                                    height: '150px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                ตารางเรียนของฉัน
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                href="/manage-subject"
                                sx={{
                                    width: '180px',
                                    height: '150px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                จัดการรายวิชา
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </ThemeProvider>
    );
}