import React from 'react';
import { MessageSquare, ListTodo, PenTool, Code2, Rocket } from 'lucide-react';

const processes = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We start by understanding your brand vision, target demographic, functional requirements, and long-term milestones.',
    icon: <MessageSquare size={24} />
  },
  {
    step: '02',
    title: 'Planning',
    description: 'We structure the project architecture, map user flows, define content hierarchies, establish technology requirements, and create project timelines.',
    icon: <ListTodo size={24} />
  },
  {
    step: '03',
    title: 'Design',
    description: 'Our UI/UX specialists craft bespoke responsive layouts, brand guides, color systems, and high-fidelity prototypes.',
    icon: <PenTool size={24} />
  },
  {
    step: '04',
    title: 'Development',
    description: 'Our programmers bring approved designs to life using clean, SEO-optimized, accessible, and high-performance code.',
    icon: <Code2 size={24} />
  },
  {
    step: '05',
    title: 'Launch',
    description: 'After staging verification, performance audits, testing, and final reviews, we push the project to production.',
    icon: <Rocket size={24} />
  }
];

const ProcessTimeline: React.FC = () => {
  return (
    <section className="process section-padding" id="process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Workflow</h2>
          <p className="section-subtitle">Step-by-step methodology</p>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1rem auto 0', fontSize: '1.05rem', textAlign: 'center' }}>
            How we convert conceptual ideas into polished digital products using structured feedback and quality benchmarks.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
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
