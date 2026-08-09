import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Network } from 'lucide-react';
import './ContactFooter.css';

const ContactFooter: React.FC = () => {
  return (
    <footer className="contact-footer" id="about">
      <div className="container">
        <div className="contact-section">
          <div className="contact-content">
            <h2 className="section-title">Ready to Bridge Your Idea to Reality?</h2>
            <p className="section-subtitle-large">Let's architect your next web platform, AI system, or IoT solution.</p>
            
            <div className="contact-info">
              <p>Email: hello@signbridge.io</p>
              <p>Based in: San Francisco, CA</p>
            </div>
          </div>
          
          <div className="contact-form-card glass-card">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input type="text" id="organization" placeholder="Acme Corp" />
              </div>
              
              <div className="form-group">
                <label htmlFor="type">Project Type</label>
                <select id="type" required defaultValue="">
                  <option value="" disabled>Select a category...</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="ai">AI / Machine Learning</option>
                  <option value="iot">IoT / Smart Hardware</option>
                  <option value="saas">SaaS Platform</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="details">Project Details</label>
                <textarea id="details" rows={4} placeholder="Tell us about your project goals and requirements..." required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                Send Request <Send size={18} style={{ marginLeft: '8px' }} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <Network className="logo-icon" size={24} />
            <span className="logo-text">SignBridge</span>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <Link to="/services">Services</Link>
              <Link to="/labs">Labs</Link>
              <Link to="/technology">Technology</Link>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="#">Careers</Link>
              <Link to="/about">Contact</Link>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} SignBridge. Bridging Ideas with Technology.</p>
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
