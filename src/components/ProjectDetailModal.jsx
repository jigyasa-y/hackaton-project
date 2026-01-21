import React, { useEffect, useState } from 'react';
import { projectAPI } from '../utils/api';
import Badge from './ui/Badge';
import Button from './ui/Button';

const ProjectDetailModal = ({ projectId, isOpen, onClose }) => {
  const [project, setProject] = useState(null);
  const [matchedFreelancers, setMatchedFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && projectId) {
      fetchProjectDetails();
    }
  }, [isOpen, projectId]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch project details
      const projectResponse = await projectAPI.getById(projectId);
      if (projectResponse.success) {
        setProject(projectResponse.data);
      }
      
      // Fetch matched freelancers
      const freelancersResponse = await projectAPI.getMatchedFreelancers(projectId);
      if (freelancersResponse.success) {
        setMatchedFreelancers(freelancersResponse.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load project details');
      console.error('Error fetching project details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-center py-8">Loading project details...</div>
          ) : error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          ) : project ? (
            <>
              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="default" size="sm">
                      {project.projectType === 'paid' ? `Paid - $${project.budget}` : 'Learning/Unpaid'}
                    </Badge>
                    <Badge variant="primary" size="sm">
                      {project.status === 'open' ? 'Open' : project.status === 'in_progress' ? 'In Progress' : 'Completed'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-600">{project.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Duration</h4>
                    <p className="text-gray-600">{project.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills?.map((skill, index) => (
                        <Badge key={index} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {project.clientId && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Client</h4>
                    <p className="text-gray-600">
                      {typeof project.clientId === 'object' ? project.clientId.name : 'Client'}
                    </p>
                  </div>
                )}
              </div>

              {/* Matched Freelancers */}
              {matchedFreelancers.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Matched Freelancers ({matchedFreelancers.length})
                  </h3>
                  <div className="space-y-3">
                    {matchedFreelancers.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {item.freelancer.name}
                              </h4>
                              <Badge variant="success" size="sm">
                                {item.matchScore}% Match
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <span className="font-medium">Skills:</span>{' '}
                                {item.freelancer.skills?.map(s => s.skillName).join(', ') || 'N/A'}
                              </p>
                              <p>
                                <span className="font-medium">Matching Skills:</span>{' '}
                                {item.matchingSkills?.join(', ') || 'N/A'}
                              </p>
                              <p>
                                <span className="font-medium">Completed Projects:</span>{' '}
                                {item.freelancer.completedProjectsCount || 0} of 10
                              </p>
                              <p>
                                <span className="font-medium">Availability:</span>{' '}
                                {item.freelancer.availabilityHours || 0} hours/week
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;



