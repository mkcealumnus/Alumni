import React from 'react';
import { MapPin, Code, Briefcase, MessageSquare } from 'lucide-react';

import suryaImg from '../assets/team/surya.jpg';
import kamaleshImg from '../assets/team/kamalesh.jpg';
import sowbigasriImg from '../assets/team/sowbigasri.jpg';
import laksanaImg from '../assets/team/laksana.jpg';

const team = [
  {
    name: 'Surya V M',
    role: 'Founder & CEO',
    location: 'Karur Hub',
    description: "Leads SignBridge's vision, architecture, and full-stack development with a focus on AI, accessibility, and world-class product design.",
    skills: ['Full Stack', 'AI', 'Firebase', 'React'],
    image: suryaImg
  },
  {
    name: 'Kamalesh',
    role: 'Software Developer',
    location: 'Erode Hub',
    description: 'Builds scalable web applications and core platform features with an emphasis on responsive experiences and reliable delivery.',
    skills: ['JavaScript', 'React', 'Node.js', 'APIs'],
    image: kamaleshImg
  },
  {
    name: 'Sowbigasri S',
    role: 'UI/UX Designer',
    location: 'Erode Hub',
    description: 'Crafts intuitive, accessible, and elegant user experiences that balance visual storytelling with thoughtful interaction design.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
    image: sowbigasriImg
  },
  {
    name: 'Laksana S',
    role: 'Database Engineer',
    location: 'Erode Hub',
    description: 'Designs secure database architectures and scalable data systems that keep SignBridge reliable, efficient, and ready to grow.',
    skills: ['Firebase', 'MongoDB', 'Data Modeling', 'Backend'],
    image: laksanaImg
  }
];

const MeetTeam: React.FC = () => {
  return (
    <section className="team section-padding" id="team" style={{ background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div className="section-header">
          <h2 className="section-title">Meet the SignBridge team</h2>
          <p className="section-subtitle">The People</p>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1rem auto 0', fontSize: '1.05rem', textAlign: 'center' }}>
            Combining artificial intelligence, full-stack development, UI/UX design, and database engineering to create accessible technology for everyone.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="glass-card team-card" style={{ padding: 0 }}>
              
              {/* Photo Above the Card Details */}
              <img 
                src={member.image} 
                alt={`${member.name} - ${member.role}`} 
                className="team-card-image"
              />
              
              {/* Card Details Block */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--color-text-primary)' }}>
                    {member.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {member.role}
                  </p>
                  
                  {/* Location Hub */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                    <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                    <span>{member.location}</span>
                  </div>

                  <p style={{ 
                    color: 'var(--color-text-secondary)', 
                    fontSize: '0.875rem', 
                    lineHeight: '1.5', 
                    margin: '0 0 1rem 0'
                  }}>
                    {member.description}
                  </p>
                </div>

                <div>
                  {/* Skills Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {member.skills.map((skill, sIdx) => (
                      <span key={sIdx} style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: '600', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '4px', 
                        background: sIdx % 2 === 0 ? 'rgba(var(--color-primary-rgb), 0.08)' : 'rgba(var(--color-secondary-rgb), 0.08)',
                        color: sIdx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                        border: sIdx % 2 === 0 ? '1px solid rgba(var(--color-primary-rgb), 0.12)' : '1px solid rgba(var(--color-secondary-rgb), 0.12)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Links / Icons */}
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a href="#" style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                      View Portfolio →
                    </a>
                    
                    <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      <Code size={16} style={{ cursor: 'pointer' }} />
                      <Briefcase size={16} style={{ cursor: 'pointer' }} />
                      <MessageSquare size={16} style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;
