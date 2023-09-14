import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Appbar from '../components/app-bar';
import BreadcrumbsPage from '../components/BreadcrumbsPage';
import DetailsCard from '../components/details-card';
import './detail.css'

import AddCircleIcon from '@mui/icons-material/AddCircle';

const theme = createTheme();

export default function SelectSubject() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [subject, setSubject] = useState()
    const [login, setLogin] = React.useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        const GetSubjectbyID = async () => {
            try {
                const token = await localStorage.getItem('token')
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getSubject-Byid?subject_id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response) {
                    setSubject(response?.data[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        GetSubjectbyID()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <BreadcrumbsPage
                pages={[
                    { title: "สร้างตารางเรียน", path: `/create-table` },
                    { title: "ค้นหารายวิชา", path: `/search-select` },
                    { title: "รายละเอียดวิชา" },
                ]} />

            <main>
                <Box sx={{ bgcolor: 'background.paper', pt: 2, pb: 6, }}>
                    <Container maxWidth="sm">
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component="h1"
                                variant="h6"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                รายละเอียดวิชา
                            </Typography>
                            <div className="detail-sudject">
                                <DetailsCard
                                    title={'รหัสวิชา'}
                                    description={'name'}
                                    rootClassName="rootClassName1">
                                </DetailsCard>
                                <DetailsCard
                                    title={'ชื่อวิชาภาษาไทย'}
                                    description={'คณิตศาสตร์'}
                                    rootClassName="rootClassName1">
                                </DetailsCard>
                                <DetailsCard
                                    title={'หน่วยกิต'}
                                    description={'3'}
                                    rootClassName="rootClassName1">
                                </DetailsCard>
                                <DetailsCard
                                    title={'ชื่อวิชาภาษาอังกฤษ'}
                                    description={'Math'}
                                    rootClassName="rootClassName1">
                                </DetailsCard>
                            </div>
                        </Grid>
                    </Container>
                </Box>
            </main>
            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"> เลือก </TableCell>
                            <TableCell align="center"> ตอน </TableCell>
                            <TableCell align="center"> จำนวนการรับ </TableCell>
                            <TableCell align="center"> วันเวลา </TableCell>
                            <TableCell align="center"> ห้องเรียน </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                      
                            <TableRow
                               
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" >
                                    <Button href="/create-table" > <AddCircleIcon /> </Button>
                                </TableCell>
                                <TableCell align="center" component="th" scope="row"> {subject?.credit} </TableCell>
                                <TableCell align="center"> {subject?.subject_id} </TableCell>
                                <TableCell align="center"> {subject?.subject_id} </TableCell>
                                <TableCell align="center"> {subject?.subject_id} </TableCell>
                                <TableCell align="center"> {subject?.subject_id} </TableCell>
                            </TableRow>
                      
                    </TableBody>

                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}

