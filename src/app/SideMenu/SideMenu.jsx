"use client"
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ApartmentIcon from '@mui/icons-material/Apartment';

const SideMenu = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'All Employees', icon: <GroupIcon /> },
    { text: 'All Department', icon: <ApartmentIcon /> },
    { text: 'Attendance', icon: <CalendarTodayIcon /> },
    { text: 'Payroll', icon: <AccountBalanceWalletIcon /> },
    { text: 'Jobs', icon: <WorkIcon /> },
    { text: 'Candidates', icon: <PersonSearchIcon /> },
    { text: 'Leaves', icon: <EventAvailableIcon /> },
    { text: 'Holidays', icon: <BeachAccessIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          backgroundColor: '#F4F6F8',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          HRMS
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;


