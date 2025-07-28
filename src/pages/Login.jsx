import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ jwt-decode v4+
import { Link } from 'react-router-dom';
import BackToHome from '../components/BackToHome';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', form); // ✅ fixed port
      const token = res.data.token;

      localStorage.setItem('token', token); // 🗝️ Save token in browser

      const decoded = jwtDecode(token); // ✅ Decode token to get role

      // 🔀 Redirect based on role
      if (decoded.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div>
        <div className='p-4'>
            <BackToHome/>
        </div>
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden bg-white animate-fade-in">
            

            {/* Left Side - Illustration or Info */}
            <div className="hidden md:flex md:w-1/2 bg-blue-900 text-white flex-col items-center justify-center p-10">
            {/* Icon */}
            <div className="mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm0 0V5m0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-lg text-center text-blue-100">Login to report hazards or manage ongoing cases.</p>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login to Your Account</h2>
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-4"
            >
                <p className=''>Email Adress</p>
                <input 
                name="email" 
                type="email" 
                onChange={handleChange} 
                placeholder="Enter your Email" 
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
                <p>Password</p>
                <input 
                name="password" 
                type="password" 
                onChange={handleChange} 
                placeholder="Enter your Password" 
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
                <button 
                type="submit" 
                className="bg-blue-700 hover:bg-blue-800 hover:scale-105 transition-all duration-200 text-white font-semibold py-2 rounded-md"
                >
                Login
                </button>
                <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-700 hover:underline font-medium">Signup</Link>
                </p>
            </form>
            </div>

        </div>
        </div>
        </div>
    </div>
    


    
  );
}

export default Login;
