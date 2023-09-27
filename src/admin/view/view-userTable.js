import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import MenuIcon from '../../components/menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import BreadcrumbsPage from '../../components/BreadcrumbsPage';
import BasicSpeedDial from '../../components/speedDial';

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
        <MenuIcon id={params.row?.user_id} />
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

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = users?.filter((item) =>
    item?.user_id.includes(searchQuery) ||
    item?.username?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    item?.fname?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    item?.lname?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <main>
      <BreadcrumbsPage
        pages={[
          { title: "รายชื่อผู้ใช้" },
        ]}
      />
      <Box>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            marginRight={2}
          >
            <BasicSpeedDial></BasicSpeedDial>
          </Stack>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            รายชื่อผู้ใช้
          </Typography>
          <Container maxWidth="sm">
            <Box component="form" noValidate
              sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <Grid item xs={12} sm={6}>
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '300px',
                    height: '33px',
                    bgcolor: '#FFFFFF',
                    border: '0.8px solid #252525',
                    '&:hover': {
                      bgcolor: '#eeeeee',
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
          <Box sx={{marginTop: 2}}></Box>
          <div style={{ width: '100%' }}>
            <DataGrid
              rows={filteredCards}
              columns={columns}
              getRowId={(row) => row?.user_id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 20]}
            />
          </div>
        </Container>
      </Box>
    </main>
  );
}