import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Container,
    Grid, Select, FormControl,
    InputLabel, MenuItem, InputAdornment
} from '@mui/material';
import axios from 'axios';
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const AddSectionCard = (props) => {
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


    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Section"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Term"
                            name="term"
                            value={formData.term}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </Grid>
                    {formData.times.map((time, index) => (
                        <Grid item xs={12} key={index}>
                            <TextField
                                fullWidth
                                name="classroom"
                                label="ห้องเรียน"
                                variant="outlined"
                                onChange={(event) => handleChangeTime(index, event)}
                            />
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
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                                onChange={(event) => handleChangeTime(index, event)}
                            />
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
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                                onChange={(event) => handleChangeTime(index, event)}
                            />
                            <TextField
                                fullWidth
                                name="classroom"
                                label="ห้องเรียน"
                                variant="outlined"
                                onChange={(event) => handleChangeTime(index, event)}
                            />
                            <Grid item xs={6} md={2.4}>
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    sx={{ marginBottom: "16px" }}
                                >
                                    <InputLabel
                                        htmlFor="date-label"
                                        sx={{ fontSize: "16px" }}
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
                                {index > 0 && (
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleRemoveTimeSlot(index)}
                                    >
                                        Remove Time Slot
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddTimeSlot}
                        >
                            Add Time Slot
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Add Section
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container >
    );
}