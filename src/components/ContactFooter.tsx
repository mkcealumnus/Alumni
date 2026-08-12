import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Network } from 'lucide-react';

const ContactFooter: React.FC = () => {
  return (
    <footer className="contact-footer" id="contact">
      <div className="container">
        <div className="contact-section">
          <div className="contact-content">
            <h2 className="section-title">Let's Connect</h2>
            <p className="section-subtitle-large">Ready to start your project?</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              Tell us what you're building. We'll help you turn your idea into a polished digital experience.
            </p>
            
            <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p><strong>Email:</strong> <a href="mailto:signbridge.aiauto@gmail.com" style={{ color: 'var(--color-primary)' }}>signbridge.aiauto@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919842253267" style={{ color: 'var(--color-primary)' }}>+91 98422 53267</a></p>
              <p><strong>Office:</strong> 188/2 KokkarayanPettai, Erode</p>
            </div>
          </div>
          
          <div className="contact-form-card glass-card">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" placeholder="+91 98422 53267" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="details">Project Requirements</label>
                <textarea id="details" rows={4} placeholder="Tell us about your project goals and requirements..." required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message <Send size={18} style={{ marginLeft: '8px' }} />
              </button>
            </form>
          </div>
        </div>

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
              <Link to="/#contact">Get in Touch</Link>
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
