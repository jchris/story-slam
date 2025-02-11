import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Story } from '../../../types';

export const JudgeStories: React.FC = () => {
  const { eventId, judgeId } = useParams();
  const { useLiveQuery } = useFireproof(`events/${eventId}`);

  // Query stories that need to be judged
  const { docs: stories } = useLiveQuery<Story>('type', {
    key: 'story'
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Event: Holocene Feb 21st</h1>
            <div className="flex space-x-4 text-gray-300">
              <div>
                <span className="text-gray-500">Team:</span> Baca
              </div>
              <div>
                <span className="text-gray-500">Nickname:</span> Eye Sack
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Stories to Judge</h2>
          {stories.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-300">Available Stories</h3>
              <div className="grid gap-4">
                {stories.map(story => (
                  <Link
                    key={story._id}
                    to={`/event/${eventId}/judge/${judgeId}/story/${story._id}`}
                    className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200 shadow-md border border-gray-700"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-lg font-medium text-white">{story.storyteller}</div>
                        <div className="text-sm text-gray-400">
                          Added: {new Date(story.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-400 text-lg">No stories available for judging at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JudgeStories;
