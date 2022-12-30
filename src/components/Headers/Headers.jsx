import React from 'react';

import { NavLink } from 'react-router-dom';
import headerMenu from './header-menu';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import s from './headers.module.scss';

export const Headers = () => {
  const elements = headerMenu.map(({ name, to }) => (
    <NavLink className={s.link} key={name} to={to} end>
      {name}
    </NavLink>
  ));

  return (
    <>
      <AppBar className={s.links}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center'  }}>
          <Typography variant="h4">Test App</Typography>

          <Box sx={{ marginLeft: 'auto',  }}>{elements}</Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

// Headers.propTypes = {};

export default Headers;
