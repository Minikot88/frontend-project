import * as React from 'react';
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
import DetailsCard from '../component/details-card';
import './detail.css'

import AddCircleIcon from '@mui/icons-material/AddCircle';

function createData(name, sec, fat, carbs, protein) {
    return { name, sec, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt',  1, 24, 4.0),
    createData('Ice cream sandwich',  2, 37, 4.3),
    createData('Eclair',  3, 24, 6.0),
    createData('Cupcake',  4, 67, 4.3),
    createData('Gingerbread',  5, 49, 3.9),
];

const theme = createTheme();

export default function SelectSubject() {
    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>

            <BreadcrumbsPage
                pages={[
                    { title: "สร้างตารางเรียน", path: `/create-table` },
                    { title: "ค้นหารายวิชา", path: `/search-select` },
                    { title: "รายละเอียดวิชา" },
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
                        <Grid item xs={12} sm={6}>
                            <Typography
                                component="h1"
                                variant="h6"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                รายละเอียดวิชา
                            </Typography>

                            <div className="detail-sudject">
                                <DetailsCard
                                    title={'รหัสวิชา'}
                                    description={'234-423'}
                                    rootClassName="rootClassName1"></DetailsCard>

                                <DetailsCard
                                    title={'ชื่อวิชาภาษาไทย'}
                                    description={'คณิตศาสตร์'}
                                    rootClassName="rootClassName1"></DetailsCard>

                                <DetailsCard
                                    title={'หน่วยกิต'}
                                    description={'3'}
                                    rootClassName="rootClassName1"></DetailsCard>

                                <DetailsCard
                                    title={'ชื่อวิชาภาษาอังกฤษ'}
                                    description={'Math'}
                                    rootClassName="rootClassName1"></DetailsCard>

                            </div>
                        </Grid>
                    </Container>
                </Box>
            </main>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="center" >
                                เลือก
                            </TableCell>

                            <TableCell align="center">
                                ตอน
                            </TableCell>

                            <TableCell align="center">
                                จำนวนการรับ
                            </TableCell>

                            <TableCell align="center">
                                วันเวลา
                            </TableCell>

                            <TableCell align="center">
                                ห้องเรียน
                            </TableCell>

                            <TableCell align="center">
                                ผู้สอน
                            </TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" >
                                    <Button  href="/create-table" >
                                        <AddCircleIcon />
                                    </Button>
                                </TableCell>

                                <TableCell align="center" component="th" scope="row">
                                    {row.sec}
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

                                <TableCell align="center">
                                    {row.fat}
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}

