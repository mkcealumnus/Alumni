import React from 'react';
import { User, Shield, PenTool, Database } from 'lucide-react';

const team = [
  {
    name: 'Surya V M',
    role: 'Founder & CEO',
    description: "Leads SignBridge's vision, architecture, and full-stack development with a focus on AI, accessibility, and world-class product design.",
    skills: ['Full Stack', 'AI', 'Firebase', 'React'],
    icon: <User size={24} className="text-primary" />
  },
  {
    name: 'Kamalesh',
    role: 'Software Developer',
    description: 'Builds scalable web applications and core platform features with an emphasis on responsive experiences and reliable delivery.',
    skills: ['JavaScript', 'React', 'Node.js', 'APIs'],
    icon: <Shield size={24} className="text-secondary" />
  },
  {
    name: 'Sowbigasri S',
    role: 'UI/UX Designer',
    description: 'Crafts intuitive, accessible, and elegant user experiences that balance visual storytelling with thoughtful interaction design.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
    icon: <PenTool size={24} className="text-primary" />
  },
  {
    name: 'Laksana S',
    role: 'Database Engineer',
    description: 'Designs secure database architectures and scalable data systems that keep SignBridge reliable, efficient, and ready to grow.',
    skills: ['Firebase', 'MongoDB', 'Data Modeling', 'Backend'],
    icon: <Database size={24} className="text-secondary" />
  }
];

const MeetTeam: React.FC = () => {
  return (
    <section className="team section-padding" id="team" style={{ background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet the SignBridge team</h2>
          <p className="section-subtitle">The People</p>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1rem auto 0', fontSize: '1.05rem', textAlign: 'center' }}>
            Combining artificial intelligence, full-stack development, UI/UX design, and database engineering to create accessible technology for everyone.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {team.map((member, index) => (
            <div key={index} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Profile Avatar Frame */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'rgba(var(--color-primary-rgb), 0.08)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid rgba(var(--color-primary-rgb), 0.15)',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-display)'
                }}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--color-text-primary)' }}>{member.name}</h3>
                  <p style={{ fontSize: '0.85rem', margin: '2px 0 0 0', color: 'var(--color-primary)', fontWeight: '600' }}>{member.role}</p>
                </div>
              </div>

              <p style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '0.925rem', 
                lineHeight: '1.6', 
                margin: '0 0 1.5rem 0',
                flexGrow: 1
              }}>
                {member.description}
              </p>

              {/* Skills Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                {member.skills.map((skill, sIdx) => (
                  <span key={sIdx} style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    padding: '0.25rem 0.6rem', 
                    borderRadius: '6px', 
                    background: sIdx % 2 === 0 ? 'rgba(var(--color-primary-rgb), 0.08)' : 'rgba(var(--color-secondary-rgb), 0.08)',
                    color: sIdx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                    border: sIdx % 2 === 0 ? '1px solid rgba(var(--color-primary-rgb), 0.12)' : '1px solid rgba(var(--color-secondary-rgb), 0.12)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <a href="#" style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  View Portfolio →
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;
