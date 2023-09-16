import { Box, Button, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function SubjectSectionsView() {
    const navigate = useNavigate()
    const { subjectId } = useParams()
    const [subject, setSubject] = useState()
    const [section, setSection] = useState()

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/subject?subject_id=${subjectId}`)
                if (response) {
                    setSubject(response?.data[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        getSubjects();
    }, [])

    useEffect(() => {
        const getAllSection = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/subject-schedule?subject_id=${subjectId}`)
                if (response) {
                    setSection(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSection();
    }, [])

    return (
        <div>
            <Box sx={{ p: 5 }}>
                <Typography textAlign={"center"} variant="h4" sx={{ p: 3 }}>
                    จำนวนของวิชา {subject?.subject_name_th}
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ตอน</TableCell>
                                <TableCell align="center">รหัสรายวิชา</TableCell>
                                <TableCell align="center">วัน/เวลา</TableCell>
                                <TableCell align="center">ห้องเรียน</TableCell>
                                <TableCell align="center">เลือก</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {section?.map((row, index) => {
                                const isFirstInSection = index === 0 || row.section_id !== section[index - 1].section_id;

                                return (
                                    <TableRow
                                        key={row?.section_id + "-" + row?.time_id} // Adding time_id to make the key unique
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {isFirstInSection && (
                                            <TableCell align="center" rowSpan={section.filter(item => item.section_id === row.section_id).length}>
                                                {row?.section}
                                            </TableCell>
                                        )}
                                        <TableCell align="center">{row?.subject_id}</TableCell>
                                        <TableCell align="center">{row?.date}/{row?.start_time} - {row?.end_time}</TableCell>
                                        <TableCell align="center">{row?.classroom}</TableCell>
                                        {isFirstInSection && (
                                            <TableCell align="center" rowSpan={section.filter(item => item.section_id === row.section_id).length}>
                                                <Button variant="text">
                                                    เพิ่ม
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}