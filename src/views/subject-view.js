import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    Box, Stack, TextField,
    Button, Typography, useMediaQuery,
    ThemeProvider, createTheme, Table,
    TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@mui/material';
import { useParams } from 'react-router-dom';

const theme = createTheme();

export default function SubjectPage() {
    const { id } = useParams()
    const [subject, setSubject] = useState();
    const [schedule, setSchedule] = useState();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const getSubjectById = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/subject?subject_id=${id}`)
                setSubject(response.data[0])
            } catch (err) {
                console.error(err);
            }
        }

        const getSubjectSchedule = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/subject-schedule?subject_id=${id}`)
                setSchedule(response?.data)
            } catch (err) {
                console.error(err);
            }
        }

        getSubjectById()
        getSubjectSchedule()
    }, [])

    return (
        <Box sx={{ p: 5 }}>
            <Typography textAlign={'center'} variant="h4">
                ตารางเรียน รายวิชา {subject?.subject_name}
            </Typography>

            <Box sx={{ p: 2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Section</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Credit</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Room</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Day</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedule?.map((items, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {items?.section}
                                    </TableCell>
                                    <TableCell align="center">{items?.credit}</TableCell>
                                    <TableCell align="center">{items?.room}</TableCell>
                                    <TableCell align="center">{items?.date}</TableCell>
                                    <TableCell align="center">{items?.start_time}-{items?.end_time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
