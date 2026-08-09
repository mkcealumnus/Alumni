import PageHeader from '../components/PageHeader';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomersPage = () => {
  return (
    <div className="customers-page">
      <PageHeader 
        title="Trusted by Leaders" 
        subtitle="SignBridge powers the most demanding workloads across Fortune 500 enterprises and hyper-growth startups." 
        badge="CUSTOMERS & OUTCOMES" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>40x</h2>
            <h4 style={{ marginBottom: '1rem' }}>Decrease in Inference Latency</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>A leading Tier-1 bank migrated their internal coding assistant to our bare-metal infrastructure, drastically reducing response times for 10,000+ developers.</p>
            <div style={{ marginTop: '1.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--color-secondary)' }}>Financial Services</div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Zero</h2>
            <h4 style={{ marginBottom: '1rem' }}>Data Egress</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>A global healthcare provider successfully analyzed 5 million unstructured patient records inside a secure VPC using our on-premise NLP pipelines.</p>
            <div style={{ marginTop: '1.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--color-secondary)' }}>Healthcare & Life Sciences</div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>1.5M</h2>
            <h4 style={{ marginBottom: '1rem' }}>Requests per Minute</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>An enterprise e-commerce platform utilizes our distributed tensor runtime for real-time product reasoning during peak holiday traffic.</p>
            <div style={{ marginTop: '1.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--color-secondary)' }}>Global E-Commerce</div>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Ready to achieve similar outcomes?</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>Book a Demo <ArrowUpRight size={18} /></Link>
            <Link to="/developers" className="btn btn-outline">Read the Docs</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomersPage;
