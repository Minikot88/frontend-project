import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const AccountProfile = () => {

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

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            //src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user?.fname} {user?.lname}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user?.user_id}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
