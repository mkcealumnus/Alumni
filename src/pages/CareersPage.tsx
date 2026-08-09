import PageHeader from '../components/PageHeader';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareersPage = () => {
  return (
    <div className="careers-page">
      <PageHeader 
        title="Build the future of enterprise tech." 
        subtitle="We are looking for engineers with technical depth, high agency, and pragmatic execution." 
        badge="CAREERS" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>45+</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Team Members</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>3</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Global Offices</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>100%</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Engineer-Led</p>
          </div>
        </div>

        <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Open Positions</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', transition: 'background 0.3s ease', cursor: 'pointer' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Senior Software Engineer (Full-Stack)</h4>
              <p style={{ color: 'var(--color-text-secondary)' }}>Core Engineering &bull; San Francisco / Remote</p>
            </div>
            <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Apply <ArrowRight size={16}/></Link>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', transition: 'background 0.3s ease', cursor: 'pointer' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Lead AI Infrastructure Architect</h4>
              <p style={{ color: 'var(--color-text-secondary)' }}>Platform &bull; London / Remote</p>
            </div>
            <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Apply <ArrowRight size={16}/></Link>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', transition: 'background 0.3s ease', cursor: 'pointer' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Cloud Infrastructure Engineer</h4>
              <p style={{ color: 'var(--color-text-secondary)' }}>Cloud & DevOps &bull; San Francisco / Remote</p>
            </div>
            <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Apply <ArrowRight size={16}/></Link>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', transition: 'background 0.3s ease', cursor: 'pointer' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Chief Technology Officer (CTO)</h4>
              <p style={{ color: 'var(--color-text-secondary)' }}>Leadership &bull; Singapore</p>
            </div>
            <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Apply <ArrowRight size={16}/></Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CareersPage;
