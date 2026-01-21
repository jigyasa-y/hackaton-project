import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { freelancerAPI } from '../utils/api';

const FreelancerReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get data from location state or localStorage
    const data = location.state?.formData || JSON.parse(localStorage.getItem('freelancerOnboardingData') || 'null');
    
    if (!data) {
      // If no data, redirect back to onboarding
      navigate('/onboarding');
      return;
    }
    
    setFormData(data);
  }, [location, navigate]);

  const handleFinish = async () => {
    if (!formData) return;

    setLoading(true);
    setError('');

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const profileId = user.profileId;

      if (!profileId) {
        throw new Error('Profile ID not found. Please login again.');
      }

      // Prepare freelancer update data (only allowed fields: name, skills, preferredProjectType, availabilityHours)
      const updateData = {
        name: formData.name,
        skills: formData.skills || [],
        preferredProjectType: formData.projectPreference || 'both',
        availabilityHours: parseInt(formData.availabilityHours) || 20
      };

      // Update freelancer profile
      await freelancerAPI.update(profileId, updateData);

      // Clear temporary onboarding data
      localStorage.removeItem('freelancerOnboardingData');
      
      // Navigate to dashboard
      navigate('/freelancerDashboard');
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.');
      console.error('Error updating freelancer:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/onboarding', { state: { formData } });
  };

  if (!formData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen p-8">
      <h1 className="text-4xl text-black mb-8 font-bold">Review Your Information</h1>
      
      <div className="w-full max-w-2xl bg-blue-50 rounded-xl p-8 shadow-lg">
        <div className="space-y-6">
          {/* Personal Details Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-900">{formData.name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-900">{formData.email || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Contact:</span>
                <span className="text-gray-900">{formData.contact || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Role:</span>
                <span className="text-gray-900">{formData.role || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">City:</span>
                <span className="text-gray-900">{formData.city || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Country:</span>
                <span className="text-gray-900">{formData.country || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Skill Selection Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Skill Selection</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium block mb-2">Skills:</span>
                {formData.skills && formData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm"
                      >
                        {skill.skillName} ({skill.level})
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-900">Not provided</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Project Preference:</span>
                <span className="text-gray-900">{formData.projectPreference || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Availability:</span>
                <span className="text-gray-900">
                  {formData.availabilityHours ? `${formData.availabilityHours} hours/week` : (formData.availability || 'Not provided')}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Additional Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Project Link:</span>
                <span className="text-gray-900 break-all">{formData.projectLink || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">College Email:</span>
                <span className="text-gray-900">{formData.collegeEmail || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={handleBack}
          disabled={loading}
          className="bg-gray-500 text-white text-center px-8 py-3 text-xl rounded-2xl hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleFinish}
          disabled={loading}
          className="bg-blue-500 text-white text-center px-8 py-3 text-xl rounded-2xl hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default FreelancerReview;

