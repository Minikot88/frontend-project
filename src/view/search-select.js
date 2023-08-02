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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const theme = createTheme();

export default function SearchSelect() {
    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>

            <BreadcrumbsPage
                pages={[
                    { title: "Search" },
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
                                        bgcolor: '#e040fb'
                                    }}
                                >
                                    <InputBase
                                        sx={{ ml: 2, flex: 1, }}
                                        placeholder="ค้นหารายวิชา"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />

                                    <IconButton
                                        type="button"
                                        sx={{
                                            p: '10px',
                                            color: '#252525'
                                        }}
                                        aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </main>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="center" >
                                รหัสวิชา
                            </TableCell>

                            <TableCell align="center">
                                ชื่อวิชา
                            </TableCell>

                            <TableCell align="center">
                                จำนวนตอน
                            </TableCell>

                            <TableCell align="center">
                                หน่วยกิต
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
                                    <Button variant="outlined" size="small" >
                                        332-233
                                    </Button>
                                </TableCell>

                                <TableCell align="center" component="th" scope="row">
                                    {row.name}
                                </TableCell>

                                <TableCell align="center">
                                    {row.calories}
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

