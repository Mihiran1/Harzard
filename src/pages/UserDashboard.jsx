import React from 'react'
import { useReports } from '../context/ReportsContext';
import { getUserFromToken } from '../utils/getUserFromToken';
import UserNavbar from '../components/UserNavbar'
import Hero from '../components/Hero';
import AdditionalInfo from '../components/AdditionalInfo';
import Footer from '../components/Footer';

function UserDashboard() {
  const { getReportsByUser } = useReports();
  const currentUser = getUserFromToken();
  
  // Get user's reports for potential display
  const userReports = currentUser ? getReportsByUser(currentUser.email) : [];

  return (
    <div>
        <UserNavbar/>
        <Hero />
        {/* Optional: Add a section to show user's submitted reports */}
        {userReports.length > 0 && (
          <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Recent Reports</h2>
              <div className="text-sm text-gray-600 mb-4">
                You have submitted {userReports.length} report{userReports.length !== 1 ? 's' : ''}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userReports.slice(0, 3).map(report => (
                  <div key={report.id} className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-gray-500">{report.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{report.typeLabel}</h3>
                    <p className="text-sm text-gray-600 mb-2">{report.location}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(report.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <AdditionalInfo/>
      <Footer/>
    </div>
  )
}

export default UserDashboard