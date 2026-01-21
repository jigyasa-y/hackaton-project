import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Select from './ui/Select';
import Avatar from './ui/Avatar';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Get user name from localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('freelancerOnboardingData');
    setIsDropdownOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              FreelanceHub
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Select
              options={[
                { value: 'all', label: 'All Projects' },
                { value: 'learning', label: 'Learning Projects' },
                { value: 'paid', label: 'Paid Projects' },
              ]}
              placeholder="Browse Projects"
              className="w-40 text-sm"
              defaultValue=""
            />
            
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              My Progress
            </a>
            
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Messages
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Notifications"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* User Profile with Dropdown */}
            <div className="relative flex items-center gap-3 pl-3 border-l border-gray-200" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Avatar name={userName} size="md" />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {userName}
                </span>
                <svg 
                  className={`h-4 w-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m-4 4l-4-4m4 4H3" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
