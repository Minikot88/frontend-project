import { useCallback, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const states = [
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    },
    {
        value: 'los-angeles',
        label: 'Los Angeles'
    }
];

export const AccountProfileDetails = () => {


    const navigate = useNavigate()
    const [user, setUser] = useState()
    const token = localStorage.getItem('token')

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

    const [values, setValues] = useState({
        firstName: 'Anika',
        lastName: 'Visser',
        email: 'demo@devias.io',
        phone: '',
        state: 'los-angeles',
        country: 'USA'
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    title="โปรไฟล์"
                    subheader="ข้อมูลสามารถแก้ไขได้"
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    
                                    fullWidth
                                    label="รหัสนักศึกษา"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={user?.user_id}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="ชื่อผู้ใช้"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    value={user?.username}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="ชื่อ"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={user?.fname}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="นามสกุล"
                                    name="phone"
                                    onChange={handleChange}
                                    required
                                    value={user?.lname}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="อีเมล"
                                    name="country"
                                    onChange={handleChange}
                                    required
                                    value={user?.email}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained">
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
