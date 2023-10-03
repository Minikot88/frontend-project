import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

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
          updatedTime: time, // Send the array of updated time entries
        }
      );
      if (response?.status === 200) {
        // Handle success, e.g., show a success message to the user
        console.log("Time data updated successfully");
      }
    } catch (err) {
      console.error(err);
      // Handle error, e.g., show an error message to the user
    }
  };


  return (
    <form>
      {/* ... Other content ... */}
      <Container maxWidth="lg">
        {/* ... Other content ... */}
        <Stack mt={2} spacing={4}>
          <Typography variant="h6">Time Data:</Typography>
          {time.map((timeEntry, index) => (
            <Box key={index} display="flex" flexDirection="column">
              <TextField
                label="Time ID"
                variant="outlined"
                value={timeEntry.time_id}
                disabled
              />
              <TextField
                label="Start Time"
                variant="outlined"
                name="start_time" // Ensure the name matches the field in the state
                value={timeEntry.start_time}
                onChange={(e) => handleInputChange(e, index)}
              />
              <TextField
                label="End Time"
                variant="outlined"
                name="end_time"
                value={timeEntry.end_time}
                onChange={(e) => handleInputChange(e, index)}
              />
              <TextField
                label="Classroom"
                variant="outlined"
                name="classroom"
                value={timeEntry.classroom}
                onChange={(e) => handleInputChange(e, index)}
              />
              <TextField
                label="Date"
                name="Date"
                variant="outlined"
                value={timeEntry.date}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Stack>
      </Container>
    </form>
  );
};
