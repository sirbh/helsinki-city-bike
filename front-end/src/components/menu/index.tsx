import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { AddCircleOutlineSharp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

interface AccountMenuProps {
  name: string;
  username: string;
}

export default function AccountMenu({ name, username }: AccountMenuProps) {
  const { setUserDetails } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: deepPurple[500] }}>
              {name.split('')[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px 0px',
          }}
        >
          <Avatar sx={{ width: 42, height: 42, bgcolor: deepPurple[500] }}>
            {name.split('')[0]}
          </Avatar>
          <Typography variant="body1" textAlign="center">
            {name}
          </Typography>
          <Typography variant="body2" color="grey">
            {username}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AddCircleOutlineSharp fontSize="small" />
          </ListItemIcon>
          Add another station
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (setUserDetails) {
              setUserDetails(undefined);
            }
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
