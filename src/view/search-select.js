import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Appbar from '../component/app-bar';
import SearchIcon from '@mui/icons-material/Search';
import TablePage from '../component/table-all';
import BreadcrumbsPage from '../component/BreadcrumbsPage';
import axios from 'axios';

const theme = createTheme();

export default function SearchSelect() {
    const [subject, setSubject] = useState()

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getallsubject`)
                if (response) {
                    setSubject(response?.data)
                    console.log(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSubjects()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>

            <BreadcrumbsPage
                pages={[
                    { title: "สร้างตารางเรียน", path: `/create-table` },
                    { title: "ค้นหารายวิชา", },
                ]} />

            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 2,
                        pb: 6,

                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            ค้นหารายวิชา
                        </Typography>
                        <Box component="form" noValidate
                            sx={{
                                mt: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Grid item xs={12} sm={6}>
                                <Paper
                                    component="form"
                                    sx={{
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '300px',
                                        height: '33px',
                                        bgcolor: '#FFFFFF',
                                        border: '0.8px solid #252525',
                                        '&:hover': {
                                            bgcolor: '#eeeeee',
                                        },
                                    }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, }}
                                        placeholder="รหัสวิชา"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Paper>
                            </Grid>
                        </Box>
                        <Box component="form" noValidate
                            sx={{
                                mt: 0.5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Grid item xs={12} sm={6}>
                                <Paper
                                    component="form"
                                    sx={{
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '300px',
                                        height: '33px',
                                        bgcolor: '#FFFFFF',
                                        border: '0.8px solid #252525',
                                        '&:hover': {
                                            bgcolor: '#eeeeee',
                                        },
                                    }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, }}
                                        placeholder="ชื่อวิชา"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Paper>
                            </Grid>
                        </Box>
                        <Box component="form" noValidate
                            sx={{
                                mt: 1.5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        bgcolor: '#FFFFFF',
                                        color: '#212121',
                                        border: '0.8px solid #049DD9',
                                        '&:hover': {
                                            bgcolor: '#BBE2F2',
                                        },
                                    }}
                                >
                                    ค้นหา
                                </Button>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </main>
            <Container mixWidth="sm">
                <TableContainer component={Paper}>
                    <Table 
                    sx={{ minWidth: 650 }} 
                    size="small"
                    aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" >รหัสวิชา</TableCell>
                                <TableCell align="center">ชื่อวิชา</TableCell>
                                <TableCell align="center">Subject name</TableCell>
                                <TableCell align="center">จำนวนตอน</TableCell>
                                <TableCell align="center">หน่วยกิต</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subject?.map((row) => (
                                <TableRow
                                    key={row?.Subject_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        bgcolor: '#BBE2F2',
                                    },
                                 }}
                                >
                                    <TableCell align="center" >
                                        <Button
                                            variant="contained"
                                            size="small"
                                            href="/select-subject"
                                            sx={{
                                                width: 75,
                                                bgcolor: '#0468BF',
                                                color: '#FFFFFF',
                                                '&:hover': {
                                                    bgcolor: '#0487D9',
                                                },
                                            }}
                                        >
                                            {row?.subject_id}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row?.subject_name_th}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row?.subject_name_eng}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row?.num_section}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row?.credit}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
}

