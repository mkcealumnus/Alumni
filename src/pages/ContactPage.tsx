import React from 'react';
import PageHeader from '../components/PageHeader';
import { Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <PageHeader 
        title="Let's build something together." 
        subtitle="Contact our team to turn your ideas into a polished digital experience." 
        badge="CONTACT US" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
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
          
          <div className="contact-form-card glass-card" style={{ padding: '2.5rem' }}>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Name</label>
                <input type="text" id="name" placeholder="John Doe" required style={{ width: '100%' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
                <input type="email" id="email" placeholder="john@example.com" required style={{ width: '100%' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Phone Number</label>
                <input type="text" id="phone" placeholder="+91 98422 53267" required style={{ width: '100%' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="details" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Project Requirements</label>
                <textarea id="details" rows={4} placeholder="Tell us about your project goals and requirements..." required style={{ width: '100%' }}></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn" style={{ width: '100%' }}>
                Send Message <Send size={18} style={{ marginLeft: '8px' }} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
