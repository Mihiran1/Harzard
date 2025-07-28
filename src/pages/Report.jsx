import React, { useState } from 'react';
import { Camera, Upload, X, Send, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useReports } from '../context/ReportsContext';
import { getUserFromToken } from '../utils/getUserFromToken';


const Report = ({ onBackToHome }) => {
  const [formStep, setFormStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState('');

  const navigate = useNavigate();
  const { addReport } = useReports();

  

  const incidentTypes = [
    { id: 'pothole', label: 'Pothole', icon: '🕳️', desc: 'Road surface damage', typeLabel: 'Pothole' },
    { id: 'bridge', label: 'Bridge Issue', icon: '🌉', desc: 'Structural problems', typeLabel: 'Bridge Issue' },
    { id: 'bend', label: 'Dangerous Bend', icon: '🔄', desc: 'Sharp or blind curves', typeLabel: 'Dangerous Bend' },
    { id: 'lighting', label: 'Poor Lighting', icon: '💡', desc: 'Inadequate street lights', typeLabel: 'Poor Lighting' },
    { id: 'signage', label: 'Missing Signs', icon: '🚧', desc: 'Traffic or warning signs', typeLabel: 'Missing Signs' },
    { id: 'other', label: 'Other', icon: '⚠️', desc: 'Other safety concerns', typeLabel: 'Other' }
  ];

  const severityLevels = [
    { id: 'low', label: 'Low Risk', color: 'yellow', desc: 'Minor inconvenience', severityLabel: 'Low Risk' },
    { id: 'medium', label: 'Medium Risk', color: 'orange', desc: 'Potential hazard', severityLabel: 'Medium Risk' },
    { id: 'high', label: 'High Risk', color: 'red', desc: 'Immediate danger', severityLabel: 'High Risk' }
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files.slice(0, 3 - prev.length)]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get current user info
      const currentUser = getUserFromToken();
      
      // Get type and severity labels
      const selectedTypeData = incidentTypes.find(t => t.id === selectedType);
      const selectedSeverityData = severityLevels.find(s => s.id === selectedSeverity);
      
      // Prepare report data
      const reportData = {
        type: selectedType,
        typeLabel: selectedTypeData?.typeLabel || selectedType,
        severity: selectedSeverity,
        severityLabel: selectedSeverityData?.severityLabel || selectedSeverity,
        location: location,
        description: description,
        images: images.map(img => URL.createObjectURL(img)), // Convert to URLs for display
        submittedBy: currentUser?.email || 'Anonymous User',
        coordinates: { lat: 0, lng: 0 } // Default coordinates - could be enhanced with geolocation
      };

      // Add report to context
      const reportId = addReport(reportData);
      setSubmittedReportId(reportId);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }

    setIsSubmitting(false);

  };


  const resetForm = () => {
    setIsSubmitted(false);
    setFormStep(1);
    setSelectedType('');
    setSelectedSeverity('');
    setDescription('');
    setImages([]);
    setLocation('');
    setSubmittedReportId('');
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted!</h2>
          <p className="text-gray-600 mb-6">Thank you for helping make our roads safer. Your report has been sent to local authorities.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">Reference ID: <span className="font-mono font-bold text-blue-600">#{submittedReportId}</span></p>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={resetForm}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Submit Another Report
            </button>
            <button 
              onClick={onBackToHome}  
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Report a Road Safety Issue</h2>
          <p className="text-xl text-gray-600">Help us identify and fix dangerous road conditions</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  formStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    formStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Incident Type */}
            {formStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What type of issue are you reporting?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {incidentTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                        selectedType === type.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-3">{type.icon}</div>
                      <h4 className="font-bold text-gray-900 mb-2">{type.label}</h4>
                      <p className="text-sm text-gray-600">{type.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    
                    onClick={onBackToHome}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Back to Home
                  </button>
                  <button
                    type="button"
                    onClick={() => selectedType && setFormStep(2)}
                    disabled={!selectedType}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Severity */}
            {formStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How severe is this issue?</h3>
                <div className="space-y-4">
                  {severityLevels.map(level => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSelectedSeverity(level.id)}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                        selectedSeverity === level.id 
                          ? `border-${level.color}-500 bg-${level.color}-50` 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 bg-${level.color}-500 rounded-full`}></div>
                        <div>
                          <h4 className="font-bold text-gray-900">{level.label}</h4>
                          <p className="text-sm text-gray-600">{level.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => selectedSeverity && setFormStep(3)}
                    disabled={!selectedSeverity}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {formStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Provide additional details</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter the exact location or nearby landmarks"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue in detail..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Photos (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload photos</p>
                        <p className="text-sm text-gray-500">Maximum 3 images</p>
                      </div>
                    </label>
                    
                    {images.length > 0 && (
                      <div className="flex gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => location && description && setFormStep(4)}
                    disabled={!location || !description}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    Review Report
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {formStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Review your report</h3>
                
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Issue Type</h4>
                    <p className="text-gray-900">{incidentTypes.find(t => t.id === selectedType)?.label}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Severity</h4>
                    <p className="text-gray-900">{severityLevels.find(s => s.id === selectedSeverity)?.label}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Location</h4>
                    <p className="text-gray-900">{location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Description</h4>
                    <p className="text-gray-900">{description}</p>
                  </div>
                  {images.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Photos</h4>
                      <div className="flex gap-2 mt-2">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setFormStep(3)}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-green-700 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Report;