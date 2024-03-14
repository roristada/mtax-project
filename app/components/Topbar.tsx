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
      <div className="flex justify-end">
        
        <div className="flex justify-end">
        <IconButton>
            <PersonIcon/>
        </IconButton>
        <IconButton>
            <ChatIcon/>
        </IconButton>
        </div>
      </div>
    </main>
  );
};

export default Topbar;
