import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className={`flex-grow-1 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
