import React from 'react';
import PageHeader from '../components/PageHeader';
import TechEcosystem from '../components/TechEcosystem';

const TechnologyPage: React.FC = () => {
  return (
    <div className="technology-page">
      <PageHeader 
        title="Technology Stack" 
        subtitle="The modern tools and frameworks we use to build scalable systems." 
        badge="ENGINEERING" 
      />
      <TechEcosystem />
    </div>
  );
};

export default TechnologyPage;
