import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logout from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MenuIcon() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const [user, setUser] = useState();

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_SERVER}/deleteUser?user_id=${id}`
            );
            if (response) {
                setUser(response?.data)
                alert(`Data deleted successfully`);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const goEditSubject = (id) => {
        navigate(`/update-subject/${id}`);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleDelete(user?.user_id)}  >
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    ลบ
                </MenuItem>
                <MenuItem onClick={() => goEditSubject(user?.user_id)}>
                    <ListItemIcon>
                        <AutoFixHighIcon fontSize="small" />
                    </ListItemIcon>
                    แกไข
                </MenuItem>
            </Menu>
        </div>
    );
}
