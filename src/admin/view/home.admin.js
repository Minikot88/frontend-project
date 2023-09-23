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
import SearchIcon from '@mui/icons-material/Search';
import BallotIcon from '@mui/icons-material/Ballot';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SubjectIcon from '@mui/icons-material/Subject';

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
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Welcome to Admin
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        *หน้าจัดการระบบต่าง ๆ*
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        spacing={1.5}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ pt: 1 }}
                    >
                        <Grid item>
                            <Button
                                startIcon={<SearchIcon />}
                                variant="contained"
                                size="large"
                                href="/create-table"
                                sx={{
                                    width: '200px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                ค้นหารายวิชา
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                startIcon={<EditCalendarIcon />}
                                variant="contained"
                                size="large"
                                href="/create-table"
                                sx={{
                                    width: '200px',
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
                                startIcon={<BallotIcon />}
                                variant="contained"
                                size="large"
                                href="/all-subject-view"
                                sx={{
                                    width: '200px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                รายวิชาทั้งหมด
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                startIcon={<BackupTableIcon />}
                                href="/schedule-me"
                                variant="contained"
                                size="large"
                                sx={{
                                    width: '200px',
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
                                startIcon={<ManageAccountsIcon />}
                                href="/viewUser"
                                variant="contained"
                                size="large"
                                sx={{
                                    width: '200px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                จัดการผู้ใช้
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                startIcon={<SubjectIcon />}
                                variant="contained"
                                size="large"
                                href="/manage-subject"
                                sx={{
                                    width: '200px',
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