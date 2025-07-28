import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Calendar, Star, MessageSquare, AlertTriangle, Shield, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const SafetyMap = ({ onBackToHome, onReportClick }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map');
  const [showFilters, setShowFilters] = useState(false);


  const incidents = [
    {
      id: 1,
      type: 'pothole',
      severity: 'high',
      location: 'Main Street & 1st Ave',
      description: 'Large pothole causing traffic congestion',
      reports: 23,
      status: 'pending',
      date: '2024-01-15',
      coordinates: { x: 20, y: 16 },
      images: 3,
      votes: 45
    },
    {
      id: 2,
      type: 'lighting',
      severity: 'medium',
      location: 'Park Road Junction',
      description: 'Street lights not working for 2 weeks',
      reports: 8,
      status: 'in-progress',
      date: '2024-01-12',
      coordinates: { x: 75, y: 32 },
      images: 1,
      votes: 12
    },
    {
      id: 3,
      type: 'bend',
      severity: 'low',
      location: 'Highway 101 Curve',
      description: 'Sharp turn with poor visibility',
      reports: 5,
      status: 'pending',
      date: '2024-01-10',
      coordinates: { x: 16, y: 75 },
      images: 2,
      votes: 8
    },
    {
      id: 4,
      type: 'resolved',
      severity: 'resolved',
      location: 'Oak Street Bridge',
      description: 'Bridge repairs completed',
      reports: 15,
      status: 'resolved',
      date: '2024-01-08',
      coordinates: { x: 50, y: 24 },
      images: 4,
      votes: 67
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'yellow';
      case 'resolved': return 'green';
      default: return 'gray';
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': { color: 'bg-red-100 text-red-800', text: 'Pending' },
      'in-progress': { color: 'bg-orange-100 text-orange-800', text: 'In Progress' },
      'resolved': { color: 'bg-green-100 text-green-800', text: 'Resolved' }
    };
    return badges[status] || badges.pending;
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesFilter = filterType === 'all' || incident.severity === filterType || incident.status === filterType;
    const matchesSearch = incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Home
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Safety Map</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Map View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  List View
                </button>
              </div>
              
              <button
                onClick={onReportClick}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
                
                <div className={`space-y-3 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {[
                    { id: 'all', label: 'All Issues', count: incidents.length },
                    { id: 'high', label: 'High Risk', count: incidents.filter(i => i.severity === 'high').length },
                    { id: 'medium', label: 'Medium Risk', count: incidents.filter(i => i.severity === 'medium').length },
                    { id: 'low', label: 'Low Risk', count: incidents.filter(i => i.severity === 'low').length },
                    { id: 'resolved', label: 'Resolved', count: incidents.filter(i => i.status === 'resolved').length }
                  ].map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setFilterType(filter.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                        filterType === filter.id 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{filter.label}</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{filter.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Legend</h3>
                <div className="space-y-3">
                  {[
                    { color: 'red', label: 'High Risk', icon: AlertTriangle },
                    { color: 'orange', label: 'Medium Risk', icon: AlertTriangle },
                    { color: 'yellow', label: 'Low Risk', icon: AlertTriangle },
                    { color: 'green', label: 'Safe/Resolved', icon: Shield }
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.color} className="flex items-center gap-3">
                        <div className={`w-4 h-4 bg-${item.color}-500 rounded-full`}></div>
                        <span className="text-sm text-gray-600">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {viewMode === 'map' ? (
              /* Map View */
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Interactive Safety Map</h2>
                    <div className="text-sm text-gray-500">
                      Showing {filteredIncidents.length} of {incidents.length} incidents
                    </div>
                  </div>
                </div>
                
                <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 via-green-100 to-blue-50">
                  {/* Map Roads */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M10 25 Q50 20 90 30" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                    <path d="M20 50 Q50 45 80 55" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
                    <path d="M25 12 Q37 37 50 62" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
                    <path d="M62 15 Q70 40 77 65" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
                  </svg>

                  {/* Incident Markers */}
                  {filteredIncidents.map(incident => {
                    const color = getSeverityColor(incident.severity);
                    return (
                      <div
                        key={incident.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          left: `${incident.coordinates.x}%`,
                          top: `${incident.coordinates.y}%`
                        }}
                        onClick={() => setSelectedMarker(incident)}
                      >
                        <div className="relative">
                          <div className={`w-8 h-8 bg-${color}-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                            {incident.status === 'resolved' ? (
                              <Shield className="w-4 h-4 text-white" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          {incident.severity !== 'resolved' && (
                            <div className={`absolute -top-1 -left-1 w-10 h-10 bg-${color}-500 rounded-full opacity-30 animate-ping`}></div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Report Button */}
                  <div className="absolute bottom-6 right-6">
                    <button
                      onClick={onReportClick}
                      className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                    >
                      <MapPin className="w-5 h-5" />
                      Report New Issue
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredIncidents.map(incident => {
                  const statusBadge = getStatusBadge(incident.status);
                  const color = getSeverityColor(incident.severity);
                  
                  return (
                    <div key={incident.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-${color}-500 rounded-xl flex items-center justify-center`}>
                              {incident.status === 'resolved' ? (
                                <Shield className="w-6 h-6 text-white" />
                              ) : (
                                <AlertTriangle className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-gray-900">{incident.location}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                                  {statusBadge.text}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-3">{incident.description}</p>
                              <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-4 h-4" />
                                  {incident.reports} reports
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4" />
                                  {incident.votes} votes
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(incident.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedMarker(incident)}
                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedMarker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Incident Details</h3>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${getSeverityColor(selectedMarker.severity)}-500 rounded-xl flex items-center justify-center`}>
                    {selectedMarker.status === 'resolved' ? (
                      <Shield className="w-6 h-6 text-white" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedMarker.location}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedMarker.status).color}`}>
                      {getStatusBadge(selectedMarker.status).text}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Description</h5>
                  <p className="text-gray-600">{selectedMarker.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-700">Reports</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{selectedMarker.reports}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-700">Votes</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">{selectedMarker.votes}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Reported: {new Date(selectedMarker.date).toLocaleDateString()}</span>
                  <span>{selectedMarker.images} photos attached</span>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Vote for Priority
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMarker(null);
                      onReportClick();
                    }}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Report Similar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SafetyMap;