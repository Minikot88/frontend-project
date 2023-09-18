import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Stack, TextField,
    Button, Typography, useMediaQuery,
    ThemeProvider, createTheme
} from '@mui/material';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {' Minikot '}
            <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();

export default function AddSubjectPage() {

    const [subject, setSubject] = useState({});
    const [sections, setSections] = useState([{ times: [{}] }]);
    const [timeIdCounter, setTimeIdCounter] = useState(0);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getMaxTimeId = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getMaxTime`);
            if (response) {
                const maxId = response?.data[0].maxId;

                if (maxId) {
                    const currentId = parseInt(maxId.slice(1));
                    const nextId = currentId + 1;
                    return `T${nextId.toString().padStart(5, '0')}`;
                } else {
                    return 'T00001';
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getMaxSectionId = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getMaxSection`);
            if (response) {
                const maxId = response?.data[0].maxId;

                if (maxId) {
                    const currentId = parseInt(maxId.slice(1));
                    const nextId = currentId + 1;
                    return `S${nextId.toString().padStart(5, '0')}`;
                } else {
                    return 'S00001';
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }));
    };

    const handleSectionChange = (sectionIndex, e) => {
        const { name, value } = e.target;
        const updatedSections = [...sections];
        updatedSections[sectionIndex] = {
            ...updatedSections[sectionIndex],
            [name]: value,
        };
        setSections(updatedSections);
    };

    const handleTimeChange = (sectionIndex, timeIndex, e) => {
        const { name, value } = e.target;
        const updatedSections = [...sections];
        updatedSections[sectionIndex].times[timeIndex] = {
            ...updatedSections[sectionIndex].times[timeIndex],
            [name]: value,
        };
        setSections(updatedSections);
    };

    const addSubject = async () => {
        try {
            // Get the next available time_id and section_id
            const nextTimeId = await getMaxTimeId();
            const nextSectionId = await getMaxSectionId();

            // Update the subject and sections objects
            const updatedSubject = { ...subject, time_id: nextTimeId, section_id: nextSectionId };
            const updatedSections = sections.map((section) => ({
                ...section,
                section_id: nextSectionId,
                times: section.times.map((time) => ({
                    ...time,
                    time_id: nextTimeId,
                })),
            }));

            // Send the POST request with updatedSubject and updatedSections
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/add-subject`, {
                subject: updatedSubject,
                sections: updatedSections,
            });

            if (response?.status === 200) {
                alert('Adding successfully');
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleAddSection = () => {
        setSections([...sections, { times: [{}] }]);
    };

    const handleAddTime = (sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].times.push({ id: timeIdCounter });
        setSections(updatedSections);
        setTimeIdCounter((prevCounter) => prevCounter + 1);
    };

    const handleDeleteTime = (sectionIndex, timeId) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].times = updatedSections[sectionIndex].times.filter(
            (time) => time.id !== timeId
        );
        setSections(updatedSections);
    };

    const handleDeleteSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <Box sx={{ p: 5 }}>
                    <Typography textAlign={'center'} variant="h4">
                        เพิ่มรายวิชา
                    </Typography>

                    <Stack spacing={2}>
                        <Stack spacing={2}>
                            <Typography variant="h6">วิชา</Typography>
                            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                                <TextField
                                    name="subject_id"
                                    label="รหัสวิชา"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    name="subject_name"
                                    label="ชื่อวิชา"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    name="subject_name_eng"
                                    label="ชื่อวิชา (ภาษาอังกฤษ)"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e)}
                                />
                                <FormControl sx={{ minWidth: 100 }} >
                                    <InputLabel id="credit-label">หน่วยกิต</InputLabel>
                                    <Select
                                        name="credit"
                                        labelId="credit-label"
                                        variant="outlined"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                            <MenuItem key={value} value={value}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 180 }} >
                                    <InputLabel id="category-label">หมวดหมู่วิชา</InputLabel>
                                    <Select
                                        name="category"
                                        labelId="category-label"
                                        variant="outlined"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <MenuItem value={1}>วิชาบังคับ</MenuItem>
                                        <MenuItem value={2}>วิชาเลือก</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>


                        {/* Sections */}
                        {sections.map((section, sectionIndex) => (
                            <Stack direction={isMobile ? 'column' : 'row'} spacing={4} key={sectionIndex}>
                                <Stack spacing={2}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Typography variant="h6">
                                                Section {String(sectionIndex + 1).padStart(2, '0')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                onClick={handleAddSection}
                                                sx={{
                                                    color: '#1565c0',
                                                    '&:hover': {
                                                        bgcolor: '#bbdefb',
                                                    },
                                                }}
                                            >
                                                <AddCircleOutlineIcon /> Add
                                            </Button>
                                        </Grid>
                                        {sectionIndex > 0 && (
                                            <Grid item>
                                                <Button
                                                    onClick={() => handleDeleteSection(sectionIndex)}
                                                    sx={{
                                                        color: '#d50000',
                                                        '&:hover': {
                                                            bgcolor: '#ff80ab',
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon /> Delete
                                                </Button>
                                            </Grid>
                                        )}
                                    </Grid>

                                    <Grid container spacing={2}>
                                        {/* <TextField
                                            name="section_id"
                                            label="Section ID"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        /> */}
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <TextField
                                                sx={{ minWidth: 280 }}
                                                name="section"
                                                label="Section"
                                                variant="outlined"
                                                // value={`${String(sectionIndex + 1).padStart(2, '0')}`}
                                                onChange={(e) => handleSectionChange(sectionIndex, e)}
                                            />
                                        </Grid>
                                        {/* <TextField
                                            name="semester"
                                            label="ภาคการศึกษา"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        /> */}
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <FormControl sx={{ minWidth: 280 }} >
                                                <InputLabel id="term-label">ภาคการศึกษา</InputLabel>
                                                <Select
                                                    name="term"
                                                    labelId="term-label"
                                                    label="ภาคการศึกษา"
                                                    variant="outlined"
                                                    onChange={(e) => handleSectionChange(sectionIndex, e)}
                                                >
                                                    {[1, 2, 3].map((value) => (
                                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        {/* <TextField
                                            name="year"
                                            label="ปี"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        /> */}
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <FormControl sx={{ minWidth: 280 }} >
                                                <InputLabel id="year-label" >ปีการศึกษา</InputLabel>
                                                <Select
                                                    name="year"
                                                    labelId="year-label"
                                                    label="ปี"
                                                    variant="outlined"
                                                    onChange={(e) => handleSectionChange(sectionIndex, e)}
                                                >
                                                    {[2563, 2564, 2565, 2566, 2567, 2568].map((value) => (
                                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    {/* Times */}
                                    {section.times.map((timePart, timeIndex) => (
                                        <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} key={timeIndex}>
                                            {/* <TextField
                                           name="time_id"
                                           label="Time ID"
                                           variant="outlined"
                                           onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                       /> */}
                                            <Grid item>
                                                <TextField
                                                    name="classroom"
                                                    label="ห้องเรียน"
                                                    variant="outlined"
                                                    onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                                />
                                            </Grid>
                                            {/* <TextField
                                           name="date"
                                           label="วัน"
                                           variant="outlined"
                                           onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                       /> */}
                                            <Grid item>
                                                <FormControl sx={{ minWidth: 130 }}>
                                                    <InputLabel id="date-label">วัน</InputLabel>
                                                    <Select
                                                        name="date"
                                                        labelId="date-label"
                                                        label="วัน"
                                                        variant="outlined"
                                                        onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                                    >
                                                        {['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'].map((value) => (
                                                            <MenuItem key={value} value={value}>{value}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    name="start_time"
                                                    label="เวลาเริ่ม"
                                                    variant="outlined"
                                                    onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    name="end_time"
                                                    label="หมดเวลา"
                                                    variant="outlined"
                                                    onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Stack direction="row">
                                                    <Button
                                                        onClick={() => handleAddTime(sectionIndex)}
                                                        sx={{
                                                            color: '#1565c0',
                                                            '&:hover': {
                                                                bgcolor: '#bbdefb',
                                                            },
                                                        }}
                                                    >
                                                        <AddAlarmIcon />
                                                    </Button>
                                                    {timeIndex > 0 && (
                                                        <Button
                                                            onClick={() => handleDeleteTime(sectionIndex, timePart.id)}
                                                            sx={{
                                                                color: '#d50000',
                                                                '&:hover': {
                                                                    bgcolor: '#ff80ab',
                                                                },
                                                            }}
                                                        >
                                                            <RemoveCircleOutlineIcon />
                                                        </Button>
                                                    )}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    ))}

                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
                        <Grid item>
                            <Button variant="contained" onClick={addSubject}>
                                submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box >
                <Copyright sx={{ mt: 10, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
}