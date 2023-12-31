import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Appbar from '../components/app-bar';

const theme = createTheme();

export default function Home() {

    return (
        <ThemeProvider theme={theme}>
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
                            sx={{ color: '#0468BF' }}
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
                                    width: '250px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                ตารางเรียน
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                href="/search-all"
                                sx={{
                                    width: '250px',
                                    bgcolor: '#0468BF',
                                    color: '#FFFFFF',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#0487D9',
                                    },
                                }}
                            >
                                ค้นหารายวิชา
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}
