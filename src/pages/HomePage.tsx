import React from 'react';
import Hero from '../components/Hero';
import TechEcosystem from '../components/TechEcosystem';
import CoreServices from '../components/CoreServices';
import WhyChooseUs from '../components/WhyChooseUs';
import BrandMomentum from '../components/BrandMomentum';
import CaseStudies from '../components/CaseStudies';
import ProcessTimeline from '../components/ProcessTimeline';
import MeetTeam from '../components/MeetTeam';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <TechEcosystem />
      <CoreServices />
      <WhyChooseUs />
      <BrandMomentum />
      <CaseStudies />
      <ProcessTimeline />
      <MeetTeam />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default HomePage;
