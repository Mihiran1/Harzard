import React from 'react';
import { MapPin, AlertTriangle, Shield, Settings } from 'lucide-react';

const HomePage = ({ onNavigateToMap, onReportClick, onAdminLogin, incidents }) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-6">Community Safety Hub</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Report safety issues, view community maps, and help make your neighborhood safer for everyone.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
            <MapPin className="w-12 h-12 text-blue-200 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Safety Map</h3>
            <p className="text-blue-100 mb-6">
              View interactive maps showing safety incidents, road hazards, and community reports in your area.
            </p>
            <button
              onClick={onNavigateToMap}
              className="w-full px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Open Safety Map
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
            <AlertTriangle className="w-12 h-12 text-orange-200 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Report Issue</h3>
            <p className="text-blue-100 mb-6">
              Quickly report safety concerns, road hazards, or infrastructure issues in your community.
            </p>
            <button
              onClick={onReportClick}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Report an Issue
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
            <Shield className="w-12 h-12 text-green-200 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Safety Tips</h3>
            <p className="text-blue-100 mb-6">
              Access safety resources, emergency contacts, and community guidelines for staying safe.
            </p>
            <button className="w-full px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
              View Safety Tips
            </button>
          </div>
          
          {/* Admin Access Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 md:col-span-2 lg:col-span-1">
            <Settings className="w-12 h-12 text-purple-200 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h3>
            <p className="text-blue-100 mb-6">
              Access administrative tools to manage reports, view analytics, and monitor community safety.
            </p>
            <button
              onClick={onAdminLogin}
              className="w-full px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors"
            >
              Admin Login
            </button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{incidents.length}</div>
              <div className="text-blue-200">Total Reports</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {incidents.filter(i => i.status === 'resolved').length}
              </div>
              <div className="text-blue-200">Issues Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {incidents.reduce((sum, i) => sum + i.votes, 0)}
              </div>
              <div className="text-blue-200">Community Votes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;