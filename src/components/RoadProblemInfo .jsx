import React from 'react';
import { 
  AlertTriangle, 
  Lightbulb, 
  Navigation, 
  Droplets, 
  MapPin, 
  TreePine, 
  Construction,
  Car,
  Trash2
} from 'lucide-react';

const RoadProblemInfo = () => {
  const problemTypes = [
    {
      icon: Lightbulb,
      title: "Street light faults",
      description: "Non-functioning or damaged street lighting",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: AlertTriangle,
      title: "Potholes",
      description: "Road surface damage and holes",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Droplets,
      title: "Drainage",
      description: "Blocked drains and water pooling issues",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Navigation,
      title: "Traffic signal faults",
      description: "Malfunctioning traffic lights and signals",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: MapPin,
      title: "Damage to bus stops",
      description: "Issues with poles, shelters, or timetables",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: TreePine,
      title: "Overgrown vegetation",
      description: "Hedges, grass, and plants blocking roads",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Construction,
      title: "Information about roadworks",
      description: "Updates and reports on construction activities",
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    },
    {
      icon: Car,
      title: "Parking issues",
      description: "Damaged parking meters or marking problems",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Trash2,
      title: "Litter and debris",
      description: "Excessive litter or debris on roads and pavements",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <div className="my-12 mx-auto p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Report or track a problem on
          <span className="block text-blue-600 mt-1">
            the road or pavement
          </span>
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          You can report non-urgent issues online including:
        </p>
      </div>

      {/* Problem Types Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problemTypes.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${problem.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${problem.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadProblemInfo;