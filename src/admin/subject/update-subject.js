import {
    Button, InputLabel, Stack, Card, Box,
    TextField, Typography, createTheme, CardContent,
    CardHeader,
    useMediaQuery, IconButton, Dialog, Container,
    DialogTitle, DialogContent, DialogActions, Unstable_Grid2 as Grid,
} from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DeteilUpdateSubject } from "./deteil-update-subject";
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme();

export default function UpdateSubjectView() {

    const { subject_id } = useParams();
    const [subject, setSubject] = useState({});
    const [section, setSection] = useState([]);
    const [subjectSchedule, setSubjectSchedule] = useState();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newSectionData, setNewSectionData] = useState({
        subject_id: subject_id,
        section_id: "",
        section: "",
        term: "",
        year: "",
        times: [],
    });
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }));
    };


    useEffect(() => {
        const getSubjectByID = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/subject?subject_id=${subject_id}`
                );
                if (response?.data?.length > 0) {
                    setSubject(response.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getSubjectByID();
    }, [subject_id]);

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

    useEffect(() => {
        const getSubjectScheduleByID = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/subject-schedule?subject_id=${subject_id}`
                );
                if (response?.data?.length > 0) {
                    setSubjectSchedule(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getSubjectScheduleByID();
    }, [subject_id]);

    useEffect(() => {
        const getSectionByid = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getSectionByid?subject_id=${subject_id}`)
                if (response) {
                    setSection(response?.data)
                    console.log(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getSectionByid()
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }));
    };

    const handleInputSectionChange = (index, name, value) => {
        setSubjectSchedule((prevSchedules) => {
            const updatedSchedules = [...prevSchedules];
            updatedSchedules[index] = {
                ...updatedSchedules[index],
                [name]: value,
            };
            return updatedSchedules;
        });
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewSectionData({
            subject_id: subject_id,
            section_id: "",
            section: "",
            term: "",
            year: "",
            time_id: "",
            classroom: "",
            date: "",
            start_time: "",
            end_time: "",
        });
    };

    const handleAddSectionTime = () => {
        handleOpenDialog();
    };

    const handleNewSectionChange = (e) => {
        const { name, value } = e.target;
        setNewSectionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddTime = async () => {
        try {
            // Get the next available time_id
            const nextTimeId = await getMaxTimeId();

            // Create a new time object with the time_id
            const newTime = {
                time_id: nextTimeId,
                classroom: "",
                date: "",
                start_time: "",
                end_time: "",
            };

            // Update newSectionData with the new time
            setNewSectionData((prevData) => ({
                ...prevData,
                times: [...prevData.times, newTime],
            }));
        } catch (err) {
            console.error(err);
        }
    }

    const handleRemoveTime = (index) => {
        setNewSectionData((prevData) => {
            const updatedTimes = [...prevData.times];
            updatedTimes.splice(index, 1);
            return {
                ...prevData,
                times: updatedTimes,
            };
        });
    };

    const handleTimeChange = (index, e) => {
        const { name, value } = e.target;
        setNewSectionData((prevData) => {
            const updatedTimes = [...prevData.times];
            updatedTimes[index] = {
                ...updatedTimes[index],
                [name]: value,
            };
            return {
                ...prevData,
                times: updatedTimes,
            };
        });
    };

    const handleAddSection = async () => {
        try {
            const nextSectionId = await getMaxSectionId();

            const updatedSectionData = {
                ...newSectionData,
                section_id: nextSectionId,
            };

            const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/add-section`, updatedSectionData);
            if (response?.status === 200) {
                alert('เพิ่ม section แล้ว');
                setSubjectSchedule((prevSchedules) => [...prevSchedules, updatedSectionData]);
                handleCloseDialog();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const renderTextField = (label, name) => (
        <div>
            <InputLabel>{label}</InputLabel>
            <TextField
                fullWidth
                required
                name={name}
                value={subject[name] || ""}
                onChange={handleInputChange}
            />
        </div>
    );

    const handleUpdate = async () => {
        try {
            const updatedData = {
                subject_id: subject.subject_id,
                subject_name_th: subject.subject_name_th,
                subject_name_eng: subject.subject_name_eng,
                credit: subject.credit,
                category: subject.category,
                schedules: subjectSchedule,
            };

            const response = await axios.put(
                `${process.env.REACT_APP_API_SERVER}/update-subject-schedules?id=${subject_id}`,
                updatedData
            );

            if (response.status === 200) {
                console.log("Subject and schedules updated successfully.");
                window.location.reload()
            }
        } catch (error) {
            console.error("Error updating subject and schedules:", error);
        }
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 120,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
            },
        },
    }));

    return (
        <div>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4,
                }}
            >
                <Stack justifyContent={"center"} alignItems={"center"} spacing={2} sx={{ p: 2 }}>
                    <Typography variant="h5">
                        แก้ไขรายวิชา {subject_id}
                    </Typography>
                </Stack>

                <Container maxWidth="lg">
                    <Card >
                        <CardHeader title="วิชา" />
                        <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ m: -1.5 }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            name="subject_id"
                                            label="รหัสวิชา"
                                            required
                                            value={subject?.subject_id}
                                            onChange={(e) => handleChange(e)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <TextField
                                            fullWidth
                                            name="subject_name_th"
                                            label="ชื่อวิชา"
                                            variant="outlined"
                                            required
                                            value={subject?.subject_name_th}
                                            onChange={(e) => handleChange(e)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <TextField
                                            fullWidth
                                            name="subject_name_eng"
                                            label="ชื่อวิชา (ภาษาอังกฤษ)"
                                            variant="outlined"
                                            value={subject?.subject_name_eng}
                                            onChange={(e) => handleChange(e)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="credit-label">หน่วยกิต</InputLabel>
                                            <Select
                                                name="credit"
                                                labelId="credit-label"
                                                variant="outlined"
                                                value={subject ? `${subject?.credit}` : " "}
                                                onChange={(e) => handleChange(e)}
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
                                    <Grid item xs={6} md={4}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id="category-label">หมวดหมู่วิชา</InputLabel>
                                            <Select
                                                name="category"
                                                labelId="category-label"
                                                value={subject ? `${subject?.category}` : " "}
                                                onChange={(e) => handleChange(e)}
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
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ mt: '5px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <CardHeader title="Section" />
                            <Grid item>
                                <IconButton
                                    size="small"
                                    variant="outlined"
                                    onClick={handleAddSectionTime}
                                    sx={{
                                        color: "#1565c0",
                                        "&:hover": {
                                            bgcolor: "#bbdefb",
                                        },
                                    }}
                                >
                                    <AddCircleOutlineIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Box>
                        <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ m: -1.5 }}>
                                <Grid container direction="row" spacing={2}>
                                    {section?.map((section, index) => (
                                        <Grid item xs={6} md={2} sm={4} key={index}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                endIcon={<KeyboardArrowDownIcon />}
                                            >
                                                seection {section.section}
                                            </Button>
                                            <StyledMenu
                                                anchorEl={anchorEl}
                                                open={openMenu}
                                                onClose={handleCloseMenu}
                                                MenuListProps={{
                                                    'aria-labelledby': 'demo-customized-button',
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={handleCloseMenu}

                                                >
                                                    <DeleteIcon />
                                                    ลบ
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        handleCloseMenu();
                                                        handleAddSectionTime();
                                                    }}>
                                                    <EditIcon />
                                                    แก้ไข
                                                </MenuItem>
                                            </StyledMenu>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>

                    <Modal open={isDialogOpen} >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 2,
                        }}>
                            <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <IconButton aria-label="delete" size="small"
                                    sx={{
                                        color: '#000000',
                                         bgcolor: '#0487D9',
                                    '&:hover': {
                                            bgcolor: '#d50000',
                                            color: '#FFFFFF',
                                        },
                                    }}
                                    onClick={handleCloseDialog}
                                    variant="contained"
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            </Grid>
                            <DeteilUpdateSubject />
                        </Box>
                    </Modal>
                </Container>



                <Stack justifyContent={"center"} alignItems={"center"} spacing={5} sx={{ p: 2 }}>
                    {subjectSchedule?.map((items, index) => (
                        <Stack key={index} spacing={2}>
                            <Stack spacing={2} direction={isMobile ? "column" : "row"}>
                                <TextField
                                    label="section_id"
                                    name="section_id"
                                    value={items?.section_id}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "section_id", e.target.value)
                                    }
                                />
                                <TextField
                                    label="section"
                                    name="section"
                                    value={items?.section}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "section", e.target.value)
                                    }
                                />
                                <TextField
                                    label="term"
                                    name="term"
                                    value={items?.term}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "term", e.target.value)
                                    }
                                />
                                <TextField
                                    label="year"
                                    name="year"
                                    value={items?.year}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "year", e.target.value)
                                    }
                                />
                            </Stack>
                            <Stack spacing={2} direction={isMobile ? "column" : "row"}>
                                <TextField
                                    label="time_id"
                                    name="time_id"
                                    value={items?.time_id}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "time_id", e.target.value)
                                    }
                                />
                                <TextField
                                    label="classroom"
                                    name="classroom"
                                    value={items?.classroom}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "classroom", e.target.value)
                                    }
                                />
                                <TextField
                                    label="date"
                                    name="date"
                                    value={items?.date}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "date", e.target.value)
                                    }
                                />
                                <TextField
                                    label="start_time"
                                    name="start_time"
                                    value={items?.start_time} onChange={(e) =>
                                        handleInputSectionChange(index, "start_time", e.target.value)
                                    }
                                />
                                <TextField
                                    label="end_time"
                                    name="end_time"
                                    value={items?.end_time}
                                    onChange={(e) =>
                                        handleInputSectionChange(index, "end_time", e.target.value)
                                    }
                                />
                            </Stack>
                        </Stack>
                    ))}

                    <Stack justifyContent="center" alignItems="center">
                        <Button
                            color="secondary"
                            size="small"
                            variant="outlined"
                            onClick={handleAddSectionTime}
                            startIcon={<AddCircleOutline />}
                        >
                            Section
                        </Button>
                    </Stack>

                    <Dialog onClose={handleCloseDialog}>
                        <DialogTitle>เพิ่ม Section</DialogTitle>
                        <DialogContent >
                            <Stack spacing={2}>
                                {/* Form inputs for new section data */}
                                <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                                    <TextField
                                        label="Section ID"
                                        name="section_id"
                                        value={newSectionData.section_id}
                                        onChange={handleNewSectionChange}
                                        fullWidth
                                    />
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            name="section"
                                            label="Section"
                                            variant="outlined"
                                            onChange={handleNewSectionChange}
                                        />
                                    </Grid>
                                    <TextField
                                        label="Section"
                                        name="section"
                                        value={newSectionData.section}
                                        onChange={handleNewSectionChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Term"
                                        name="term"
                                        value={newSectionData.term}
                                        onChange={handleNewSectionChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Year"
                                        name="year"
                                        value={newSectionData.year}
                                        onChange={handleNewSectionChange}
                                        fullWidth
                                    />
                                </Stack>

                                {/* Times */}
                                {newSectionData.times?.map((time, index) => (
                                    <Stack direction={isMobile ? "column" : "row"} spacing={2} key={index}>
                                        <TextField
                                            label="Time ID"
                                            name="time_id"
                                            value={time.time_id}
                                            onChange={(e) => handleTimeChange(index, e)}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Classroom"
                                            name="classroom"
                                            value={time.classroom}
                                            onChange={(e) => handleTimeChange(index, e)}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Date"
                                            name="date"
                                            value={time.date}
                                            onChange={(e) => handleTimeChange(index, e)}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Start Time"
                                            name="start_time"
                                            value={time.start_time}
                                            onChange={(e) => handleTimeChange(index, e)}
                                            fullWidth
                                        />
                                        <TextField
                                            label="End Time"
                                            name="end_time"
                                            value={time.end_time}
                                            onChange={(e) => handleTimeChange(index, e)}
                                            fullWidth
                                        />
                                        <IconButton onClick={() => handleRemoveTime(index)}>
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                ))}
                                <IconButton onClick={handleAddTime}>
                                    <AddCircleOutline /> {/* Add another time */}
                                </IconButton>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                ยกเลิก
                            </Button>
                            <Button onClick={handleAddSection} color="primary">
                                เพิ่ม
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Stack>



                <Stack justifyContent={"center"} alignItems={"center"} spacing={2} sx={{ p: 2 }}>
                    <Button variant="contained" onClick={handleUpdate}>
                        ยืนยันการแก้ไข
                    </Button>
                </Stack>
            </Box>
        </div >
    );
}