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
import { useNavigate } from "react-router-dom";

export default function AllSubjectsView() {
    const navigate = useNavigate()
    const [subject, setSubject] = useState()

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getallsubject`)
                if (response) {
                    setSubject(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSubjects();
    }, [])

    const seeSubjectInfo = (id) => {
        navigate(`/subject-info/${id}`)
    }

    return (
        <div>
            <Box sx={{ p: 5 }}>
                <Typography textAlign={"center"} variant="h4" sx={{ p: 3 }}>
                    รายวิชาทั้งหมด
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">รหัสรายวิชา</TableCell>
                                <TableCell align="center">ชื่อรายวิชา</TableCell>
                                <TableCell align="center">หน่วยกิต</TableCell>
                                <TableCell align="center">จำนวนตอน</TableCell>
                                <TableCell align="center">ข้อมูล</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subject?.map((row) => (
                                <TableRow
                                    key={row?.subject_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row?.subject_id}</TableCell>
                                    <TableCell align="center">{row?.subject_name_th}</TableCell>
                                    <TableCell align="center">{row?.credit}</TableCell>
                                    <TableCell align="center">{row?.num_section}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="text" onClick={() => seeSubjectInfo(row?.subject_id)}>
                                            ดูข้อมูล
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}