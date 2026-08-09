import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Network, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <Network className="logo-icon" size={28} />
          <span className="logo-text">SignBridge</span>
        </Link>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <NavLink to="/services" onClick={closeMenu} className={({isActive}) => isActive ? 'active-nav-link' : ''}>Services</NavLink>
          <NavLink to="/labs" onClick={closeMenu} className={({isActive}) => `highlight-link ${isActive ? 'active-nav-link' : ''}`}>SignBridge Labs</NavLink>
          <NavLink to="/technology" onClick={closeMenu} className={({isActive}) => isActive ? 'active-nav-link' : ''}>Technology</NavLink>
          <NavLink to="/solutions" onClick={closeMenu} className={({isActive}) => isActive ? 'active-nav-link' : ''}>Solutions</NavLink>
          <NavLink to="/about" onClick={closeMenu} className={({isActive}) => isActive ? 'active-nav-link' : ''}>About</NavLink>
        </div>

        <div className="navbar-actions">
          <button className="btn btn-primary start-project-btn">Start Your Project</button>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
