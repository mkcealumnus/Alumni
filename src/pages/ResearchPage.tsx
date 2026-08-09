import PageHeader from '../components/PageHeader';
import { Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResearchPage = () => {
  return (
    <div className="research-page">
      <PageHeader 
        title="SignBridge Research" 
        subtitle="Pushing the boundaries of model efficiency, reasoning, and enterprise alignment." 
        badge="R&D" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        
        <h2 style={{ marginBottom: '2rem' }}>Open Source Contributions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          <div className="bento-card glass-card">
            <h3>SignBridge-Core-8B</h3>
            <p style={{ color: 'var(--color-text-secondary)', margin: '1rem 0' }}>Our foundational 8-billion parameter language model, pre-trained on 3T tokens with a focus on enterprise code and highly regulated data processing.</p>
            <Link to="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>View on Hugging Face <ExternalLink size={16} /></Link>
          </div>

          <div className="bento-card glass-card">
            <h3>Agent-Orchestrator</h3>
            <p style={{ color: 'var(--color-text-secondary)', margin: '1rem 0' }}>An open-source TypeScript and Python framework for routing complex multi-turn logic across a swarm of specialized local and cloud agents.</p>
            <Link to="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>View on GitHub <ExternalLink size={16} /></Link>
          </div>

        </div>

        <h2 style={{ marginBottom: '2rem' }}>Technical Reports</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
             <div>
               <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Scaling Laws for Enterprise Retrieval-Augmented Generation</h4>
               <p style={{ color: 'var(--color-text-secondary)' }}>Published: Oct 2025</p>
             </div>
             <Link to="#" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Download size={16} /> Download PDF</Link>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
             <div>
               <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>KV-Cache Quantization for Multi-Turn Reasoning</h4>
               <p style={{ color: 'var(--color-text-secondary)' }}>Published: June 2025</p>
             </div>
             <Link to="#" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Download size={16} /> Download PDF</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ResearchPage;
