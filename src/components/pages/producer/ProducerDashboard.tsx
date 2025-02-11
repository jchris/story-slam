import React from 'react';

export const ProducerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-medium">Event Management Dashboard</h1>
        <p className="text-gray-400">Manage your storytelling event and track performances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-900 rounded-full p-2 mt-1">
                <span className="text-sm font-medium">1</span>
              </div>
              <div>
                <p className="font-medium">Add Judges</p>
                <p className="text-gray-400 text-sm">Begin by adding judges to your event panel</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-900 rounded-full p-2 mt-1">
                <span className="text-sm font-medium">2</span>
              </div>
              <div>
                <p className="font-medium">Register Storytellers</p>
                <p className="text-gray-400 text-sm">Add storytellers as they prepare to perform</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-900 rounded-full p-2 mt-1">
                <span className="text-sm font-medium">3</span>
              </div>
              <div>
                <p className="font-medium">Monitor Scoring</p>
                <p className="text-gray-400 text-sm">Track real-time judging and scoring</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Event Status</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Current Performance</p>
              <p className="text-lg">No active storyteller</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Judges Online</p>
              <p className="text-lg">Waiting for data...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;
