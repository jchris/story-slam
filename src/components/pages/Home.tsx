import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Story Judging Platform
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        A modern platform designed to assist producers and judges with evaluating stories 
        in a fair and transparent manner, inspired by The Moth story podcast's live Story Slam events.
      </p>
      <Link
        to="/events"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-150"
      >
        Get Started
      </Link>
    </div>

    {/* Feature Cards */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-indigo-600 text-2xl mb-4">🎭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Fair Judging</h3>
          <p className="text-gray-600">
            Streamlined process for evaluating stories with standardized criteria and transparent scoring.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-indigo-600 text-2xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Events</h3>
          <p className="text-gray-600">
            Organize and manage story slam events anywhere in the world with our intuitive platform.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-indigo-600 text-2xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Results</h3>
          <p className="text-gray-600">
            Track scores and rankings in real-time as judges evaluate performances.
          </p>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="bg-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Host Your Story Slam?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join the community of storytellers and create your first event today.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 transition-colors duration-150"
        >
          Find and Create Events
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
