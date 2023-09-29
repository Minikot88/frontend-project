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
import Container from '@mui/material/Container';
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import BreadcrumbsPage from "../../components/BreadcrumbsPage";

export const UpdateAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleInput = (e) => {
    setUser((updateUser) => ({
      ...updateUser,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
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
      <BreadcrumbsPage
        pages={[
          { title: "รายชื่อผู้ใช้", path: `/viewUser` },
          { title: "รายละเอียดผู้ใช้" },
        ]} />
      <Container maxWidth="md" sx={{ mt: '20px' }}>
        <Card>
          <CardHeader title={`User`} />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="รหัสนักศึกษา"
                    name="user_id"
                    required
                    onChange={(e) => handleInput(e)}
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
      </Container>
    </form>
  );
};
