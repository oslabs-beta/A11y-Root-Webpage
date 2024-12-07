import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface AccountMenuProps {
  userInfo: {
    username: string | null;
    avatarUrl: string | null;
  };
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
    <div>
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Hello, {userInfo?.username || 'Guest'}
          </span>
          <Avatar
            sx={{ width: 80, height: 80 }}
            src={userInfo?.avatarUrl || undefined}
            alt={userInfo?.username || 'Avatar'}
          >
            {userInfo?.username?.charAt(0) || 'U'}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Dashboard</MenuItem>
        <MenuItem
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
