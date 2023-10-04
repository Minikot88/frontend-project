import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    Button, InputLabel, Stack, CardHeader, Container,
    TextField, Typography, createTheme, CardContent,
    useMediaQuery, IconButton, Dialog, Card, Box,
    DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import Appbar from '../../components/app-bar';
import BreadcrumbsPage from '../../components/BreadcrumbsPage';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { AddSectionCard } from '../../components/add-section-card';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CheckIcon from '@mui/icons-material/Check';
import { experimentalStyled as styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const theme = createTheme();

export default function EditSubjectPage() {
    const navigate = useNavigate();
    const { subject_id } = useParams()
    const [subject, setSubject] = useState({})
    const [section, setSection] = useState([])

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const openAddSectionPart = () => {
        setOpen(true)
    }

    const closeAddSectionPart = () => {
        setOpen(false)
    }

    const updateSection = (id) => {
        navigate(`/update-section/${id}/${subject_id}`)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxHeight: '80%',
        backgroundColor: 'background.paper',
        border: '2px solid #000',
        boxShadow: '24px',
        padding: '4px',
        overflow: 'auto',
    };


    return (
        <>
            <BreadcrumbsPage
                pages={[
                    { title: "จัดการรายวิชา", path: `/manage-subject` },
                    { title: `แก้ไขวิชา ${subject?.subject_id}` },
                ]} />
            <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                marginRight={2}
            >
                <Button
                    variant="outlined"
                    onClick={() => handleSubmit()}
                    startIcon={<CheckIcon />}
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
                    ยืนยันการแก้ไข
                </Button>
            </Stack>
            <Container minWidth="sm" >
                <Box sx={{ p: 4 }}>
                    <Typography textAlign={'center'} variant="h4">
                        แก้ไขรายวิชา
                    </Typography>
                </Box>
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
                                        onChange={(e) => handleInputChange(e)}
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
                                        onChange={(e) => handleInputChange(e)}
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
                                        onChange={(e) => handleInputChange(e)}
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
                                            onChange={(e) => handleInputChange(e)}
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
                                            onChange={(e) => (e) => handleInputChange(e)(e)}
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
                {/* <Stack justifyContent={"center"} alignItems={"center"} sx={{ mt: 4 }}>
                    <Button onClick={() => handleSubmit()} variant='contained'>
                        ยืนยันการแก้ไข
                    </Button>
                </Stack> */}

                {/* section list */}
                <Card sx={{ mt: '5px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <CardHeader title="Section" />
                        <Grid item>
                            <IconButton
                                onClick={() => openAddSectionPart()}
                                size="small"
                                variant="outlined" sx={{
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
                                {section?.map((item, index) =>
                                    <Grid item xs={6} md={2} sm={4} key={index}>
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            endIcon={<KeyboardArrowDownIcon />}
                                            onClick={handleClick}
                                        //onClick={() => updateSection(item?.section_id)}
                                        >
                                            Section {item?.section}
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
                                                onClick={() => handleDelete(item?.section_id)}
                                            >
                                                <DeleteIcon />
                                                ลบ
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleCloseMenu();
                                                    updateSection(item?.section_id, subject_id);
                                                }}
                                            >
                                                <EditIcon />
                                                แก้ไข
                                            </MenuItem>
                                        </StyledMenu>
                                    </Grid>
                                )}
                                {/* <Button variant='contained' onClick={() => openAddSectionPart()}>
                        เพิ่ม Section
                    </Button> */}
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Grid
                            container
                            justifyContent="space-between"
                        >
                            <Typography variant="subtitle1" component="h2" sx={{ p: 1 }}>
                                Add Section
                            </Typography>
                            <IconButton
                                onClick={() => closeAddSectionPart()}
                                sx={{
                                    color: '#0d47a1',
                                    '&:hover': {
                                        color: '#d50000',
                                    },
                                }}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Grid>

                        <AddSectionCard id={subject_id} />
                    </Box>
                </Modal>

            </Container>
        </ >
    );
}