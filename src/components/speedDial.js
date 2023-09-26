import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from "react-router-dom"; 

const actions = [
  { icon: <PersonAddIcon />, name: 'AddUser', path: '/addUser' },
  { icon: <AdminPanelSettingsIcon />, name: 'AddAdmin', path: '/addAdmin' }
];

export default function BasicSpeedDial() {
  const navigate = useNavigate(); 

  const handleActionClick = (path) => {
    navigate(path); 
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon openIcon={<GroupAddIcon />} />}
        direction="left"
        FabProps={{ size: 'small' }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.path)}
          />

        ))}

      </SpeedDial>
    </>
  );
}
