import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';
// import { Avatar, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import '../css/AccountMenuAndOAuth.css';

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
  
  const navigate = useNavigate();

  return (
    <div id='account-menu-container'>
      <MenuTrigger>
        <Button id='btn-account' aria-label='Menu'>
          Hello, {userInfo?.username || 'Guest'}
          {/* <img id='avatar'
                     src={userInfo?.avatarUrl || undefined}
                     alt={userInfo?.username || 'Avatar'}
                   >
                     {userInfo?.username?.charAt(0) || 'U'}/> */}
        </Button>
        <Popover>
          <Menu id='menu-account'>
            <MenuItem className='menu-item' onAction={() => alert('profile')}>
              Profile
            </MenuItem>

            <MenuItem className='menu-item' onAction={() => navigate('/dashboard')}>
              Dashboard
            </MenuItem>
            <MenuItem className='menu-item' onAction={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </div>
  );
}

// {
//   <Tooltip title='Account settings'>
//         <IconButton
//           id='btn-github-icon' // mui element
//           onClick={handleClick}
//           aria-controls={open ? 'account-menu' : undefined}
//           aria-haspopup='true'
//           aria-expanded={open ? 'true' : undefined}
//         >
//       <span id='user-greeting'>Hello, {userInfo?.username || 'Guest'} style={{ fontSize: '1rem', fontWeight: 'bold' }}</span>
//           <Avatar
//             id='avatar'
//             src={userInfo?.avatarUrl || undefined}
//             alt={userInfo?.username || 'Avatar'}
//           >
//             {userInfo?.username?.charAt(0) || 'U'}
//           </Avatar>
//         </IconButton>
//       </Tooltip>
//       <Menu
//         id='dropdown-menu'
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem id='link-profile' onClick={handleClose}>
//           Profile
//         </MenuItem>
//         <MenuItem id='link-dashboard' onClick={handleClose}>
//           Dashboard
//         </MenuItem>
//         <MenuItem
//           id='link-logout'
//           onClick={() => {
//             handleLogout();
//             handleClose();
//           }}
//         >
//           LOGOUT
//         </MenuItem>
//       </Menu>
// }
