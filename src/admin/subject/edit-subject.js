import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Stack, TextField,
    Button, Typography, useMediaQuery,
    ThemeProvider, createTheme, Alert, Dialog
} from '@mui/material';
import Appbar from '../../components/app-bar';
import BreadcrumbsPage from '../../components/BreadcrumbsPage';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { AddSectionCard } from '../../components/add-section-card';

const theme = createTheme();

export default function EditSubjectPage() {
    const navigate = useNavigate();
    const { subject_id } = useParams()
    const [subject, setSubject] = useState({})
    const [section, setSection] = useState([])
    const [open, setOpen] = useState(false)

    const openAddSectionPart = () => {
        setOpen(true)
    }

    const closeAddSectionPart = () => {
        setOpen(false)
    }

    const updateSection = (id) => {
        navigate(`/update-section/${id}`)
    }

    useEffect(() => {
        const getAllSectionBySubject = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getSectionByid?subject_id=${subject_id}`);
                if (response) {
                    setSection(response?.data)
                }
            } catch (err) {
                console.error(err);
            }
        }
        getAllSectionBySubject();
    }, [])

    useEffect(() => {
        const getSubject = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/subject?subject_id=${subject_id}`);
                if (response) {
                    setSubject(response?.data[0])
                }
            } catch (err) {
                console.error(err);
            }
        };
        getSubject()
    }, [subject_id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_SERVER}/update-subject?id=${subject_id}`, subject);
            if (response?.status === 200) {
                alert('Data updated successfully!')
            }
        } catch (err) {
            console.error("Error Message: ", err)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <BreadcrumbsPage
                pages={[
                    { title: "Manage Subject", path: `/manage-subject` },
                    { title: "Edit Subject" },
                ]} />
            <Container minWidth="sm" >
                <Box sx={{ p: 5 }}>
                    <Typography textAlign={'center'} variant="h4">
                        แก้ไขรายวิชา
                    </Typography>
                </Box>
                <Grid container direction="row" justifyContent="center" spacing={2}>
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            name="subject_id"
                            label="รหัสวิชา"
                            required
                            value={subject?.subject_id}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <TextField
                            fullWidth
                            name="subject_name_th"
                            label="ชื่อวิชา"
                            variant="outlined"
                            required
                            value={subject?.subject_name_th}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <TextField
                            fullWidth
                            name="subject_name_eng"
                            label="ชื่อวิชา (ภาษาอังกฤษ)"
                            variant="outlined"
                            value={subject?.subject_name_eng}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <FormControl fullWidth>
                            <InputLabel id="credit-label">หน่วยกิต</InputLabel>
                            <Select
                                name="credit"
                                labelId="credit-label"
                                variant="outlined"
                                value={subject ? `${subject?.credit}` : " "}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label">หมวดหมู่วิชา</InputLabel>
                            <Select
                                name="category"
                                labelId="category-label"
                                value={subject ? `${subject?.category}` : " "}
                                onChange={handleInputChange}
                                label="หมวดหมู่วิชา"
                                sx={{
                                    "& .MuiSelect-selectMenu": {
                                        paddingRight: "32px",
                                    },
                                }}
                            >
                                <MenuItem value="C">วิชาบังคับ</MenuItem>
                                <MenuItem value="E">วิชาเลือก</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={6} md={4}></Grid>
                </Grid>
                <Stack justifyContent={"center"} alignItems={"center"} sx={{ mt: 4 }}>
                    <Button onClick={() => handleSubmit()} variant='contained'>
                        ยืนยันการแก้ไข
                    </Button>
                </Stack>


                {/* section list */}
                <Typography variant='h5' textAlign={"center"} sx={{ p: 4 }}>
                    All Sections
                </Typography>
                <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
                    {section?.map((item, index) =>
                        <div key={index}>
                            <Button variant='contained' onClick={() => updateSection(item?.section_id)}>
                                Section {item?.section}
                            </Button>
                        </div>
                    )}
                    <Button variant='contained' onClick={() => openAddSectionPart()}>
                        เพิ่ม Section
                    </Button>
                </Stack>

                <Dialog open={open} onClose={closeAddSectionPart}>
                    <Box sx={{p: 2, maxHeight: 500}}>
                        <AddSectionCard id={subject_id} />
                        <Button onClick={() => closeAddSectionPart()}>
                            ปิด
                        </Button>
                    </Box>
                </Dialog>
            </Container>
        </ThemeProvider >
    );
}