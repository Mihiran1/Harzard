import React, { createContext, useContext, useState, useEffect } from 'react';

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  // Load reports from localStorage on initialization
  useEffect(() => {
    const savedReports = localStorage.getItem('reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      // Initialize with mock data if no saved reports
      const mockReports = [
        {
          id: 'RSR-2024-001',
          type: 'pothole',
          typeLabel: 'Pothole',
          severity: 'high',
          severityLabel: 'High Risk',
          location: 'Main Street near City Hall, Colombo',
          coordinates: { lat: 6.9271, lng: 79.8612 },
          description: 'Large pothole causing vehicles to swerve into oncoming traffic. Multiple reports from residents.',
          images: [],
          status: 'pending',
          submittedAt: '2024-07-25T10:30:00Z',
          submittedBy: 'user@example.com',
          comments: [
            { id: 1, author: 'Admin John', text: 'Forwarded to road maintenance team', timestamp: '2024-07-25T11:00:00Z' },
            { id: 2, author: 'Engineer Sarah', text: 'Site inspection scheduled for tomorrow', timestamp: '2024-07-25T14:30:00Z' }
          ]
        },
        {
          id: 'RSR-2024-002',
          type: 'lighting',
          typeLabel: 'Poor Lighting',
          severity: 'medium',
          severityLabel: 'Medium Risk',
          location: 'Galle Road, Mount Lavinia',
          coordinates: { lat: 6.8382, lng: 79.8646 },
          description: 'Several street lights are not working along this stretch, making it dangerous for pedestrians at night.',
          images: [],
          status: 'in-progress',
          submittedAt: '2024-07-24T16:45:00Z',
          submittedBy: 'user2@example.com',
          comments: [
            { id: 3, author: 'Admin Mike', text: 'Electrical team notified', timestamp: '2024-07-24T17:00:00Z' }
          ]
        }
      ];
      setReports(mockReports);
      localStorage.setItem('reports', JSON.stringify(mockReports));
    }
  }, []);

  // Save reports to localStorage whenever reports change
  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const addReport = (reportData) => {
    const newReport = {
      id: `RSR-${new Date().getFullYear()}-${String(reports.length + 1).padStart(3, '0')}`,
      ...reportData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      comments: []
    };
    
    setReports(prev => [newReport, ...prev]);
    return newReport.id;
  };

  const updateReportStatus = (reportId, newStatus) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const addComment = (reportId, comment) => {
    const newComment = {
      id: Date.now(),
      author: 'Current Admin',
      text: comment,
      timestamp: new Date().toISOString()
    };

    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, comments: [...report.comments, newComment] }
        : report
    ));
  };

  return (
    <ReportsContext.Provider value={{ 
      reports, 
      addReport, 
      updateReportStatus, 
      addComment 
    }}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};