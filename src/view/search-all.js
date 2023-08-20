import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import Appbar from '../component/app-bar';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import BreadcrumbsPage from '../component/BreadcrumbsPage';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Button from '@mui/material/Button';
import BuildIcon from '@mui/icons-material/Build';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';



const theme = createTheme();

export default function SearchAll() {

    const [subjects, setSubject] = useState()

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getallsubject`)
                if (response) {
                    setSubject(response?.data)
                    console.log(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSubjects()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Appbar />

            <BreadcrumbsPage
                pages={[
                    { title: "ค้นหา" },
                ]} />

            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 2,
                        pb: 6,

                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            ค้นหารายวิชา
                        </Typography>
                        <Box component="form" noValidate
                            sx={{
                                mt: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Grid item xs={12} sm={6}>
                                <Paper
                                    component="form"
                                    sx={{
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '300px',
                                        height: '33px',
                                        bgcolor: '#FFFFFF',
                                        border: '0.8px solid #252525',
                                        '&:hover': {
                                            bgcolor: '#eeeeee',
                                        },
                                    }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, }}
                                        placeholder="รหัสวิชา"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Paper>
                            </Grid>
                        </Box>
                        <Box component="form" noValidate
                            sx={{
                                mt: 0.5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Grid item xs={12} sm={6}>
                                <Paper
                                    component="form"
                                    sx={{
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '300px',
                                        height: '33px',
                                        bgcolor: '#FFFFFF',
                                        border: '0.8px solid #252525',
                                        '&:hover': {
                                            bgcolor: '#eeeeee',
                                        },
                                    }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, }}
                                        placeholder="ชื่อวิชา"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Paper>
                            </Grid>
                        </Box>
                        <Box component="form" noValidate
                            sx={{
                                mt: 1.5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        bgcolor: '#FFFFFF',
                                        color: '#212121',
                                        border: '0.8px solid #049DD9',
                                        '&:hover': {
                                            bgcolor: '#BBE2F2',
                                        },
                                    }}
                                >
                                    ค้นหา
                                </Button>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </main>
            <Container mixWidth="sm">

                <TableContainer
                    component={Paper}
                >
                    <Table align="center"
                        sx={{ maxWidth: "400" }}
                        size="small"
                        aria-label="a dense table" >

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">รหัสวิชา</TableCell>
                                <TableCell align="center">ชื่อวิชา</TableCell>
                                <TableCell align="center">Subject name</TableCell>
                                <TableCell align="center">จำนวนตอน</TableCell>
                                <TableCell align="center">หน่วยกิต</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {subjects && subjects.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': {
                                            bgcolor: '#f8bbd0',
                                        },
                                    }}
                                >
                                    <TableCell align="center" >
                                        <Button variant="outlined"
                                            sx={{
                                                width: 90,
                                                bgcolor: '#424242',
                                                color: '#ffab00',
                                                '&:hover': {
                                                    bgcolor: '#616161',
                                                },
                                            }}
                                        >
                                            {row.Subject_id}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.Subject_name_th}
                                    </TableCell>
                                    <TableCell align="center" >
                                        {row.Subject_name_eng}
                                    </TableCell>
                                    <TableCell align="center" >
                                        {row.Credit}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.Credit}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </ThemeProvider>
    );
}

