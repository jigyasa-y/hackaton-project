import React from 'react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

const Recentactivity = () => {
  const activities = [
    {
      id: 1,
      title: 'Logo Design Project Completed',
      feedback: 'Good Feedback!',
      time: '2 hours ago',
      status: 'completed',
      type: 'success',
    },
    {
      id: 2,
      title: 'Website Redesign Project',
      feedback: 'Client review pending',
      time: '1 day ago',
      status: 'pending',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Content Writing Project',
      feedback: 'Excellent work!',
      time: '2 days ago',
      status: 'completed',
      type: 'success',
    },
    {
      id: 4,
      title: 'Social Media Campaign',
      feedback: 'Revision requested',
      time: '3 days ago',
      status: 'revision',
      type: 'default',
    },
  ];

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card className="w-full" padding="lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activity</h2>
            <p className="text-sm text-gray-600">Your latest project updates</p>
          </div>
        </div>

        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-gray-600">{activity.feedback}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(activity.status)} size="sm" className="flex-shrink-0">
                  {activity.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="md" className="w-full">
          View All Activity
        </Button>
      </div>
    </Card>
  );
};

export default Recentactivity;
