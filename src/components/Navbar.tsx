import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Network, Menu, X } from 'lucide-react';

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
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/#services" onClick={closeMenu}>Services</Link>
          <Link to="/#why-choose-us" onClick={closeMenu}>Why Choose Us</Link>
          <Link to="/#portfolio" onClick={closeMenu}>Portfolio</Link>
          <Link to="/#process" onClick={closeMenu}>Process</Link>
          <Link to="/#reviews" onClick={closeMenu}>Reviews</Link>
          <Link to="/#contact" onClick={closeMenu}>Get in Touch</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/#contact" className="btn btn-primary start-project-btn" onClick={closeMenu}>Start Your Project</Link>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
