import React from 'react';
import { Globe, Smartphone, BrainCircuit, Cpu, CloudCog, Workflow } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Web & Application Development',
    description: 'Modern, high-performance, responsive cloud web apps.',
    icon: <Globe size={32} />,
    gridClass: 'col-span-2 row-span-1'
  },
  {
    id: 2,
    title: 'Mobile & Custom Software',
    description: 'Native and cross-platform mobile apps tailored to custom business workflows.',
    icon: <Smartphone size={32} />,
    gridClass: 'col-span-1 row-span-2'
  },
  {
    id: 3,
    title: 'AI & Machine Learning Solutions',
    description: 'Intelligent systems, workflow automation, predictive models, and LLM integrations.',
    icon: <BrainCircuit size={32} />,
    gridClass: 'col-span-1 row-span-2'
  },
  {
    id: 4,
    title: 'IoT & Smart-Device Engineering',
    description: 'End-to-end hardware-to-cloud solutions using ESP32, custom sensors, and embedded firmware.',
    icon: <Cpu size={32} />,
    gridClass: 'col-span-1 row-span-1'
  },
  {
    id: 5,
    title: 'Cloud, Database & API Infrastructure',
    description: 'Scalable cloud architectures, secure databases, API gateways, and automated deployment pipelines.',
    icon: <CloudCog size={32} />,
    gridClass: 'col-span-1 row-span-1'
  },
  {
    id: 6,
    title: 'Process Automation & BI',
    description: 'Replacing manual operational bottlenecks with real-time reporting and custom dashboards.',
    icon: <Workflow size={32} />,
    gridClass: 'col-span-2 row-span-1'
  }
];

const CoreServices: React.FC = () => {
  return (
    <section className="services section-padding" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Core Capabilities</h2>
          <p className="section-subtitle">Comprehensive engineering for the modern enterprise.</p>
        </div>
        
        <div className="bento-grid">
          {services.map((service) => (
            <div key={service.id} className={`glass-card service-card ${service.gridClass}`}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
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
