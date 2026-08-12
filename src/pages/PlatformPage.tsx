import PageHeader from '../components/PageHeader';
import { Server, Database, Shield, Cpu, Zap, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlatformPage = () => {
  return (
    <div className="platform-page">
      <PageHeader 
        title="SignBridge Platform" 
        subtitle="The unified infrastructure for enterprise intelligence. Bare-metal performance with modern abstractions." 
        badge="INFRASTRUCTURE" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          
          <div className="bento-card glass-card card-glow-primary">
            <div className="bento-icon-wrapper"><Server size={24} className="text-primary" /></div>
            <h3>Distributed Compute</h3>
            <p>Our hybrid cloud architecture provides resilient, elastic compute spanning across AWS, GCP, and specialized bare-metal GPU clusters for demanding AI workloads.</p>
            <ul style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', listStylePosition: 'inside' }}>
              <li>Auto-scaling inference endpoints</li>
              <li>Multi-region redundancy</li>
              <li>Dedicated tenant clusters</li>
            </ul>
          </div>

          <div className="bento-card glass-card card-glow-secondary">
            <div className="bento-icon-wrapper"><Database size={24} className="text-primary" /></div>
            <h3>High-Speed Storage</h3>
            <p>Petabyte-scale, high-throughput storage optimized for massive vector databases and unstructured enterprise data lakes.</p>
            <ul style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', listStylePosition: 'inside' }}>
              <li>Distributed vector indexing</li>
              <li>Sub-millisecond retrieval</li>
              <li>Automated data tiering</li>
            </ul>
          </div>

          <div className="bento-card glass-card card-glow-primary">
            <div className="bento-icon-wrapper"><Shield size={24} className="text-primary" /></div>
            <h3>Secure Networking</h3>
            <p>Zero-trust architecture ensuring that your data in transit and at rest remains entirely within your control.</p>
            <ul style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', listStylePosition: 'inside' }}>
              <li>End-to-end TLS 1.3 encryption</li>
              <li>VPC Peering & PrivateLink</li>
              <li>Bring Your Own Key (BYOK)</li>
            </ul>
          </div>

          <div className="bento-card glass-card card-glow-secondary">
            <div className="bento-icon-wrapper"><Cpu size={24} className="text-primary" /></div>
            <h3>Hardware Acceleration</h3>
            <p>Custom CUDA kernels and optimized tensor runtimes extract maximum performance from NVIDIA hardware.</p>
          </div>

          <div className="bento-card glass-card card-glow-primary">
            <div className="bento-icon-wrapper"><Zap size={24} className="text-primary" /></div>
            <h3>Real-Time Event Bus</h3>
            <p>High-throughput message brokers enabling complex multi-agent architectures and event-driven microservices.</p>
          </div>

          <div className="bento-card glass-card card-glow-secondary">
            <div className="bento-icon-wrapper"><Network size={24} className="text-primary" /></div>
            <h3>Edge Synchronization</h3>
            <p>Seamlessly deploy lightweight models and data sync protocols to IoT and edge devices.</p>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Ready to scale your intelligence?</h2>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Book a Technical Demo</Link>
        </div>
      </div>
    </div>
  );
};

export default PlatformPage;
