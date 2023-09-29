import { Box, Button, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function AllSubjectsView() {
    const navigate = useNavigate()
    const [subject, setSubject] = useState()

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/getallsubject`)
                if (response) {
                    setSubject(response?.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getAllSubjects();
    }, [])

    const seeSubjectInfo = (id) => {
        navigate(`/subject-info/${id}`)
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    return (
        <div>
            <Box sx={{ p: 5 }}>
                <Typography textAlign={"center"} variant="h4" sx={{ p: 3 }}>
                    สถิติรายวิชา
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4} sx={12}>
                            <Card sx={{ minWidth: 275, bgcolor: '#212121' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={4} sx={12}>
                            <Card sx={{ minWidth: 275, bgcolor: '#212121' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={4} sx={12}>
                            <Card sx={{ minWidth: 275, bgcolor: '#212121' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={4} sx={12}>
                            <Card sx={{ minWidth: 275, bgcolor:'#212121' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={4} sx={12}>
                            <Card sx={{ minWidth: 275, bgcolor:'#212121' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} md={4} sx={12}>
                            <Card sx={{ minWidth: 275, bgcolor:'#212121' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}