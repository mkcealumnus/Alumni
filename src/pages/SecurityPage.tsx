import PageHeader from '../components/PageHeader';
import { Shield, Lock, FileKey, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityPage = () => {
  return (
    <div className="security-page">
      <PageHeader 
        title="Uncompromising Security" 
        subtitle="Military-grade encryption, zero-trust architecture, and strict compliance." 
        badge="SECURITY & TRUST" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          <div className="bento-card glass-card" style={{ textAlign: 'center' }}>
            <div className="bento-icon-wrapper" style={{ margin: '0 auto 1.5rem' }}><CheckCircle size={32} className="text-secondary" /></div>
            <h3>SOC 2 Type II</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Independently audited for security, availability, and confidentiality.</p>
          </div>

          <div className="bento-card glass-card" style={{ textAlign: 'center' }}>
            <div className="bento-icon-wrapper" style={{ margin: '0 auto 1.5rem' }}><Lock size={32} className="text-primary" /></div>
            <h3>End-to-End Encryption</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>TLS 1.3 in transit and AES-256 at rest across all storage tiers.</p>
          </div>

          <div className="bento-card glass-card" style={{ textAlign: 'center' }}>
            <div className="bento-icon-wrapper" style={{ margin: '0 auto 1.5rem' }}><Shield size={32} className="text-secondary" /></div>
            <h3>VPC Deployment</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Dedicated single-tenant instances ensuring zero data cross-contamination.</p>
          </div>

          <div className="bento-card glass-card" style={{ textAlign: 'center' }}>
            <div className="bento-icon-wrapper" style={{ margin: '0 auto 1.5rem' }}><FileKey size={32} className="text-primary" /></div>
            <h3>Bring Your Own Key (BYOK)</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Maintain ultimate cryptographic control over your enterprise data.</p>
          </div>

        </div>

        <div className="glass-card" style={{ padding: '3rem', border: '1px solid var(--color-border)', background: 'linear-gradient(145deg, var(--color-secondary-glow) 0%, var(--color-bg-card) 100%)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Data Sovereignty Guarantee</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            We believe that your data is yours. SignBridge operates on a strict zero-retention policy for our enterprise inference APIs. We do not use your proprietary data to train our foundational models.
          </p>
          <Link to="/contact" className="btn btn-outline" style={{ display: 'inline-block' }}>Request Security Whitepaper</Link>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
