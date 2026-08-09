import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, badge }) => {
  return (
    <div style={{ paddingTop: '150px', paddingBottom: '40px', textAlign: 'center' }}>
      <div className="container">
        {badge && (
          <div className="badge">
            <span className="badge-text">{badge}</span>
          </div>
        )}
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>{title}</h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
