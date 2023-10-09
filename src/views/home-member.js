import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Appbar from '../components/app-bar';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function HomeMember() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 5,
                    pb: 6,

                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Member
                    </Typography>

                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        ยินดีตต้อนรับ
                    </Typography>

                    <Stack
                        sx={{ pt: 1, alignItems: "center" }}
                        direction="column"
                        spacing={1.5}
                        justifyContent="center"

                    >
                        <Button
                            href="/search-all"
                            variant="contained"
                            size="large"
                            sx={{
                                width: '250px',
                                bgcolor: '#0468BF',
                                color: '#FFFFFF',
                                fontFamily: 'monospace',
                                '&:hover': {
                                    bgcolor: '#0487D9',
                                },
                            }}>
                            ค้นหารายวิชา
                        </Button>
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
                            }}>
                            ตารางเรียน
                        </Button>
                    </Stack>
                </Container>
            </Box>

        </ThemeProvider>
    );
}