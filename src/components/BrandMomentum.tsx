import React from 'react';
import { Target, Zap, Eye, Layout } from 'lucide-react';

const BrandMomentum: React.FC = () => {
  return (
    <section className="brand-momentum section-padding" id="brand-momentum" style={{ background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Column: Brand Strategy info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              <span>🚀</span> BRAND MOMENTUM
            </div>
            
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2', color: 'var(--color-text-primary)', margin: 0 }}>
              Growth-led design strategy
            </h2>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', fontWeight: '500', margin: 0 }}>
              When your brand is built to lead, every launch looks more confident and more compelling.
            </p>
            
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>
              We help your brand outpace competitors by creating premium digital experiences that feel established, purposeful, and easy to trust.
            </p>
            
            {/* Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Target size={20} style={{ color: 'var(--color-primary)', marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Built for growth</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Engineered to convert.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Zap size={20} style={{ color: 'var(--color-secondary)', marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Launch fast, scale faster</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Rapid iteration cycle.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Eye size={20} style={{ color: 'var(--color-primary)', marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Clarity first</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Zero bloat, focused content.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Layout size={20} style={{ color: 'var(--color-secondary)', marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Structured & strong</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Simplified layouts.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Featured Metric Card */}
          <div className="glass-card card-glow-primary" style={{ padding: '3rem', border: '1px solid var(--color-border)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '99px', background: 'rgba(var(--color-primary-rgb), 0.08)', border: '1px solid rgba(var(--color-primary-rgb), 0.15)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
              Featured conversion
            </div>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Conversion</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
              Precision-crafted pages that earn attention and keep visitors moving. Every section is designed to reduce friction, showcase value, and support decisions with visual confidence.
            </p>
            
            {/* Metric Displays */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                background: 'rgba(16, 185, 129, 0.04)', 
                border: '1px solid rgba(16, 185, 129, 0.1)', 
                padding: '1.25rem 2rem', 
                borderRadius: '16px',
                flex: '1 1 180px' 
              }}>
                <span style={{ fontSize: '2.75rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'var(--font-display)', lineHeight: '1' }}>38%</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '600', marginTop: '0.5rem' }}>Uplift in clarity</span>
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                background: 'rgba(6, 182, 212, 0.04)', 
                border: '1px solid rgba(6, 182, 212, 0.1)', 
                padding: '1.25rem 2rem', 
                borderRadius: '16px',
                flex: '1 1 180px' 
              }}>
                <span style={{ fontSize: '2.75rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'var(--font-display)', lineHeight: '1' }}>24/7</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '600', marginTop: '0.5rem' }}>Support-ready</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BrandMomentum;
