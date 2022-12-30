import React from 'react';

import { NavLink } from 'react-router-dom';
import headerMenu from './header-menu';
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import s from './headers.module.scss';

export const Headers = () => {
  const elements = headerMenu.map(({ name, to }) => (
    <NavLink key={name} to={to} end>
      {name}
    </NavLink>
  ));

  return (
    <>
      <AppBar className={s.links}>
        <Toolbar>
          <Typography variant="h4">Test App</Typography>
          {/* <Menu
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem key="1">
              <Typography textAlign="center">Page</Typography>
            </MenuItem>
          </Menu> */}
          {elements}
        </Toolbar>
      </AppBar>
    </>
  );
};

// Headers.propTypes = {};

export default Headers;
