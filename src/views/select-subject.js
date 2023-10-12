import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import Appbar from '../components/app-bar';
import BreadcrumbsPage from '../components/BreadcrumbsPage';
import DetailsCard from '../components/details-card';
import './detail.css'

import AddCircleIcon from '@mui/icons-material/AddCircle';

const theme = createTheme();

export default function SelectSubject() {

    const { id, schedule_id } = useParams();
    const navigate = useNavigate()
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState([])

    useEffect(() => {
        const GetSubjectbyID = async () => {
            try {
                const token = await localStorage.getItem('token')
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getDetailSubjects?subject_id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response) {
                    setSubjects(response?.data[0])
                    setSubject(response?.data)
                    console.log(response?.data[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        GetSubjectbyID()
    }, [id])

    const addSchedule = async (schedule_id, section_id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/addSchedule`, {
                schedule_id: schedule_id,
                section_id: section_id
            });
            if (response?.status === 200) {
                alert("เพิ่มสำเร็จ");
                navigate(`/schedule/${schedule_id}`);
                console.log(response?.data)
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <IconButton sx={{ p: 2, ml: 1, mt: 2, color: '#212121', bgcolor: '#FFFFFF' }} variant="outlined" onClick={() => navigate(-1)}><KeyboardReturnIcon /></IconButton>
            <Container>
                <main>
                    <Paper sx={{ bgcolor: 'background.paper', pt: 2, pb: 6, }}>
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
                                        description={subjects?.subject_id}
                                        rootClassName="rootClassName1">
                                    </DetailsCard>
                                    <DetailsCard
                                        title={'ชื่อวิชาภาษาไทย'}
                                        description={subjects?.subject_name_th}
                                        rootClassName="rootClassName1">
                                    </DetailsCard>
                                    <DetailsCard
                                        title={'หน่วยกิต'}
                                        description={subjects?.credit}
                                        rootClassName="rootClassName1">
                                    </DetailsCard>
                                    <DetailsCard
                                        title={'ชื่อวิชาภาษาอังกฤษ'}
                                        description={subjects?.subject_name_eng}
                                        rootClassName="rootClassName1">
                                    </DetailsCard>
                                </div>
                            </Grid>
                        </Container>
                    </Paper>
                </main>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"> เลือก </TableCell>
                                <TableCell align="center"> ตอน </TableCell>
                                <TableCell align="center"> วัน</TableCell>
                                <TableCell align="center"> เวลาเริ่ม </TableCell>
                                <TableCell align="center"> หมดเริ่ม </TableCell>
                                <TableCell align="center"> ห้องเรียน </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subject && subject.length > 0 ? (
                                subject.map((row, index) => {
                                    const isFirstInSection = index === 0 || row.section_id !== subject[index - 1]?.section_id;
                                    return (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                                            {isFirstInSection && (
                                                <>
                                                    <TableCell
                                                        align="center"
                                                        rowSpan={subject.filter(item => item.section_id === row.section_id)?.length}
                                                    >
                                                        <Button onClick={() => addSchedule(schedule_id, row?.section_id)}> <AddCircleIcon /> </Button>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        rowSpan={subject.filter(item => item.section_id === row.section_id)?.length}

                                                    > {row?.section} </TableCell>
                                                </>
                                            )}

                                            <TableCell align="center"> {row?.date} </TableCell>
                                            <TableCell align="center"> {row?.start_time} </TableCell>
                                            <TableCell align="center"> {row?.end_time} </TableCell>
                                            <TableCell align="center"> {row?.classroom} </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No data available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container >
        </>
    );
}
