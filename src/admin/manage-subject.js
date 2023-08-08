import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import BuildIcon from '@mui/icons-material/Build';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Appbar from '../component/app-bar';
import SearchIcon from '@mui/icons-material/Search';
import BreadcrumbsPage from '../component/BreadcrumbsPage';
import axios from 'axios';

const theme = createTheme();

export default function ManageSubject() {
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
    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>

            <BreadcrumbsPage
                pages={[
                    { title: "Manage Subject" },
                ]} />
            <main>


                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent='flex-end'
                    marginRight={2}
                >
                    <Button
                        variant="outlined"
                        href="/add-subject"
                        startIcon={<NoteAddIcon />}
                        sx={{
                            bgcolor: '#AA00FF',
                            color: '#000000',
                            fontFamily: 'monospace',
                            '&:hover': {
                                bgcolor: '#8800CC',
                            },
                        }}
                        style={{ width: 130 }}
                    >
                        เพิ่มรายวิชา
                    </Button>
                </Stack>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 1,
                        pb: 3,

                    }}
                >
                    <Container maxWidth="sm">
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component="h1"
                                variant="h6"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                สร้างตารางเรียน
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 4 }}>
                                <Grid item xs={12} sm={6}>
                                    <Paper
                                        component="form"
                                        sx={{
                                            p: '2px 4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 'sm',
                                            bgcolor: '#99e4ee'
                                        }}
                                    >
                                        <InputBase
                                            sx={{ ml: 2, flex: 1, }}
                                            placeholder="Search"
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                        <IconButton
                                            type="button"
                                            sx={{ p: '10px' }}
                                            aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                            </Box>
                        </Grid>
                    </Container>
                </Box>
            </main>

            <Container mixWidth="sm">

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
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {subjects && subjects.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': {
                                            bgcolor: '#f8bbd0',
                                        },
                                    }}
                                >
                                    <TableCell align="center" >
                                    <Button variant="outlined" 
                                           sx={{
                                            width: 90,
                                            bgcolor: '#424242',
                                            color:'#ffab00',
                                            '&:hover': {
                                                bgcolor: '#616161',
                                            },
                                        }}
                                        >
                                        {row.Subject_id}
                                        </Button>
                                    </TableCell>

                                    <TableCell align="center">
                                        {row.Subject_name_th}
                                    </TableCell>

                                    <TableCell align="right" >
                                        <Button variant="outlined"
                                            startIcon={<ContentPasteSearchIcon />}
                                            href="/detail-subjectadmin"
                                            sx={{
                                                width: 130,
                                                bgcolor: '#99e4ee',
                                                color: '#212121',
                                                '&:hover': {
                                                    bgcolor: '#64b5f6',
                                                },
                                            }}
                                        >
                                            รายละเอียด
                                        </Button>
                                    </TableCell>

                                    <TableCell align="center" >
                                        <Button variant="outlined"
                                            startIcon={<BuildIcon />}
                                            href="/edit-subject"
                                            sx={{
                                                width: 130,
                                                bgcolor: '#99e4ee',
                                                color: '#212121',
                                                '&:hover': {
                                                    bgcolor: '#64b5f6',
                                                },
                                            }}
                                        >
                                            แก้ไข
                                        </Button>
                                    </TableCell>

                                    <TableCell align="left">
                                        <Button variant="outlined" startIcon={<DeleteIcon />}
                                            sx={{
                                                width: 130,
                                                bgcolor: '#99e4ee',
                                                color: '#212121',
                                                '&:hover': {
                                                    bgcolor: '#64b5f6',
                                                },
                                            }}
                                        >
                                            ลบ
                                        </Button>
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

