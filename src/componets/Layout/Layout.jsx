// components/Layout.jsx
import React from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
