import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Container,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';

import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export const AddSubject = () => {

    return (
        <form>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <Typography textAlign={'center'} variant="h4">
                    เพิ่มรายวิชา
                </Typography>
                <Container maxWidth="lg">
                    <Card>
                        <CardHeader
                            title="วิชา"
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ m: -1.5 }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={2} md={6}>
                                        <TextField
                                            fullWidth
                                            label="รหัสนักศึกษา"
                                            name="user_id"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={6}>
                                        <TextField
                                            fullWidth
                                            label="ชื่อผู้ใช้"
                                            name="username"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={2} md={6}>
                                        <TextField
                                            fullWidth
                                            label="ชื่อ"
                                            name="fname"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={3} md={6}>
                                        <TextField
                                            fullWidth
                                            label="นามสกุล"
                                            name="lname"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={3} md={6}>
                                        <TextField
                                            fullWidth
                                            label="อีเมล"
                                            name="email"
                                            required
                                        />
                                    </Grid>
                                    <Grid
                                        xs={4}
                                        md={6}
                                    >
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </form>
    );
};
