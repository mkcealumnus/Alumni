import PageHeader from '../components/PageHeader';

const PrivacyPage = () => {
  return (
    <div className="privacy-page">
      <PageHeader 
        title="Privacy Policy" 
        subtitle="Last updated: August 2026" 
        badge="LEGAL" 
      />
      
      <div className="container" style={{ paddingBottom: '6rem', maxWidth: '800px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
        
        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>1. Information We Collect</h3>
        <p style={{ marginBottom: '2rem' }}>We collect information you provide directly to us, such as your name, email address, company name, and the contents of any form messages. For API users, we collect telemetry and usage logs.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>2. Data Sovereignty</h3>
        <p style={{ marginBottom: '2rem' }}>SignBridge operates on a strict zero-retention policy for enterprise deployments. Customer data processed through our VPC or on-premise solutions is <strong>never</strong> used to train our foundational or base models. Your data remains in your isolated, single-tenant environment.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>3. How We Use Information</h3>
        <p style={{ marginBottom: '2rem' }}>We use collected information to provide, maintain, and improve our services, communicate with you regarding your deployments, and ensure SOC 2 compliance.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>4. Security</h3>
        <p style={{ marginBottom: '2rem' }}>We employ military-grade security measures, including End-to-End Encryption (TLS 1.3 and AES-256) and strict Role-Based Access Controls (RBAC), to protect your information.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>5. Data Retention</h3>
        <p style={{ marginBottom: '2rem' }}>Standard API logs (for debugging and billing purposes) are retained for 90 days. Enterprise customers can configure custom retention policies or opt for zero logging.</p>

        <h3 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>6. Your Rights</h3>
        <p style={{ marginBottom: '2rem' }}>You have the right to access, correct, delete, or object to the processing of your personal data. To exercise these rights, please contact us at <a href="mailto:privacy@signbridge.io" style={{ color: 'var(--color-primary)' }}>privacy@signbridge.io</a>.</p>
        
      </div>
    </div>
  );
};

export default PrivacyPage;
