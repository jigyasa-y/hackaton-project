import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

const ClientReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Get data from location state or localStorage
    const data = location.state?.formData || JSON.parse(localStorage.getItem('clientOnboardingData') || 'null');
    
    if (!data) {
      // If no data, redirect back to onboarding
      navigate('/clientonbording');
      return;
    }
    
    setFormData(data);
  }, [location, navigate]);

  const handleFinish = () => {
    // Clear temporary onboarding data
    localStorage.removeItem('clientOnboardingData');
    // Navigate to dashboard
    navigate('/clientdashboard');
  };

  const handleBack = () => {
    navigate('/clientonbording', { state: { formData } });
  };

  if (!formData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen p-8">
      <h1 className="text-4xl text-black mb-8 font-bold">Review Your Information</h1>
      
      <div className="w-full max-w-2xl bg-blue-50 rounded-xl p-8 shadow-lg">
        <div className="space-y-6">
          {/* Account Information Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Account Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Full Name:</span>
                <span className="text-gray-900">{formData.fullName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Mobile:</span>
                <span className="text-gray-900">{formData.mobile || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Account Type:</span>
                <span className="text-gray-900">{formData.accountType || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Project Preferences Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Project Preferences</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Looking For:</span>
                <span className="text-gray-900">{formData.lookingFor || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Budget & Timeline:</span>
                <span className="text-gray-900">{formData.budgetTimeline || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Communication Preference:</span>
                <span className="text-gray-900">{formData.communicationPreference || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white text-center px-8 py-3 text-xl rounded-2xl hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleFinish}
          className="bg-blue-500 text-white text-center px-8 py-3 text-xl rounded-2xl hover:bg-blue-600 transition-colors"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ClientReview;



