import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Appbar from '../component/app-bar';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
                        pt: 15,
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
                            อยากเป็นราชาโจรสลัด
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            จะหมัด จะมวย จะ .วยไรก็มาเถอะ
                        </Typography>

                        <Stack
                            sx={{ pt: 5 }}
                            direction="column"
                            spacing={3}
                            justifyContent="center"

                        >

                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: '#AA00FF',
                                    color: '#000000',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#8800CC',
                                    },
                                }} >
                                สร้างตารางเรียน
                            </Button>

                            <Button
                                variant="contained"
                                size="large"
                                href="/search-all"
                                sx={{
                                    bgcolor: '#AA00FF',
                                    color: '#000000',
                                    fontFamily: 'monospace',
                                    '&:hover': {
                                        bgcolor: '#8800CC',
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