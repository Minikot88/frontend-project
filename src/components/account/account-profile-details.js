import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const AccountProfileDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token')

  const handleInput = (e) => {
    setUser((updateUser) => ({
      ...updateUser,
      [e.target.name]: e.target.value,
    }));
  };

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

  useEffect(() => {
    if (token) {
      getAccountByID()
    }
  }, [token])

  const updateUser = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/update-user`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        alert("updated");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <Card>
        <CardHeader title="โปรไฟล์" subheader="ข้อมูลสามารถแก้ไขได้" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  disabled
                  label="รหัสนักศึกษา"
                  name="user_id"
                  required
                  value={user?.user_id}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ชื่อผู้ใช้"
                  name="username"
                  required
                  onChange={(e) => handleInput(e)}
                  value={user?.username}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ชื่อ"
                  name="fname"
                  required
                  onChange={(e) => handleInput(e)}
                  value={user?.fname}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="นามสกุล"
                  name="lname"
                  required
                  onChange={(e) => handleInput(e)}
                  value={user?.lname}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  disabled
                  fullWidth
                  label="อีเมล"
                  name="email"
                  required
                  onChange={(e) => handleInput(e)}
                  value={user?.email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}></Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={() => updateUser()}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
