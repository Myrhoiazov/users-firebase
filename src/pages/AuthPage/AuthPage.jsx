import { Container } from '@mui/system';
import React from 'react';
// import s from './AuthPage.module.scss';

const AuthPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div>Login and registration</div>
    </Container>
  );
};

export default AuthPage;
