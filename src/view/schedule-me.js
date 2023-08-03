import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Appbar from '../component/app-bar';
import BreadcrumbsPage from '../component/BreadcrumbsPage';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Photo from '../photo/table.png'

const theme = createTheme();

function createData(name) {

    return { name };
}

const rows = [
    createData('ตาราง 1'),
    createData('ตาราง 2'),
    createData('ตาราง 3'),
    createData('ตาราง 4'),

];

export default function SheduleMe() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>
            <BreadcrumbsPage
                pages={[
                    { title: "ตารางเรียนของฉัน" },
                ]} />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 15,
                        pb: 6,

                    }}
                >

                    <Container maxWidth="sm" >

                        <div 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'

                            }}>
                            <img
                                src={Photo}
                                width="35"
                                height="35"
                                sx={{ display: { xs: 'none', md: 'flex' } }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    marginLeft:2,
                                    fontWeight: 700,
                                }}
                            >
                                ตารางเรียนของฉัน
                            </Typography>
                        </div>


                        <Stack
                            marginTop={2}
                        >
                            <TableContainer
                                component={Box}
                                
                            >
                                <Table

                                    sx={{ minWidth: 'sm', }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                            sx={{ bgcolor: '#f8bbd0',
                                            '&:hover': {
                                                bgcolor: '#dd33fa',
                                            }, 
                                        }} 
                                                
                                                key={row.name}
                                            >
                                                <TableCell align="center"  >
                                                    {row.name}
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>

                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}