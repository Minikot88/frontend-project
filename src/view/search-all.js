import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import Appbar from '../component/app-bar';
import SearchIcon from '@mui/icons-material/Search';
import TablePage from '../component/table-all';
import BreadcrumbsPage from '../component/BreadcrumbsPage';



const theme = createTheme();

export default function SearchAll() {
    return (
        <ThemeProvider theme={theme}>
            <Appbar/>

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
                            ภาคการศีกษาที่ 1 ปีการศีกษา 2580
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
                                        sx={{ ml: 2, flex: 1,  }}
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
                    </Container>

                    <TablePage></TablePage>
                    
                </Box>

            </main>

        </ThemeProvider>
    );
}

