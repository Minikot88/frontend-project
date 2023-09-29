import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import BuildIcon from "@mui/icons-material/Build";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Appbar from "../../components/app-bar";
import SearchIcon from "@mui/icons-material/Search";
import BreadcrumbsPage from "../../components/BreadcrumbsPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function ManageSubject() {
  const navigate = useNavigate();
  const [subjects, setSubject] = useState();

  useEffect(() => {
    const getAllSubjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/getallsubject`
        );
        if (response) {
          setSubject(response?.data);
          console.log(response?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAllSubjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/deletesubject?subject_id=${id}`
      );
      if (response) {
        alert(`Data deleted successfully`);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const goEditSubject = (id) => {
    navigate(`/update-subject/${id}`);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = subjects?.filter((item) =>
    item?.subject_name_th.includes(searchQuery) ||
    item?.subject_name_eng?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    item?.subject_id.includes(searchQuery)
  );

  return (
    <ThemeProvider theme={theme}>
      <BreadcrumbsPage pages={[{ title: "จัดการรายวิชา" }]} />
      <main>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          marginRight={2}
        >
          <Button
            variant="outlined"
            href="/add-Subjects"
            startIcon={<NoteAddIcon />}
            sx={{
              bgcolor: "#AA00FF",
              width: "130",
              color: "#000000",
              fontFamily: "monospace",
              bgcolor: "#0468BF",
              color: "#FFFFFF",
              "&:hover": {
                bgcolor: "#0487D9",
              },
            }}
          >
            เพิ่มรายวิชา
          </Button>
        </Stack>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 1,
            pb: 3,
          }}
        >
          <Container maxWidth="sm">
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
      <Container mixWidth="sm">
        <TableContainer component={Paper}>
          <Table
            align="center"
            sx={{ maxWidth: "400" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    width: 120,
                    bgcolor: "#0468BF",
                    color: "#FFFFFF",
                    "&:hover": {
                      bgcolor: "#0487D9",
                    },
                  }}
                >
                  {" "}
                  รหัสวิชา{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 120,
                    bgcolor: "#0468BF",
                    color: "#FFFFFF",
                    "&:hover": {
                      bgcolor: "#0487D9",
                    },
                  }}
                >
                  ชื่อวิชา
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 120,
                    bgcolor: "#0468BF",
                    color: "#FFFFFF",
                    "&:hover": {
                      bgcolor: "#0487D9",
                    },
                  }}
                >
                  subject name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 120,
                    bgcolor: "#0468BF",
                  }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 120,
                    bgcolor: "#0468BF",
                  }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 120,
                    bgcolor: "#0468BF",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCards &&
                filteredCards.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        bgcolor: "#BBE2F2",
                      },
                    }}
                  >
                    <TableCell align="center">
                      <Button
                        sx={{
                          width: 90,
                          bgcolor: "#0468BF",
                          color: "#FFFFFF",
                          "&:hover": {
                            bgcolor: "#0487D9",
                          },
                        }}
                      >
                        {row.subject_id}
                      </Button>
                    </TableCell>
                    <TableCell align="center">{row.subject_name_th}</TableCell>
                    <TableCell align="center">{row.subject_name_eng}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        startIcon={<ContentPasteSearchIcon />}
                        onClick={() =>
                          navigate(`/details-subject/${row?.subject_id}`)
                        }
                        sx={{
                          width: 130,
                          bgcolor: "#0468BF",
                          color: "#FFFFFF",
                          "&:hover": {
                            bgcolor: "#2a3eb1",
                          },
                        }}
                      >
                        รายละเอียด
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        startIcon={<BuildIcon />}
                        sx={{
                          width: 130,
                          bgcolor: "#0468BF",
                          color: "#FFFFFF",
                          "&:hover": {
                            bgcolor: "#ff9100",
                          },
                        }}
                        onClick={() => goEditSubject(row?.subject_id)}
                      >
                        แก้ไข
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        sx={{
                          width: 130,
                          bgcolor: "#0468BF",
                          color: "#FFFFFF",
                          "&:hover": {
                            bgcolor: "#ff1744",
                          },
                        }}
                        onClick={() => handleDelete(row.subject_id)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}
