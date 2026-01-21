import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Tab from './ui/Tab';
import Button from './ui/Button';
import Badge from './ui/Badge';

const Suggesionproject = ({ projects = { learning: [], paid: [] } }) => {
  const [activeTab, setActiveTab] = useState('learning');
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    if (projects) {
      const allProjects = [
        ...(projects.learning || []).map(item => ({
          id: item.project._id,
          title: item.project.title,
          type: item.project.requiredSkills?.join(", ") || "General",
          details: [
            (item.project.description || "").substring(0, 100) + "...",
            item.project.duration,
            item.project.projectType === 'learning' ? 'Learning project' : `Paid project - $${item.project.budget}`,
            `${item.matchPercentage}% match`,
          ],
          category: 'learning',
          matchScore: item.matchScore,
        })),
        ...(projects.paid || []).map(item => ({
          id: item.project._id,
          title: item.project.title,
          type: item.project.requiredSkills?.join(", ") || "General",
          details: [
            (item.project.description || "").substring(0, 100) + "...",
            item.project.duration,
            `Paid project - $${item.project.budget}`,
            `${item.matchPercentage}% match`,
          ],
          category: 'paid',
          matchScore: item.matchScore,
        })),
      ];
      setDisplayProjects(allProjects);
    }
  }, [projects]);

  const filteredProjects = displayProjects.filter(project => project.category === activeTab);
  const learningCount = displayProjects.filter(p => p.category === 'learning').length;
  const paidCount = displayProjects.filter(p => p.category === 'paid').length;

  const tabs = [
    { id: 'learning', label: 'Learning Projects', count: learningCount },
    { id: 'paid', label: 'Paid Projects', count: paidCount },
  ];

  return (
    <Card className="w-full" padding="lg">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Suggested Projects</h2>
          <p className="text-sm text-gray-600">Projects that match your skills and interests</p>
        </div>

        <Tab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {project.title}
                        </h3>
                        {project.matchScore && (
                          <Badge variant="success" size="sm">
                            {project.matchScore}% Match
                          </Badge>
                        )}
                      </div>
                      <Badge variant="primary" size="sm">
                        {project.type}
                      </Badge>
                    </div>

                    <ul className="space-y-1.5 text-sm text-gray-600 list-none">
                      {project.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto self-start sm:self-center"
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
              <p className="text-sm mt-1">Try post a new project or updating your skills</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Suggesionproject;
