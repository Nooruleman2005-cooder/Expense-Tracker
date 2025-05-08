import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AuthWrapper from './AuthWrapper';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <AuthWrapper />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout