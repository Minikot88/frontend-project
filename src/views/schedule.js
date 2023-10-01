import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Container from '@mui/material/Container';

const scheduleData = [
    { day: "Monday", timeSlot: "08:00 - 09:00", subject_name_th: "Math", classroom: "A101" },
    { day: "Monday", timeSlot: "09:00 - 10:00", subject_name_th: "Science", classroom: "B202" },
    { day: "Tuesday", timeSlot: "08:00 - 09:00", subject_name_th: "English", classroom: "C303" },
    { day: "Wednesday", timeSlot: "10:00 - 11:00", subject_name_th: "History", classroom: "D404" },
    { day: "Thursday", timeSlot: "08:00 - 09:00", subject_name_th: "Physics", classroom: "E505" },
    { day: "Friday", timeSlot: "08:00 - 09:00", subject_name_th: "Chemistry", classroom: "F606" },
    // ... add more subjects here ...
];

export default function StudentSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"];

    const subjectsByDayAndTime = days.map((day) =>
        timeSlots.map((timeSlot) =>
            scheduleData.filter(
                (subject) => subject.day === day && subject.timeSlot.includes(timeSlot)
            )
        )
    );

    return (
        <>
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Student Schedule
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Day / Time Slot</TableCell>
                                {timeSlots.map((timeSlot) => (
                                    <TableCell key={timeSlot} align="center">
                                        {timeSlot}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {days.map((day, dayIndex) => (
                                <TableRow key={day}>
                                    <TableCell>{day}</TableCell>
                                    {timeSlots.map((timeSlot, timeIndex) => (
                                        <TableCell key={timeIndex} align="center">
                                            {subjectsByDayAndTime[dayIndex][timeIndex].map((subject) => (
                                                <div key={subject.subject_name_th}>
                                                    <p>{subject.subject_name_th}</p>
                                                    <p>{subject.classroom}</p>
                                                </div>
                                            ))}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}