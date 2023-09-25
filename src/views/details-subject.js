import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


import Appbar from '../components/app-bar';
import BreadcrumbsPage from '../components/BreadcrumbsPage';
import DetailsCard from '../components/details-card';

const theme = createTheme();

export default function DetailSubject() {

    const [subjectId, setSubjectId] = useState({});
    const [subject, setSubject] = useState()
    const [subject_id, setSubject_id] = useState()

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }



    useEffect(() => {
        const getSubjectbyId = async () => {
            try {
                const token = await localStorage.getItem("token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/subject`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response) {
                    setSubjectId(response?.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getSubjectbyId();
    }, []);

    useEffect(() => {
        const getSubjectbyID = async () => {
            try {
                const token = await localStorage.getItem('token')
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/subject`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response) {
                    setSubject_id(response?.data[0])
                    console.log(response?.data[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        getSubjectbyID()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <BreadcrumbsPage
                pages={[
                    { title: "รายละเอียดวิชา" },
                ]} />

            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 1,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <div className="detail-sudject">
                            <DetailsCard
                                title={'รหัสวิชา'}
                                description={subject_id?.subject_id}
                                rootClassName="rootClassName1"
                            ></DetailsCard>
                            <DetailsCard
                                title={'ชื่อวิชาภาษาไทย'}
                                description={subject_id?.subject_name_th}
                                rootClassName="rootClassName1"
                            ></DetailsCard>
                            <DetailsCard
                                title={'หน่วยกิต'}
                                description={subject_id?.credit}
                                rootClassName="rootClassName1"
                            ></DetailsCard>
                            <DetailsCard
                                title={'ชื่อวิชาภาษาอังกฤษ'}
                                description={subject_id?.subject_name_eng}
                                rootClassName="rootClassName1"
                            ></DetailsCard>
                        </div>
                    </Container>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 2,
                        }}></Box>
                    <Container maxWidth="lg">
                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="life" >ตอนที่</TableCell>
                                        <TableCell align="life">ห้องเรียน</TableCell>
                                        <TableCell align="life">วัน</TableCell>
                                        <TableCell align="life">เวลาเรื่ม</TableCell>
                                        <TableCell align="life">หมดเวลา</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    {subjectId?.map((subjectId) => (
                                        <TableRow >
                                            <TableCell align="life" >{subjectId?.name}</TableCell>
                                            <TableCell align="life">{subjectId?.name}</TableCell>
                                            <TableCell align="life">{subjectId?.name}</TableCell>
                                            <TableCell align="life">{subjectId?.name}</TableCell>
                                            <TableCell align="life">{subjectId?.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody> */}
                            </Table>
                        </TableContainer>
                    </Container>
                </Box>
            </main>

        </ThemeProvider>
    );
}

