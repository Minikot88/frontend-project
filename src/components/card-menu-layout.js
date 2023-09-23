import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import {
    Card,
    Box,
    CardContent,
    Typography,
    IconButton
} from '@mui/material'
import { green, teal } from '@mui/material/colors'
import Button from '@mui/material/Button';


const CardMenuLayout = (props) => {

    const {
        path, title, className, icon, description, ...others
    } = props

    const { pathname } = useLocation()

    return (
        <Button
            to={path}
            sx={{
                maxWidth: '180px',
                maxHeight: '180px',
                minWidth: '180px',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '5px',
                bgcolor:'#0A7ABF',
                ":hover": {
                    background: '#66D8F2',
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <IconButton sx={{ width: '100px', height: '100px' }} aria-label="previous">
                    {icon}
                </IconButton>
            </Box>
            <Box sx={{ border: 'none', display: 'flex', wordWrap: 'break-word', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    wordWrap: 'break-word',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                    <Typography variant="h6" >
                        {title}
                    </Typography>
                    <Typography variant="h5" sx={{ color:'#FFFFFF' }}>
                        {description}
                    </Typography>
                </CardContent>
            </Box>
        </Button>
    )
}
CardMenuLayout.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    icon: PropTypes.node,
    description: PropTypes.string
}
CardMenuLayout.defaultProps = {
    className: null,
    icon: null,
    setOpened: () => { }
}

export default CardMenuLayout