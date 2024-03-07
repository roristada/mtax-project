import { Box } from "@mui/material";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Topbar = () => {
  return (
    <main className="mb-5">
      <div className="flex justify-between">
        <div className="flex rounded-md bg-slate-300">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex">
        <IconButton>
            <PersonIcon/>
        </IconButton>
        <IconButton>
            <NotificationsIcon/>
        </IconButton>
        <IconButton>
            <ChatIcon/>
        </IconButton>
        <IconButton>
            <SettingsIcon/>
        </IconButton>
        </div>
      </div>
    </main>
  );
};

export default Topbar;
