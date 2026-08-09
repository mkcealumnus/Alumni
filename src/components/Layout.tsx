import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ContactFooter from './ContactFooter';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ContactFooter />
    </>
  );
};

export default Layout;
