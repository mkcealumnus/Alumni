import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Jothikrishnan',
    role: 'Owner, ShopCart',
    initials: 'JK',
    text: '“SignBridge delivered an exceptional corporate site. Speed, design quality, and communication were stellar throughout the process!”'
  },
  {
    name: 'Murugan N',
    role: 'Sales Manager, Indian Oil',
    initials: 'NM',
    text: '“The sales tracking features SignBridge built have revolutionized how we manage our Indian Oil operations. The real-time analytics and GST compliance tools are game-changers.”'
  },
  {
    name: 'Elena Rostova',
    role: 'Brand Director, Nova Creative',
    initials: 'ER',
    text: '“SignBridge transformed our digital presence with a clean, modern identity and a website that finally represents our brand properly.”'
  },
  {
    name: 'Founder',
    role: 'Startup Client',
    initials: 'F',
    text: '“The team understood our requirements quickly and turned our ideas into a polished digital product. The attention to detail was impressive.”'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials section-padding" id="reviews" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Client feedback. Real results.</h2>
          <p className="section-subtitle">Testimonials</p>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1rem auto 0', fontSize: '1.05rem', textAlign: 'center' }}>
            What founders and teams say about working with SignBridge.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {reviews.map((review, index) => (
            <div key={index} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
              
              {/* Stars rating */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-primary)" color="var(--color-primary)" />
                ))}
              </div>

              <p style={{ 
                color: 'var(--color-text-primary)', 
                fontSize: '1.05rem', 
                lineHeight: '1.6', 
                fontStyle: 'italic',
                margin: 0,
                flexGrow: 1 
              }}>
                {review.text}
              </p>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  background: 'rgba(var(--color-secondary-rgb), 0.08)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '600',
                  color: 'var(--color-secondary)',
                  fontSize: '0.95rem'
                }}>
                  {review.initials}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-primary)' }}>{review.name}</h4>
                  <p style={{ fontSize: '0.85rem', margin: '2px 0 0 0', color: 'var(--color-text-secondary)' }}>{review.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
