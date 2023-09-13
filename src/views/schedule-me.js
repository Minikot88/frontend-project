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
import TableRow from '@mui/material/TableRow';

import Appbar from '../components/app-bar';
import BreadcrumbsPage from '../components/BreadcrumbsPage';
import Photo from '../image/table.png'

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
    return (
        <ThemeProvider theme={theme}>
            <BreadcrumbsPage
                pages={[
                    { title: "ตารางเรียนของฉัน" },
                ]} />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        pt: 2,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm" 
                    sx={{width: '400px',}}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <img
                                src={Photo}
                                width="35"
                                height="35"
                                sx={{ display: { xs: 'none', md: 'flex' } }}
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    marginLeft: 2,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: '#212121',

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
                                    sx={{
                                        minWidth: 'sm',
                                    }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                sx={{
                                                    width: '500px',
                                                    bgcolor: '#049DD9',
                                                    '&:hover': {
                                                        bgcolor: '#BBE2F2',
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