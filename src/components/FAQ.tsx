import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What services does SignBridge provide?',
    answer: 'We provide full-service digital design and development, specializing in Website Development, E-Commerce Solutions, Logo Design & Branding, Landing Pages, UI/UX Design, and ongoing Website Maintenance.'
  },
  {
    question: 'How long does a website project take?',
    answer: 'Timeline varies by scope. A premium landing page can launch in 1-2 weeks, while a custom full-scale corporate platform or complex e-commerce store typically takes 4-6 weeks from initial consultation to production rollout.'
  },
  {
    question: 'Can SignBridge build custom web applications?',
    answer: 'Yes! We specialize in custom full-stack Jamstack and SPA architectures built with React, Node.js, and TypeScript, configured for speed, high-performance, and custom business operations.'
  },
  {
    question: 'Do you provide AI and machine learning solutions?',
    answer: 'Absolutely. We integrate artificial intelligence, neural networks (using TensorFlow), workflow automation, predictive models, and LLM integrations directly into modern web platforms.'
  },
  {
    question: 'Can you redesign an existing website?',
    answer: 'Yes. We analyze your current site performance, metrics, and gaps to deliver a clean, modern, and high-converting visual identity and SEO-optimized codebase.'
  },
  {
    question: 'Do you provide website maintenance?',
    answer: 'Yes, we offer continuous support packages including 24/7 uptime monitoring, automated monthly backups, security patches, content management, and ongoing technical SEO optimizations.'
  },
  {
    question: 'Do you provide e-commerce development?',
    answer: 'Yes, we design high-converting online stores with secure payment integrations (Stripe, PayPal), custom inventory management, and intuitive cart flow designs.'
  },
  {
    question: 'How does your pricing work?',
    answer: 'We provide flexible and transparent project-based pricing or dedicated monthly retainers depending on your brand requirements, with no hidden fees.'
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes. Every project includes 30 days of complimentary support to handle adjustments, training, and staging audits, with options to extend into custom monthly maintenance.'
  },
  {
    question: 'Can I request a custom package?',
    answer: 'Yes! We understand every startup and enterprise has unique requirements. We collaborate closely to structure a custom scope that aligns with your specific timeline and business goals.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq section-padding" id="faq" style={{ background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header">
          <h2 className="section-title">Frequently asked questions</h2>
          <p className="section-subtitle">FAQ</p>
          <p style={{ color: 'var(--color-text-secondary)', margin: '1rem 0 0 0', fontSize: '1.05rem', textAlign: 'center' }}>
            Everything you need to know about working with SignBridge.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`glass-card ${isOpen ? 'card-glow-primary' : (index % 2 === 0 ? 'card-glow-primary' : 'card-glow-secondary')}`} 
                style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  border: isOpen ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  boxShadow: isOpen ? '0 4px 20px var(--color-primary-glow)' : 'none',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp size={20} style={{ color: 'var(--color-primary)' }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: 'var(--color-text-secondary)' }} />
                  )}
                </button>
                
                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    overflow: 'hidden',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  <p style={{ 
                    padding: '0 1.5rem 1.5rem 1.5rem', 
                    margin: 0, 
                    color: 'var(--color-text-secondary)', 
                    fontSize: '0.95rem',
                    lineHeight: '1.6' 
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
