import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Core
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import SolutionsPage from './pages/SolutionsPage';
import ServicesPage from './pages/ServicesPage';

// Developers
import DevelopersPage from './pages/DevelopersPage';
import SecurityPage from './pages/SecurityPage';
import ResearchPage from './pages/ResearchPage';
import LabsPage from './pages/LabsPage';
import TechnologyPage from './pages/TechnologyPage';

// Company
import CompanyPage from './pages/CompanyPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import CustomersPage from './pages/CustomersPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

// Commercial & Legal
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          
          <Route path="platform" element={<PlatformPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="services" element={<ServicesPage />} />
          
          <Route path="developers" element={<DevelopersPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="labs" element={<LabsPage />} />
          <Route path="technology" element={<TechnologyPage />} />
          
          <Route path="company" element={<CompanyPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          
          <Route path="pricing" element={<PricingPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
