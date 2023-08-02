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
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BuildIcon from '@mui/icons-material/Build';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Tooltip from '@mui/material/Tooltip';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 66666666612121221212.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
];

const theme = createTheme();

export default function ManageSubject() {
    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>

            <BreadcrumbsPage
                pages={[
                    { title: "Search" },
                ]} />
            <main>


                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent='flex-end'
                    marginRight={2}
                >
                    <Button variant="outlined" startIcon={<NoteAddIcon />}
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

                                <TableCell align="center">
                                    รหัสวิชา
                                </TableCell>

                                <TableCell align="center">
                                    ชื่อวิชา
                                </TableCell>

                                <TableCell align="center">

                                </TableCell>

                                <TableCell align="center">

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
                                        <Button variant="outlined"
                                            sx={{
                                                bgcolor: '#99e4ee'
                                            }}
                                            style={{ width: 100 }}

                                        >
                                            123 - 321</Button>
                                    </TableCell>

                                    <TableCell align="center">
                                        {row.fat}
                                    </TableCell>

                                    <TableCell align="right" >
                                        <Button variant="outlined" startIcon={<ContentPasteSearchIcon />}
                                            sx={{
                                                bgcolor: '#99e4ee'
                                            }}
                                            style={{ width: 130 }}
                                        >
                                            รายละเอียด
                                        </Button>
                                    </TableCell>

                                    <TableCell align="center" >
                                        <Button variant="outlined" startIcon={<BuildIcon />}
                                            sx={{
                                                bgcolor: '#99e4ee'
                                            }}
                                            style={{ width: 130 }}
                                        >
                                            แก้ไข
                                        </Button>
                                    </TableCell>

                                    <TableCell align="left">
                                        <Button variant="outlined" startIcon={<DeleteIcon />}
                                            sx={{

                                                bgcolor: '#99e4ee'
                                            }}
                                            style={{ width: 130 }}
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

