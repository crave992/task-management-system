import { MenuItem, Menu, Button, ListItemIcon } from '@mui/material';
import LogoutButton from '@/components/buttons/LogoutButton';
import TopMenu from '@/components/menus/TopMenu';
import { User } from '@/interfaces/User';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import AccountCircleIcon
import SettingsIcon from '@mui/icons-material/Settings'; // Import SettingsIcon

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const parsedUserData: User = JSON.parse(userDataString);
      setUser(parsedUserData);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-cyan-500 px-3 py-5">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-50">Task Management System</h1>
        <TopMenu />
        <div>
          <Button aria-controls="user-menu" aria-haspopup="true" sx={{color: "#fff"}} onClick={handleClick}>
            {user?.first_name} {user?.last_name}
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* Add additional menu items as needed */}
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <LogoutButton />
              </ListItemIcon>
            </MenuItem>

          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
