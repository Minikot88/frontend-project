import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { useState, useEffect } from 'react';
import BreadcrumbsPage from '../components/BreadcrumbsPage';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';

const theme = createTheme();

export default function SearchAll() {

    const navigate = useNavigate()
    const [subjects, setSubject] = useState()

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSubjectById = () => {
        setAnchorEl(null);
        navigate(`/select-subject`);
    };

    const [subject_id, setSubject_id] = useState()

    useEffect(() => {
        const GetSubjectbyID = async () => {
            try {
                const token = await localStorage.getItem('token')
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getSubject-Byid`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response) {
                    setSubject_id(response?.data[0])
                    console.log(response?.data[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        GetSubjectbyID()
    }, [])

    const [searchQuery, setSearchQuery] = useState('');

    const filteredCards = subjects?.filter((item) =>
        item?.subject_name_th.includes(searchQuery) ||
        item?.subject_name_eng?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        item?.subject_id.includes(searchQuery)
    );

    return (
        <ThemeProvider theme={theme}>
            <BreadcrumbsPage
                pages={[
                    { title: "ค้นหา" },
                ]} />

            <main>
                <Box sx={{ bgcolor: 'background.paper', pt: 2, pb: 6, }} >
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
                            sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
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
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        sx={{ ml: 1, flex: 1, }}
                                        placeholder="ค้นหา"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Paper>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </main>
            <Container minWidth="sm">

                <TableContainer
                    component={Paper}
                >
                    <Table align="center"
                        sx={{ maxWidth: "400" }}
                        size="small"
                        aria-label="a dense table" >

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">รหัสวิชา</TableCell>
                                <TableCell align="center">ชื่อวิชา</TableCell>
                                <TableCell align="center">Subject name</TableCell>
                                <TableCell align="center">จำนวนตอน</TableCell>
                                <TableCell align="center">หน่วยกิต</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredCards && filteredCards.length > 0 ? (
                                filteredCards.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': {
                                                bgcolor: '#BBE2F2',
                                            },
                                        }}
                                    >
                                        <TableCell align="center" >
                                            <Button
                                               onClick={() =>
                                                navigate(`/details-subject/${row?.subject_id}`)
                                              }
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    width: 75,
                                                    bgcolor: '#0468BF',
                                                    color: '#FFFFFF',
                                                    '&:hover': {
                                                        bgcolor: '#0487D9',
                                                    },
                                                }}
                                            >
                                                {row.subject_id}
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.subject_name_th}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {row.subject_name_eng}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {row.num_section}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.credit}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No data available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </ThemeProvider>
    );
}

