import PageHeader from '../components/PageHeader';
import { Code, Terminal, BookOpen, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

const DevelopersPage = () => {
  return (
    <div className="developers-page">
      <PageHeader 
        title="Build with SignBridge" 
        subtitle="APIs and SDKs designed by developers, for developers." 
        badge="DEVELOPERS" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          <div className="bento-card glass-card card-glow-primary">
            <div className="bento-icon-wrapper"><Terminal size={24} className="text-primary" /></div>
            <h3>SignBridge CLI</h3>
            <p style={{ marginBottom: '1.5rem' }}>Manage deployments, environments, and secrets directly from your terminal.</p>
            
            <div className="terminal-card">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', marginLeft: '0.25rem' }}>terminal</span>
              </div>
              <div className="terminal-body" style={{ color: '#34D399', whiteSpace: 'pre' }}>
$ npm install -g signbridge-cli
$ signbridge deploy --env prod
              </div>
            </div>
          </div>

          <div className="bento-card glass-card card-glow-secondary">
            <div className="bento-icon-wrapper"><Code size={24} className="text-primary" /></div>
            <h3>Native SDKs</h3>
            <p style={{ marginBottom: '1.5rem' }}>Type-safe libraries for Python, Node.js, and Go. Seamlessly integrate our models and services.</p>
            
            <div className="terminal-card">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', marginLeft: '0.25rem' }}>main.js</span>
              </div>
              <div className="terminal-body" style={{ color: '#2DD4BF', fontSize: '0.85rem', whiteSpace: 'pre' }}>
import {'{'} SignBridgeClient {'}'} from '@signbridge/sdk';

const client = new SignBridgeClient(key);
await client.inference.create(...);
              </div>
            </div>
          </div>
          
        </div>

        <div className="bento-card glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
           <BookOpen size={48} className="text-secondary" style={{ margin: '0 auto 1.5rem' }} />
           <h2>Extensive Documentation</h2>
           <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--color-text-secondary)' }}>
             From quickstart guides to advanced architecture patterns, our docs cover everything you need to build scalable intelligence.
           </p>
           <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
             <Link to="#" className="btn btn-primary">Read the Docs</Link>
             <Link to="#" className="btn btn-outline"><GitBranch size={16} style={{ marginRight: '8px' }} /> View GitHub</Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopersPage;
