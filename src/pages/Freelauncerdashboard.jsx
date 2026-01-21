import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Suggesionproject from "../components/Suggesion project";
import Yourprogress from "../components/Your progress";
import Recentactivity from "../components/Recent activity";

const FreeDashboard = () => {
  const [freelancerData, setFreelancerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (user && user.profileId) {
          // Fetch suggested projects which returns matches
          const response = await fetch(`http://localhost:5000/api/freelancers/${user.profileId}/suggested-projects`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = await response.json();
          if (data.success) {
            setFreelancerData(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancerData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Welcome, {freelancerData?.freelancer?.name || 'Freelancer'}!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Ready for your next project?
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Suggested Projects */}
          <div className="lg:col-span-5">
            <Suggesionproject projects={freelancerData?.suggestedProjects} />
          </div>

          {/* Your Progress */}
          <div className="lg:col-span-4">
            <Yourprogress stats={freelancerData?.freelancer} />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-3">
            <Recentactivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreeDashboard;
