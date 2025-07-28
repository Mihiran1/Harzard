import React from 'react';
import { LogIn, UserPlus, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between ">
    <div className="flex items-center gap-2 text-xl font-bold text-blue-700">
      <MapPin size={28} />
      <span>SafeRoad</span>
    </div>
    <div className="space-x-4">
      <Link to="/login" className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
        <LogIn size={16} /> Login
      </Link>
      <Link to="/signup" className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-100">
        <UserPlus size={16} /> Signup
      </Link>
    </div>
  </nav>

  );
};

export default Navbar;
