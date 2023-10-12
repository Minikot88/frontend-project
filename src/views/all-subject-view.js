import { Box, Button, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import axios from "axios";
import Container from '@mui/material/Container';
import BreadcrumbsPage from "../components/BreadcrumbsPage";
import { useNavigate } from "react-router-dom";

export default function AllSubjectsView() {

    const [subject, setSubject] = useState()
    const [user, setUser] = useState()
    const [section, setSection] = useState()
    const [schedule, setSchedule] = useState()
    const [date, setDate] = useState()

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getTotalSubject`)
                if (response) {
                    setSubject(response?.data)
                    
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSubjects();
    }, [])

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getTotalUser`)
                if (response) {
                    setUser(response?.data)
                    
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllUser();
    }, [])

    useEffect(() => {
        const getAllSection = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getTotalSection`)
                if (response) {
                    setSection(response?.data)
                    
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSection();
    }, [])

    useEffect(() => {
        const getAllSchedule = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getTotalSchedule`)
                if (response) {
                    setSchedule(response?.data)
                    
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSchedule();
    }, [])

    useEffect(() => {
        const getAllDate = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getTotalDate`)
                if (response) {
                    setDate(response?.data)
                    
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllDate();
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [users, setUsers] = useState({})
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      const getAccountByID = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/getAccountByID`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response) {
            setUsers(response?.data[0]);
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      getAccountByID()
    }, [])
  
    useEffect(() => {
      if (users?.status === 0 || !token) {
        navigate(-1)
      }
    }, [users, token])

    return (
        <div>
             <BreadcrumbsPage
                pages={[
                    { title: "สถิติรายวิชาทั้งหมด" },
                ]} />
            <Container>
                <Box sx={{ p: 5 }}>
                    <Typography textAlign={"center"} variant="h4" sx={{ p: 3 }}>
                        สถิติรายวิชาทั้งหมด
                    </Typography>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวิชา
                                    </Typography>
                                    {subject && Array.isArray(subject) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {subject[0].total_subjects}
                                        </Typography>
                                    )}

                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนหน่วยกิต
                                    </Typography>
                                    {subject && Array.isArray(subject) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {subject[0].total_credits}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวิชาเลือก
                                    </Typography>
                                    {subject && Array.isArray(subject) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {subject[0].count_e}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวิชาบังคับ
                                    </Typography>
                                    {subject && Array.isArray(subject) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {subject[0].count_c}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>

                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนผู้ใช้
                                    </Typography>
                                    {user && Array.isArray(user) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {user[0].total_users}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนตอน
                                    </Typography>
                                    {section && Array.isArray(section) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {section[0].total_sections}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>


                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนตารางเรียน
                                    </Typography>
                                    {schedule && Array.isArray(schedule) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {schedule[0].total_schedules}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวัน
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].total_date}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>

                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวันจันทร์
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].count_a}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวันอังคาร
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].count_b}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวันพุธ
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].count_c}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวันพฤหัสดี
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].count_d}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวันศุกร์
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].count_e}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวันเสาร์
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].count_f}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} md={4} sm={6}>
                            <Item>
                                <Box>
                                    <Typography gutterBottom variant="h5" component="div">
                                        จำนวนวันอาทิตย์
                                    </Typography>
                                    {date && Array.isArray(date) && (
                                        <Typography variant="h2" color="text.secondary">
                                            {date[0].count_g}
                                        </Typography>
                                    )}
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </div>
    )
}