import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Button, IconButton } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import BreadcrumbsPage from "../components/BreadcrumbsPage";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme();

export default function SearchSelect() {
  const navigate = useNavigate();
  const { schedule_id } = useParams()
  const [subject, setSubject] = useState();
  const [selectedSubject, setSelectedSubject] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAllSubjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/getallsubject`
        );
        if (response) {
          setSubject(response?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAllSubjects();
  }, []);

  useEffect(() => {
    const getSelectedSubject = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/getSelectedSubject?schedule_id=${schedule_id}`
        );
        if (response) {
          setSelectedSubject(response?.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getSelectedSubject()
  }, [schedule_id])

  const checkIfSelected = (id, schedule_id) => {
    if (selectedSubject && selectedSubject?.some(subject => subject?.subject_id === id)) {
      alert("ไม่สามารถทำรายการได้ เนื่องจากคุณได้เลือกวิชานี้แล้ว");
    } else {
      navigate(`/select-subject/${id}/${schedule_id}`);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = subject?.filter((item) =>
    item?.subject_name_th.includes(searchQuery) ||
    item?.subject_name_eng?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    item?.subject_id.includes(searchQuery)
  );

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 2,
            pb: 4,
          }}
        >
          <IconButton sx={{ p: 2, ml: 1, color: '#212121', bgcolor: '#FFFFFF' }} variant="outlined" onClick={() => navigate(-1)}><KeyboardReturnIcon /></IconButton>
          <Container minWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ค้นหารายวิชา
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={6}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "300px",
                    height: "33px",
                    bgcolor: "#FFFFFF",
                    border: "0.8px solid #252525",
                    "&:hover": {
                      bgcolor: "#eeeeee",
                    },
                  }}
                >
                  <InputBase
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ ml: 1, flex: 1, }}
                    placeholder="ค้นหา"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Paper>
              </Grid>
            </Box>
          </Container>
        </Box>
      </main>
      <Container minWidth="sm">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">รหัสวิชา</TableCell>
                <TableCell align="center">ชื่อวิชา</TableCell>
                <TableCell align="center">Subject name</TableCell>
                <TableCell align="center">จำนวนตอน</TableCell>
                <TableCell align="center">หน่วยกิต</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCards?.length > 0 ? (
                filteredCards.map((row) => (
                  <TableRow
                    key={row?.Subject_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        bgcolor: "#BBE2F2",
                      },
                    }}
                  >
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          checkIfSelected(row?.subject_id, schedule_id)
                        }
                        variant="contained"
                        size="small"
                        sx={{
                          width: 75,
                          bgcolor: "#0468BF",
                          color: "#FFFFFF",
                          "&:hover": {
                            bgcolor: "#0487D9",
                          },
                        }}
                      >
                        {row?.subject_id}
                      </Button>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row?.subject_name_th}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row?.subject_name_eng}
                    </TableCell>
                    <TableCell align="center">{row?.num_section}</TableCell>
                    <TableCell align="center">{row?.credit}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={6} sx={{ py: 3 }} >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" paragraph>
                      Data Not found
                    </Typography>
                    <Typography variant="body2">
                      ไม่พบผลลัพธ์สำหรับ &nbsp; <strong>&quot;{searchQuery}&quot;</strong> &nbsp; ลองตรวจสอบการพิมพ์อีกครั้งหรือใช้คำอื่น
                    </Typography>
                  </Box>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}
