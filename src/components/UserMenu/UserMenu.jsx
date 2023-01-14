import { Avatar, Box, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import UserContext from 'components/context/UserProvider';
import React, { useContext } from 'react';
import { deepOrange } from '@mui/material/colors';

const UserMenu = () => {
  const { userEmail, logout } = useContext(UserContext);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        src={userEmail ?? null}
        sx={{
          width: 36,
          height: 36,
          objectFit: 'cover',
          objectPosition: 'center',
          marginRight: '10px',
          bgcolor: deepOrange[500],
        }}
      >
        {userEmail[0].toUpperCase()}
      </Avatar>
      <Typography
        sx={{
          marginRight: '10px',
        }}
      >
        {userEmail}
      </Typography>
      <IconButton color="inherit" aria-label="exit" onClick={logout}>
        <LogoutIcon color="inherit" />
      </IconButton>
    </Box>
  );
};

export default UserMenu;
