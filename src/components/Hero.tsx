import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <div className="bg-mesh"></div>
      
      {/* Node Graphic Overlay */}
      <div className="hero-graphic">
        <div className="node node-1"></div>
        <div className="node node-2"></div>
        <div className="node node-3"></div>
        <div className="node node-4"></div>
        <svg className="node-connections" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="30%" x2="80%" y2="20%" className="connection-line" />
          <line x1="80%" y1="20%" x2="70%" y2="70%" className="connection-line" />
          <line x1="70%" y1="70%" x2="30%" y2="80%" className="connection-line" />
          <line x1="30%" y1="80%" x2="20%" y2="30%" className="connection-line" />
          <line x1="20%" y1="30%" x2="70%" y2="70%" className="connection-line" />
        </svg>
      </div>

      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="badge">
            <span className="badge-icon">✨</span>
            <span className="badge-text">AI-FIRST • PREMIUM • ACCESSIBLE</span>
          </div>
          
          <h1 className="hero-title">
            Designing the future <br />
            of <span className="text-gradient">digital communication.</span>
          </h1>
          
          <p className="hero-subtitle" style={{ fontWeight: '500', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
            Premium websites, intelligent products, and growth-focused branding for ambitious founders and modern teams.
          </p>
          
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
            SignBridge creates elegant digital experiences that feel fast, polished, and built for real-world growth. From launch-ready sites to AI-enhanced product journeys, we help brands stand out with clarity and confidence.
          </p>

          {/* Bullet features */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '1.2rem' }}>⚡</span> Lightning-fast launch
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '1.2rem' }}>♿</span> Accessible by default
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: 'var(--color-primary)' }}>
              <span style={{ fontSize: '1.2rem' }}>📈</span> Built for growth
            </div>
          </div>
          
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary btn-large">Build With Us</Link>
            <Link to="/#portfolio" className="btn btn-secondary btn-large">Explore Studio</Link>
          </div>

          {/* Showcase project quicklinks */}
          <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span>Showcase:</span>
            <a href="https://signbridge.agency/showcase" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>signbridge.agency/showcase</a>
            <span>•</span>
            <Link to="/#portfolio" style={{ color: 'var(--color-secondary)', fontWeight: '500' }}>ShopCart</Link>
            <span>•</span>
            <Link to="/#portfolio" style={{ color: 'var(--color-secondary)', fontWeight: '500' }}>Indian Oil Sales Lube</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
