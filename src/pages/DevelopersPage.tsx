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
          
          <div className="bento-card glass-card">
            <div className="bento-icon-wrapper"><Terminal size={24} className="text-primary" /></div>
            <h3>SignBridge CLI</h3>
            <p>Manage deployments, environments, and secrets directly from your terminal.</p>
            <div style={{ marginTop: '1rem', background: '#000', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', color: '#0f0' }}>
              $ npm install -g signbridge-cli<br />
              $ signbridge deploy --env prod
            </div>
          </div>

          <div className="bento-card glass-card">
            <div className="bento-icon-wrapper"><Code size={24} className="text-primary" /></div>
            <h3>Native SDKs</h3>
            <p>Type-safe libraries for Python, Node.js, and Go. Seamlessly integrate our models and services.</p>
            <div style={{ marginTop: '1rem', background: '#000', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', color: '#a5d6ff' }}>
              import { '{' } SignBridgeClient { '}' } from '@signbridge/sdk';<br /><br />
              const client = new SignBridgeClient(key);<br />
              await client.inference.create(...);
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
