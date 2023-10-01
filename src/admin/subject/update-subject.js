import {
    Button, InputLabel, Stack, CardHeader, Container,
    TextField, Typography, createTheme, CardContent,
    useMediaQuery, IconButton, Dialog, Card, Box,
    DialogTitle, DialogContent, DialogActions, Unstable_Grid2 as Grid,
} from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material"; // Import the icon
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { experimentalStyled as styled } from '@mui/material/styles';
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Modal from '@mui/material/Modal';
import InputAdornment from "@mui/material/InputAdornment";
import BreadcrumbsPage from "../../components/BreadcrumbsPage";

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

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


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
        window.location.reload()
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
                times: [...prevData?.times, newTime],
            }));
        } catch (err) {
            console.error(err);
        }
    }

    const handleRemoveTime = (index) => {
        setNewSectionData((prevData) => {
            const updatedTimes = [...prevData?.times];
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
            const updatedTimes = [...prevData?.times];
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
            // Get the next available section_id
            const nextSectionId = await getMaxSectionId();

            // Update newSectionData with the section_id
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

    const style = {
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

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_SERVER}/deleteSection?section_id=${id}`);
            if (response?.status === 200) {
                alert(`Data deleted successfully`);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <BreadcrumbsPage
                pages={[
                    { title: "จัดการรายวิชา", path: `/manage-subject` },
                    { title: `แก้ไขรายวิชา ${subject?.subject_id}` },
                ]}
            />
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
                        </Box>
                    </CardContent>
                </Card>

                {/* section */}
                <Card sx={{ mt: '5px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <CardHeader title="Section" />
                        <Grid item>
                            <IconButton
                                size="small"
                                variant="outlined" sx={{
                                    color: "#1565c0",
                                    "&:hover": {
                                        bgcolor: "#bbdefb",
                                    },
                                }}
                                onClick={handleAddSectionTime}>
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
                                            section {section.section}
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
                                                onClick={() => handleDelete(section?.section_id)}
                                            >
                                                <DeleteIcon />
                                                ลบ
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => { handleCloseMenu(); }}>
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
            </Container>

            <Stack justifyContent={"center"} alignItems={"center"} spacing={5} sx={{ p: 2 }}>
                {subjectSchedule?.map((items, index) => (
                    <Stack key={index} spacing={2}>
                        <Stack spacing={2} direction={isMobile ? "column" : "row"}>
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
            </Stack>

            <Modal
                open={isDialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DialogTitle>เพิ่ม Section</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} sx={{ marginTop: 1 }}>
                            {/* Form inputs for new section data */}
                            <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                                {/* <TextField
                                    label="Section ID"
                                    name="section_id"
                                    value={newSectionData.section_id}
                                    onChange={handleNewSectionChange}
                                    fullWidth
                                /> */}
                                <TextField
                                    label="Section"
                                    name="section"
                                    value={newSectionData.section}
                                    onChange={handleNewSectionChange}
                                    fullWidth
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="term-label">ภาคการศึกษา</InputLabel>
                                    <Select
                                        name="term"
                                        label="ภาคการศึกษา"
                                        variant="outlined"
                                        value={newSectionData.term}
                                        onChange={handleNewSectionChange}
                                    >
                                        {[1, 2, 3].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="year-label">ปีการศึกษา</InputLabel>
                                    <Select
                                        name="year"
                                        label="ปี"
                                        variant="outlined"
                                        value={newSectionData.year}
                                        onChange={handleNewSectionChange}
                                    >
                                        {[2563, 2564, 2565, 2566, 2567, 2568].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            {/* Times */}

                            {newSectionData?.times && newSectionData?.times?.map((time, index) => (
                                <Grid container direction="row" spacing={1} key={index}>
                                    <Grid item xs={12} md={2.8}>
                                        <TextField
                                            fullWidth
                                            name="classroom"
                                            label="ห้องเรียน"
                                            variant="outlined"
                                            onChange={(e) => handleTimeChange(index, e)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={2.8}>
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
                                                variant="outlined"
                                                value={time?.date}
                                                onChange={(e) => handleTimeChange(index, e)}
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
                                    <Grid item xs={6} md={2.8}>
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
                                            value={time?.start_time}
                                            onChange={(e) => handleTimeChange(index, e)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={2.8}>
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
                                            value={time?.end_time}
                                            onChange={(e) => handleTimeChange(index, e)}
                                        />
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        item
                                        xs={6}
                                        md={0.8}
                                    >
                                        <IconButton
                                            sx={{
                                                color: "#F20000",
                                                "&:hover": {
                                                    color: "#0000FF",
                                                },
                                            }}
                                            onClick={() => handleRemoveTime(index)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                            <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item>
                                    <IconButton
                                        aria-label="add"
                                        sx={{
                                            color: "#1565c0",
                                            "&:hover": {
                                                color: "#087A02",
                                            },
                                        }}
                                        onClick={handleAddTime}
                                    >
                                        <AddAlarmIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
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
                </Box>
            </Modal>
            <Stack justifyContent={"center"} alignItems={"center"} spacing={2} sx={{ p: 2 }}>
                <Button variant="contained" onClick={handleUpdate}>
                    ยืนยันการแก้ไข
                </Button>
            </Stack>
        </div >
    );
}