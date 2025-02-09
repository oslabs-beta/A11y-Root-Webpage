import { useNavigate } from 'react-router-dom';
import { AccountMenuProps } from '../types';
import '../css/AccountMenuAndOAuth.css';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';

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
          <img
            id='avatar'
            src={userInfo?.avatarUrl || undefined}
            alt={userInfo?.username || 'Avatar'}
          />
        </Button>
        <Popover>
          <Menu id='menu-account'>
            <MenuItem
              className='menu-item'
              onAction={() => navigate('/profile')}
            >
              Profile
            </MenuItem>
            <MenuItem
              className='menu-item'
              onAction={() => navigate('/dashboard')}
            >
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

// OLD CODE (to be cleaned up later):
// import { Avatar, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';

// <null | HTMLElement> is the type syntax for useState; HTMLElement is required for the event object
// const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
// const open = Boolean(anchorEl);

// const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//   setAnchorEl(event.currentTarget);
// };

// const handleClose = () => {
//   setAnchorEl(null);
// };

// {/* <img id='avatar'
//                    src={userInfo?.avatarUrl || undefined}
//                    alt={userInfo?.username || 'Avatar'}
//                  >
//                    {userInfo?.username?.charAt(0) || 'U'}
// 				</img> */}

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
