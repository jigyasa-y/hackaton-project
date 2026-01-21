import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Tab from './ui/Tab';
import Input from './ui/Input';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { projectAPI } from '../utils/api';
import ProjectDetailModal from './ProjectDetailModal';

const Yourproject = () => {
  const [activeTab, setActiveTab] = useState('open'); // 'open' matches backend status usually
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mapped tabs to backend status if needed, or just filter frontend side
  const tabs = [
    { id: 'open', label: 'Ongoing/Open', count: projects.filter(p => p.status === 'open').length },
    { id: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
  ];

  useEffect(() => {
    fetchProjects();
    
    // Listen for project creation events to refresh the list
    window.refreshProjects = () => {
      fetchProjects();
    };
    
    return () => {
      window.refreshProjects = null;
    };
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const clientId = user.profileId;
      
      if (!clientId) {
        const errorMsg = "Client ID not found. Please login again.";
        console.error(errorMsg, "User data:", user);
        setError(errorMsg);
        setLoading(false);
        setProjects([]);
        return;
      }
      
      // Fetch projects for this client
      const response = await projectAPI.getAll({ clientId: String(clientId) });
      
      // Handle different response structures
      if (response && response.success && response.data) {
        setProjects(Array.isArray(response.data) ? response.data : []);
      } else if (response && Array.isArray(response.data)) {
        setProjects(response.data);
      } else if (Array.isArray(response)) {
        setProjects(response);
      } else {
        console.warn("Unexpected response format:", response);
        setProjects([]);
      }
    } catch (error) {
      const errorMsg = error.message || "Failed to fetch projects. Please try again.";
      console.error("Failed to fetch projects:", error);
      setError(errorMsg);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(
    project => (project.status === activeTab || (activeTab === 'open' && project.status === 'in_progress')) &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full max-w-2xl" padding="lg">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Tab
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-4 pt-2">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading projects...</div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project._id}
                className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.title}
                      </h3>
                      <Badge variant="default" size="sm">
                        {project.projectType === 'paid' ? `Budget: $${project.budget}` : 'Unpaid'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{project.requiredSkills?.length || 0} Skills</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setSelectedProjectId(project._id);
                      setIsModalOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-base font-medium">No projects found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      <ProjectDetailModal
        projectId={selectedProjectId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProjectId(null);
        }}
      />
    </Card>
  );
};

export default Yourproject;
