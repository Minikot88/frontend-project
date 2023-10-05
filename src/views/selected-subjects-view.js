import {
    Box,
    Button,
    Stack,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function SelectedSubjectsView() {
    const [subject, setSubject] = useState();

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/get-selected-subjects`)
                if (response) {
                    setSubject(response?.data)
                    console.log(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getSubjects();
    }, [])

    const timeSlots = [
        "08:00 - 09:00",
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
        "17:00 - 18:00",
    ];

    const timePeriods = [
        { start: "08:00", end: "09:00" },
        { start: "09:00", end: "10:00" },
        { start: "10:00", end: "11:00" },
        { start: "11:00", end: "12:00" },
        { start: "12:00", end: "13:00" },
        { start: "13:00", end: "14:00" },
        { start: "14:00", end: "15:00" },
        { start: "15:00", end: "16:00" },
        { start: "16:00", end: "17:00" },
        { start: "17:00", end: "18:00" },
    ];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const yourSchedule = () => {
        window.location.reload()
    };

    return (
        <div>
            <Box sx={{ p: 5 }}>
                <Typography textAlign={"center"} variant="h4" sx={{ p: 3 }}>
                    รายวิชาที่เลือก
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">รหัสรายวิชา</TableCell>
                                <TableCell align="center">ตอน</TableCell>
                                <TableCell align="center">ชื่อรายวิชา</TableCell>
                                <TableCell align="center">วัน/เวลา</TableCell>
                                <TableCell align="center">ห้องเรียน</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subject?.map((row, index) => {
                                const isFirstInSection = index === 0 || row.section_id !== subject[index - 1]?.section_id;
                                return (
                                    <TableRow
                                        key={index} // Adding time_id to make the key unique
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {isFirstInSection && (
                                            <>
                                                <TableCell align="center"
                                                    rowSpan={subject.filter(item => item.section_id === row.section_id)?.length}>
                                                    {row?.subject_id}
                                                </TableCell>
                                                <TableCell align="center"
                                                    rowSpan={subject.filter(item => item.section_id === row.section_id)?.length}>
                                                    {row?.section}
                                                </TableCell>
                                                <TableCell align="center"
                                                    rowSpan={subject.filter(item => item.section_id === row.section_id)?.length}>
                                                    {row?.subject_name_th}
                                                </TableCell>
                                            </>
                                        )}
                                        <TableCell align="center">{row?.date}/{row?.start_time} - {row?.end_time}</TableCell>
                                        <TableCell align="center">{row?.classroom}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack justifyContent={"center"} alignItems={"center"} sx={{ p: 5 }}>
                    <Button onClick={() => yourSchedule()} variant="contained">
                        reload
                    </Button>
                </Stack>
            </Box>


            <Box sx={{ p: 3 }}>
                <Typography variant="h5" textAlign="center" sx={{ marginBottom: 3 }}>
                    Your Schedule
                </Typography>
                <Paper elevation={5} sx={{ p: 3 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" />
                                {timeSlots.map((timeSlot, timeIndex) => (
                                    <TableCell key={timeIndex} align="center">
                                        <Typography variant="body1">
                                            {timeSlot}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {days.map((day, dayIndex) => (
                                <TableRow key={dayIndex}>
                                    <TableCell align="center">{day}</TableCell>
                                    {timePeriods.map((timeSlot, timeIndex) => {
                                        const matchingSubjects = subject?.filter(
                                            row =>
                                                row.date === day &&
                                                row.start_time &&
                                                row.start_time.split(":")[0] === timeSlot.start.split(" ")[0].split(":")[0]
                                        );

                                        if (matchingSubjects?.length > 0) {
                                            const subject = matchingSubjects[0];
                                            const rowSpan = matchingSubjects?.length;

                                            return (
                                                <TableCell
                                                    key={timeIndex}
                                                    align="center"
                                                    rowSpan={rowSpan}
                                                    sx={{
                                                        backgroundColor: "#e0e0e0",
                                                        border: "1px solid #ccc",
                                                        padding: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2">
                                                        {subject.subject_name_th}
                                                        <br />
                                                        {subject.classroom}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell
                                                    key={timeIndex}
                                                    align="center"
                                                    sx={{ border: "1px solid #ccc", padding: 1 }}
                                                >
                                                    {/* Empty cell */}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>

        </div>
    )
}