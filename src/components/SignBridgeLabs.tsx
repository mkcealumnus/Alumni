import React from 'react';
import { Beaker, ArrowRight, Zap, Bot, Microchip } from 'lucide-react';

const labProducts = [
  {
    id: 1,
    title: 'SignBridge Automate',
    description: 'An enterprise SaaS platform for visual workflow orchestration and API integrations without writing boilerplate code.',
    status: 'Live',
    statusColor: 'status-live',
    icon: <Zap size={24} />
  },
  {
    id: 2,
    title: 'NeuroFlow AI',
    description: 'Autonomous AI agents that monitor operational data streams and predict system bottlenecks before they occur.',
    status: 'Beta',
    statusColor: 'status-beta',
    icon: <Bot size={24} />
  },
  {
    id: 3,
    title: 'EdgeSense Embedded',
    description: 'Connected smart-hardware ecosystem utilizing ESP32 microcontrollers for real-time industrial telemetry.',
    status: 'In Development',
    statusColor: 'status-dev',
    icon: <Microchip size={24} />
  }
];

const SignBridgeLabs: React.FC = () => {
  return (
    <section className="labs section-padding" id="labs">
      <div className="container">
        <div className="labs-header">
          <div className="labs-badge">
            <Beaker size={18} className="labs-badge-icon" />
            <span>INNOVATION HUB</span>
          </div>
          <h2 className="section-title">
            SignBridge Labs: Building the Future of <br />
            <span className="text-gradient">SaaS, AI & IoT.</span>
          </h2>
          <p className="labs-subtitle">
            Our proprietary in-house R&D division where we experiment, design, and launch standalone digital products and smart-hardware ecosystems.
          </p>
        </div>

        <div className="labs-grid">
          {labProducts.map((product) => (
            <div key={product.id} className="labs-card">
              <div className="labs-card-top">
                <div className="labs-icon-wrapper">{product.icon}</div>
                <div className={`status-badge ${product.statusColor}`}>{product.status}</div>
              </div>
              <h3 className="labs-card-title">{product.title}</h3>
              <p className="labs-card-description">{product.description}</p>

              <div className="labs-card-footer">
                <a href="#" className="labs-link">
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignBridgeLabs;
