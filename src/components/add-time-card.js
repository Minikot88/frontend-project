import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Container, Box,
    Grid, Select, FormControl, CardHeader,
    InputLabel, MenuItem, InputAdornment
} from '@mui/material';
import axios from 'axios';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const AddTimeCard = (props) => {
    const [section, setSection] = useState({});
    const [entries, setEntries] = useState([
        { time_id: '', start_time: '', end_time: '', section_id: props?.id, classroom: '', date: '' }
    ]);

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
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEntries = [...entries];
        updatedEntries[index][name] = value;
        setEntries(updatedEntries);
    };

    const handleAddEntry = () => {
        setEntries([...entries, { time_id: '', start_time: '', end_time: '', section_id: props?.id, classroom: '', date: '' }]);
    };
    
    const handleSubmit = async () => {
        try {
            const maxTimeId = await getMaxTimeId();
            let timeIdCounter = maxTimeId;

            const times = entries?.map((time) => {
                const nextTimeId = `T${timeIdCounter.toString().padStart(5, "0")}`;
                timeIdCounter++;
                return {
                    ...time,
                    time_id: nextTimeId,
                };
            });

            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/addTime`, times)
            if (response?.status === 200) {
                alert('Times added successfully.');
                window.location.reload();
            }
        } catch (err) {
            console.error(err)
        }
    };

    const handleRemoveTimeSlot = (indexToRemove) => {
        const updatedEntries = [...entries];
        updatedEntries.splice(indexToRemove, 1); // Remove the entry at the specified index
        setEntries(updatedEntries);
    };

    useEffect(() => {
        const getViewIdSection = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getViewIdSection?section_id=${props?.id}`
                );
                if (response?.data?.length > 0) {
                    setSection(response.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getViewIdSection();
    }, [props?.id]);

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
                            {entries.map((entry, index) => (
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
                                                value={entry.classroom}
                                                onChange={e => handleInputChange(e, index)}
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
                                                    value={entry.date}
                                                    onChange={e => handleInputChange(e, index)}
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
                                                value={entry.start_time}
                                                onChange={e => handleInputChange(e, index)}
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
                                                value={entry.end_time}
                                                onChange={e => handleInputChange(e, index)}
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
                                        onClick={handleAddEntry}
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
                                Add Times
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Container >
        </ThemeProvider>
    );
}