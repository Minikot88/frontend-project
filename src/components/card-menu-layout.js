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


const CardMenuLayout = (props) => {

    const {
        path, title, className, icon, description, ...others
    } = props

    const { pathname } = useLocation()

    return (
        <Card

            component={Link}
            to={path}
            sx={{
                maxWidth: '180px',
                maxHeight: '180px',
                minWidth: '180px',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                border: 'none', // ลบขีดเส้น
                ":hover": {
                    background: 'rgba(0,150,136,0.2)',
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
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" underline="none">
                        {title}
                    </Typography>
                    <Typography variant="h5" sx={{ textDecoration: 'none' }}>
                        {description}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
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