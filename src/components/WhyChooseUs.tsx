import React from 'react';
import { Sparkles, Calendar, BadgePercent, Monitor, Search, Heart } from 'lucide-react';

const strengths = [
  {
    id: 1,
    title: 'Modern Designs',
    description: 'Clean, forward-thinking aesthetics tailored to each business.',
    icon: <Sparkles size={24} className="text-primary" />
  },
  {
    id: 2,
    title: 'Fast Delivery',
    description: 'Iterative schedules ensuring projects launch on time without sacrificing quality.',
    icon: <Calendar size={24} className="text-secondary" />
  },
  {
    id: 3,
    title: 'Affordable Solutions',
    description: 'Flexible and transparent pricing for growing brands.',
    icon: <BadgePercent size={24} className="text-primary" />
  },
  {
    id: 4,
    title: 'Mobile Responsive',
    description: 'Pixel-perfect experiences across every screen size.',
    icon: <Monitor size={24} className="text-secondary" />
  },
  {
    id: 5,
    title: 'SEO Friendly',
    description: 'Websites engineered for discoverability and search performance.',
    icon: <Search size={24} className="text-primary" />
  },
  {
    id: 6,
    title: 'Client-Centered Approach',
    description: 'Your vision and feedback guide every stage of development.',
    icon: <Heart size={24} className="text-secondary" />
  }
];

const stats = [
  { value: '120+', label: 'Projects Completed' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years Experience' },
  { value: '24/7', label: 'Premium Support' }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-choose-us section-padding" id="why-choose-us" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Core Strengths</h2>
          <p className="section-subtitle">Why businesses partner with SignBridge</p>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1rem auto 0', fontSize: '1.05rem', textAlign: 'center' }}>
            We blend technical execution with artistic design to deliver digital products that scale seamlessly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {strengths.map((strength) => (
            <div 
              key={strength.id} 
              className={`glass-card ${strength.id % 2 === 0 ? 'card-glow-primary' : 'card-glow-secondary'}`} 
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(var(--color-primary-rgb), 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(var(--color-primary-rgb), 0.15)' }}>
                {strength.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>
                <span style={{ 
                  marginRight: '0.75rem', 
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '800',
                  fontFamily: 'var(--font-display)'
                }}>
                  0{strength.id}
                </span>
                {strength.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{strength.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="glass-card dashboard-panel" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem',
              padding: '2rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.01)'
            }}>
              <h2 style={{ 
                fontSize: '3.5rem', 
                fontWeight: '700', 
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0, 
                fontFamily: 'var(--font-display)' 
              }}>
                {stat.value}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.8rem', fontWeight: '600' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
