import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Users, Shield, ChevronDown, Search, CheckCircle } from 'lucide-react';
import bgImage from '../assets/RP.png'
import RoadProblemInfo from './RoadProblemInfo '
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();

  const stats = [
    { number: "15,000+", label: "Reports Submitted", icon: AlertTriangle },
    { number: "89%", label: "Response Rate", icon: Shield },
    { number: "2,300+", label: "Roads Improved", icon: MapPin },
    { number: "50K+", label: "Active Users", icon: Users }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleReportClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/report");
    } else {
      alert("Please login to report a location.");
      navigate("/login");
    }
  };

  const handleMapClick = () => {
    navigate("/map");
  };

  return (
    <section className="relative mt-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Pattern */}
     

      <div className="relative z-10 container px-6 py-12 ">
        
        {/* FIRST SECTION: Content Left, Image Right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 bg-cover bg-center h-[80vh] mx-5" >
          
          {/* Left Column - Main Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-100 rounded-full border border-green-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Community Safety Initiative</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Report
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Dangerous
              </span>
              <span className="block text-blue-700">Road Locations</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Help local authorities identify accident-prone areas like dangerous bends, 
              broken bridges, or poorly maintained roads through our interactive safety map.
            </p>
            <p className="text-lg text-gray-500 mb-8">
              Join thousands of community members making roads safer for everyone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleReportClick}
                className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Report Location Now
              </button>
              
              <button
                onClick={handleMapClick}
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                View Safety Map
              </button>
            </div>
          </div>

          {/* Right Column - Road Image */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={bgImage}
                alt="Road construction with traffic cones indicating dangerous areas" 
                className="w-full h-[550px] object-cover"
              />
              
              {/* Overlay with quick info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="font-semibold">Road Safety Alert</span>
                  </div>
                  <p className="text-sm opacity-90">Report dangerous locations to keep everyone safe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      <RoadProblemInfo/>

        {/* SECOND SECTION: Stats Left, Map Right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Stats */}
<div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
  <p className="text-gray-600 mb-8">Real results from our community-driven safety initiative</p>
  
  <div className="grid grid-cols-2 gap-6">
    {stats.map((stat, index) => {
      const Icon = stat.icon;
      const isActive = currentStat === index;

      return (
        <div
          key={index}
          className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-md ${
            isActive ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
          }`}
        >
          <Icon className={`w-7 h-7 mb-3 transition-colors duration-300 ${
            isActive ? 'text-blue-600' : 'text-gray-400'
          }`} />
          <div className={`text-2xl font-semibold transition-colors duration-300 ${
            isActive ? 'text-blue-700' : 'text-gray-900'
          }`}>
            {stat.number}
          </div>
          <div className="text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
        </div>
      );
    })}
  </div>
</div>


          {/* Right Column - Interactive Map */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Map Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Safety Map</h3>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search Location" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Interactive Map Area */}
                <div className="relative h-80 bg-gradient-to-br from-blue-100 via-green-100 to-blue-50 rounded-2xl overflow-hidden border border-gray-200">
                  {/* Map Roads */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
                    {/* Roads */}
                    <path d="M50 100 Q200 80 350 120" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <path d="M80 200 Q200 180 320 220" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                    <path d="M100 50 Q150 150 200 250" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                    <path d="M250 60 Q280 160 310 260" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                  </svg>

                  {/* Incident Markers */}
                  <div className="absolute top-16 left-20">
                    <div className="relative">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-red-500 rounded-full opacity-30 animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute top-32 right-24">
                    <div className="relative">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-orange-500 rounded-full opacity-30 animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-24 left-16">
                    <div className="relative">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-yellow-500 rounded-full opacity-30 animate-ping"></div>
                    </div>
                  </div>

                  {/* Safe Zones */}
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-16 right-20">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Report Button Overlay */}
                  <div className="absolute bottom-6 left-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:bg-white transition-all duration-300">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Report incident</span>
                    </button>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/90 backdrop-blur-sm rounded-lg text-white text-sm font-medium shadow-lg">
                      <CheckCircle className="w-4 h-4" />
                      Live Updates
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">High Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Low Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Safe Zone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`flex justify-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-sm font-medium mb-2">Explore more features</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;