import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import MenuIcon from '../../components/menu';


import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import BreadcrumbsPage from '../../components/BreadcrumbsPage';


const columns = [
  {
    field: 'user_id',
    headerName: 'รหัสนักศึกษา',
    type: 'number',
    width: 150,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'fname',
    headerName: 'ชื่อ',
    width: 180,
    align: 'left'
  },
  {
    field: 'lname',
    headerName: 'นามสกุล',
    width: 180,
    align: 'left'
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 200,
    align: 'left'
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
    align: 'left'
  },
  {
    field: 'status',
    headerName: 'สถานะ',
    width: 100,
    align: 'left'
  },
  {
    field: 'delete',
    headerName: 'จัดการ',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <IconButton aria-label="delete">
        <MenuIcon />
      </IconButton>
    ),
  },
];

export default function ViewUserTable() {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getViewUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/getViewUser`
        );
        if (response) {
          setUsers(response?.data); 
          console.log(response?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getViewUser();
  }, []);

  return (
    <main>
      <BreadcrumbsPage
        pages={[
          { title: "สร้างตารางเรียน", path: `/create-table` },
          { title: "ค้นหารายวิชา" },
        ]}
      />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 3,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            รายชื่อผู้ใช้
          </Typography>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.user_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            // checkboxSelection
            />
          </div>
        </Container>
      </Box>
    </main>
  );
}