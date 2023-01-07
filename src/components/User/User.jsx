import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';

const User = ({ user, id }) => {
  return (
    <Card sx={{ minWidth: 300 }} key={id}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{
                width: 56,
                height: 56,
                objectFit: 'cover',
                objectPosition: 'center',
                marginRight: '10px',
                bgcolor: deepOrange[500],
              }}
            >
              {user.name[0]}
            </Avatar>
            <Typography gutterBottom variant="h5" component="div">
              {user.name} {user.secondName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ mr: 2, fontWeight: '700' }}
              variant="body2"
              color="text.secondary"
            >
              Email:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ mr: 2, fontWeight: '700' }}
              variant="body2"
              color="text.secondary"
            >
              День народження:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.birthYear}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ mr: 2, fontWeight: '700' }}
              variant="body2"
              color="text.secondary"
            >
              Телефон:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.tel}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default User;
