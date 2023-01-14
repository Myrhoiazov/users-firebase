import { useContext } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { headerMenu, loginMenu } from './header-menu';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import s from './header.module.scss';
import UserContext from 'components/context/UserProvider';
import UserMenu from 'components/UserMenu';

export const Header = () => {
  const { isAuth } = useContext(UserContext);

  const authLinks = loginMenu.map(({ name, to }, index) => (
    <>
      <NavLink className={s.link} key={name} to={to} end>
        {name}
      </NavLink>
    </>
  ));

  const elements = headerMenu.map(({ name, to }, index) => (
    <>
      <NavLink className={s.link} key={index} to={to} end>
        {name}
      </NavLink>
    </>
  ));

  return (
    <>
      <AppBar className={s.links}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <Link className={s.link} to="/">
            <Typography variant="h4">Test App</Typography>
          </Link>
          <Box sx={{ marginLeft: 'auto' }}>{isAuth ? elements : authLinks}</Box>
          {isAuth && <UserMenu />}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
