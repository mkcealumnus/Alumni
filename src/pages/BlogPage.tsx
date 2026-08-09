import PageHeader from '../components/PageHeader';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  return (
    <div className="blog-page">
      <PageHeader 
        title="Changelog & Thinking" 
        subtitle="Engineering deep dives, architecture patterns, and updates from the core team." 
        badge="ENGINEERING BLOG" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        
        <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Featured Post</h3>
        <div className="glass-card" style={{ padding: '3rem', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(99,102,241,0.3)', background: 'linear-gradient(145deg, rgba(99,102,241,0.1) 0%, rgba(10,10,12,0.8) 100%)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--color-primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontWeight: 'bold' }}>Architecture &bull; Featured</span>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>August 12, 2026</span>
          </div>
          <h2 style={{ fontSize: '2rem' }}>The shift from monolithic LLMs to multi-agent systems</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '800px', lineHeight: '1.6' }}>
            Why relying on a single massive language model is an anti-pattern for complex enterprise workflows, and how to build resilient swarms of specialized, smaller agents for higher reliability and lower cost.
          </p>
          <Link to="#" className="btn btn-outline" style={{ alignSelf: 'flex-start', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Read Article <ArrowRight size={16}/></Link>
        </div>

        <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Recent Articles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Engineering</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>July 28, 2026</span>
            </div>
            <h4>Optimizing vector search for billion-scale datasets</h4>
            <Link to="#" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}><BookOpen size={16}/> Read More</Link>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Security</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>July 15, 2026</span>
            </div>
            <h4>SOC2 Compliance in the age of generative AI</h4>
            <Link to="#" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}><BookOpen size={16}/> Read More</Link>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Performance</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>June 18, 2026</span>
            </div>
            <h4>Custom CUDA kernels for enterprise inference optimization</h4>
            <Link to="#" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}><BookOpen size={16}/> Read More</Link>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Architecture</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>June 05, 2026</span>
            </div>
            <h4>RAG architecture patterns for enterprise knowledge bases</h4>
            <Link to="#" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}><BookOpen size={16}/> Read More</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BlogPage;
