import React from 'react';
import Hero from '../components/Hero';
import CoreServices from '../components/CoreServices';
import SignBridgeLabs from '../components/SignBridgeLabs';
import TechEcosystem from '../components/TechEcosystem';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <CoreServices />
      <SignBridgeLabs />
      <TechEcosystem />
    </div>
  );
};

export default HomePage;
