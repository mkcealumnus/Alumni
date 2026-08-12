import React from 'react';
import PageHeader from '../components/PageHeader';
import { Monitor, ShoppingBag, Palette, FileText, PenTool, Shield } from 'lucide-react';

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page">
      <PageHeader 
        title="Premium digital services with a sharper edge"
        subtitle="We design, build, and optimize high-end digital products tailored for rapid growth, strong branding, and polished user experiences."
        badge="What We Build"
      />
      
      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Monitor size={24} />
            </div>
            <h3>Website Development</h3>
            <p>Custom websites designed for businesses, startups, and personal brands, built using fast, modern, and SEO-friendly technologies.</p>
            <ul style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✓ Jamstack & SPA architecture</li>
              <li>✓ High-performance load speeds</li>
              <li>✓ Interactive interfaces</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={24} />
            </div>
            <h3>E-Commerce Solutions</h3>
            <p>Modern online stores with secure payments, optimized checkouts, inventory tracking, and intuitive user experiences.</p>
            <ul style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✓ Stripe & PayPal integration</li>
              <li>✓ Inventory management</li>
              <li>✓ High-converting cart flows</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Palette size={24} />
            </div>
            <h3>Logo Design & Branding</h3>
            <p>Professional logos, consistent color palettes, typography guidelines, and complete brand identities.</p>
            <ul style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✓ Premium vector logo files</li>
              <li>✓ Visual identity kits</li>
              <li>✓ Color & font systems</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={24} />
            </div>
            <h3>Landing Pages</h3>
            <p>High-converting landing pages designed to turn visitors into leads and customers.</p>
            <ul style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✓ A/B test-ready structures</li>
              <li>✓ CTA optimization</li>
              <li>✓ Dynamic lead generation forms</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PenTool size={24} />
            </div>
            <h3>UI/UX Design</h3>
            <p>Beautiful and intuitive user interfaces focused on usability, accessibility, retention, and user satisfaction.</p>
            <ul style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✓ Interactive Figma prototypes</li>
              <li>✓ User journey mapping</li>
              <li>✓ Responsive design systems</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={24} />
            </div>
            <h3>Website Maintenance</h3>
            <p>Continuous support, security updates, server monitoring, content management, and performance optimization.</p>
            <ul style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✓ 24/7 uptime monitoring</li>
              <li>✓ Monthly backups</li>
              <li>✓ Technical SEO & performance</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
