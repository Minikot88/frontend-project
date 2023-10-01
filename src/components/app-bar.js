import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

import Photo from '../image/table.png'
import Login from '../views/login';
import AccountMenu from './account-menu';
import axios from 'axios';

export default function Appbar() {
    const navigate = useNavigate()
    const [login, setLogin] = React.useState(false)
    const [user, setUser] = React.useState({})
    const token = localStorage.getItem('token')

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

    React.useEffect(() => {
        if (token !== null) {
            setLogin(true)
        } else {
            setLogin(false)
        }
        window.addEventListener('storage', () => {
            alert('คุณออกจากระบบแล้ว')
            if (token !== null) {
                setLogin(true)

            }
        })
    }, [])

    React.useEffect(() => {
        const getAccountByID = async () => {
            try {
                const token = await localStorage.getItem("token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/getAccountByID`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response) {
                    setUser(response?.data[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getAccountByID();
    }, []);

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
                    {!login ? (
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
                        </Typography >
                    ) : login && user?.status === 1 ? (
                        <Typography variant="h6"
                            noWrap
                            component="a"
                            href="/home.admin"
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
                    ) : (
                        <Typography variant="h6"
                            noWrap
                            component="a"
                            href="/home-member"
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
                    )}
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
                    {!login ? (
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
                            MX PSU
                        </Typography>
                    ) : login && user?.status === 1 ? (
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/home.admin"
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
                            MX PSU
                        </Typography>
                    ) : (
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/home-member"
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
                            MX PSU
                        </Typography>
                    )}


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>
                    <div>
                        {!login ? (
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
                        ) : (
                            <AccountMenu />
                        )}

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

