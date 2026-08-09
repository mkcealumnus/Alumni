import PageHeader from '../components/PageHeader';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <PageHeader 
        title="Transparent Pricing" 
        subtitle="From consumption-based API access to custom enterprise engagements." 
        badge="PRICING" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>API & Cloud Infrastructure</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Developer</h3>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>$0<span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/mo</span></h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--color-text-secondary)', flex: 1 }}>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Access to SignBridge-Core-8B</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> 8K Context Window</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> 60 Requests / minute</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Community Support</li>
            </ul>
            <Link to="/contact" className="btn btn-outline" style={{ textAlign: 'center' }}>Get Started Free</Link>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', border: '1px solid rgba(99,102,241,0.5)', transform: 'scale(1.05)', zIndex: 1, boxShadow: '0 0 30px rgba(99,102,241,0.1)' }}>
            <div style={{ background: 'var(--color-primary)', color: 'white', fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '20px', alignSelf: 'flex-start', marginBottom: '1rem' }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Scale</h3>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>$250<span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/mo</span></h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--color-text-secondary)', flex: 1 }}>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Pay-as-you-go tokens</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> 32K Context Window</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Dedicated Routing</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Advanced WAF</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> 24/7 Priority Support</li>
            </ul>
            <Link to="/contact" className="btn btn-primary" style={{ textAlign: 'center' }}>Scale Now</Link>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enterprise</h3>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Custom</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--color-text-secondary)', flex: 1 }}>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Bare-Metal VPC</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Unlimited Context</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> SOC2 / HIPAA / GDPR</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}><Check size={18} className="text-primary" /> Dedicated TAM</li>
            </ul>
            <Link to="/contact" className="btn btn-outline" style={{ textAlign: 'center' }}>Contact Sales</Link>
          </div>
          
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.05)', marginBottom: '5rem' }} />

        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Consulting & Engineering Retainers</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>For custom LLM fine-tuning, architecture reviews, and full-stack enterprise platform development.</p>
        
        <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
           <h3 style={{ marginBottom: '1.5rem' }}>Engagement Model</h3>
           <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>Our consulting engagements start with a 1-2 week Discovery & Architecture phase, followed by milestone-based production engineering. Rates are assessed per project scope.</p>
           <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Request Architecture Review</Link>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
