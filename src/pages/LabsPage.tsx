import React from 'react';
import PageHeader from '../components/PageHeader';
import SignBridgeLabs from '../components/SignBridgeLabs';

const LabsPage: React.FC = () => {
  return (
    <div className="labs-page">
      <PageHeader 
        title="Innovation Hub" 
        subtitle="Exploring the frontier of SaaS, AI, and IoT." 
        badge="SIGNBRIDGE LABS" 
      />
      <SignBridgeLabs />
    </div>
  );
};

export default LabsPage;
