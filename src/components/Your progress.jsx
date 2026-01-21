import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { freelancerAPI } from '../utils/api';

const Yourprogress = ({ stats: freelancer }) => {
  const [loading, setLoading] = useState(false);
  // const [freelancer, setFreelancer] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   loadFreelancerData();
  // }, []);

  // const loadFreelancerData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await freelancerAPI.getById(getFreelancerId());
  //     if (response.success) {
  //       setFreelancer(response.data);
  //     }
  //   } catch (err) {
  //     console.error("Error loading freelancer data:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Calculate overall progress (percentage towards graduation)
  const overallProgress = freelancer
    ? Math.min((freelancer.completedProjectsCount / 10) * 100, 100)
    : 0;

  const getHighestSkillLevel = () => {
    if (!freelancer || !Array.isArray(freelancer.skills) || freelancer.skills.length === 0) return "Beginner";
    const hasIntermediate = freelancer.skills.some(s => s.level === "intermediate");
    return hasIntermediate ? "Intermediate" : "Beginner";
  };

  const stats = [
    {
      id: 1,
      icon: (
        <svg className="h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      label: 'Skills Built',
      value: freelancer && Array.isArray(freelancer.skills) ? freelancer.skills.length.toString() : '0',
      description: 'Total skills',
      variant: 'warning',
    },
    {
      id: 2,
      icon: (
        <svg className="h-8 w-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: 'Level',
      value: getHighestSkillLevel(),
      description: 'Current level',
      variant: 'default',
    },
    {
      id: 3,
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Projects Completed',
      value: freelancer ? freelancer.completedProjectsCount.toString() : '0',
      description: `Total completed (${freelancer ? freelancer.status : 'active'})`,
      variant: freelancer?.status === 'graduated' ? 'success' : 'primary',
    },
  ];

  return (
    <Card className="w-full" padding="lg">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h2>
          <p className="text-sm text-gray-600">Track your freelancing journey</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {stat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </h3>
                    <Badge variant={stat.variant} size="sm">
                      {stat.value}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {loading ? "..." : `${Math.round(overallProgress)}%`}
              </span>
            </div>
          </div>
          {freelancer?.status === 'graduated' && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-green-900">🎓 Congratulations! You've graduated!</p>
              <p className="text-xs text-green-700 mt-1">You've completed 10+ projects and are now a graduate freelancer.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Yourprogress;

