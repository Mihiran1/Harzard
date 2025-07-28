import React from 'react'
import UserNavbar from '../components/UserNavbar'
import Hero from '../components/Hero';
import AdditionalInfo from '../components/AdditionalInfo';
import Footer from '../components/Footer';

function UserDashboard() {
  return (
    <div>
        <UserNavbar/>
        <Hero />
        <AdditionalInfo/>
      <Footer/>
    </div>
  )
}

export default UserDashboard