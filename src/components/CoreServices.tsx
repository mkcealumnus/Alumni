import React from 'react';
import { Globe, ShoppingBag, Palette, FileText, PenTool, Shield } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Custom websites designed for businesses, startups, and personal brands, built using fast, modern, and SEO-friendly technologies.',
    bullets: ['Jamstack & SPA architecture', 'High-performance load speeds', 'Interactive interfaces'],
    icon: <Globe size={32} />,
    gridClass: 'col-span-2 row-span-1'
  },
  {
    id: 2,
    title: 'E-Commerce Solutions',
    description: 'Modern online stores with secure payments, optimized checkouts, inventory tracking, and intuitive user experiences.',
    bullets: ['Stripe & PayPal integration', 'Inventory management', 'High-converting cart flows'],
    icon: <ShoppingBag size={32} />,
    gridClass: 'col-span-1 row-span-2'
  },
  {
    id: 3,
    title: 'Logo Design & Branding',
    description: 'Professional logos, consistent color palettes, typography guidelines, and complete brand identities.',
    bullets: ['Premium vector logo files', 'Visual identity kits', 'Color & font systems'],
    icon: <Palette size={32} />,
    gridClass: 'col-span-1 row-span-2'
  },
  {
    id: 4,
    title: 'Landing Pages',
    description: 'High-converting landing pages designed to turn visitors into leads and customers.',
    bullets: ['A/B test-ready structures', 'CTA optimization', 'Dynamic lead generation forms'],
    icon: <FileText size={32} />,
    gridClass: 'col-span-1 row-span-1'
  },
  {
    id: 5,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces focused on usability, accessibility, retention, and user satisfaction.',
    bullets: ['Interactive Figma prototypes', 'User journey mapping', 'Responsive design systems'],
    icon: <PenTool size={32} />,
    gridClass: 'col-span-1 row-span-1'
  },
  {
    id: 6,
    title: 'Website Maintenance',
    description: 'Continuous support, security updates, server monitoring, content management, and performance optimization.',
    bullets: ['24/7 uptime monitoring', 'Monthly backups', 'Technical SEO & performance'],
    icon: <Shield size={32} />,
    gridClass: 'col-span-2 row-span-1'
  }
];

const CoreServices: React.FC = () => {
  return (
    <section className="services section-padding" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What We Build</h2>
          <p className="section-subtitle">Premium digital services with a sharper edge</p>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1rem auto 0', fontSize: '1.05rem' }}>
            We design, build, and optimize high-end digital products tailored for rapid growth, strong branding, and polished user experiences.
          </p>
        </div>
        
        <div className="bento-grid">
          {services.map((service) => (
            <div key={service.id} className={`glass-card service-card ${service.gridClass}`}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description" style={{ marginBottom: '1rem' }}>{service.description}</p>
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 0 1.5rem 0', padding: 0 }}>
                {service.bullets.map((bullet, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-primary)' }}>✓</span> {bullet}
                  </li>
                ))}
              </ul>
              
              <div className="service-hover-effect">
                <span className="arrow-icon">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
