import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setIsAuthenticated(true);
        navigate('/freelancerDashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center p-8 bg-blue-200 rounded-md w-96 gap-8 shadow-lg">
        <h1 className="text-4xl">Freelancer Login</h1>
        <p className="text-xl mb-4">Welcome back!</p>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded w-full text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
            className="bg-white p-3 w-full text-sm rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            className="bg-white p-3 w-full text-sm rounded-md"
          />

          <button type="submit" className="bg-fuchsia-200 p-3 w-full text-xl font-mono rounded-full cursor-pointer hover:bg-fuchsia-300 transition-colors">
            Login
          </button>
        </form>

        <p className="text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-700 font-bold hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
