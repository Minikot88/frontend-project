import * as React from 'react';
import {
    Button, InputLabel, Stack, CardHeader, Container,
    TextField, Typography, CardContent,
    useMediaQuery, IconButton, Dialog, Card, Box,
    DialogTitle, DialogContent, DialogActions, Unstable_Grid2 as Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import BreadcrumbsPage from '../components/BreadcrumbsPage';
import './detail.css'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate, useParams } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { experimentalStyled as styled } from '@mui/material/styles';

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CreateTableNoUserId() {

    const navigate = useNavigate()
    const { schedule_id } = useParams()
    const [schedule_name, setScheduleName] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);
    const [schedule, setSchedule] = useState([]);
    const [selected, setSelected] = useState(null)
    const [viewSchedule, setViewSchedule] = useState([])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelected(id)
        console.log(id)
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const goToSchedule = (schedule_id) => {
        navigate(`/schedule/${schedule_id}`);
    }
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        maxHeight: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
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

    const getMaxSchedule = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/getMaxSchedule`
            );
            if (response) {
                const maxId = response?.data[0].maxId;
                if (maxId) {
                    const currentId = parseInt(maxId.slice(1));
                    const nextId = currentId + 1;
                    return `C${nextId.toString().padStart(5, '0')}`;
                } else {
                    return 'C00001';
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        try {
            const token = localStorage.getItem("token");
            const generated_id = await getMaxSchedule();
            const response = await axios.post(
                `${process.env.REACT_APP_API_SERVER}/addNameSchedule`, {
                schedule_id: generated_id,
                schedule_name: schedule_name
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response) {
                alert('สำเร็จ');
                setOpen(false)
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getScheduleById = async () => {
            try {
                const token = await localStorage.getItem("token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getScheduleById`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response) {
                    setSchedule(response?.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getScheduleById();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_SERVER}/deleteSchedule?schedule_id=${id}`);
            if (response?.status === 200) {
                alert(`Data deleted successfully`);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getViewSchedule = async () => {
            try {
                const token = await localStorage.getItem("token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getViewSchedule?schedule_id=${schedule_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response?.status === 200) {
                    setViewSchedule(response?.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getViewSchedule();
    }, [schedule_id]);

    return (
        <>
            <BreadcrumbsPage
                pages={[
                    { title: "สร้างตารางเรียน" }

                ]} />
            <main>
                
                <Box
                    sx={{
                        bgcolor: '#42a5f5',
                        '&:hover': {
                            bgcolor: '#0487D9',
                        },
                        pt: 1,
                        pb: 3,
                    }}
                >
                    <Container maxWidth="sm">
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component="h1"
                                variant="h5"
                                align="center"
                                color="text.primary"
                                gutterBottom

                                sx={{
                                    marginTop: '20px',
                                }}
                            >
                                ตารางเรียนทั้งหมด
                            </Typography>
                        </Grid>
                    </Container>
                </Box>
            </main>
            <Stack direction="row" spacing={2} justifyContent="center" mt={2} >
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    sx={{
                        boxShadow: 3,
                        '&:hover': {
                            bgcolor: '#e3f2fd',
                        },
                    }}
                    startIcon={<ControlPointIcon />}
                >
                    สร้างตารางเรียน
                </Button>
            </Stack>

            {/* Modal */}
            <Modal
                open={open}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">ระบุชื่อตารางเรียน</h2>
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ p: 1 }}
                    >
                        <Grid item xs={12} sm={8} md={6} lg={12}>
                            <TextField
                                fullWidth
                                label="ชื่อตารางเรียน"
                                variant="outlined"
                                name="schedule_name"
                                onChange={(e) => setScheduleName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={1}
                    >
                        <Grid item >
                            <Button variant="outlined" onClick={() => handleSubmit()}>ตกลง</Button>
                        </Grid>
                        <Grid item >
                            <Button variant="outlined" onClick={handleClose}>ยกเลิก</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Container>
                <Card>
                    <CardHeader title="ตารางเรียน" />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ alignItems: 'center', justifyContent: "center" }}>
                            <Grid container direction="row" spacing={2} >
                                {schedule?.map((item, index) => (
                                    <Grid item xs={12} md={2} sm={6} key={index}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => goToSchedule(item.schedule_id)}
                                        >
                                            {item?.schedule_name}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

