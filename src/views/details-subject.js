
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

export default function DetailSubject() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sections, setSections] = useState()
    const [subject, setSubjects] = useState()

    useEffect(() => {
        const getSubjectbyID = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getDetailSubjects?subject_id=${id}`, {
                })
                if (response) {
                    setSubjects(response?.data[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        getSubjectbyID()
    }, [])

    useEffect(() => {
        const getSectionBySubject = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getDetailSubjects?subject_id=${id}`, {
                })
                if (response) {
                    setSections(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getSectionBySubject()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <BreadcrumbsPage
                pages={[
                    { title: "ค้นหารายวิชา", path: `/search-all` },
                    { title: `รายละเอียดวิชา ${id}` },
                ]} />
            <Container>
                <main>
                    <Box sx={{ bgcolor: 'background.paper', pt: 2, pb: 6, }}>
                        <Container maxWidth="sm">
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    align="center"
                                    gutterBottom
                                >
                                    รายละเอียดวิชา
                                </Typography>
                                <div className="detail-sudject">
                                    <DetailsCard
                                        title={'รหัสวิชา'}
                                        description={subject?.subject_id}
                                        rootClassName="rootClassName1">
                                    </DetailsCard>
                                    <DetailsCard
                                        title={'ชื่อวิชาภาษาไทย'}
                                        description={subject?.subject_name_th}
                                        rootClassName="rootClassName1">
                                    </DetailsCard>
                                    <DetailsCard
                                        title={'หน่วยกิต'}
                                        description={subject?.credit}
                                        rootClassName="rootClassName1">
                                    </DetailsCard>
                                    <DetailsCard
                                        title={'ชื่อวิชาภาษาอังกฤษ'}
                                        description={subject?.subject_name_eng}
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
                                <TableCell align="center"> ตอน </TableCell>
                                <TableCell align="center"> วัน</TableCell>
                                <TableCell align="center"> เวลาเริ่ม </TableCell>
                                <TableCell align="center"> หมดเริ่ม </TableCell>
                                <TableCell align="center"> ห้องเรียน </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sections && sections?.length > 0 ? (
                                sections?.map((row, index) => {
                                    const isFirstInSection = index === 0 || row.section_id !== sections[index - 1]?.section_id;
                                    return (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                                            {isFirstInSection && (
                                                <>
                                                    <TableCell align="center"
                                                        rowSpan={sections?.filter(item => item.section_id === row.section_id)?.length}
                                                    > {row?.section} </TableCell>
                                                </>
                                            )}

                                            <TableCell align="center"> {row?.date} </TableCell>
                                            <TableCell align="center"> {row?.start_time} </TableCell>
                                            <TableCell align="center"> {row?.end_time} </TableCell>
                                            <TableCell align="center"> {row?.classroom} </TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No data available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
}

