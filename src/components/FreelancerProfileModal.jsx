import React, { useEffect, useState } from 'react';
import { freelancerAPI } from '../utils/api';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Avatar from './ui/Avatar';

const FreelancerProfileModal = ({ freelancerId, isOpen, onClose, matchData }) => {
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && freelancerId) {
      fetchFreelancerProfile();
    }
  }, [isOpen, freelancerId]);

  const fetchFreelancerProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await freelancerAPI.getById(freelancerId);
      if (response.success) {
        setFreelancer(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load freelancer profile');
      console.error('Error fetching freelancer profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const displayData = freelancer || matchData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Freelancer Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-center py-8">Loading profile...</div>
          ) : error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          ) : displayData ? (
            <>
              {/* Profile Header */}
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <Avatar name={displayData?.name || matchInfo?.freelancer?.name || 'Freelancer'} size="xl" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {displayData?.name || matchData?.name || 'Freelancer'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayData && (
                      <Badge variant="primary" size="sm">
                        {displayData.status === 'graduated' ? 'Graduated' : 'Active'}
                      </Badge>
                    )}
                    {matchInfo && (
                      <Badge variant="success" size="sm">
                        {matchInfo.matchScore}% Match
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                <div className="text-gray-600 space-y-1">
                  <p><span className="font-medium">Email:</span> {displayData?.email || matchInfo?.freelancer?.email || 'N/A'}</p>
                </div>
              </div>

              {/* Skills */}
              {displayData?.skills && displayData.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayData.skills.map((skill, index) => (
                      <Badge key={index} variant="primary" size="sm">
                        {skill.skillName} ({skill.level})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Skills (if available) */}
              {matchInfo && matchInfo.matchingSkills && matchInfo.matchingSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchInfo.matchingSkills.map((skill, index) => (
                      <Badge key={index} variant="success" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Preferences */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Project Preference</h4>
                  <p className="text-gray-600 capitalize">
                    {displayData?.preferredProjectType || matchInfo?.freelancer?.preferredProjectType || 'Both'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Availability</h4>
                  <p className="text-gray-600">
                    {displayData?.availabilityHours || matchInfo?.freelancer?.availabilityHours || 0} hours/week
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Progress</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completed Projects</span>
                    <span className="font-semibold">
                      {displayData?.completedProjectsCount || matchInfo?.freelancer?.completedProjectsCount || 0} of 10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(((displayData?.completedProjectsCount || matchInfo?.freelancer?.completedProjectsCount || 0) / 10) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {matchInfo && (
            <Button variant="primary">
              Assign to Project
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfileModal;

