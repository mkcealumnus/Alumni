import PageHeader from '../components/PageHeader';
import { Users, Briefcase, FileText, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyPage = () => {
  return (
    <div className="company-page">
      <PageHeader 
        title="Our Mission" 
        subtitle="Democratize enterprise AI by providing robust, scalable, secure infrastructure." 
        badge="COMPANY" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <div className="bento-card glass-card" style={{ height: '100%', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
              <div className="bento-icon-wrapper"><Users size={24} className="text-primary" /></div>
              <h3 style={{ color: 'var(--color-text-primary)' }}>About Us</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Learn about our founding timeline, core principles, and leadership team.</p>
            </div>
          </Link>

          <Link to="/careers" style={{ textDecoration: 'none' }}>
            <div className="bento-card glass-card" style={{ height: '100%', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
              <div className="bento-icon-wrapper"><Briefcase size={24} className="text-secondary" /></div>
              <h3 style={{ color: 'var(--color-text-primary)' }}>Careers</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Join a team of 100% engineer-led innovators building the future of enterprise tech.</p>
            </div>
          </Link>

          <Link to="/blog" style={{ textDecoration: 'none' }}>
            <div className="bento-card glass-card" style={{ height: '100%', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
              <div className="bento-icon-wrapper"><FileText size={24} className="text-primary" /></div>
              <h3 style={{ color: 'var(--color-text-primary)' }}>Blog</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Read our engineering deep-dives, architecture patterns, and technical changelogs.</p>
            </div>
          </Link>

          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <div className="bento-card glass-card" style={{ height: '100%', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
              <div className="bento-icon-wrapper"><Send size={24} className="text-secondary" /></div>
              <h3 style={{ color: 'var(--color-text-primary)' }}>Contact</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Get in touch with our global offices in San Francisco, London, and Singapore.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
