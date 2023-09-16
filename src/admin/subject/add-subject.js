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
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getmaxtime`);
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
            const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getmaxsection`);
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
            <Container component="main" maxWidth="300">

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
                                    label="Subject name"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e)}
                                />
                                {/* <TextField
                                    name="credit"
                                    label="หน่วยกิต"
                                    variant="outlined"
                                    onChange={handleChange}
                                /> */}
                                <FormControl sx={{ minWidth: 100 }} >
                                    <InputLabel id="demo-simple-select-label">หน่วยกิต</InputLabel>
                                    <Select
                                        name="credit"
                                        label="หน่วยกิต"
                                        variant="outlined"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <TextField
                                    name="category"
                                    label="หมวดหมู่วิชา"
                                    variant="outlined"
                                    onChange={handleChange}
                                /> */}
                                <FormControl sx={{ minWidth: 180 }} >
                                    <InputLabel id="demo-simple-select-label">หมวดหมู่วิชา</InputLabel>
                                    <Select
                                        name="category"
                                        label="หมวดหมู่วิชา"
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
                                    <Stack direction="row" alignItems="center">
                                        <Typography variant="h6">Section {String(sectionIndex + 1).padStart(2, '0')}</Typography>
                                        <Button onClick={handleAddSection}
                                            sx={{
                                                color: '#1565c0',
                                                '&:hover': {
                                                    bgcolor: '#bbdefb',
                                                },
                                            }}
                                        >
                                            <AddCircleOutlineIcon />Add
                                        </Button>
                                        <Stack >
                                            {sectionIndex > 0 && (
                                                <Button
                                                    onClick={() => handleDeleteSection(sectionIndex)}
                                                    sx={{
                                                        color: '#d50000',
                                                        '&:hover': {
                                                            bgcolor: '#ff80ab',
                                                        },
                                                    }}>
                                                    <DeleteIcon />Delete
                                                </Button>
                                            )}
                                        </Stack>
                                    </Stack>

                                    <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                                        {/* <TextField
                                            name="section_id"
                                            label="Section ID"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        /> */}
                                        <TextField
                                            sx={{ width: 100 }}
                                            name="section"
                                            label="Section"
                                            variant="outlined"
                                            // value={`${String(sectionIndex + 1).padStart(2, '0')}`}
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        />
                                        {/* <TextField
                                            name="semester"
                                            label="ภาคการศึกษา"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        /> */}
                                        <FormControl sx={{ minWidth: 280 }} >
                                            <InputLabel id="demo-simple-select-label">ภาคการศึกษา</InputLabel>
                                            <Select
                                                name="term"
                                                label="ภาคการศึกษา"
                                                variant="outlined"
                                                onChange={(e) => handleSectionChange(sectionIndex, e)}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* <TextField
                                            name="year"
                                            label="ปี"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        /> */}

                                        <FormControl sx={{ minWidth: 280 }} >
                                            <InputLabel id="demo-simple-select-label" >ปีการศึกษา</InputLabel>
                                            <Select
                                                name="year"
                                                label="ปี"
                                                variant="outlined"
                                                onChange={(e) => handleSectionChange(sectionIndex, e)}
                                            >
                                                <MenuItem value={2563}>2563</MenuItem>
                                                <MenuItem value={2564}>2564</MenuItem>
                                                <MenuItem value={2565}>2565</MenuItem>
                                                <MenuItem value={2566}>2566</MenuItem>
                                                <MenuItem value={2567}>2567</MenuItem>
                                                <MenuItem value={2568}>2568</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    {/* Times */}
                                    {section.times.map((timePart, timeIndex) => (
                                        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} key={timeIndex}>
                                            {/* <TextField
                                                name="time_id"
                                                label="Time ID"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            /> */}
                                            <TextField
                                                name="classroom"
                                                label="ห้องเรียน"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            />
                                            {/* <TextField
                                                name="date"
                                                label="วัน"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            /> */}
                                            <FormControl sx={{ minWidth: 130 }} >
                                                <InputLabel id="demo-simple-select-label">วัน</InputLabel>
                                                <Select
                                                    name="date"
                                                    label="วัน"
                                                    variant="outlined"
                                                    onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                                >
                                                    <MenuItem value={'จันทร์'}>จันทร์</MenuItem>
                                                    <MenuItem value={'อังคาร'}>อังคาร</MenuItem>
                                                    <MenuItem value={'พุธ'}>พุธ</MenuItem>
                                                    <MenuItem value={'พฤหัสบดี'}>พฤหัสบดี</MenuItem>
                                                    <MenuItem value={'ศุกร์'}>ศุกร์</MenuItem>
                                                    <MenuItem value={'เสาร์'}>เสาร์</MenuItem>
                                                    <MenuItem value={'อาทิตย์'}>อาทิตย์</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                name="start_time"
                                                label="เวลาเริ่ม"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            />
                                            <TextField
                                                name="end_time"
                                                label="หมดเวลา"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            />
                                            <Stack direction="row">
                                                <Button onClick={() => handleAddTime(sectionIndex)}
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
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>

                    <Stack spacing={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 5 }}>
                        <Button variant="contained" onClick={addSubject}>
                            submit
                        </Button>
                    </Stack>
                </Box >
                <Copyright sx={{ mt: 10, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
}