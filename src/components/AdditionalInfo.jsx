import React, { useState } from 'react';
import {
  AlertCircle,
  Phone,
  Clock,
  Building2,
  Navigation2,
  MapPin,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

const AdditionalInfo = () => {
  const [expandedSections, setExpandedSections] = useState({
    problems: true,
    emergency: true,
    process: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const leftColumnData = [
    {
      id: 'problems',
      icon: AlertCircle,
      title: "Problems we don't manage",
      subtitle: "These issues should be reported to other authorities",
      items: [
        { 
          issue: "Bus shelters, fly-tipping, litter, parking or street cleaning", 
          contact: "Contact your district council", 
          icon: Building2,
          type: "district"
        },
        { 
          issue: "Motorways or major A roads", 
          contact: "Contact National Highways", 
          icon: Navigation2,
          type: "highways"
        },
        { 
          issue: "Public rights of way, bridleways, restricted byways", 
          contact: "Report to our Public Rights of Way Team", 
          icon: MapPin,
          type: "rights"
        }
      ],
      footer: "If you want to improve a junction, change speed limits or request new signs, lines or traffic calming measures, find out what steps to take."
    },
    {
      id: 'emergency',
      icon: Phone,
      title: "Out of hours emergencies",
      subtitle: "24/7 emergency contact for urgent issues",
      description: "To report any emergency issues outside of normal office hours (Monday to Friday, 9am to 5pm), call our dedicated hotline:",
      phoneNumber: "03000 41 91 91",
      additionalInfo: "This service is for genuine emergencies only. Non-urgent reports should be submitted during business hours."
    }
  ];

  const rightColumnData = {
    id: 'process',
    icon: Clock,
    title: "What happens after you report",
    subtitle: "Our response timeline and process",
    description: "Once we assess your enquiry, we will prioritize and take appropriate action. Our standard response times are:",
    timeframes: [
      { 
        item: "Dangerous faults", 
        time: "within 2 hours", 
        priority: "high",
        description: "Immediate safety hazards requiring urgent attention"
      },
      { 
        item: "Traffic signals", 
        time: "within 4 hours (urgent) or 7 days (routine)", 
        priority: "medium",
        description: "Malfunctioning traffic control systems"
      },
      { 
        item: "Safety hazards", 
        time: "within 7 days", 
        priority: "medium",
        description: "Non-critical safety issues and minor hazards"
      },
      { 
        item: "Routine maintenance", 
        time: "within 28 days", 
        priority: "low",
        description: "Streetlights, potholes, and landscaping issues"
      },
      { 
        item: "Drainage investigations", 
        time: "inspection within 28 days", 
        priority: "medium",
        description: "Flood risk assessment and defect analysis"
      },
      { 
        item: "Drainage maintenance", 
        time: "within 90 days", 
        priority: "low",
        description: "When intervention requirements are met"
      },
      { 
        item: "All other faults", 
        time: "scheduled maintenance", 
        priority: "low",
        description: "Added to our planned maintenance program"
      }
    ]
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { 
        color: 'bg-red-500', 
        bgColor: 'bg-red-50', 
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        icon: AlertTriangle
      },
      medium: { 
        color: 'bg-amber-500', 
        bgColor: 'bg-amber-50', 
        borderColor: 'border-amber-200',
        textColor: 'text-amber-700',
        icon: Info
      },
      low: { 
        color: 'bg-green-500', 
        bgColor: 'bg-green-50', 
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        icon: CheckCircle
      }
    };
    return configs[priority] || configs.low;
  };

  const renderCollapsibleSection = (section, children) => {
    const isExpanded = expandedSections[section.id];
    
    return (
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{section.title}</h2>
                <p className="text-sm text-slate-600 mt-1">{section.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400 transition-transform duration-200" />
              )}
            </div>
          </div>
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-6">
            <div className="border-t border-slate-100 pt-6">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className=" mx-12 p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">Additional Information</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Important details about our services, response times, and who to contact for different types of issues
        </p>
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        
        {/* Left Column - Problems We Don't Manage */}
        <div className="xl:col-span-1 space-y-6">
          {leftColumnData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {renderCollapsibleSection(section, (
                <>
                  {section.items && (
                    <>
                      <p className="text-slate-700 mb-6 leading-relaxed">
                        If you have a problem with any of the following, please contact the appropriate authority:
                      </p>
                      <div className="space-y-3 mb-6">
                        {section.items.map((item, index) => (
                          <div key={index} className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-4 border border-slate-200 transition-all duration-200">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 group-hover:border-slate-300 transition-colors duration-200">
                                <item.icon className="w-5 h-5 text-slate-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-slate-800 font-medium mb-2">{item.issue}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                                    {item.contact}
                                  </span>
                                  <ExternalLink className="w-4 h-4 text-blue-500" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {section.footer && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-blue-800 leading-relaxed">
                              {section.footer.split('find out what steps to take')[0]}
                              <span className="font-semibold underline cursor-pointer hover:text-blue-900">
                                find out what steps to take
                              </span>.
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {section.description && (
                    <>
                      <p className="text-slate-700 mb-6 leading-relaxed">{section.description}</p>
                      <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
                          <Phone className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-red-700 mb-2">
                          {section.phoneNumber}
                        </div>
                        <p className="text-red-600 font-medium">Emergency Hotline</p>
                      </div>
                      {section.additionalInfo && (
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-amber-800 text-sm leading-relaxed">{section.additionalInfo}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          ))}
        </div>

        {/* Right Column - Response Process */}
        <div className="xl:col-span-2">
          {renderCollapsibleSection(rightColumnData, (
            <>
              <p className="text-slate-700 mb-8 leading-relaxed text-lg">{rightColumnData.description}</p>

              <div className="grid gap-4">
                {rightColumnData.timeframes.map((item, index) => {
                  const config = getPriorityConfig(item.priority);
                  const PriorityIcon = config.icon;
                  
                  return (
                    <div key={index} className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 hover:shadow-md transition-all duration-300`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center shadow-sm`}>
                          <PriorityIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <h3 className="font-bold text-slate-800 text-lg">{item.item}</h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.textColor} bg-white border ${config.borderColor}`}>
                              <Clock className="w-4 h-4 mr-1" />
                              {item.time}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Additional Notes</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Response times may vary depending on weather conditions, resource availability, and the complexity of the issue. 
                      We will keep you informed of any delays and provide updates on the progress of your report.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdditionalInfo;