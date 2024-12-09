import * as React from 'react';
import { Avatar, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import '../css/AccountMenu.css';

interface AccountMenuProps {
  userInfo: {
    username: string | null;
    avatarUrl: string | null;
  } | null;
  handleLogout: () => void;
}

export default function AccountMenu({
  userInfo,
  handleLogout,
}: AccountMenuProps) {
  // <null | HTMLElement> is the type syntax for useState; HTMLElement is required for the event object
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id='account-menu-container'>
      <Tooltip title='Account settings'>
        <IconButton
          id='btn-github-icon' // mui element
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          {/* <span style={{ fontSize: '1rem', fontWeight: 'bold' }}> */}
          <span id='user-greeting'>Hello, {userInfo?.username || 'Guest'}</span>
          <Avatar
            id='avatar'
            src={userInfo?.avatarUrl || undefined}
            alt={userInfo?.username || 'Avatar'}
          >
            {userInfo?.username?.charAt(0) || 'U'}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id='dropdown-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem id='link-profile' onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem id='link-dashboard' onClick={handleClose}>
          Dashboard
        </MenuItem>
        <MenuItem
          id='link-logout'
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          LOGOUT
        </MenuItem>
      </Menu>
    </div>
  );
}
