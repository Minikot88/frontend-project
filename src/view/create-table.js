import * as React from 'react';
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
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

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
import DetailsCard from '../component/details-card';
import './detail.css'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
];

const theme = createTheme();

export default function CreateTable() {
    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>

            <BreadcrumbsPage
                pages={[
                    { title: "สร้างตารางเรียน" }

                ]} />

            <main>
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
                        </Grid>
                    </Container>
                </Box>
            </main>

            <Container maxWidth="650">

                <TableContainer
                    component={Paper}
                >
                    <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table" >

                        <TableHead>
                            <TableRow>

                                <TableCell align="center">
                                    รหัสวิชา
                                </TableCell>

                                <TableCell align="center">
                                    ชื่อวิชา
                                </TableCell>

                                <TableCell align="center">
                                    ตอน
                                </TableCell>

                                <TableCell align="center">
                                    หน่วยกิต
                                </TableCell>

                                <TableCell align="center" >

                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="center" component="th" scope="row">
                                        {row.fat}
                                    </TableCell>

                                    <TableCell align="center">
                                        {row.fat}
                                    </TableCell>

                                    <TableCell align="center">
                                        {row.fat}
                                    </TableCell>

                                    <TableCell align="center">
                                        {row.fat}
                                    </TableCell>

                                    <TableCell align="center" >
                                        <IconButton aria-label="delete" color="error" >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Stack direction="row" spacing={2} justifyContent="center" mt={2} >

                <Button
                    variant="outlined"
                    sx={{
                        boxShadow: 3,
                        '&:hover': {
                            bgcolor: '#e3f2fd',
                        },
                    }}
                    startIcon={<ControlPointIcon />}
                    href="/search-select"
                >
                    Add
                </Button>

                <Button
                    variant="outlined"
                    sx={{
                        boxShadow: 3,
                        '&:hover': {
                            bgcolor: '#e3f2fd',
                        },
                    }}
                    startIcon={<EditCalendarIcon />}>
                    create
                </Button>


            </Stack>

        </ThemeProvider>
    );
}

