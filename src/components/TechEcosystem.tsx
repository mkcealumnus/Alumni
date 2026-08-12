import React from 'react';

const techStacks = [
  {
    category: 'Frontend & UI/UX',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Figma', 'UI/UX', 'Tailwind CSS']
  },
  {
    category: 'Backend & Intelligence',
    items: ['Node.js', 'Python', 'Firebase', 'MongoDB', 'TensorFlow', 'AI / ML', 'REST APIs', 'GitHub']
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
