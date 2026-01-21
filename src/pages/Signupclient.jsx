import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Signupclient = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          role: 'client', // Hardcoded for this page
          company: 'Pending Company Info' // Default or add field
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setIsAuthenticated(true);
        navigate('/clientonbording');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen ">
      <div className="flex flex-col p-10 bg-blue-300 w-xl items-center rounded-2xl gap-8 justify-center shadow-lg">
        <h1 className="text-4xl">Client Signup</h1>
        <p className="text-xl mb-6">Join to hire talent</p>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded w-full text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="p-4 bg-white items-center text-xl w-full rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            className="p-4 bg-white items-center text-xl w-full rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={user.password}
            onChange={handleChange}
            className="p-4 bg-white items-center text-xl w-full rounded"
            required
          />

          <button type="submit" className="bg-fuchsia-200 h-13 w-full p-3 text-xl rounded-full cursor-pointer hover:bg-gray-400 mt-4">
            Sign Up as Client
          </button>
        </form>

        <p>Already have an account? <Link to="/Loginclient" className="text-white font-bold cursor-pointer hover:underline">Login</Link></p>
      </div>
    </div>
  );
};
export default Signupclient;