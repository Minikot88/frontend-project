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
  Stack,
  Unstable_Grid2 as Grid,
  IconButton,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InputAdornment from "@mui/material/InputAdornment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import BreadcrumbsPage from "../../components/BreadcrumbsPage";

export const AddSubject = () => {
  const [subject, setSubject] = useState({});
  const [sections, setSections] = useState([{ times: [{}] }]);
  const [timeIdCounter, setTimeIdCounter] = useState(0);

  const getMaxTimeId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/getMaxTime`
      );
      if (response) {
        const maxId = response?.data[0].maxId;

        if (maxId) {
          const currentId = parseInt(maxId.slice(1));
          const nextId = currentId + 1;
          return `T${nextId.toString().padStart(5, "0")}`;
        } else {
          return "T00001";
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getMaxSectionId = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/getMaxSection`
      );
      if (response) {
        const maxId = response?.data[0].maxId;

        if (maxId) {
          const currentId = parseInt(maxId.slice(1));
          const nextId = currentId + 1;
          return `S${nextId.toString().padStart(5, "0")}`;
        } else {
          return "S00001";
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

  const handleSectionChange = (sectionIndex, e) => {
    const { name, value } = e.target;
    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [name]: value,
    };
    setSections(updatedSections);
  };

  const handleTimeChange = (sectionIndex, timeIndex, e) => {
    const { name, value } = e.target;
    const updatedSections = [...sections];
    updatedSections[sectionIndex].times[timeIndex] = {
      ...updatedSections[sectionIndex].times[timeIndex],
      [name]: value,
    };
    setSections(updatedSections);
  };

  const addSubject = async () => {
    try {
      // Get the next available time_id and section_id
      const nextTimeId = await getMaxTimeId();
      const nextSectionId = await getMaxSectionId();

      // Update the subject and sections objects
      const updatedSubject = {
        ...subject,
        time_id: nextTimeId,
        section_id: nextSectionId,
      };
      const updatedSections = sections.map((section) => ({
        ...section,
        section_id: nextSectionId,
        times: section.times.map((time) => ({
          ...time,
          time_id: nextTimeId,
        })),
      }));

      // Send the POST request with updatedSubject and updatedSections
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/add-subject`,
        {
          subject: updatedSubject,
          sections: updatedSections,
        }
      );

      if (response?.status === 200) {
        alert("Adding successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSection = () => {
    setSections([...sections, { times: [{}] }]);
  };

  const handleAddTime = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].times.push({ id: timeIdCounter });
    setSections(updatedSections);
    setTimeIdCounter((prevCounter) => prevCounter + 1);
  };

  const handleDeleteTime = (sectionIndex, timeId) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].times = updatedSections[
      sectionIndex
    ].times.filter((time) => time.id !== timeId);
    setSections(updatedSections);
  };

  const handleDeleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  return (
    <form>
      <BreadcrumbsPage
        pages={[
          { title: "จัดการรายวิชา", path: `/manage-subject` },
          { title: "เพิ่มรายวิชา" },
        ]}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Typography textAlign={"center"} variant="h4">
          เพิ่มรายวิชา
        </Typography>
        <Container maxWidth="lg">
          <Card>
            <CardHeader title="วิชา" />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      name="subject_id"
                      label="รหัสวิชา"
                      required
                      onChange={(e) => handleChange(e)}
                      inputProps={{
                        pattern: "^[0-9A-Za-z]*$",
                        onInvalid: (e) => {
                          e.target.setCustomValidity(
                            "กรุณาใส่เฉพาะตัวเลขและตัวอักษรเท่านั้น"
                          );
                        },
                        onInput: (e) => {
                          e.target.setCustomValidity("");
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      fullWidth
                      name="subject_name"
                      label="ชื่อวิชา"
                      variant="outlined"
                      required
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      fullWidth
                      name="subject_name_eng"
                      label="ชื่อวิชา (ภาษาอังกฤษ)"
                      variant="outlined"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="credit-label">หน่วยกิต</InputLabel>
                      <Select
                        name="credit"
                        labelId="credit-label"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="category-label">หมวดหมู่วิชา</InputLabel>
                      <Select
                        name="category"
                        labelId="category-label"
                        onChange={(e) => handleChange(e)}
                        label="หมวดหมู่วิชา"
                        sx={{
                          "& .MuiSelect-selectMenu": {
                            paddingRight: "32px",
                          },
                        }}
                      >
                        <MenuItem value="C">วิชาบังคับ</MenuItem>
                        <MenuItem value="E">วิชาเลือก</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={6} md={4}></Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            {sections.map((section, sectionIndex) => (
              <Stack spacing={1} key={sectionIndex}>
                <Stack spacing={1}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Typography variant="h6">
                        Section {String(sectionIndex + 1).padStart(2, "0")}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="small"
                        variant="outlined"
                        onClick={handleAddSection}
                        sx={{
                          color: "#1565c0",
                          "&:hover": {
                            bgcolor: "#bbdefb",
                          },
                        }}
                      >
                        <AddCircleOutlineIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    {sectionIndex > 0 && (
                      <Grid item>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteSection(sectionIndex)}
                          sx={{
                            color: "#d50000",
                            "&:hover": {
                              bgcolor: "#ff80ab",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name="section"
                        label="Section"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        //value={`${String(sectionIndex + 1).padStart(2, "0")}`}
                        onChange={(e) => handleSectionChange(sectionIndex, e)}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="term-label">ภาคการศึกษา</InputLabel>
                        <Select
                          name="term"
                          labelId="term-label"
                          label="ภาคการศึกษา"
                          variant="outlined"
                          onChange={(e) => handleSectionChange(sectionIndex, e)}
                        >
                          {[1, 2, 3].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="year-label">ปีการศึกษา</InputLabel>
                        <Select
                          name="year"
                          labelId="year-label"
                          label="ปี"
                          variant="outlined"
                          onChange={(e) => handleSectionChange(sectionIndex, e)}
                        >
                          {[2563, 2564, 2565, 2566, 2567, 2568].map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Times */}
                  {section.times.map((timePart, timeIndex) => (
                    <Grid container direction="row" spacing={1} key={timeIndex}>
                      <Grid item xs={12} md={2.4}>
                        <TextField
                          fullWidth
                          name="classroom"
                          label="ห้องเรียน"
                          variant="outlined"
                          onChange={(e) =>
                            handleTimeChange(sectionIndex, timeIndex, e)
                          }
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
                            onChange={(e) =>
                              handleTimeChange(sectionIndex, timeIndex, e)
                            }
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
                          onChange={(e) =>
                            handleTimeChange(sectionIndex, timeIndex, e)
                          }
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
                          onChange={(e) =>
                            handleTimeChange(sectionIndex, timeIndex, e)
                          }
                        />
                      </Grid>

                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        item
                        xs={6}
                        md={2.4}
                      >
                        <Button
                          onClick={() => handleAddTime(sectionIndex)}
                          sx={{
                            color: "#1565c0",
                            "&:hover": {
                              bgcolor: "#bbdefb",
                            },
                          }}
                        >
                          <AddAlarmIcon /> เพิ่มข้อมูล
                        </Button>
                        {timeIndex > 0 && (
                          <Button
                            onClick={() =>
                              handleDeleteTime(sectionIndex, timePart.id)
                            }
                            sx={{
                              color: "#d50000",
                              "&:hover": {
                                bgcolor: "#ff80ab",
                              },
                            }}
                          >
                            <RemoveCircleOutlineIcon /> ลบข้อมูล
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Card>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Grid item>
              <Button variant="contained" onClick={addSubject}>
                submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </form>
  );
};
