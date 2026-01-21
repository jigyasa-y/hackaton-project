import React from 'react';
import { useNavigate } from 'react-router';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Smart Freelancing Platform
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          How would you like to use the platform?
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Freelancer Card */}
          <div
            onClick={() => navigate('/signup')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="h-48 bg-blue-100 rounded-xl mb-6 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600">
              I am a Freelancer
            </h2>
            <p className="text-gray-600">
              Find projects, showcase your skills, and get paid for your work.
            </p>
            <button className="mt-6 w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Join as Freelancer
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Already have an account? <span onClick={(e) => { e.stopPropagation(); navigate('/login'); }} className="text-blue-600 hover:underline">Log in</span>
            </p>
          </div>

          {/* Client Card */}
          <div
            onClick={() => navigate('/signupclient')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-indigo-500 group"
          >
            <div className="h-48 bg-indigo-100 rounded-xl mb-6 flex items-center justify-center">
              <span className="text-6xl">💼</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600">
              I am a Client
            </h2>
            <p className="text-gray-600">
              Post projects, hire talent, and get your work done efficiently.
            </p>
            <button className="mt-6 w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Join as Client
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Already have an account? <span onClick={(e) => { e.stopPropagation(); navigate('/loginclient'); }} className="text-indigo-600 hover:underline">Log in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
