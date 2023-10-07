import React from "react";
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
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconButton from '@mui/material/IconButton';

const scheduleData = [
  { day: "Monday", timeSlot: "08:00 - 10:00", subject_name_th: "Math", classroom: "A101" },
  { day: "Monday", timeSlot: "08:00 - 11:00", subject_name_th: "Math", classroom: "A101" },
  { day: "Tuesday", timeSlot: "08:00 - 09:00", subject_name_th: "English", classroom: "C303" },
  { day: "Wednesday", timeSlot: "10:00 - 11:00", subject_name_th: "History", classroom: "D404" },
  { day: "Thursday", timeSlot: "08:00 - 09:00", subject_name_th: "Physics", classroom: "E505" },
  { day: "Friday", timeSlot: "08:00 - 09:00", subject_name_th: "Chemistry", classroom: "F606" }
  // ... add more subjects here ...
];

export default function StudentSchedule() {

  const [subject, setSubject] = useState()

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  const timeSlotIndexMap = {};
  timeSlots.forEach((timeSlot, index) => {
    timeSlotIndexMap[timeSlot] = index;
  });

  const subjectsByDayAndTime = days.map((day) =>
    timeSlots.map(() => [])
  );

  scheduleData.forEach((subject) => {
    const [startTime, endTime] = subject.timeSlot.split(" - ");
    const startIdx = timeSlotIndexMap[startTime];
    const endIdx = timeSlotIndexMap[endTime];

    if (startIdx !== undefined && endIdx !== undefined) {
      for (let i = startIdx; i <= endIdx; i++) {
        subjectsByDayAndTime[days.indexOf(subject.day)][i].push(subject);
      }
    }
  });

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomPastelColor() {
    var red = getRandomArbitrary(0, 256);
    var green = getRandomArbitrary(0, 256);
    var blue = getRandomArbitrary(0, 256);

    red = (red + 255) / 2;
    green = (green + 255) / 2;
    blue = (blue + 255) / 2;

    return Math.round(red) + "," + Math.round(green) + "," + Math.round(blue);
  }

  const yourSchedule = () => {
    window.location.reload()
  };

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

  return (
    <>
      <Container maxWidth="l" sx={{ p: 2 }}>
        <Box sx={{ p: 1 }}>
          <Typography textAlign={"center"} variant="h4" sx={{ p: 3 }}>
            รายวิชาที่เลือก
          </Typography>

          <TableContainer component={Paper}>
            <Table >
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
                      key={index}
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
          <Stack direction="row" spacing={2} justifyContent={"center"} alignItems={"center"} sx={{ p: 5 }}>
            <Button onClick={() => yourSchedule()} variant="contained">
              เลือกวิชา
            </Button>
          </Stack>
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          My Class Schedule  <IconButton size="small" onClick={() => yourSchedule()} sx={{color: '#000000',bgcolor:'#e0f7fa' }}>
            <RestartAltIcon></RestartAltIcon>
          </IconButton>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{
                  bgcolor: `rgb(${randomPastelColor()})`,
                  border: "1px solid black",
                }}
                ></TableCell>
                {timeSlots.map((timeSlot) => (
                  <TableCell key={timeSlot} align="center" sx={{ border: "1px solid black", }}>
                    {timeSlot}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day, dayIndex) => (
                <TableRow key={day}>
                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: `rgb(${randomPastelColor()})`,
                      border: "1px solid black",
                    }}
                  >
                    {day}
                  </TableCell>
                  {timeSlots.map((timeSlot, timeIndex) => (
                    <TableCell key={timeIndex} align="center" sx={{ border: "1px solid black", }} >
                      {subjectsByDayAndTime[dayIndex][timeIndex].map((subject) => (
                        <div key={subject.subject_name_th}  >

                          <p  >{subject.subject_name_th}</p>
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
