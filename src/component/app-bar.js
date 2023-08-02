import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Stack } from '@mui/material'

import Photo from '../photo/table.png'

export default function Appbar() {

    return (
        <AppBar position="static"
            sx={{
                bgcolor: '#AA00FF',
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    
                    <img
                        src={Photo}
                        width="55"
                        height="55"
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    />
                   
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: 1,
                        }}
                    >
                        ระบบจัดตารางเรียน
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                        </IconButton>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginRight: 3,
                        }}
                    >
                        MX
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <Stack direction="row" spacing={1}>
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    href="/signup"
                                    sx={{
                                        bgcolor: '#AA00FF',
                                        color: '#000000',
                                        fontFamily: 'monospace',
                                        '&:hover': {
                                            bgcolor: '#8800CC',
                                        },
                                    }}
                                >
                                    Sign Up
                                </Button>
                                <Button color="inherit"
                                    variant="outlined"
                                    href="/signin"
                                    sx={{
                                        bgcolor: '#AA00FF',
                                        color: '#000000',
                                        fontFamily: 'monospace',
                                        '&:hover': {
                                            bgcolor: '#8800CC',
                                        },
                                    }}
                                >
                                    sign in
                                </Button>
                            </Stack>
                        </Tooltip>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

