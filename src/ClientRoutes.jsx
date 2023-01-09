import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';

const FormPage = lazy(() => import('./pages/FormPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const ClientRoutes = () => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<FormPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default ClientRoutes;
