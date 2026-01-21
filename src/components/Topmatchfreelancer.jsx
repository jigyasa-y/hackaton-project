import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import { projectAPI } from '../utils/api';
import FreelancerProfileModal from './FreelancerProfileModal';

const Topmatchfreelancer = ({ projectId }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFreelancerId, setSelectedFreelancerId] = useState(null);
  const [selectedMatchData, setSelectedMatchData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // If projectId is provided, fetch matched freelancers
    if (projectId) {
      loadMatchedFreelancers(projectId);
    } else {
      // Otherwise, try to get the latest project's matches
      loadLatestProjectMatches();
    }
  }, [projectId]);

  const loadLatestProjectMatches = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Get clientId from user object in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const clientId = user.profileId;
      
      if (!clientId) {
        setError("Client ID not found. Please login again.");
        setLoading(false);
        return;
      }
      
      const response = await projectAPI.getAll({ status: 'open', clientId: String(clientId) });
      
      if (response.success && response.data && response.data.length > 0) {
        // Get matches for the most recent project
        const latestProject = response.data[0];
        await loadMatchedFreelancers(latestProject._id);
      } else if (response.data && response.data.length > 0) {
        // Fallback for different response structure
        const latestProject = response.data[0];
        await loadMatchedFreelancers(latestProject._id);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const loadMatchedFreelancers = async (projId) => {
    try {
      setLoading(true);
      setError("");
      const response = await projectAPI.getMatchedFreelancers(projId);
      
      if (response.success) {
        const formattedFreelancers = response.data.map(item => ({
          id: item.freelancer._id,
          name: item.freelancer.name,
          email: item.freelancer.email,
          role: item.freelancer.skills.map(s => s.skillName).join(", ") || "Freelancer",
          projects: `${item.freelancer.completedProjectsCount} of 10`,
          matchScore: item.matchScore,
          matchingSkills: item.matchingSkills,
          availabilityHours: item.freelancer.availabilityHours,
          matchData: item, // Store full match data
        }));
        setFreelancers(formattedFreelancers);
      }
    } catch (err) {
      setError(err.message || "Failed to load matched freelancers");
      console.error("Error loading matched freelancers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Listen for project creation events
  useEffect(() => {
    window.onProjectCreated = (projectData) => {
      if (projectData.matchedFreelancers) {
        const formatted = projectData.matchedFreelancers.map(item => ({
          id: item.freelancer._id,
          name: item.freelancer.name,
          email: item.freelancer.email,
          role: item.freelancer.skills.map(s => s.skillName).join(", ") || "Freelancer",
          projects: `${item.freelancer.completedProjectsCount} of 10`,
          matchScore: item.matchScore,
          matchingSkills: item.matchingSkills,
          availabilityHours: item.freelancer.availabilityHours,
          matchData: item, // Store full match data
        }));
        setFreelancers(formatted);
      }
    };

    return () => {
      window.onProjectCreated = null;
    };
  }, []);

  return (
    <Card className="w-full" padding="lg">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Matched Freelancers</h2>
          <p className="text-sm text-gray-600">Freelancers that match your project needs</p>
        </div>

        <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-900">Matches Found!</p>
              <p className="text-xs text-amber-700 mt-0.5">These freelancers match your project needs</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8 text-gray-500">
            <p>Loading matched freelancers...</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {!loading && freelancers.length === 0 && !error && (
            <div className="text-center py-8 text-gray-500">
              <p>No matched freelancers found. Post a project to see matches!</p>
            </div>
          )}

          {freelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar name={freelancer.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {freelancer.name}
                    </h3>
                    <Badge variant="success" size="sm" className="flex-shrink-0">
                      {freelancer.matchScore}% Match
                    </Badge>
                  </div>
                  <Badge variant="primary" size="sm">
                    {freelancer.role}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">{freelancer.projects} Projects</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedFreelancerId(freelancer.id);
                    setSelectedMatchData(freelancer.matchData);
                    setIsModalOpen(true);
                  }}
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="md" className="w-full">
          View All Matches
        </Button>
      </div>

      <FreelancerProfileModal
        freelancerId={selectedFreelancerId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFreelancerId(null);
          setSelectedMatchData(null);
        }}
        matchData={selectedMatchData}
      />
    </Card>
  );
};

export default Topmatchfreelancer;
