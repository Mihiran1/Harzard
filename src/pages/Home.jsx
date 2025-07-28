import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AdditionalInfo from '../components/AdditionalInfo';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      
      <Hero />
      <AdditionalInfo/>
      <Footer/>
    </div>
  );
};

export default Home;
