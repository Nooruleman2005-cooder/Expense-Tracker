import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './Home';
import AddExpence from './AddExpence';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import AddTransaction from './AddTransaction';
import Transactions from './Transactions';
import AuthWrapper from './AuthWrapper';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-expense" element={<AddExpence />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/add-trans' element={<AddTransaction />} />
      <Route path='/trans' element={<Transactions />} />
      <Route path='/Wrap' element={<AuthWrapper />} />
    </Route>
  )
);

const Main = () => {
  return <RouterProvider router={router} />;
};

export default Main;
