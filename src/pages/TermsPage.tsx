import PageHeader from '../components/PageHeader';

const TermsPage = () => {
  return (
    <div className="terms-page">
      <PageHeader 
        title="Terms of Service" 
        subtitle="Last updated: August 2026" 
        badge="LEGAL" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem', maxWidth: '800px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
        
        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>1. Acceptance of Terms</h3>
        <p style={{ marginBottom: '2rem' }}>By accessing or using the SignBridge platform, APIs, or consulting services, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, you represent that you have the authority to bind that entity.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>2. Services and Service Level Agreements (SLA)</h3>
        <p style={{ marginBottom: '2rem' }}>SignBridge provides enterprise-grade AI infrastructure and software consulting. Standard API usage is guaranteed at a 99.9% SLA. Custom throughput limits and 99.99% SLAs are defined individually in your Enterprise Agreement or consulting contract.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>3. Intellectual Property</h3>
        <p style={{ marginBottom: '2rem' }}>For consulting engagements, all custom intellectual property (IP), code, and tuned model weights produced exclusively for the client are fully transferred to the client upon final payment. Pre-existing SignBridge infrastructure, open-source tools, and API frameworks remain the property of SignBridge.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>4. API Usage & Restrictions</h3>
        <p style={{ marginBottom: '2rem' }}>You agree to abide by the rate limits associated with your tier. Reverse engineering of our proprietary models, utilizing our APIs to train competing foundational models, or exploiting the network is strictly prohibited and will result in immediate termination.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>5. Limitation of Liability</h3>
        <p style={{ marginBottom: '2rem' }}>To the maximum extent permitted by law, SignBridge's liability shall be capped at the total amount paid by you to SignBridge for the services in the twelve (12) months preceding the event giving rise to the liability.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>6. Governing Law</h3>
        <p style={{ marginBottom: '2rem' }}>These Terms are governed by the laws of the State of California. Any disputes shall be resolved through binding arbitration in San Francisco, California.</p>
        
        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>7. Contact</h3>
        <p style={{ marginBottom: '2rem' }}>For legal inquiries, please contact us at <a href="mailto:legal@signbridge.io" style={{ color: 'var(--color-primary)' }}>legal@signbridge.io</a> or by mail at: 500 Howard St, San Francisco, CA 94105.</p>
        
      </div>
    </div>
  );
};

export default TermsPage;
