import React, { useEffect, useState } from "react";
import {
  Button, InputLabel, Stack, CardHeader, Container,
  TextField, Typography, createTheme, CardContent,
  useMediaQuery, IconButton, Dialog, Card, Box,
  DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InputAdornment from "@mui/material/InputAdornment";

export const UpdateSection = () => {
  const { id } = useParams();
  const [section, setSection] = useState({});
  const [time, setTime] = useState([]);


  useEffect(() => {
    const getViewIdSection = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/getViewIdSection?section_id=${id}`
        );
        if (response?.data?.length > 0) {
          setSection(response.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getViewIdSection();
  }, [id]);

  useEffect(() => {
    const AllPeriodsBySection = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/getViewIdTimeBySection?section_id=${id}`
        );
        if (response?.data?.length > 0) {
          setTime(response?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    AllPeriodsBySection();
  }, [id]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSection((prevSubject) => ({
  //     ...prevSubject,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTime = [...time];
    updatedTime[index] = {
      ...updatedTime[index],
      [name]: value,
    };
    setTime(updatedTime);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/updateTimeData`,
        {
          updatedTime: time,
        }
      );
      if (response?.status === 200) {
        alert(`Data deleted successfully`);
        window.location.reload();
        console.log("Time data updated successfully");
      }
    } catch (err) {
      console.error(err);

    }
  };
  const handleInput = (e) => {
    setSection((updateSection) => ({
      ...updateSection,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChangesSection = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/updateSectionData?section_id=${id}`,section
      );
      if (response?.status === 200) {
        alert(`updated`);
        window.location.reload();
        console.log("Time data updated successfully");
      }
    } catch (err) {
      console.error(err);

    }
  };


  return (
    <form>

      <Container maxWidth="lg">
        <Box sx={{ p: 4 }}>
          <Typography textAlign={'center'} variant="h4">
            แก้ไขรายวิชา
          </Typography>
        </Box>
        <Card >
          <CardHeader title="Section" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    name="section"
                    label="Section"
                    required
                    value={section.section}
                    onChange={(e) => handleInput(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="term-label">ภาคการศึกษา</InputLabel>
                    <Select
                      name="term"
                      labelId="term-label"
                      label="ภาคการศึกษา"
                      variant="outlined"
                      onChange={(e) => handleInput(e)}
                      value={section ? `${section?.term}` : " "}
                    >
                      {[1, 2, 3].map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="year-label">ปีการศึกษา</InputLabel>
                    <Select
                      name="year"
                      labelId="year-label"
                      label="ปี"
                      variant="outlined"
                      onChange={(e) => handleInput(e)}
                      value={section ? `${section?.year}` : " "}

                    >
                      {[2563, 2564, 2565, 2566, 2567, 2568].map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={2} >
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChangesSection}
                  >
                    Save Section
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mt: '5px' }}>
          <CardHeader title="Time Data" />
          <CardContent sx={{ pt: 0 }}>
            <Stack mt={2} spacing={4}>
              {time.map((timeEntry, index) => (
                <Grid container direction="row" spacing={1} key={index} >
                  <Grid item xs={12} md={2.4}>
                    <TextField
                      label="Time ID"
                      variant="outlined"
                      value={timeEntry.time_id}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={2.4}>
                    <TextField
                      fullWidth
                      name="classroom"
                      label="ห้องเรียน"
                      variant="outlined"
                      value={timeEntry.classroom}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{ marginBottom: "16px" }}
                    >
                      <InputLabel
                        htmlFor="date-label"
                        sx={{ fontSize: "16px" }}
                      >
                        วัน
                      </InputLabel>
                      <Select
                        name="date"
                        labelId="date-label"
                        label="วัน"
                        variant="outlined"
                        value={timeEntry ? `${timeEntry?.date}` : " "}
                        onChange={(e) => handleInputChange(e, index)}
                        sx={{ fontSize: "16px" }}
                        inputProps={{ id: "date-label" }}
                      >
                        {[
                          "จันทร์",
                          "อังคาร",
                          "พุธ",
                          "พฤหัสบดี",
                          "ศุกร์",
                          "เสาร์",
                          "อาทิตย์",
                        ].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <TextField
                      fullWidth
                      name="start_time"
                      label="เวลาเริ่ม"
                      type="time"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        step: 300, // 5 minutes
                      }}
                      value={timeEntry.start_time}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <TextField
                      fullWidth
                      name="end_time"
                      label="หมดเวลา"
                      type="time"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        step: 300, // 5 minutes
                      }}
                      value={timeEntry.end_time}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </form >
  );
};
