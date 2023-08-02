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

const theme = createTheme();

function createData(name, code,) {

    return { name, code, };
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
                        <Typography
                            variant="h5"
                            align="center"
                        >
                            ตารางเรียนของฉัน

                        </Typography>

                        <Stack
                            marginTop={2}
                        >
                            <TableContainer
                                component={Paper}
                            >
                                <Table

                                    sx={{ minWidth: 'sm', }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                hover role="checkbox"
                                                key={row.name}
                                            >
                                                <TableCell align="center" >
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