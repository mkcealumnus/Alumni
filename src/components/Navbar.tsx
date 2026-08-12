import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Network, Menu, X, ChevronDown } from 'lucide-react';
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
          
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">Platform <ChevronDown size={14} /></button>
            <div className="nav-dropdown-menu">
              <NavLink to="/platform" onClick={closeMenu}>Platform Overview</NavLink>
              <NavLink to="/solutions" onClick={closeMenu}>Solutions</NavLink>
              <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
              <NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink>
            </div>
          </div>

          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">Developers <ChevronDown size={14} /></button>
            <div className="nav-dropdown-menu">
              <NavLink to="/developers" onClick={closeMenu}>Documentation</NavLink>
              <NavLink to="/security" onClick={closeMenu}>Security</NavLink>
              <NavLink to="/research" onClick={closeMenu}>Research</NavLink>
              <NavLink to="/labs" onClick={closeMenu}>Innovation Labs</NavLink>
            </div>
          </div>

          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">Company <ChevronDown size={14} /></button>
            <div className="nav-dropdown-menu">
              <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
              <NavLink to="/careers" onClick={closeMenu}>Careers</NavLink>
              <NavLink to="/customers" onClick={closeMenu}>Customers</NavLink>
              <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </div>
          </div>

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
