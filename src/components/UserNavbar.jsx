import React, { useEffect, useState } from 'react';
import { LogIn, UserPlus, MapPin, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/getUserFromToken'; // ✅ correct path

const UserNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); // Refresh to update UI
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-xl font-bold text-blue-700">
        <MapPin size={28} />
        <span>SafeRoad</span>
      </div>

      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="text-blue-800 font-semibold text-sm">
              Welcome, {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <LogIn size={16} /> Login
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
            >
              <UserPlus size={16} /> Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
