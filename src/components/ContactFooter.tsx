import React from 'react';
import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';

const ContactFooter: React.FC = () => {
  return (
    <footer className="contact-footer">
      <div className="container">
        <div className="footer-bottom">
          <div style={{ maxWidth: '320px' }}>
            <div className="footer-logo">
              <Network className="logo-icon" size={24} />
              <span className="logo-text">SignBridge</span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '0.5rem' }}>
              SignBridge is a full-service creative technology startup building pixel-perfect digital solutions, intelligent applications, branding systems, and high-performance web experiences.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/#services">Services</Link>
              <Link to="/#why-choose-us">Why Choose Us</Link>
              <Link to="/#portfolio">Portfolio</Link>
              <Link to="/#process">Process</Link>
              <Link to="/#reviews">Reviews</Link>
              <Link to="/contact">Get in Touch</Link>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <Link to="/#services">Website Development</Link>
              <Link to="/#services">E-Commerce Solutions</Link>
              <Link to="/#services">Logo Design & Branding</Link>
              <Link to="/#services">Landing Pages</Link>
              <Link to="/#services">UI/UX Design</Link>
              <Link to="/#services">Website Maintenance</Link>
            </div>
            <div className="footer-column">
              <h4>Technology</h4>
              <Link to="/#technology">React</Link>
              <Link to="/#technology">Node.js</Link>
              <Link to="/#technology">Python</Link>
              <Link to="/#technology">Firebase</Link>
              <Link to="/#technology">MongoDB</Link>
              <Link to="/#technology">AI / ML</Link>
              <Link to="/#technology">Figma</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} SignBridge. All rights reserved. Professional web design and development startup.</p>
          <div className="social-links">
            <a href="#">GitHub</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
