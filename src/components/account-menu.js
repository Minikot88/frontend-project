import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Photo from '../image/hacker.png'

export default function AccountMenu() {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [login, setLogin] = React.useState(false)
    const token = localStorage.getItem('token')
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
    const handleLogout = () => {
        localStorage.clear()
        alert('คุณออกจากระบบแล้ว')
        setLogin(false);
        navigate(`/`);
        window.location.reload()
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosesAccount = () => {
        setAnchorEl(null);
        navigate(`/account`);
    };

    useEffect(() => {
        const getAccountByID = async () => {
            try {
                const token = await localStorage.getItem('token')
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getAccountByID`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response) {
                    setUser(response?.data[0])
                    console.log(response?.data[0])
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAccountByID()
    }, [])

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            variant="rounded"
                            src={Photo}
                        >
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={opens}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClosesAccount}>
                    <ListItemIcon>
                        <PermIdentityIcon fontSize="small" />
                    </ListItemIcon>
                    My account
                </MenuItem>
                <Divider />
                <MenuItem >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
