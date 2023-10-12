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

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CreateTable() {

    const navigate = useNavigate()
    const { schedule_id } = useParams()
    const [schedule_name, setScheduleName] = useState('');
    const [open, setOpen] = React.useState(false);
    const [schedule, setSchedule] = useState([]);
    const [scheduleNoMember, setScheduleNoMember] = useState()
    const [viewSchedule, setViewSchedule] = useState([])
    const table_id = localStorage.getItem("table_id")

    const [login, setLogin] = React.useState(false)
    const [user, setUser] = React.useState({})
    const token = localStorage.getItem('token')

    React.useEffect(() => {
        if (token !== null) {
            setLogin(true)
        } else {
            setLogin(false)
        }
        window.addEventListener('storage', () => {
            alert('คุณออกจากระบบแล้ว')
            if (token !== null) {
                setLogin(true)

            }
        })
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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

    const getScheduleById = async () => {
        try {
            const token = localStorage.getItem("token");
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

    const getAccountByID = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/getAccountByID`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response) {
                setUser(response?.data[0]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getViewSchedule = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/getViewSchedule?schedule_id=${id}`)
            if (response) {
                setViewSchedule(response?.data)
                console.log(response?.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (token) {
            getAccountByID();
            getScheduleById();
            getViewSchedule()
        }
    }, [token])

    useEffect(() => {
        const getScheduleForNotMember = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getNoMemberSchedule?schedule_id=${table_id}`);
                if (response) {
                    setScheduleNoMember(response?.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getScheduleForNotMember();
    }, []);

    const handleSubmitNoUser = async (e) => {
        try {
            const token = localStorage.getItem("token");
            const generated_id = await getMaxSchedule();
            localStorage.setItem("table_id", generated_id)
            const response = await axios.post(
                `${process.env.REACT_APP_API_SERVER}/addScheduleNoUser`, {
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

    return (
        <>
            <BreadcrumbsPage pages={[{ title: "สร้างตารางเรียน" }]} />
            <main>
                <Box sx={{ bgcolor: '#42a5f5', '&:hover': { bgcolor: '#0487D9', }, pt: 1, pb: 3, }}  >
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


            {!login && !table_id ? (
                <Stack direction="row" spacing={2} justifyContent="center" mt={2} >
                    <Button
                        onClick={handleOpen}
                        variant="contained"
                        sx={{
                            boxShadow: 3,
                            '&:hover': {
                                bgcolor: '#91ff35',
                                color: '#212121'
                            },
                        }}
                        startIcon={<ControlPointIcon />}
                    >
                        สร้างตารางเรียน
                    </Button>
                </Stack>
            ) : login && (
                <Stack direction="row" spacing={2} justifyContent="center" mt={2} >
                    <Button
                        onClick={handleOpen}
                        variant="contained"
                        sx={{
                            boxShadow: 3,
                            '&:hover': {
                                bgcolor: '#212121',
                                color: '#FFFFFF'
                            },
                        }}
                        startIcon={<ControlPointIcon />}
                    >
                        สร้างตารางเรียน
                    </Button>
                </Stack>
            )}


            {/* Modal */}
            {!login ? (
                <Modal open={open} aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
                    <Box sx={{ ...style }}>
                        <h2 id="child-modal-title">ระบุชื่อตารางเรียน</h2>
                        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ p: 1 }}   >
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
                        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1}  >
                            <Grid item >
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSubmitNoUser()}>
                                    ตกลง
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}>
                                    ยกเลิก
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>

            ) : login && user?.status === 1 ? (
                <Modal open={open} aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
                    <Box sx={{ ...style }}>
                        <h2 id="child-modal-title">ระบุชื่อตารางเรียน</h2>
                        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ p: 1 }}   >
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
                        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1}  >
                            <Grid item >
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSubmit()}>
                                    ตกลง
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}>
                                    ยกเลิก
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>

            ) : (
                <Modal open={open} aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
                    <Box sx={{ ...style }}>
                        <h2 id="child-modal-title">ระบุชื่อตารางเรียน</h2>
                        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ p: 1 }}   >
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
                        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1}  >
                            <Grid item >
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSubmit()}>
                                    ตกลง
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}>
                                    ยกเลิก
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            )}

            <Container sx={{ mt: 5, p: 2 }}>
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

                                {!login && (
                                    <Grid item xs={12} md={2} sm={6}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => goToSchedule(table_id)}
                                        >
                                            {scheduleNoMember?.schedule_name}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

        </>
    );
}

