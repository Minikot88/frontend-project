import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Stack, TextField,
    Button, Typography, useMediaQuery,
    ThemeProvider, createTheme
} from '@mui/material';

import Appbar from '../component/app-bar';

import BreadcrumbsPage from '../component/BreadcrumbsPage';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


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
            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/add-subject`, {
                subject: subject,
                sections: sections,
            });
            if (response) {
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
            <Appbar></Appbar>

            <BreadcrumbsPage
                pages={[
                    { title: "Manage Subject" , path: `/manage-subject`  },
                    { title: "Add Subject" },
                ]} />

            <Container component="main" maxWidth="100">

                <Box sx={{ p: 5 }}>
                    <Typography textAlign={'center'} variant="h4">
                        เพิ่มรายวิชา
                    </Typography>

                    <Stack spacing={4}>
                        <Stack spacing={2}>
                            <Typography variant="h6">วิชา</Typography>
                            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                                <TextField
                                    name="subject_id"
                                    label="รหัสวิชา"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <TextField
                                    name="subject_name"
                                    label="ชื่อวิชา"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <TextField
                                    name="credit"
                                    label="หน่วยกิต"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <TextField
                                    name="category"
                                    label="หมวดหมู่วิชา"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </Stack>
                        </Stack>

                        {/* Sections */}
                        {sections.map((section, sectionIndex) => (
                            <Stack direction={isMobile ? 'column' : 'row'} spacing={4} key={sectionIndex}>
                                <Stack spacing={2}>
                                    <Typography variant="h6">Section 0{sectionIndex + 1}</Typography>
                                    <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                                        <TextField
                                            name="section_id"
                                            label="Section ID"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        />
                                        <TextField
                                            name="section"
                                            label="Section"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        />
                                        <TextField
                                            name="semester"
                                            label="เทอม"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        />
                                        <TextField
                                            name="year"
                                            label="ปี"
                                            variant="outlined"
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        />
                                    </Stack>

                                    {/* Times */}
                                    {section.times.map((timePart, timeIndex) => (
                                        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} key={timeIndex}>
                                            <TextField
                                                name="time_id"
                                                label="Time ID"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            />
                                            <TextField
                                                name="room"
                                                label="ห้องเรียน"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            />
                                            <TextField
                                                name="date"
                                                label="วัน"
                                                variant="outlined"
                                                onChange={(e) => handleTimeChange(sectionIndex, timeIndex, e)}
                                            />
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

                                {/* Delete Section Button */}
                                <Stack justifyContent={'center'} alignItems={'center'}>
                                    {sectionIndex > 0 && (
                                        <Button
                                            onClick={() => handleDeleteSection(sectionIndex)}
                                            sx={{
                                                color: '#d50000',
                                                '&:hover': {
                                                    bgcolor: '#ff80ab',
                                                },
                                            }}>
                                            <DeleteIcon />
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        ))}

                        <Stack>
                            <Button onClick={handleAddSection}
                                sx={{
                                    color: '#1565c0',
                                    '&:hover': {
                                        bgcolor: '#bbdefb',
                                    },
                                }}
                            > <AddCircleOutlineIcon />
                                ..Add Section..
                                <AddCircleOutlineIcon />
                            </Button>
                        </Stack>
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