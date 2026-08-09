import React from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import './ProcessTimeline.css';

const processes = [
  {
    step: '01',
    title: 'Deep Technical Discovery',
    description: 'We analyze your organizational challenges and define system requirements.',
    icon: <Search size={24} />
  },
  {
    step: '02',
    title: 'Architecture & Prototyping',
    description: 'Designing scalable infrastructure, data models, and high-fidelity UI/UX.',
    icon: <PenTool size={24} />
  },
  {
    step: '03',
    title: 'Agile Full-Stack Engineering',
    description: 'Iterative development with rigorous testing and continuous integration.',
    icon: <Code2 size={24} />
  },
  {
    step: '04',
    title: 'Seamless Deployment & Scale',
    description: 'Production rollout, monitoring, and infrastructure scaling.',
    icon: <Rocket size={24} />
  }
];

const ProcessTimeline: React.FC = () => {
  return (
    <section className="process section-padding" id="process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Engineering Process</h2>
          <p className="section-subtitle">How we build the future, step by step.</p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-steps">
            {processes.map((process, index) => (
              <div key={index} className="timeline-step">
                <div className="step-marker">
                  <div className="step-icon-wrapper">{process.icon}</div>
                </div>
                <div className="step-content">
                  <div className="step-number">{process.step}</div>
                  <h3 className="step-title">{process.title}</h3>
                  <p className="step-description">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
