import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Appbar from '../component/app-bar';

const theme = createTheme();

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 10,


                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                            sx={{ color: '#ad1457' }}
                        >
                            WELCOME
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ marginBottom: '30px' }}
                        >
                            ระบบจัดตารางเรียน
                        </Typography>

                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                href="/create-table"
                                sx={{
                                    width: '300px',
                                    bgcolor: '#212121',
                                    color: '#ff9800',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#455a64',
                                    },
                                }} >
                                สร้างตารางเรียน
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                href="/search-all"
                                sx={{
                                    width: '300px',
                                    bgcolor: '#212121',
                                    color: '#ff9800',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#455a64',
                                    },
                                }} >
                                ค้นหารายวิชา
                            </Button>
                        </Stack>

                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}