import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SearchIcon from '@mui/icons-material/Search';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export const mainListItems = (
  <React.Fragment>
    
    <ListItemButton href="/search-all" >
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="ค้นหา" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <EditCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="สร้างตารางเรียน" />
    </ListItemButton>
{/* 
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>

    {/* <ListSubheader component="div" inset>
    User Section
    </ListSubheader> */}

    <ListItemButton>
      <ListItemIcon>
        <AccessibilityIcon />
      </ListItemIcon>
      <ListItemText primary="เข้าสู่ระบบ" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="สมัครสมาชิก" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SupportAgentIcon />
      </ListItemIcon>
      <ListItemText primary="Support" />
    </ListItemButton>
  </React.Fragment>
);