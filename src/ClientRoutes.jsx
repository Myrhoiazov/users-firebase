import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';

const FormPage = lazy(() => import('./pages/FormPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));

const ClientRoutes = () => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Suspense>
  );
};

export default ClientRoutes;
