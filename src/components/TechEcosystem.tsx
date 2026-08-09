import React from 'react';
import './TechEcosystem.css';

const techStacks = [
  {
    category: 'Software Engineering',
    items: ['Python', 'Node.js', 'React / React Native', 'TypeScript', 'Docker', 'Kubernetes', 'GraphQL']
  },
  {
    category: 'Hardware & IoT',
    items: ['ESP32', 'MQTT', 'BLE', 'Edge AI', 'Embedded C/C++', 'Sensor Networks']
  },
  {
    category: 'Cloud & Data',
    items: ['AWS', 'Google Cloud', 'PostgreSQL', 'MongoDB', 'Time-Series DBs', 'Serverless']
  }
];

const TechEcosystem: React.FC = () => {
  return (
    <section className="tech-ecosystem section-padding" id="technology">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technology Ecosystem</h2>
          <p className="section-subtitle">Powered by modern, scalable stacks.</p>
        </div>

        <div className="marquee-wrapper">
          {techStacks.map((stack, idx) => (
            <div key={idx} className="tech-row">
              <div className="tech-category-label">{stack.category}</div>
              <div className="marquee">
                <div className="marquee-content">
                  {/* Render items twice to create the seamless loop effect */}
                  {[...stack.items, ...stack.items, ...stack.items].map((item, i) => (
                    <div key={i} className="tech-item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechEcosystem;
