import React, { useEffect, useState } from 'react';
import Clientnavbar from "../components/Clientnavbar";
import Postnewproject from "../components/Postnewproject";
import Yourproject from "../components/Yourproject";
import Topmatch from "../components/Topmatchfreelancer";

const Clientdashboard = () => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setClientData(user);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Clientnavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Welcome back, {clientData?.name || 'Client'}!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Find the right talent for your next project
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Post New Project */}
          <div className="lg:col-span-4">
            <Postnewproject clientId={clientData?.profileId} />
          </div>

          {/* Middle Column - Your Projects */}
          <div className="lg:col-span-5">
            <Yourproject />
          </div>

          {/* Right Column - Top Matched Freelancers */}
          <div className="lg:col-span-3">
            <Topmatch />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Clientdashboard;
