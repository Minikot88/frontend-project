import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Stack, TextField,
    Button, Typography, useMediaQuery,
    ThemeProvider, createTheme
} from '@mui/material';
import Appbar from '../../components/app-bar';
import BreadcrumbsPage from '../../components/BreadcrumbsPage';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {' Minikot '}
            <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();

export default function EditSubjectPage() {
    const { subject_id } = useParams()
    const [subject, setSubject] = useState()

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
    }, [])


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
                <Grid container spacing={1} columns={{ xs: 2, sm: 8, md: 12 }}>
                    <Grid item xs={2}>
                        <TextField
                            autoFocus
                            label="รหัสวิชา"
                            variant="outlined"
                            value={subject?.subject_id}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            autoFocus
                            label="ชื่อวิชา"
                            variant="outlined"
                            value={subject?.subject_name_th}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            autoFocus
                            label="Subject Name"
                            variant="outlined"
                            value={subject?.subject_name_eng}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            autoFocus
                            label="หน่วยกิต"
                            variant="outlined"
                            value={subject?.credit}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{ minWidth: 222 }} >
                            <InputLabel>ภาคการศึกษา</InputLabel>
                            <Select
                                autoFocus
                                label="ภาคการศึกษา"
                                variant="outlined"
                                value={subject?.credit}
                            >   
                                <MenuItem value="C">วิชาบังคับ</MenuItem>
                                <MenuItem value="E">วิชาเลือก</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
}