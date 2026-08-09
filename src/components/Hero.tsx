import React from 'react';
import './Hero.css';

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
            <span className="badge-icon">🚀</span>
            <span className="badge-text">NEXT-GEN TECH SOLUTIONS • SIGNBRIDGE LABS</span>
          </div>
          
          <h1 className="hero-title">
            Bridging Ideas with <br />
            <span className="text-gradient">Intelligent Technology.</span>
          </h1>
          
          <p className="hero-subtitle">
            From enterprise web & mobile platforms to autonomous AI and IoT smart devices—we transform complex organizational challenges into practical, scalable digital solutions.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary btn-large">Build With Us</button>
            <button className="btn btn-secondary btn-large">Explore SignBridge Labs</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
