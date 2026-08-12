import React from 'react';
import { ArrowRight, BarChart3, ShoppingBag } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Indian Oil Sales Tracker',
    category: 'Business Application',
    description: 'A modern IndianOil Lube Sales Manager Hub designed for efficient sales tracking, GST management, and faster field reporting.',
    icon: <BarChart3 size={32} className="text-primary" />,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  {
    id: 2,
    title: 'ShopCart',
    category: 'E-Commerce Store',
    description: 'A sleek, high-converting e-commerce experience for tech accessories with effortless browsing, cart clarity, and polished product presentation.',
    icon: <ShoppingBag size={32} className="text-secondary" />,
    gradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)'
  }
];

const CaseStudies: React.FC = () => {
  return (
    <section className="portfolio section-padding" id="portfolio" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Case Studies</p>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1rem auto 0', fontSize: '1.05rem', textAlign: 'center' }}>
            A curated selection of our finest work, combining aesthetics and utility to deliver outstanding digital experiences.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '2.5rem' }}>
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`glass-card ${project.id % 2 === 0 ? 'card-glow-primary' : 'card-glow-secondary'}`} 
              style={{ display: 'flex', flexDirection: 'column', borderRadius: '24px', overflow: 'hidden', height: '100%', border: '1px solid var(--color-border)' }}
            >
              
              {/* Graphic Header Panel */}
              <div style={{ 
                height: '220px', 
                background: project.gradient, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '20px', 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}>
                  {project.icon}
                </div>
                
                {/* Visual Grid Lines */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.15,
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              
              {/* Text Body */}
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                <span style={{ 
                  color: 'var(--color-primary)', 
                  fontSize: '0.85rem', 
                  fontWeight: '600', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px' 
                }}>
                  {project.category}
                </span>
                
                <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-text-primary)' }}>
                  {project.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  fontSize: '0.95rem', 
                  lineHeight: '1.6', 
                  margin: 0,
                  flexGrow: 1
                }}>
                  {project.description}
                </p>
                
                <div style={{ marginTop: '1.5rem' }}>
                  <a href="#" className="btn btn-outline" style={{ display: 'inline-flex', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
                    Explore Case Study <ArrowRight size={16} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
