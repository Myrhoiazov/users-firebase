import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';

const CartPage = lazy(() => import('./pages/CartPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));

const ClientRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Suspense>
  );
};

export default ClientRoutes;
