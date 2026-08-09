import React from 'react';
import PageHeader from '../components/PageHeader';
import CoreServices from '../components/CoreServices';
import ProcessTimeline from '../components/ProcessTimeline';

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page">
      <PageHeader 
        title="Our Services" 
        subtitle="End-to-end engineering for enterprise systems." 
        badge="CORE CAPABILITIES" 
      />
      <CoreServices />
      <ProcessTimeline />
    </div>
  );
};

export default ServicesPage;
