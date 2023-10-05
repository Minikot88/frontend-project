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
import { experimentalStyled as styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InputAdornment from "@mui/material/InputAdornment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AddSectionCard } from '../../components/add-section-card';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AddTimeCard } from "../../components/add-time-card";
import BreadcrumbsPage from "../../components/BreadcrumbsPage";

export const UpdateSection = () => {

  const { id } = useParams();
  const [subject, setSubject] = useState({})
  const { subject_id } = useParams()
  const [section, setSection] = useState({});
  const [time, setTime] = useState([]);
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const closeAddSectionPart = () => {
    setOpen(false)
  }

  const openAddSectionPart = () => {
    setOpen(true)
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 120,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
      },
    },
  }));

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
        `${process.env.REACT_APP_API_SERVER}/updateSectionData?section_id=${id}`, section
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/deleteTime?time_id=${id}`);
      if (response?.status === 200) {
        alert(`Data successfully`);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%', // แก้เป็น maxHeight แทน maxhigh
    backgroundColor: 'background.paper', // แก้เป็น backgroundColor แทน bgcolor
    border: '2px solid #000',
    boxShadow: '24px', // แก้เป็น '24px' แทน 24
    padding: '4px', // แก้เป็น '4px' แทน 4
    overflow: 'auto', // เพิ่ม overflow: auto; เพื่อให้มีแถบเลื่อน
  };

  useEffect(() => {
    const getSubject = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/subject?subject_id=${subject_id}`);
        if (response) {
          setSubject(response?.data[0])
        }
      } catch (err) {
        console.error(err);
      }
    };
    getSubject()
  }, [subject_id])

  return (
    <form>
      <BreadcrumbsPage
        pages={[
          { title: "จัดการรายวิชา", path: `/manage-subject` },
          { title: `แก้ไขวิชา  ${subject?.subject_id} `, path: `/edit-subject/${subject_id}` },
          { title: `แก้ไข Section ${section.section}` },
        ]} />

      <Container maxWidth="lg">
        <Box sx={{ p: 4 }}>
          <Typography textAlign={'center'} variant="h4">
            แก้ไข Section {section.section}
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
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <CardHeader title="Time" />
            <Grid item>
              <IconButton
                onClick={() => openAddSectionPart()}
                size="small"
                variant="outlined" sx={{
                  color: "#1565c0",
                  "&:hover": {
                    bgcolor: "#bbdefb",
                  },
                }}
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Box>
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container direction="row" spacing={2}>
                {time?.map((item, index) =>
                  <Grid item xs={6} md={2} sm={4} key={index}>
                    <Button
                      variant='contained'
                      fullWidth
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={handleClick}

                    >
                      ID : {item?.time_id}
                    </Button>
                    <StyledMenu
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                      }}
                    >
                      <MenuItem
                        onClick={() => handleDelete(item?.time_id)}
                      >
                        <DeleteIcon />
                        ลบ
                      </MenuItem>
                    </StyledMenu>
                  </Grid>
                )}

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
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
            <Grid
              container
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" component="h2" sx={{ p: 1 }}>
                Add Time
              </Typography>
              <IconButton
                onClick={() => closeAddSectionPart()}
                sx={{
                  color: '#0d47a1',
                  '&:hover': {
                    color: '#d50000',
                  },
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Grid>
            <AddTimeCard id={id} />
          </Box>
        </Modal>
      </Container>
    </form >
  );
};
