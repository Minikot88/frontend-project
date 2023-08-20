import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';

import Photo from '../photo/table.png'

import Login from '../view/login';

export default function Appbar() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fafafa',
        border: '2.5px solid #0468BF',
        boxShadow: 24,
        pt: 1,
        px: 2,
        pb: 1,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <AppBar position="static"
            sx={{
                bgcolor: '#0468BF',
            }}>
            <Container maxWidth="xl"

            >
                <Toolbar disableGutters>

                    <img
                        src={Photo}
                        width="45"
                        height="45"
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
                            color: '#ffffff',
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
                    <div>
                        <Button onClick={handleOpen}
                            type="submit"
                            fullWidth
                            variant="text"
                            size="small"
                            sx={{
                                boxShadow: 4,
                                bgcolor: '#0487D9',
                                color: '#FFFFFF',
                                fontFamily: 'monospace',
                                '&:hover': {
                                    bgcolor: '#049DD9',
                                },
                            }}
                        >Log In
                        </Button>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <Box sx={{ ...style, width: 350, height: 400, }}>
                               <Login></Login>
                            </Box>
                        </Modal>
                    </div>


                </Toolbar>
            </Container>
        </AppBar>
    );
}

