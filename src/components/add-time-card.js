import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Container, Box,
    Grid, Select, FormControl, CardHeader,
    InputLabel, MenuItem, InputAdornment
} from '@mui/material';
import axios from 'axios';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from "react-router-dom";

const theme = createTheme();

export const AddTimeCard = (props) => {

    const { id } = useParams();
    const [section, setSection] = useState({});
    const [formData, setFormData] = useState({
        subject_id: props?.id,
        section_id: '',
        section: '',
        term: '',
        year: '',
        times: [{}],
    });

    const getMaxSectionId = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/getMaxSection`
            );
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

    const getMaxTimeId = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/getMaxTime`
            );
            if (response) {
                const maxId = response?.data[0].maxId;
                if (maxId) {
                    const currentId = parseInt(maxId.slice(1));
                    const nextId = currentId + 1;
                    return nextId;
                } else {
                    return 1;
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getMaxSectionId();
        getMaxTimeId()
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeTime = (index, event) => {
        const newTimes = [...formData.times];
        newTimes[index] = { ...newTimes[index], [event.target.name]: event.target.value };

        setFormData({
            ...formData,
            times: newTimes,
        });
    };

    const handleAddTimeSlot = () => {
        // Add a new empty time slot to the times array
        setFormData({
            ...formData,
            times: [...formData.times, {}],
        });
    };

    const handleRemoveTimeSlot = (index) => {
        // Remove the time slot at the specified index
        const newTimes = [...formData.times];
        newTimes.splice(index, 1);

        setFormData({
            ...formData,
            times: newTimes,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const maxTimeId = await getMaxTimeId();
            const maxSectionID = await getMaxSectionId();

            let timeIdCounter = maxTimeId;

            const times = formData?.times.map((time) => {
                const nextTimeId = `T${timeIdCounter.toString().padStart(5, "0")}`;
                timeIdCounter++;
                return {
                    ...time,
                    time_id: nextTimeId,
                };
            });

            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/add-section`, {
                ...formData,
                section_id: maxSectionID,
                times: times, // Update the times array in the formData
            });

            if (response.status === 200) {
                alert('Section added successfully.');
            }
        } catch (error) {
            console.error('Error adding section:', error);
        }
    };

    useEffect(() => {
        const getViewIdSection = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getViewIdSection?section_id=${id}`
                );
                if (response?.data?.length > 0) {
                    setSection(response.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getViewIdSection();
    }, [id]);

    const handleInput = (e) => {
        setSection((updateSection) => ({
            ...updateSection,
            [e.target.name]: e.target.value,
        }));
    };

    const style = {
        marginTop: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxHeight: '80%', // แก้เป็น maxHeight แทน maxhigh
        backgroundColor: 'background.paper', // แก้เป็น backgroundColor แทน bgcolor
        border: '2px solid #000',
        boxShadow: '24px', // แก้เป็น '24px' แทน 24
        padding: '4px', // แก้เป็น '4px' แทน 4
        overflow: 'auto', // เพิ่ม overflow: auto; เพื่อให้มีแถบเลื่อน
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box x={style}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs={12} md={2}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Section"
                                        name="section"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => handleInput(e)}
                                        value={section.section}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="term-label">ภาคการศึกษา</InputLabel>
                                        <Select
                                            disabled
                                            name="term"
                                            labelId="term-label"
                                            label="ภาคการศึกษา"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => handleInput(e)}
                                            value={section ? `${section?.term}` : " "}
                                        >
                                            {[1, 2, 3].map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="year-label">ปีการศึกษา</InputLabel>
                                        <Select
                                            disabled
                                            name="year"
                                            labelId="year-label"
                                            label="ปี"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => handleInput(e)}
                                            value={section ? `${section?.year}` : " "}
                                        >
                                            {[2563, 2564, 2565, 2566, 2567, 2568].map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {formData.times.map((time, index) => (
                                <Grid item xs={12} key={index}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item xs={6} md={2.5}>
                                            <TextField
                                                fullWidth
                                                name="classroom"
                                                label="ห้องเรียน"
                                                variant="outlined"
                                                onChange={(event) => handleChangeTime(index, event)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={2.5}>
                                            <FormControl
                                                fullWidth
                                                variant="outlined"
                                            >
                                                <InputLabel
                                                    htmlFor="date-label"

                                                >
                                                    วัน
                                                </InputLabel>
                                                <Select
                                                    name="date"
                                                    labelId="date-label"
                                                    label="วัน"
                                                    variant="outlined"
                                                    onChange={(event) => handleChangeTime(index, event)}
                                                    sx={{ fontSize: "16px" }}
                                                    inputProps={{ id: "date-label" }}
                                                >
                                                    {[
                                                        "จันทร์",
                                                        "อังคาร",
                                                        "พุธ",
                                                        "พฤหัสบดี",
                                                        "ศุกร์",
                                                        "เสาร์",
                                                        "อาทิตย์",
                                                    ].map((value) => (
                                                        <MenuItem key={value} value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6} md={2.5}>
                                            <TextField
                                                fullWidth
                                                name="start_time"
                                                label="เวลาเริ่ม"
                                                type="time"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccessTimeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                onChange={(event) => handleChangeTime(index, event)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={2.5}>
                                            <TextField
                                                fullWidth
                                                name="end_time"
                                                label="หมดเวลา"
                                                type="time"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccessTimeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                onChange={(event) => handleChangeTime(index, event)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={2}  >
                                            {index > 0 && (
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() => handleRemoveTimeSlot(index)}
                                                    sx={{
                                                        color: '#FFFFFF',
                                                        bgcolor: '#f73378',
                                                        '&:hover': {
                                                            color: '#FFFFFF',
                                                            bgcolor: '#ab003c'
                                                        },
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </Grid>

                                    </Grid>
                                </Grid>
                            ))}

                            <Grid
                                container
                                sx={{ mt: 1, }}
                            >
                                <Grid item xs={12}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddTimeSlot}
                                        fullWidth
                                        sx={{
                                            color: '#171C22',
                                            bgcolor: '#ff9800',
                                            '&:hover': {
                                                color: '#171C22',
                                                bgcolor: '#ff5722'
                                            },
                                        }}
                                    >
                                        Add Time Slot
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            justifyContent="center"
                            alignItems="flex-end"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{
                                    color: '#171C22',
                                    bgcolor: '#357a38',
                                    '&:hover': {
                                        color: '#212121',
                                        bgcolor: '#00a152'
                                    },
                                }}
                            >
                                Add Section
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Container >
        </ThemeProvider>
    );
}