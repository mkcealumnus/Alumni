import PageHeader from '../components/PageHeader';
import { HeartPulse, Landmark, Rocket, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsPage = () => {
  return (
    <div className="solutions-page">
      <PageHeader 
        title="Industry Solutions" 
        subtitle="Built for Scale. Tailored tech solutions for highly regulated sectors." 
        badge="SOLUTIONS" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Healthcare */}
          <div className="solution-section" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <HeartPulse size={32} className="text-primary" />
                <h2>Healthcare & Life Sciences</h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                HIPAA-compliant AI systems for patient data analysis, diagnostic assistance, and clinical workflow automation. We deploy localized models to ensure zero data egress from your hospital network.
              </p>
              <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                <li>• Automated Clinical Documentation</li>
                <li>• Medical Imaging Analysis Pipelines</li>
                <li>• EMR/EHR Systems Integration</li>
              </ul>
            </div>
            <div className="glass-card" style={{ flex: '1 1 400px', background: 'linear-gradient(145deg, var(--color-secondary-glow) 0%, var(--color-bg-card) 100%)', border: '1px solid var(--color-border)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><Activity size={24} className="text-secondary" /> <h4>Compliance First</h4></div>
               <p style={{ color: 'var(--color-text-secondary)' }}>Full PHI redaction modules and SOC2/HIPAA certified deployment architectures.</p>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--color-border)' }} />

          {/* Finance */}
          <div className="solution-section" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Landmark size={32} className="text-primary" />
                <h2>Financial Services</h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                High-throughput, low-latency reasoning engines for fraud detection, algorithmic trading insights, and automated compliance reporting.
              </p>
              <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                <li>• Unstructured Financial Document Parsing</li>
                <li>• Predictive Risk Modeling</li>
                <li>• Secure Multi-Party Computation</li>
              </ul>
            </div>
            <div className="glass-card" style={{ flex: '1 1 400px', background: 'linear-gradient(145deg, var(--color-primary-glow) 0%, var(--color-bg-card) 100%)', border: '1px solid var(--color-border)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><ShieldCheck size={24} className="text-primary" /> <h4>Bank-Grade Security</h4></div>
               <p style={{ color: 'var(--color-text-secondary)' }}>End-to-end encryption, VPC peering, and strict RBAC controls to meet FINRA standards.</p>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--color-border)' }} />

          {/* Technology */}
          <div className="solution-section" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Rocket size={32} className="text-primary" />
                <h2>Technology & SaaS</h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Accelerate your product roadmap by embedding SignBridge's intelligence infrastructure directly into your SaaS applications.
              </p>
              <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                <li>• Agentic Co-pilots for your Users</li>
                <li>• Scalable Microservices Architecture</li>
                <li>• IoT Edge Connectivity</li>
              </ul>
            </div>
            <div className="glass-card" style={{ flex: '1 1 400px', background: 'linear-gradient(145deg, var(--color-primary-glow) 0%, var(--color-bg-card) 100%)', border: '1px solid var(--color-border)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}><Cpu size={24} className="text-primary" /> <h4>Developer Ready</h4></div>
               <p style={{ color: 'var(--color-text-secondary)' }}>RESTful APIs, WebSocket streams, and native SDKs for seamless integration.</p>
            </div>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Don't see your industry?</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>We build custom software systems for any domain.</p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Contact Solutions Architecture</Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
