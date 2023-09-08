import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Appbar from '../components/app-bar';
import BreadcrumbsPage from '../components/BreadcrumbsPage';
import './detail.css'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

import axios from 'axios';
import { useState, useEffect } from 'react';

const theme = createTheme();

export default function CreateTable() {

    const [subject, setSubject] = useState()

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getsubjecttable`)
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
            <Appbar></Appbar>
            <BreadcrumbsPage
                pages={[
                    { title: "สร้างตารางเรียน" }

                ]} />
            <main>
                <Box
                    sx={{
                        bgcolor: '#42a5f5',
                        '&:hover': {
                            bgcolor: '#0487D9',
                        },
                        pt: 1,
                        pb: 3,

                    }}
                >
                    <Container maxWidth="sm">
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component="h1"
                                variant="h5"
                                align="center"
                                color="text.primary"
                                gutterBottom

                                sx={{
                                    marginTop: '20px',
                                }}
                            >
                                สร้างตารางเรียน
                            </Typography>
                        </Grid>
                    </Container>
                </Box>
            </main>
            <Container mixWidth="sm">
                <TableContainer
                    component={Paper}
                    sx={{ marginTop: '20px', }}
                >
                    <Table
                        sx={{ maxWidth: "400" }}
                        size="small"
                        aria-label="a dense table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ '&:hover': { bgcolor: '#BBE2F2', }, }}
                                >
                                    รหัสวิชา
                                </TableCell>
                                <TableCell align="center" sx={{ '&:hover': { bgcolor: '#BBE2F2', }, }}
                                >
                                    ชื่อวิชา
                                </TableCell>
                                <TableCell align="center" sx={{ '&:hover': { bgcolor: '#BBE2F2', }, }}
                                >
                                    Subject name
                                </TableCell>
                                <TableCell align="center" sx={{ '&:hover': { bgcolor: '#BBE2F2', }, }}
                                >
                                    ตอน
                                </TableCell>
                                <TableCell align="center" sx={{ '&:hover': { bgcolor: '#BBE2F2', }, }}
                                >
                                    หน่วยกิต
                                </TableCell>
                                <TableCell align="center" > </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subject?.map((row) => (
                                <TableRow
                                    key={row?.subject_id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': {
                                            bgcolor: '#BBE2F2',
                                        },
                                    }}
                                >
                                    <TableCell align="center" component="th" scope="row" > {row?.subject_id} </TableCell>
                                    <TableCell align="center" > {row.subject_name_th} </TableCell>
                                    <TableCell align="center" > {row.subject_name_eng} </TableCell>
                                    <TableCell align="center" > {row.section} </TableCell>
                                    <TableCell align="center" > {row.credit} </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="delete"
                                            color="error"
                                            sx={{
                                                boxShadow: 3,
                                                '&:hover': {
                                                    bgcolor: '#0487D9',
                                                },
                                            }} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Stack direction="row" spacing={2} justifyContent="center" mt={2} >
                <Button
                    variant="outlined"
                    sx={{
                        boxShadow: 3,
                        '&:hover': {
                            bgcolor: '#e3f2fd',
                        },
                    }}
                    startIcon={<ControlPointIcon />}
                    href="/search-select"
                >
                    Add
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        boxShadow: 3,
                        '&:hover': {
                            bgcolor: '#e3f2fd',
                        },
                    }}
                    startIcon={<EditCalendarIcon />}>
                    create
                </Button>
            </Stack>
        </ThemeProvider>
    );
}

