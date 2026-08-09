import PageHeader from '../components/PageHeader';
import { Send, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <PageHeader 
        title="Let's build something together." 
        subtitle="Contact our solutions architecture team to discuss your next big project." 
        badge="CONTACT US" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Form */}
          <div className="glass-card" style={{ flex: '1 1 500px', padding: '3rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Send a Message</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Full Name</label>
                <input type="text" id="name" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="company" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Company</label>
                <input type="text" id="company" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Work Email</label>
                <input type="email" id="email" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label htmlFor="usecase" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Use Case / Requirements</label>
                <textarea id="usecase" rows={5} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px', resize: 'vertical' }}></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}>
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          {/* Locations */}
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ marginBottom: '2rem' }}>Global Offices</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={24} className="text-primary" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>San Francisco (HQ)</h4>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    500 Howard St<br />
                    San Francisco, CA 94105<br />
                    sf@signbridge.io
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={24} className="text-secondary" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>London</h4>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    100 Bishopsgate<br />
                    London EC2N 4AG, UK<br />
                    london@signbridge.io
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={24} className="text-primary" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Singapore</h4>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    Marina Bay Financial Centre<br />
                    Tower 3, Singapore<br />
                    apac@signbridge.io
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
