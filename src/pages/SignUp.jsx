import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import BackToHome from '../components/BackToHome';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    });


      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login"); // ➡ redirect to login page
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred during signup");
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
      <h1 className="text-4xl font-bold mb-4">Join Us</h1>
      <p className="text-lg text-center text-blue-100">Create your account to report road hazards and contribute to safer communities.</p>
    </div>

    {/* Right Side - Signup Form */}
    <div className="w-full md:w-1/2 p-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          name="username"
          type="text"
          onChange={handleChange}
          placeholder="Username"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="role"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 hover:scale-105 transition-transform text-white font-semibold py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-700 hover:underline font-medium">Login</Link>
      </p>
    </div>

  </div>
</div>
        </div>
    </div>



  );
};

export default Signup;
