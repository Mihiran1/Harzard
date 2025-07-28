import React from 'react'
import { MapPin, Phone, Mail, Shield, AlertTriangle, Users, ExternalLink } from 'lucide-react'

function Footer() {
  return (
    <div>
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-16 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg mr-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Road Safety Platform</h4>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Empowering communities to create safer roads through collaborative reporting and rapid response. 
                Together, we're building a comprehensive network that saves lives and prevents accidents.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-slate-400">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Community Driven</span>
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span>Real-time Alerts</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                Quick Links
                <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home", icon: "🏠" },
                  { href: "/report", label: "Report Hazard", icon: "⚠️" },
                  { href: "/map", label: "Hazard Map", icon: "🗺️" },
                  { href: "/login", label: "Login", icon: "🔐" },
                  { href: "/admin", label: "Admin Panel", icon: "⚙️" },
                  { href: "/stats", label: "Statistics", icon: "📊" }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="group flex items-center text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="mr-2 group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </span>
                      {link.label}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                Get in Touch
                <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:support@roadsafety.lk" 
                    className="group flex items-start text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    <div className="bg-blue-500/20 p-2 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Email</div>
                      <div className="hover:underline">support@roadsafety.lk</div>
                    </div>
                  </a>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Emergency Hotline</div>
                    <div className="text-slate-300 font-mono">+94 11 123 4567</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Headquarters</div>
                    <div className="text-slate-300">123 Safety Avenue<br />Colombo 01, Sri Lanka</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-slate-700 pt-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Reports Filed", value: "2,847", color: "text-blue-400" },
                { label: "Issues Resolved", value: "2,103", color: "text-green-400" },
                { label: "Active Users", value: "15,924", color: "text-purple-400" },
                { label: "Response Time", value: "< 24h", color: "text-yellow-400" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Road Hazard Reporting System. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-slate-400 hover:text-white transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>

          
        </div>

        
      </footer>
    </div>
  )
}

export default Footer