import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function AccountMenu({ userInfo, handleLogout}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

	return (
		<div>
			<Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
						<span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
							Hello, {userInfo?.username || 'Guest'}
						</span>
						<Avatar
							sx={{ width: 80, height: 80 }}
							src={userInfo?.avatarUrl}
							alt={userInfo?.username}
						>
							{userInfo?.username?.charAt(0) || 'U'}
						</Avatar>
          </IconButton>
        </Tooltip>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>Dashboard</MenuItem>
					<MenuItem onClick={() => {
						handleLogout();
						handleClose();
						}}>LOGOUT</MenuItem>
				</Menu>
		</div>
	)
}