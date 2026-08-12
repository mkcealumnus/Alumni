import PageHeader from '../components/PageHeader';

const AboutPage = () => {
  return (
    <div className="about-page">
      <PageHeader 
        title="Engineering the future of enterprise AI." 
        subtitle="Bridging academic research and production." 
        badge="ABOUT SIGNBRIDGE" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        
        {/* Stats Row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '4rem', flexWrap: 'wrap', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>2024</h2>
            <p style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>Founded</p>
          </div>
          <div>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>$40M</h2>
            <p style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>Funding</p>
          </div>
          <div>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>45+</h2>
            <p style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>Engineers</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card" style={{ padding: '3rem', marginBottom: '4rem' }}>
          <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>System Initialization</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ color: 'var(--color-secondary)', fontWeight: 'bold', minWidth: '100px' }}>2024 Q1</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>The Initial Idea</h4>
                <p style={{ color: 'var(--color-text-secondary)' }}>Conceived the foundational architecture for secure enterprise AI infrastructure.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ color: 'var(--color-secondary)', fontWeight: 'bold', minWidth: '100px' }}>2026 Q1</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Company Initiated</h4>
                <p style={{ color: 'var(--color-text-secondary)' }}>Operations started, assembling our core engineering team.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ color: 'var(--color-primary)', fontWeight: 'bold', minWidth: '100px' }}>Present</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Developing Aventrea.me</h4>
                <p style={{ color: 'var(--color-text-secondary)' }}>Building our child company: a living digital identity and agent platform.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="bento-card glass-card">
            <h3>Performance Absolute</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem' }}>We engineer systems close to the metal to ensure maximum throughput and minimum latency.</p>
          </div>
          <div className="bento-card glass-card">
            <h3>Zero-Trust Security</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem' }}>Trust nothing by default. Every microservice and endpoint is rigorously authenticated and encrypted.</p>
          </div>
          <div className="bento-card glass-card">
            <h3>Data Sovereignty</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem' }}>Your data never leaves your environment. We build systems that respect enterprise perimeters.</p>
          </div>
          <div className="bento-card glass-card">
            <h3>Scalable by Default</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem' }}>From day zero, architectures are designed to handle massive, distributed workloads.</p>
          </div>
        </div>

        {/* Leadership & Presence */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <div className="glass-card" style={{ flex: '1 1 400px', padding: '3rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Leadership</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li>
                <strong>Jayanthan Senthilkumar</strong><br />
                <span style={{ color: 'var(--color-text-secondary)' }}>Founder, CEO & Lead Software Director</span>
              </li>
              <li>
                <strong>Surya V M</strong><br />
                <span style={{ color: 'var(--color-text-secondary)' }}>Co-Founder</span>
              </li>
              <li>
                <span style={{ color: 'var(--color-primary)' }}>Open Positions</span><br />
                <span style={{ color: 'var(--color-text-secondary)' }}>CTO, CMO, Associate Manager</span>
              </li>
            </ul>
          </div>
          <div className="glass-card" style={{ flex: '1 1 300px', padding: '3rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Global Presence</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li>
                <strong>San Francisco</strong><br />
                <span style={{ color: 'var(--color-text-secondary)' }}>Global Headquarters</span>
              </li>
              <li>
                <strong>London</strong><br />
                <span style={{ color: 'var(--color-text-secondary)' }}>European Engineering Hub</span>
              </li>
              <li>
                <strong>Singapore</strong><br />
                <span style={{ color: 'var(--color-text-secondary)' }}>APAC Operations</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
