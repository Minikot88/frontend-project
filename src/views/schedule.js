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
  Card,
  CardHeader,
  Grid,
  CardContent,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import BreadcrumbsPage from "../components/BreadcrumbsPage";
import Swal from 'sweetalert2';

export default function StudentSchedule() {

  const navigate = useNavigate()
  const Swal = require('sweetalert2')
  const { schedule_id, subject_id } = useParams()
  const [subject, setSubject] = useState()
  const [credit, setCredit] = useState()
  const tableContainerRef = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("token")

  const days = [
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
    "อาทิตย์"];

  const timeSlots = [
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",];

  const thaiToEnglishDay = {
    "จันทร์": "จันทร์",
    "อังคาร": "อังคาร",
    "พุธ": "พุธ",
    "พฤหัสบดี": "พฤหัสบดี",
    "ศุกร์": "ศุกร์",
    "เสาร์": "เสาร์",
    "อาทิตย์": "อาทิตย์",
  };

  const timeSlotIndexMap = {};
  timeSlots.forEach((timeSlot, index) => {
    timeSlotIndexMap[timeSlot] = index;
  });

  const subjectsByDayAndTime = days.map((day) =>
    timeSlots.map(() => [])
  );

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomPastelColor() {
    let red = getRandomArbitrary(0, 256);
    let green = getRandomArbitrary(0, 256);
    let blue = getRandomArbitrary(0, 256);

    red = (red + 255) / 2;
    green = (green + 255) / 2;
    blue = (blue + 255) / 2;

    return Math.round(red) + "," + Math.round(green) + "," + Math.round(blue);
  }

  const yourSchedule = () => {
    window.location.reload()
  };

  const goToSelectSubject = () => {
    navigate(`/search-select/${schedule_id}`);
  };

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getSelectedSubject?schedule_id=${schedule_id}`)
        if (response) {
          setSubject(response?.data)

        }
      } catch (err) {
        console.error(err)
      }
    }
    getSubjects();
  }, [])

  subject?.forEach((subject) => {
    const englishDay = thaiToEnglishDay[subject?.date];
    const startTime = subject?.start_time;
    const endTime = subject?.end_time;

    if (englishDay && startTime && endTime) {
      const startIdx = timeSlotIndexMap[startTime];
      const endIdx = timeSlotIndexMap[endTime];

      if (startIdx !== undefined && endIdx !== undefined) {
        for (let i = startIdx; i <= endIdx; i++) {
          subjectsByDayAndTime[days.indexOf(englishDay)][i].push(subject);
        }
      }
    }
  });

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/deleteSchedule?schedule_id=${schedule_id}`
      );

      // if (response?.status === 200) {
      //   alert(`Data deleted successfully`);
      //   localStorage.removeItem("table_id");
      //   navigate('/create-table');
      // }

      if (response?.status === 200) {
        Swal.fire('ลบตารางสำเร็จ')
          .then(() => {
            setOpen(false);
            localStorage.removeItem("table_id");
            navigate('/create-table');
          });
      }

    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSection = async (section_id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/deleteSectionSchedule?section_id=${section_id}`
      );

      // if (response?.status === 200) {
      //   alert(`Data deleted successfully`);
      //   window.location.reload();
      // }

      if (response?.status === 200) {
        Swal.fire('ลบข้อมูลสำเร็จ')
          .then(() => {
            window.location.reload();
          });
      }

    } catch (err) {
      console.error(err);
    }
  };

  function CreditSummary() {
    const totalCredits = subject?.reduce((acc, subject) => acc + subject.credit, 0);

    return (
      <div>
        <p>หน่วยกิตทั้งหมด : {totalCredits}</p>
      </div>
    );
  }


  useEffect(() => {
    const getCredit = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getCredit?subject_id=${subject_id}`)
        if (response) {
          setCredit(response?.data)

        }
      } catch (err) {
        console.error(err)
      }
    }
    getCredit();
  }, [])

  function downloadTableAsImage() {
    const tableContainer = document.getElementById('table-container');
    const fileName = 'table_image.png';

    const options = {
      backgroundColor: '#FFFFFF',
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight + window.innerHeight,
    };

    html2canvas(tableContainer, options).then(function (canvas) {
      const image = canvas.toDataURL('image/png');

      const a = document.createElement('a');
      a.href = image;
      a.download = fileName;
      a.click();
    });
  }

  return (
    <>
      <BreadcrumbsPage
        pages={[
          { title: "ตารางเรียน", path: `/create-table` },
          { title: "สร้างตาราง" },
        ]} />
      <Container maxWidth="100%" sx={{ p: 2 }}>

        <Stack direction="row" spacing={1} justifyContent="flex-end" marginRight={2}  >
          <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}
            sx={{
              bgcolor: "#AA00FF",
              width: "130",
              color: "#000000",
              fontFamily: "monospace",
              bgcolor: "#0468BF",
              color: "#FFFFFF",
              "&:hover": {
                bgcolor: "#0487D9",
              },
            }}
          >
            ลบตาราง
          </Button>
        </Stack>

        <Box sx={{ p: 1 }}>
          <Typography textAlign={"center"} variant="h4" sx={{ p: 3 }}>
            รายวิชาที่เลือก
          </Typography>
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell align="center">เลือก</TableCell>
                  <TableCell align="center">รหัสรายวิชา</TableCell>
                  <TableCell align="center">ตอน</TableCell>
                  <TableCell align="center">ชื่อรายวิชา</TableCell>
                  <TableCell align="center">หน่วยกิต</TableCell>
                  <TableCell align="center">ห้องเรียน</TableCell>
                  <TableCell align="center">วัน/เวลา</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subject?.map((row, index) => {
                  const isFirstInSection = index === 0 || row.section_id !== subject[index - 1]?.section_id;
                  return (
                    <TableRow key={index} >
                      {isFirstInSection && (
                        <>
                          <TableCell align="center"
                            rowSpan={subject.filter(item => item.section_id === row.section_id)?.length}>
                            <IconButton color="error" onClick={() => handleDeleteSection(row?.section_id)}> <DeleteForeverIcon /></IconButton>
                          </TableCell>
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
                          <TableCell align="center"
                            rowSpan={subject.filter(item => item.section_id === row.section_id)?.length}>
                            {row?.credit}
                          </TableCell>
                        </>
                      )}
                      <TableCell align="center">{row?.classroom}</TableCell>
                      <TableCell align="center">{row?.date}/{row?.start_time} - {row?.end_time}</TableCell>
                    </TableRow>

                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={2} justifyContent={"center"} alignItems={"center"} sx={{ p: 5 }}>
            <Button onClick={() => goToSelectSubject(schedule_id)} variant="contained" > เลือกวิชา</Button>
            {open === true ? (
              <Button variant="contained" onClick={handleClose} color="error"> ซ่อนตาราง </Button>
            ) : (
              <Button variant="contained" onClick={handleOpen} > ดูตาราง </Button>
            )}

            {token && (
              <Button variant="contained" onClick={downloadTableAsImage} > ดาวน์โหลด </Button>
            )}
          </Stack>
        </Box>

        {open && (
          <>

            <Typography variant="h4" align="center" gutterBottom>
              My Class Schedule  <IconButton size="small" onClick={() => yourSchedule()} sx={{ color: '#000000', bgcolor: '#e0f7fa' }}>
                <RestartAltIcon />
              </IconButton>
              <Typography variant="subtitle1" align="right" >
                <CreditSummary />
              </Typography>
            </Typography>

            <TableContainer id="table-container" component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: `rgb(${randomPastelColor()})`, border: "1px solid black", }}></TableCell>
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
                              <p  >{subject.subject_id} {subject.subject_name_th}</p>
                            </div>
                          ))}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </>
  );
}
