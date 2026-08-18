import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Network, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme based on saved preference or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
          
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">Platform <ChevronDown size={14} /></button>
            <div className="nav-dropdown-menu">
              <NavLink to="/platform" onClick={closeMenu}>Platform Overview</NavLink>
              <NavLink to="/solutions" onClick={closeMenu}>Solutions</NavLink>
              <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
              <NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink>
            </div>
          </div>

          <Link to="/#portfolio" onClick={closeMenu}>Portfolio</Link>

          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">Why Us <ChevronDown size={14} /></button>
            <div className="nav-dropdown-menu">
              <Link to="/#why-choose-us" onClick={closeMenu}>Why Choose Us</Link>
              <Link to="/#process" onClick={closeMenu}>Our Process</Link>
              <Link to="/#reviews" onClick={closeMenu}>Reviews</Link>
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
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme" title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/contact" className="btn btn-primary start-project-btn" onClick={closeMenu}>Start Your Project</Link>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
