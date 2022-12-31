import React from 'react';

import { NavLink } from 'react-router-dom';
import headerMenu from './header-menu';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import s from './header.module.scss';

export const Header = () => {
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

export default Header;
