import React from 'react';
import PageHeader from '../components/PageHeader';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page" style={{ minHeight: '60vh' }}>
      <PageHeader 
        title="About SignBridge" 
        subtitle="Bridging ideas with technology since 2024." 
        badge="OUR MISSION" 
      />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
        <p style={{ marginBottom: '2rem' }}>
          At SignBridge, we believe that the gap between a visionary idea and a practical digital product is bridged through rigorous engineering, transparent communication, and cutting-edge technology.
        </p>
        <p>
          Our team specializes in full-stack web platforms, mobile applications, autonomous AI integration, and connected smart-hardware ecosystems. We partner with enterprises and ambitious startups to solve real-world problems.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
