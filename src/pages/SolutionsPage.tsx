import React from 'react';
import PageHeader from '../components/PageHeader';
import ProcessTimeline from '../components/ProcessTimeline';

const SolutionsPage: React.FC = () => {
  return (
    <div className="solutions-page">
      <PageHeader 
        title="Solutions & Workflow" 
        subtitle="How we turn complex requirements into robust digital products." 
        badge="OUR APPROACH" 
      />
      <ProcessTimeline />
    </div>
  );
};

export default SolutionsPage;
